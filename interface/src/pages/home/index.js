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

import styles from './styles.module.css';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        

        return (
            <div className={styles.total}>
                
                <Governador/>
                <Efetividade/>    
                <Acoes/>
                <Estado/>
                <Posto/>
                <Hospital/>
                <Paciente/>
                <Comorbidade/>
                <Sintoma/>

            </div>
        );
    }
}