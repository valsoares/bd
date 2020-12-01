import React from 'react';
import { FiEdit2 } from "react-icons/fi";

import {BootstrapTable, TableHeaderColumn, InsertModalHeader} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import api from '../../api';

import styles from '../styles.module.css';

export default class Posto extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            postos: '',
            edit: 'telahidden',
            editdata: '',
            nome: '',
            cep: '',
            capacidade: '',
            uf: ''
        }
        this.handleModalEdit = this.handleModalEdit.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.onAfterInsertRow = this.onAfterInsertRow.bind(this);
        this.onAfterDeleteRow = this.onAfterDeleteRow.bind(this);
    }

    handleModalEdit() {
        let edit = (this.state.edit) == 'telahidden' ? 'telashow' : 'telahidden';
        this.setState({edit:edit});
    }

    async handleEdit(e) {
        e.preventDefault();
        let cep = this.state.cep;
        let nome = this.state.nome;
        let capacidade = this.state.capacidade;
        let uf = this.state.uf;
        let data = {
            CEP: cep,
            Capacidade_diária: capacidade,
            UF: uf
        }

        let datajson = JSON.parse(JSON.stringify(data));
        
        try {
            await api.put('postos/'+nome, datajson);
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
            await api.post('postos', datajson);
            this.componentWillMount();
        }
        catch(err) {
            console.log("Erro ao inserir!");
        }
    }

    async onAfterDeleteRow(pk) {
        try {
            await api.delete(`postos/`+pk);
            this.componentWillMount();
        }
        catch(err) {
            console.log("Erro ao deletar! ", err)
        }
    }

    async componentWillMount() {
        try {
            await api.get('postos').then(response => {this.setState({postos:response.data})});
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
                    this.setState({ editdata: row, nome: row.Nome, cep: row.CEP, capacidade: row.Capacidade_diária, uf: row.UF });
                }
                else {
                    this.setState({ editdata: '' })
                }
            }
        };

        return(
            <div className={styles.total}>
                <h1>Tabela Postos de Saúde</h1>
                <button className={styles.button} onClick={() => this.handleModalEdit()}><FiEdit2/> Editar</button>
                
                {this.state.editdata ? (
                    <div className={styles[this.state.edit]}>

                        <div className={styles.modal}>
                            <div className={styles['modal-header']}>
                                <span>
                                    <h4 className={styles['modal-title']}>Edite os dados</h4>
                                    <h5> <label>Nome:</label> {this.state.editdata.Nome}</h5>
                                </span>
                            </div>

                            <div className={styles['modal-body']}>
                                <div className={styles['form-group']}>
                                    <label>CEP</label>
                                    <input placeholder="CEP" type="text" name="cep" className={styles['form-control']} value={this.state.cep} onChange={this.handleInput}></input>
                                    <label>Capacidade diária</label>
                                    <input placeholder="Capacidade diária" type="text" name="capacidade" className={styles['form-control']} value={this.state.capacidade} onChange={this.handleInput}></input>
                                    <label>UF</label>
                                    <input placeholder="UF" type="text" name="uf" className={styles['form-control']} value={this.state.uf} onChange={this.handleInput}></input>
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
                    data={ this.state.postos } 
                    pagination
                    options={ options } 
                    selectRow={ selectRow } 
                    insertRow 
                    deleteRow
                    >
                    <TableHeaderColumn dataField='Nome' filter={ { type: 'TextFilter' } } tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }} isKey={ true }>Nome</TableHeaderColumn>
                    <TableHeaderColumn dataField='CEP' filter={ { type: 'TextFilter' } }>CEP</TableHeaderColumn>
                    <TableHeaderColumn dataField='Capacidade_diária' filter={ { type: 'TextFilter' } }>Capacidade diária</TableHeaderColumn>
                    <TableHeaderColumn dataField='UF' filter={ { type: 'TextFilter' } }>UF</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}