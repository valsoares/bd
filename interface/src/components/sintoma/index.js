import React from 'react';
import { FiEdit2 } from "react-icons/fi";

import {BootstrapTable, TableHeaderColumn, InsertModalHeader} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import api from '../../api';

import styles from '../styles.module.css';

export default class Sintoma extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sintomas: '',
            edit: 'telahidden',
            editdata: '',
            tipo: '',
            descricao: '',
            gravidade: ''
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
        let tipo = this.state.tipo;
        let descricao = this.state.descricao;
        let gravidade = this.state.gravidade;
        let data = {
            Gravidade: gravidade,
            Descrição: descricao
        }

        let datajson = JSON.parse(JSON.stringify(data));
        
        try {
            await api.put('sintomas/'+tipo, datajson);
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
            await api.post('sintomas', datajson);
        }
        catch(err) {
            console.log("Erro ao inserir!");
        }
    }

    async onAfterDeleteRow(pk) {
        try {
            await api.delete(`sintomas/`+pk);
        }
        catch(err) {
            console.log("Erro ao deletar! ", err)
        }
    }

    async componentWillMount() {
        try {
            await api.get('sintomas').then(response => {this.setState({sintomas:response.data})});
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
                    this.setState({ editdata: row, tipo: row.Tipo, descricao: row.Descrição, gravidade: row.Gravidade });
                }
                else {
                    this.setState({ editdata: '' })
                }
            }
        };

        return(
            <div className={styles.total}>
                <h1>Tabela Sintomas</h1>
                <button className={styles.button} onClick={() => this.handleModalEdit()}><FiEdit2/> Editar</button>
                
                {this.state.editdata ? (
                    <div className={styles[this.state.edit]}>

                        <div className={styles.modal}>
                            <div className={styles['modal-header']}>
                                <span>
                                    <h4 className={styles['modal-title']}>Edite os dados</h4>
                                    <h5> 
                                        <label>Tipo:</label> {this.state.editdata.Tipo}
                                    </h5>
                                </span>
                            </div>

                            <div className={styles['modal-body']}>
                                <div className={styles['form-group']}>
                                    <label>Descrição</label>
                                    <input placeholder="Descrição" type="text" name="descricao" className={styles['form-control']} value={this.state.descricao} onChange={this.handleInput}></input>
                                    <label>Gravidade</label>
                                    <input placeholder="Gravidade" type="text" name="gravidade" className={styles['form-control']} value={this.state.gravidade} onChange={this.handleInput}></input>
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
                    data={ this.state.sintomas } 
                    pagination
                    options={ options } 
                    selectRow={ selectRow } 
                    insertRow 
                    deleteRow>
                    <TableHeaderColumn dataField='Tipo' isKey={ true }>Tipo</TableHeaderColumn>
                    <TableHeaderColumn dataField='Descrição' tdStyle={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>Descrição</TableHeaderColumn>
                    <TableHeaderColumn dataField='Gravidade'>Gravidade</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}