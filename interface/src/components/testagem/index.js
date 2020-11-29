import React from 'react';
import { FiEdit2 } from "react-icons/fi";

import {BootstrapTable, TableHeaderColumn, InsertModalHeader} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import api from '../../api';

import styles from '../styles.module.css';


export default class Testagem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            testagens: '',
            edit: 'telahidden',
            editdata: '',
            datat: '',
            tipo: '',
            contaminacao: '',
            id: '',
            nome: ''
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
        let datat = this.state.datat;
        let nome = this.state.nome;
        let tipo = this.state.tipo;
        let contaminacao = this.state.contaminacao;
        let id = this.state.id;
        let data = {
            Nome: nome,
            Tipo: tipo,
            Contaminacao: contaminacao
        }

        let datajson = JSON.parse(JSON.stringify(data));
        
        try {
            await api.put('testagens/'+datat+'/'+id, datajson);
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
            await api.post('testagens', datajson);
            this.componentWillMount();
        }
        catch(err) {
            console.log("Erro ao inserir!");
        }
    }

    async onAfterDeleteRow(pk) {
        try {
            await api.delete(`testagens/`+pk);
            this.componentWillMount();
        }
        catch(err) {
            console.log("Erro ao deletar! ", err)
        }
    }

    formatDate(string){
        let options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        return new Date(string).toLocaleDateString([],options);
    }

    changeDate() {

        this.setState(prevState => ({
            testagens: prevState.testagens.map((text, id) => {
                let datat = this.formatDate(text.Data_testagem);
                return {...text, Data_testagem: datat}
            })
        }));

    }

    async componentWillMount() {
        try {
            await api.get('testagens').then(response => {this.setState({testagens:response.data})});
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
                    this.setState({ editdata: row, datat: row.Data_testagem, tipo: row.Tipo, contaminacao: row.Contaminação, id: row.ID, nome: row.Nome });
                }
                else {
                    this.setState({ editdata: '' })
                }
            }
        };

        return(
            <div className={styles.total}>
                <h1>Tabela Testagens</h1>
                <button className={styles.button} onClick={() => this.handleModalEdit()}><FiEdit2/> Editar</button>
                
                {this.state.editdata ? (
                    <div className={styles[this.state.edit]}>

                        <div className={styles.modal}>
                            <div className={styles['modal-header']}>
                                <span>
                                    <h4 className={styles['modal-title']}>Edite os dados</h4>
                                    <h5> 
                                        <label>Data da testagem:</label> {this.state.editdata.Data_testagem}
                                        <label>ID do paciente:</label> {this.state.editdata.ID}
                                    </h5>
                                </span>
                            </div>

                            <div className={styles['modal-body']}>
                                <div className={styles['form-group']}>
                                    <label>Tipo de teste</label>
                                    <input placeholder="Tipo de teste" type="text" name="tipo" className={styles['form-control']} value={this.state.tipo} onChange={this.handleInput}></input>
                                    <label>Contaminação</label>
                                    <input placeholder="Contaminação" type="text" name="contaminacao" className={styles['form-control']} value={this.state.contaminacao} onChange={this.handleInput}></input>
                                    <label>Nome do posto de saúde</label>
                                    <input placeholder="Nome do posto de saúde" type="text" name="nome" className={styles['form-control']} value={this.state.nome} onChange={this.handleInput}></input>
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
                    data={ this.state.testagens } 
                    pagination
                    options={ options } 
                    selectRow={ selectRow } 
                    insertRow 
                    deleteRow
                    keyField ={this.state.pk}
                    >

                    <TableHeaderColumn isKey={true} dataField='Data_testagem' tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Data da testagem. Formato aceito: ano-dia-mes hh:mm:ss (ex: 2000-02-02 12:03:10)</TableHeaderColumn>
                    <TableHeaderColumn dataField='ID'>ID do paciente</TableHeaderColumn>
                    <TableHeaderColumn dataField='Tipo'>Tipo de teste</TableHeaderColumn>
                    <TableHeaderColumn dataField='Contaminação'>Contaminação. Formato: 0 ou 1</TableHeaderColumn>
                    <TableHeaderColumn dataField='Nome' tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Nome do posto de saúde</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}