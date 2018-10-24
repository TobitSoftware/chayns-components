import React, { Component } from 'react';

import ExampleContainer from '../ExampleContainer';

import { SetupWizard, SetupWizardItem } from '../../src/index';

import Step1 from './setup/Step1';
import Step2 from './setup/Step2';
import Step3 from './setup/Step3';
import Step4 from './setup/Step4';

export default class Example extends Component {
    constructor() {
        super();
        this.state = {
            ready: false,
            notComplete: false,
        };
        this.ready = this.ready.bind(this);
        this.notComplete = this.notComplete.bind(this);
    }

    ready() {
        this.setState({
            ready: true,
        });
    }

    notComplete() {
        this.setState({ notComplete: true });
        setTimeout(() => {
            this.setState({ notComplete: false });
        }, 500);
    }

    render() {
        const { ready, notComplete } = this.state;
        if (!ready) {
            return (
                <ExampleContainer headline="SetupWizard">
                    <SetupWizard
                        ready={this.ready}
                        notComplete={this.notComplete}
                        // contentStyle={{ fontWeight: 'bold' }}
                        style={{ border: '1px solid gray', padding: '10px' }}
                        title="Wizard"
                        description={'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut\n'
                        + 'labore\n'
                        + 'et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea\n'
                        + 'rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'}
                    >
                        <SetupWizardItem title="Intro">
                            <Step1/>
                        </SetupWizardItem>
                        <SetupWizardItem title="Input optional">
                            <Step2/>
                        </SetupWizardItem>
                        <SetupWizardItem title="Input required" required>
                            <Step3 notComplete={notComplete}/>
                        </SetupWizardItem>
                        <SetupWizardItem title="Finish">
                            <Step4/>
                        </SetupWizardItem>
                    </SetupWizard>
                </ExampleContainer>
            );
        }

        return (
            <ExampleContainer headline="SetupWizard">
                <h1>


                    Ready
                </h1>
            </ExampleContainer>
        );
    }
}
