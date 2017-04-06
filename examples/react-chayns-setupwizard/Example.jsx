import React from 'react';

import {SetupWizard, SetupItem} from '../../src/react-chayns-setupwizard/index.jsx';
import '../../src/react-chayns-setupwizard/style.scss';

import Step1 from './setup/Step1';
import Step2 from './setup/Step2';
import Step3 from './setup/Step3';

export default class Example extends React.Component {
    constructor(){
        super();
        this.state={
            ready: false
        };
        this.ready = this.ready.bind(this);
    }

    ready(){
        this.setState({
            ready: true
        })
    }

    render(){
        if(!this.state.ready) {
            return (
                <SetupWizard ready={this.ready}>
                    <SetupItem title="First">
                        <Step1/>
                    </SetupItem>
                    <SetupItem title="Second">
                        <Step2/>
                    </SetupItem>
                    <SetupItem title="Third">
                        <Step3/>
                    </SetupItem>
                </SetupWizard>
            )
        }else{
            return(
                <h1>
                   Ready
                </h1>
            )
        }
    }
}