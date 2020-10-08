/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../src/react-chayns-button/component/Button';
import withSetupWizardContext from '../../../src/react-chayns-setupwizard/component/withSetupWizardContext';

// eslint-disable-next-line react/prefer-stateless-function
class Step2 extends Component {
    render() {
        const { nextStep, stepComplete, stepEnabled } = this.props;
        return (
            <div className="accordion__content">
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et
                    justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
                <div>
                    <input
                        name="sampleRadio"
                        type="radio"
                        className="radio"
                        id="radio1"
                        onClick={() => {
                            stepComplete(false);
                            stepEnabled(false, 2);
                        }}
                    />
                    <label htmlFor="radio1">
                        Option 1 - will uncomplete the step
                    </label>
                </div>
                <div>
                    <input
                        name="sampleRadio"
                        type="radio"
                        className="radio"
                        id="radio2"
                        onClick={() => {
                            stepComplete(true);
                            stepEnabled(true, 2);
                            nextStep();
                        }}
                    />
                    <label htmlFor="radio2">
                        Option 2 - will complete the step
                    </label>
                </div>
                <div style={{ textAlign: 'center' }}>
                    <Button onClick={nextStep}>Next</Button>
                </div>
            </div>
        );
    }
}

Step2.propTypes = {
    nextStep: PropTypes.func.isRequired,
    stepComplete: PropTypes.func.isRequired,
    stepEnabled: PropTypes.func.isRequired,
};

export default withSetupWizardContext(Step2);
