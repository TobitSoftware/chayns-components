import React, { Component } from 'react';
import { ModeSwitch } from '../../src/index';
import ExampleContainer from '../ExampleContainer';
import Button from '../../src/react-chayns-button/component/Button';

export default class Example extends Component {
    constructor() {
        super();
        this.state = { mode: null };
    }

    render() {
        const { mode } = this.state;
        return (
            <ExampleContainer headline="ModeSwitch">
                <ModeSwitch onChange={(m) => {
                    console.log(m);
                    this.setState({ mode: m });
                }}
                />
                {mode ? <p>{`Mode: ${mode.id} ${mode.name} UacId: ${mode.uacId}`}</p> : null}
                <Button onClick={() => {
                    console.log(ModeSwitch.getCurrentMode());
                }}
                >
                    console.log(ModeSwitch.getCurrentMode());
                </Button>
            </ExampleContainer>
        );
    }
}
