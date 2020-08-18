import React, { Component } from 'react';

import { SetupWizard, SetupWizardItem } from '../../src/index';

import Step1 from './setup/Step1';
import Step2 from './setup/Step2';
import Step3 from './setup/Step3';
import Step4 from './setup/Step4';
import Button from '../../src/react-chayns-button/component/Button';
import Badge from '../../src/react-chayns-badge/component/Badge';

export default class SetupWizardExample extends Component {
    constructor(props) {
        super(props);
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
                <div>
                    <SetupWizard
                        ready={this.ready}
                        allRequiredStepsCompleted={() => {
                            console.log('All required steps are completed!');
                        }}
                        notComplete={this.notComplete}
                        title="Wizard"
                        description={'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut\n'
                        + 'labore\n'
                        + 'et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea\n'
                        + 'rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'}
                    >
                        <SetupWizardItem title="Intro" required>
                            <Step1/>
                        </SetupWizardItem>
                        {chayns.env.user.isAuthenticated && (
                            <SetupWizardItem
                                title="Input optional"
                                right={{
                                    complete: <Badge>Done!</Badge>,
                                    notComplete: <Badge>Not done</Badge>,
                                }}
                            >
                                <Step2/>
                            </SetupWizardItem>
                        )}
                        <SetupWizardItem title="Input required" required>
                            <Step3 notComplete={notComplete}/>
                        </SetupWizardItem>
                        <SetupWizardItem title="Finish">
                            <Step4/>
                        </SetupWizardItem>
                    </SetupWizard>
                </div>
            );
        }

        return (
            <React.Fragment>
                <h1> Ready </h1>
                <Button onClick={() => {
                    this.setState({ ready: false });
                }}
                >
                    Reload
                </Button>
            </React.Fragment>
        );
    }
}
