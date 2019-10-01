/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../src/react-chayns-button/component/Button';
import withSetupWizardContext from '../../../src/react-chayns-setupwizard/component/withSetupWizardContext';

class Step1 extends Component {
    static propTypes = {
        nextStep: PropTypes.func.isRequired,
        stepComplete: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
    }

    next = () => {
        const { stepComplete, nextStep } = this.props;
        stepComplete(true);
        nextStep();
    };

    render() {
        return (
            <div className="accordion__content">
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore
                    et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                    rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
                <div style={{ textAlign: 'center' }}>
                    <Button onClick={this.next}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }
}

export default withSetupWizardContext(Step1);
