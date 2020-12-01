import React from 'react';
import { FiEdit2 } from "react-icons/fi";

import {BootstrapTable, TableHeaderColumn, InsertModalHeader} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import api from '../../api';

import styles from '../styles.module.css';

export default class Acoes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            acoes: '',
            edit: 'telahidden',
            editdata: '',
            eficacia: '',
            descricao: '',
            codigo: ''
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
        let eficacia = this.state.eficacia;
        let descricao = this.state.descricao;
        let codigo = this.state.codigo;
        let data = {
            Eficácia: eficacia,
            Descrição: descricao
        }

        let datajson = JSON.parse(JSON.stringify(data));
        
        try {
            await api.put('acoes/'+codigo, datajson);
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
            await api.post('acoes', datajson);
        }
        catch(err) {
            console.log("Erro ao inserir!");
        }
    }

    async onAfterDeleteRow(pk) {
        try {
            await api.delete(`acoes/`+pk);
        }
        catch(err) {
            console.log("Erro ao deletar! ", err)
        }
    }

    async componentWillMount() {
        try {
            await api.get('acoes').then(response => {this.setState({acoes:response.data})});
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
            onModalClose={ () => this.handleModalClose(closeModal) }
            />
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
                    this.setState({ editdata: row, eficacia: row.Eficácia, descricao: row.Descrição, codigo: row.Código });
                }
                else {
                    this.setState({ editdata: '' })
                }
            }
        };

        return(
            <div className={styles.total}>
                <h1>Tabela Ações</h1>
                <button className={styles.button} onClick={() => this.handleModalEdit()}><FiEdit2/> Editar</button>
                
                {this.state.editdata ? (
                    <div className={styles[this.state.edit]}>

                        <div className={styles.modal}>
                            <div className={styles['modal-header']}>
                                <span>
                                    <h4 className={styles['modal-title']}>Edite os dados</h4>
                                    <h5> <label>Código:</label> {this.state.editdata.Código}</h5>
                                </span>
                            </div>

                            <div className={styles['modal-body']}>
                                <div className={styles['form-group']}>
                                    <label>Eficácia</label>
                                    <input placeholder="Eficácia" type="text" className={styles['form-control']} name="eficacia" value={this.state.eficacia} onChange={this.handleInput}></input>
                                    <label>Descrição</label>
                                    <input placeholder="Descrição" type="text" className={styles['form-control']} name="descricao" value={this.state.descricao} onChange={this.handleInput}></input>
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
                    data={ this.state.acoes } 
                    pagination
                    options={ options } 
                    selectRow={ selectRow } 
                    insertRow 
                    deleteRow
                    >
                    <TableHeaderColumn dataField='Código' filter={ { type: 'TextFilter' } } isKey={ true }>Código</TableHeaderColumn>
                    <TableHeaderColumn dataField='Eficácia' filter={ { type: 'TextFilter' } }>Eficácia</TableHeaderColumn>
                    <TableHeaderColumn dataField='Descrição' filter={ { type: 'TextFilter' } }>Descrição</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}