import React from 'react';
import { FiEdit2 } from "react-icons/fi";

import {BootstrapTable, TableHeaderColumn, InsertModalHeader} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import api from '../../api';

import styles from '../styles.module.css';

export default class Estado extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            estados: '',
            edit: 'telahidden',
            editdata: '',
            uf: '',
            populacao: '',
            postos: '',
            hospitais: '',
            id: '',
            rg: ''
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
        let uf = this.state.uf;
        let populacao = this.state.populacao;
        let postos = this.state.postos;
        let hospitais = this.state.hospitais;
        let id = this.state.id;
        let rg = this.state.rg;

        let data = {
            População: populacao,
            Quant_postos_saude: postos,
            Quant_hospitais: hospitais,
            ID: id,
            RG: rg
        }

        let datajson = JSON.parse(JSON.stringify(data));
        
        try {
            await api.put('estados/'+uf, datajson);
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
            await api.post('estados', datajson);
        }
        catch(err) {
            console.log("Erro ao inserir!");
        }
    }

    async onAfterDeleteRow(pk) {
        try {
            await api.delete(`estados/`+pk);
        }
        catch(err) {
            console.log("Erro ao deletar! ", err)
        }
    }

    async componentWillMount() {
        try {
            await api.get('estados').then(response => {this.setState({estados:response.data})});
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
                    this.setState({ 
                        editdata: row, 
                        uf: row.UF, 
                        populacao: row.População, 
                        postos: row.Quant_postos_saude, 
                        hospitais: row.Quant_hospitais,
                        id: row.ID,
                        rg: row.RG
                    });
                }
                else {
                    this.setState({ editdata: '' })
                }
            }
        };

        return(
            <div className={styles.total}>
                <h1>Tabela Estados</h1>
                <button className={styles.button} onClick={() => this.handleModalEdit()}><FiEdit2/> Editar</button>
                
                {this.state.editdata ? (
                    <div className={styles[this.state.edit]}>

                        <div className={styles.modal}>
                            <div className={styles['modal-header']}>
                                <span>
                                    <h4 className={styles['modal-title']}>Edite os dados</h4>
                                    <h5> <label>UF:</label> {this.state.editdata.UF}</h5>
                                </span>
                            </div>

                            <div className={styles['modal-body']}>
                                <div className={styles['form-group']}>
                                    <label>População</label>
                                    <input placeholder="População" type="text" name="populacao" className={styles['form-control']} value={this.state.populacao} onChange={this.handleInput}></input>
                                    <label>Quantidade de postos de saúde</label>
                                    <input placeholder="Quantidade de postos de saúde" name="postos" type="text" className={styles['form-control']} value={this.state.postos} onChange={this.handleInput}></input>
                                    <label>Quantidade de hospitais</label>
                                    <input placeholder="Quantidade de hospitais" type="text" name="hospitais" className={styles['form-control']} value={this.state.hospitais} onChange={this.handleInput}></input>
                                    <label>ID da efetividade</label>
                                    <input placeholder="ID da efetividade" type="text" name="id" className={styles['form-control']} value={this.state.editdata.id} onChange={this.handleInput}></input>
                                    <label>RG do governador</label>
                                    <input placeholder="RG do governador" type="text" name="rg" className={styles['form-control']} value={this.state.editdata.rg} onChange={this.handleInput}></input>
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
                    data={ this.state.estados } 
                    pagination
                    options={ options } 
                    selectRow={ selectRow } 
                    insertRow 
                    deleteRow
                    >
                    <TableHeaderColumn dataField='UF' filter={ { type: 'TextFilter' } } isKey={ true }>UF</TableHeaderColumn>
                    <TableHeaderColumn dataField='População' filter={ { type: 'TextFilter' } }>População</TableHeaderColumn>
                    <TableHeaderColumn dataField='Quant_postos_saude' filter={ { type: 'TextFilter' } }>Quantidade de postos de saúde</TableHeaderColumn>
                    <TableHeaderColumn dataField='Quant_hospitais' filter={ { type: 'TextFilter' } }>Quantidade de hospitais</TableHeaderColumn>
                    <TableHeaderColumn dataField='ID' filter={ { type: 'TextFilter' } }>ID da efetividade</TableHeaderColumn>
                    <TableHeaderColumn dataField='RG' filter={ { type: 'TextFilter' } }>RG do governador</TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}