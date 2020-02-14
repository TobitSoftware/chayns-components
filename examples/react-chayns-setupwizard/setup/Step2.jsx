/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../src/react-chayns-button/component/Button';
import withSetupWizardContext from '../../../src/react-chayns-setupwizard/component/withSetupWizardContext';

class Step2 extends Component {
    constructor(props, context) {
        super(props, context);
        this.next = this.next.bind(this);
    }

    next() {
        const { stepComplete, nextStep } = this.props;
        stepComplete(true);
        nextStep();
    }

    render() {
        const { nextStep } = this.props;
        return (
            <div className="accordion__content">
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore
                    et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                    rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
                <div>
                    <input
                        name="sampleRadio"
                        type="radio"
                        className="radio"
                        id="radio1"
                        onClick={this.next}
                    />
                    <label htmlFor="radio1">Option 1</label>
                </div>
                <div>
                    <input
                        name="sampleRadio"
                        type="radio"
                        className="radio"
                        id="radio2"
                        onClick={this.next}
                    />
                    <label htmlFor="radio2">Option 2</label>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Button onClick={nextStep}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }
}

Step2.propTypes = {
    nextStep: PropTypes.func.isRequired,
    stepComplete: PropTypes.func.isRequired,
};

export default withSetupWizardContext(Step2);
