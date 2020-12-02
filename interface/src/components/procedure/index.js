import React from 'react';

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import api from '../../api';

import styles from '../styles.module.css';

export default class Procedure extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            procedure: '',
            uf: '',
            view: ''
        }
        this.handleInput = this.handleInput.bind(this);
        this.handleButton = this.handleButton.bind(this);
    }

    handleInput(event) {
        let item = event.target.name;
        let value = event.target.value;

        this.setState({ [item]: value });
    }

    async handleButton() {
        try {
            await api.get(`procedure/`+this.state.uf).then(response => {this.setState({procedure:response.data})});
        } catch (err) {
            console.log("Erro ao realizar a procedure! ", err)
        }
    }

    async componentWillMount() {
        try {
            await api.get('view').then(response => {this.setState({view:response.data})});
        } catch (error) {
            alert('Ocorreu algum erro, tente novamente!');
        }
    }

    render() {
        
        return(
            <div className={styles.total}>
                <div className={styles.box}>
                    <h1>Procedure</h1>
                    <p>Consulte o número de pacientes de um estado</p>
                    <input placeholder="Digite o UF" type="text" name="uf" value={this.state.uf} onChange={this.handleInput}></input>
                    <button onClick={this.handleButton}>OK</button>

                    <BootstrapTable 
                        data={ this.state.procedure } 
                    >
                        <TableHeaderColumn dataField='qnt' isKey={ true }>Quantidade</TableHeaderColumn>
                    </BootstrapTable>
                    <br/>

                    <h1>View</h1>
                    <p>Estados com a efetividade "muito alta" quanto ao combate da Covid</p>
                    <BootstrapTable 
                        data={ this.state.view } 
                    >
                        <TableHeaderColumn dataField='UF' isKey={ true }>Estado</TableHeaderColumn>
                    </BootstrapTable>
                    <br/><br/><br/>
                </div>

            </div>
        );
    }
}