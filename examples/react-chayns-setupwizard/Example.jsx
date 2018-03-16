import React from 'react';

import ExampleContainer from '../ExampleContainer';

import { SetupWizard, SetupWizardItem } from '../../src/index';
import '../../src/react-chayns-setupwizard/index.scss';

import Step1 from './setup/Step1';
import Step2 from './setup/Step2';
import Step3 from './setup/Step3';

export default class Example extends React.Component {
    constructor() {
        super();

        this.state = {
            ready: false
        };

        this.ready = this.ready.bind(this);
    }

    ready() {
        this.setState({
            ready: true
        });
    }

    render() {
        if(!this.state.ready) {
            return (
                <ExampleContainer headline="SetupWizard">
                    <SetupWizard
                        ready={this.ready}
                        contentStyle={{ minHeight: '150px' }}
                        style={{ backgroundColor: 'lightgray' }}
                    >
                        <SetupWizardItem title="First">
                            <Step1/>
                        </SetupWizardItem>
                        <SetupWizardItem title="Second">
                            <Step2/>
                        </SetupWizardItem>
                        <SetupWizardItem title="Third">
                            <Step3/>
                        </SetupWizardItem>
                    </SetupWizard>
                </ExampleContainer>
            );
        }

        return(
            <ExampleContainer headline="SetupWizard">
                <h2>
                   Ready
                </h2>
            </ExampleContainer>
        );
    }
}
