/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../../../src/react-chayns-button/component/Button';

export default class Step4 extends Component {
    static contextTypes = {
        nextStep: PropTypes.func,
        stepComplete: PropTypes.func,
        resetToStep: PropTypes.func
    };

    constructor(props, context) {
        super(props, context);
        this.next = this.next.bind(this);
        this.reset = this.reset.bind(this);
    }

    next() {
        const { stepComplete, nextStep } = this.context;
        stepComplete(true);
        nextStep();
    }

    reset() {
        const { resetToStep } = this.context;
        resetToStep(0);
    }

    render() {
        return (
            <div className="accordion__content">
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                    labore
                    et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                    rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </p>
                <div
                    style={
                        {
                            textAlign: 'center'
                        }
                    }
                >
                    <Button
                        onClick={this.next}
                        style={{ marginRight: '10px' }}
                    >
                        Finish
                    </Button>
                    <Button
                        onClick={this.reset}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        );
    }
}
