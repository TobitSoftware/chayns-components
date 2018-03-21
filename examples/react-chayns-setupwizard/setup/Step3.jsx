/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

export default class Step3 extends React.Component {
    static contextTypes = {
        nextStep: PropTypes.func,
        stepComplete: PropTypes.func,
        previousStep: PropTypes.func
    };

    constructor(props, context) {
        super(props, context);
        this.inputOnKeyUp = this.inputOnKeyUp.bind(this);
    }

    inputOnKeyUp(response) {
        const { stepComplete } = this.context;
        stepComplete(response.target.value !== '');
    }

    render() {
        const { nextStep } = this.context;
        return (
            <div className="accordion__content">
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore
                    et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                    rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
                <div className="input-group">
                    <input
                        className="input"
                        type="text"
                        id="requiredInput"
                        required
                        style={{ marginBottom: '10px' }}
                        onKeyUp={this.inputOnKeyUp}
                    />
                        <label>Input</label>
                </div>
                <div
                    style={
                        {
                            textAlign: 'center'
                        }
                    }
                >
                    <div
                        className="button"
                        onClick={nextStep}
                    >
                        Next
                    </div>
                </div>
            </div>
        );
    }
}
