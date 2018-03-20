import React from 'react';

import ExampleContainer from '../ExampleContainer';

import { SetupWizard, SetupWizardItem } from '../../src/index';
import '../../src/react-chayns-setupwizard/index.scss';
import './style.scss';

import Step1 from './setup/Step1';
import Step2 from './setup/Step2';
import Step3 from './setup/Step3';
import Step4 from './setup/Step4';

export default class Example extends React.Component {
    constructor() {
        super();
        this.state = {
            ready: false
        };
        this.ready = this.ready.bind(this);
        this.notComplete = this.notComplete.bind(this);
    }

    ready() {
        this.setState({
            ready: true
        });
    }

    notComplete() {
        document.querySelector('#requiredInput').classList.remove('wrong');
        setTimeout(() => {
            document.querySelector('#requiredInput').classList.add('wrong');
        }, 10);
    }

    render() {
        if (!this.state.ready) {
            return (
                <ExampleContainer headline="SetupWizard">
                    <SetupWizard
                        ready={this.ready}
                        notComplete={this.notComplete}
                        // contentStyle={{ fontWeight: 'bold' }}
                        style={{backgroundColor: 'lightgray', padding: '10px'}}
                        title="Wizard"
                        description={'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut\n' +
                        '                    labore\n' +
                        '                    et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea\n' +
                        '                    rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'}
                    >
                        <SetupWizardItem title="Intro">
                            <Step1/>
                        </SetupWizardItem>
                        <SetupWizardItem title="Input optional">
                            <Step2/>
                        </SetupWizardItem>
                        <SetupWizardItem title="Input required" required>
                            <Step3/>
                        </SetupWizardItem>
                        <SetupWizardItem title="Finish">
                            <Step4/>
                        </SetupWizardItem>
                    </SetupWizard>
                </ExampleContainer>
            );
        }

        return (
            <h1>
                Ready
            </h1>
        );
    }
}
