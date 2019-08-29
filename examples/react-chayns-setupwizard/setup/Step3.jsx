/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../src/react-chayns-button/component/Button';
import Input from '../../../src/react-chayns-input/component/Input';
import withSetupWizardContext from '../../../src/react-chayns-setupwizard/component/withSetupWizardContext';

class Step3 extends Component {
    static propTypes = {
        notComplete: PropTypes.bool.isRequired,
        nextStep: PropTypes.func.isRequired,
        stepComplete: PropTypes.func.isRequired,
        previousStep: PropTypes.func.isRequired,
    };

    constructor(props, context) {
        super(props, context);
        this.inputOnChange = this.inputOnChange.bind(this);
    }

    inputOnChange(value) {
        const { stepComplete } = this.props;
        stepComplete(value !== '');
    }

    render() {
        const { nextStep, notComplete } = this.props;

        return (
            <div className="accordion__content">
                <p>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore
                    et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                    rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
                <Input
                    dynamic
                    placeholder="required input"
                    onChange={this.inputOnChange}
                    style={{ marginBottom: '10px' }}
                    invalid={notComplete}
                />
                <div
                    style={
                        {
                            textAlign: 'center',
                        }
                    }
                >
                    <Button onClick={nextStep}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }
}

export default withSetupWizardContext(Step3);
