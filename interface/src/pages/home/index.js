import React from 'react';

import Governador from '../../components/governador';
import Efetividade from '../../components/efetividade';
import Acoes from '../../components/acoes';
import Estado from '../../components/estado';
import Posto from '../../components/posto';
import Hospital from '../../components/hospital';
import Paciente from '../../components/paciente';
import Comorbidade from '../../components/comorbidade';
import Sintoma from '../../components/sintoma';
import Procedure from '../../components/procedure';

import styles from './styles.module.css';

import { FiChevronsDown } from "react-icons/fi";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        

        return (
            <div className={styles.total}>

                <div className={styles.banner}>
                    <h1>Tabelas COVID</h1>
                    <FiChevronsDown/>  
                    <p>Desça para ver</p> 
                </div>    
                <div className={styles.tabelas}>
                    <Governador/>
                    <Efetividade/>    
                    <Acoes/>
                    <Estado/>
                    <Posto/>
                    <Hospital/>
                    <Paciente/>
                    <Comorbidade/>
                    <Sintoma/>
                    <Procedure/>                    
                </div>            

            </div>
        );
    }
}