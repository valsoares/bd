import React from 'react';
import { FiEdit2 } from "react-icons/fi";
import 'react-moment';
import 'moment-timezone';
import moment from 'moment';

import {BootstrapTable, TableHeaderColumn, InsertModalHeader} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import api from '../../api';

import styles from '../styles.module.css';

export default class Governador extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            governadores: '',
            edit: 'telahidden',
            editdata: '',
            rg: '',
            nome: '',
            nascimento: '',
            admissao: ''
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
        let rg = this.state.rg;
        let nome = this.state.nome;
        let nascimento = this.state.nascimento;
        let admissao = this.state.admissao;
        let data = {
            Nome: nome,
            Data_nascimento: nascimento,
            Data_de_admissão: admissao
        }

        let datajson = JSON.parse(JSON.stringify(data));
        
        try {
            await api.put('governadores/'+rg, datajson);
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
        let datajson = JSON.parse(JSON.stringify(row));
        try {
            await api.post('governadores', datajson);
            this.componentWillMount();
        }
        catch(err) {
            console.log("Erro ao inserir!");
        }
    }

    async onAfterDeleteRow(pk) {
        try {
            await api.delete(`governadores/`+pk);
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

    async componentWillMount() {
        try {
            await api.get('governadores').then(response => {this.setState({governadores:response.data})});
            this.changeDate();
        } catch (error) {
            alert('Ocorreu algum erro, tente novamente!');
        }
    }

    changeDate() {
            
        this.setState(prevState => ({
            governadores: prevState.governadores.map((text, id) => {
                let admissao = this.formatDate(text.Data_de_admissão);
                let nascimento = this.formatDate(text.Data_nascimento);
                return {...text, Data_de_admissão: admissao, Data_nascimento: nascimento}
            })
        }));

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
                    this.setState({ editdata: row, rg: row.RG, nome: row.Nome, nascimento: row.Data_nascimento, admissao: row.Data_de_admissão });
                }
                else {
                    this.setState({ editdata: '' })
                }
            }
        };

        return(
            <div className={styles.total}>
                <h1>Tabela Governador</h1>
                <button className={styles.button} onClick={() => this.handleModalEdit()}><FiEdit2/> Editar</button>
                
                {this.state.editdata ? (
                    <div className={styles[this.state.edit]}>

                        <div className={styles.modal}>
                            <div className={styles['modal-header']}>
                                <span>
                                    <h4 className={styles['modal-title']}>Edite os dados</h4>
                                    <h5> <label>RG:</label> {this.state.editdata.RG}</h5>
                                </span>
                            </div>

                            <div className={styles['modal-body']}>
                                <div className={styles['form-group']}>
                                    <label>Nome</label>
                                    <input placeholder="Nome" type="text" name="nome" className={styles['form-control']} value={this.state.nome} onChange={this.handleInput}></input>
                                    <label>Data de nascimento. Formato aceito: ano-dia-mes (ex: 2000-02-02)</label>
                                    <input placeholder="Data de nascimento" type="text" name="nascimento" className={styles['form-control']} value={this.state.nascimento} onChange={this.handleInput}></input>
                                    <label>Data de admissão. Formato aceito: ano-dia-mes (ex: 2000-02-02)</label>
                                    <input placeholder="Data de admissão" type="text" name="admissao" className={styles['form-control']} value={this.state.admissao} onChange={this.handleInput}></input>
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
                    data={ this.state.governadores } 
                    pagination
                    options={ options } 
                    selectRow={ selectRow } 
                    insertRow 
                    deleteRow
                    >
                    <TableHeaderColumn dataField='RG' filter={ { type: 'TextFilter' } } isKey={ true }>RG</TableHeaderColumn>
                    <TableHeaderColumn dataField='Nome' filter={ { type: 'TextFilter' } } tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Nome</TableHeaderColumn>
                    <TableHeaderColumn dataField='Data_nascimento' filter={ { type: 'TextFilter' } } tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Data de nascimento. Formato aceito: ano-dia-mes (ex: 2000-02-02)</TableHeaderColumn>
                    <TableHeaderColumn dataField='Data_de_admissão' filter={ { type: 'TextFilter' } } tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Data de admissão. Formato aceito: ano-dia-mes (ex: 2000-02-02)</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}