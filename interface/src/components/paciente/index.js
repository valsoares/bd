import React from 'react';
import { FiEdit2 } from "react-icons/fi";

import {BootstrapTable, TableHeaderColumn, InsertModalHeader} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import api from '../../api';

import styles from '../styles.module.css';

export default class Paciente extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pacientes: '',
            edit: 'telahidden',
            editdata: '',
            sexo: '',
            nascimento: '',
            nome: '',
            id: ''
        }
        this.handleModalEdit = this.handleModalEdit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.onAfterInsertRow = this.onAfterInsertRow.bind(this);
        this.onAfterDeleteRow = this.onAfterDeleteRow.bind(this);
        this.formatDate = this.formatDate.bind(this);
        this.changeDate = this.changeDate.bind(this);
    }

    handleModalEdit() {
        let edit = (this.state.edit) == 'telahidden' ? 'telashow' : 'telahidden';
        this.setState({edit:edit});
    }

    async handleEdit(e) {
        e.preventDefault();
        let nome = this.state.nome;
        let nascimento = this.state.nascimento;
        let sexo = this.state.sexo;
        let id = this.state.id;
        let data = {
            Data_de_nascimento: nascimento,
            Nome: nome,
            Sexo: sexo
        }

        let datajson = JSON.parse(JSON.stringify(data));
        
        try {
            await api.put('pacientes/'+id, datajson);
            this.setState({edit:'telahidden'});
            this.componentWillMount();
        }
        catch(err) {
            console.log("Erro ao editar!")
        }
    }

    handleInput(event) {
        let item = event.target.name;
        let value = event.target.value;

        this.setState({ [item]: value });
    }

    async onAfterInsertRow(row) {
        let nome = row.Nome;
        let nascimento = row.Data_de_nascimento;
        let sexo = row.Sexo;
        const data = {
            Nome: nome,
            Data_de_nascimento: nascimento,
            Sexo: sexo
        }
        let datajson = JSON.parse(JSON.stringify(data));
        try {
            await api.post('pacientes', datajson);
            this.componentWillMount();
        }
        catch(err) {
            console.log("Erro ao inserir!");
        }
    }

    async onAfterDeleteRow(pk) {
        try {
            await api.delete(`pacientes/`+pk);
            this.componentWillMount();
        }
        catch(err) {
            console.log("Erro ao deletar! ", err)
        }
    }

    formatDate(string){
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }

    changeDate() {
            
        this.setState(prevState => ({
            pacientes: prevState.pacientes.map((text, id) => {
                let nascimento = this.formatDate(text.Data_de_nascimento);
                return {...text, Data_de_nascimento: nascimento}
            })
        }));

    }

    async componentWillMount() {
        try {
            await api.get('pacientes').then(response => {this.setState({pacientes:response.data})});
            this.changeDate();
        } catch (error) {
            alert('Ocorreu algum erro, tente novamente!');
        }
    }
    
    createCustomModalHeader = (closeModal, save) => {
        return (
          <InsertModalHeader
            className='my-custom-class'
            title='Insira os dados'
            hideClose={ true }
            onModalClose={ () => this.handleModalClose(closeModal) }/>
        );
    }

    render() {

        const options = {
            insertModalHeader: this.createCustomModalHeader,
            insertText: 'Inserir',
            deleteText: 'Deletar',
            afterInsertRow: this.onAfterInsertRow,
            afterDeleteRow: this.onAfterDeleteRow
        };

        const selectRow = {
            mode: 'radio', 
            bgColor: 'pink',
            clickToSelect: true,
            onSelect: (row, isSelect, rowIndex, e) => {
                if(isSelect) {
                    this.setState({ editdata: row, id: row.ID, nome: row.Nome, nascimento: row.Data_de_nascimento, sexo: row.Sexo });
                }
                else {
                    this.setState({ editdata: '' })
                }
            }
        };

        return(
            <div className={styles.total}>
                <h1>Tabela Pacientes</h1>
                <button className={styles.button} onClick={() => this.handleModalEdit()}><FiEdit2/> Editar</button>
                
                {this.state.editdata ? (
                    <div className={styles[this.state.edit]}>

                        <div className={styles.modal}>
                            <div className={styles['modal-header']}>
                                <span>
                                    <h4 className={styles['modal-title']}>Edite os dados</h4>
                                    <h5> <label>ID:</label> {this.state.editdata.ID}</h5>
                                </span>
                            </div>

                            <div className={styles['modal-body']}>
                                <div className={styles['form-group']}>
                                    <label>Sexo</label>
                                    <input placeholder="Sexo" type="text" name="sexo" className={styles['form-control']} value={this.state.sexo} onChange={this.handleInput}></input>
                                    <label>Data de nascimento. Formato aceito: ano-dia-mes (ex: 2000-02-02)</label>
                                    <input placeholder="Data de nascimento" type="text" name="nascimento" className={styles['form-control']} value={this.state.nascimento} onChange={this.handleInput}></input>
                                    <label>Nome do hospital</label>
                                    <input placeholder="Nome do hospital" type="text" name="nome" className={styles['form-control']} value={this.state.nome} onChange={this.handleInput}></input>
                                </div>
                            </div>

                            <div className={styles['modal-footer']}>
                                <button className={styles['btn-sec']} onClick={this.handleModalEdit}>Close</button>
                                <button className={styles['btn-primary']} onClick={this.handleEdit}>Save</button>
                            </div>
                        </div>
                        
                    </div>
                ) : null
                }
                <BootstrapTable 
                    data={ this.state.pacientes } 
                    pagination
                    options={ options } 
                    selectRow={ selectRow } 
                    insertRow 
                    deleteRow>
                    <TableHeaderColumn dataField='ID' isKey={ true } hiddenOnInsert>ID</TableHeaderColumn>
                    <TableHeaderColumn dataField='Sexo'>Sexo</TableHeaderColumn>
                    <TableHeaderColumn dataField='Data_de_nascimento'>Data de nascimento. Formato aceito: ano-dia-mes (ex: 2000-02-02)</TableHeaderColumn>
                    <TableHeaderColumn dataField='Nome' tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Nome do hospital</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}