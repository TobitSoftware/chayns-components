import React, { Component } from 'react';
import { ModeSwitch } from '../../src/index';
import ExampleContainer from '../ExampleContainer';
import Button from '../../src/react-chayns-button/component/Button';
import Mode from '../../src/react-chayns-modeswitch/component/Mode';

import './example.scss';

export default class Example extends Component {
    constructor() {
        super();
        this.state = { mode: null };
    }

    render() {
        const { mode } = this.state;
        return (
            <ExampleContainer headline="ModeSwitch">
                <ModeSwitch
                    modes={[{
                        id: 1,
                        name: 'Administrator',
                        uacIds: [1]
                    }, {
                        id: 2,
                        name: 'Group 56911',
                        uacIds: [56911]
                    }, {
                        id: 3,
                        name: 'Group 56752',
                        uacIds: [56752]
                    }, {
                        id: 4,
                        name: 'Group 56752, 56911',
                        uacIds: [56752, 56911]
                    }, {
                        id: 5,
                        name: 'No uacIds set'
                    }]}
                    save
                    show
                    onChange={(m) => {
                        console.log(m);
                        this.setState({ mode: m });
                    }}
                />
                {
                    mode
                        ? <p>{`Mode: ${mode.id} ${mode.name} UacId: [ ${mode.uacIds && mode.uacIds.map(uacId => `${uacId} `)} ]`}</p>
                        : null
                }
                <Button onClick={() => {
                    console.log(ModeSwitch.getCurrentMode());
                }}
                >

                    console.log(ModeSwitch.getCurrentMode());
                </Button>
                <Mode modes={[1]}>Admin</Mode>
                <Mode className="mode1" modes={[0]}>User</Mode>
                <Mode className="mode2" modes={[5]}>No uacIds set</Mode>
                <Mode modes={[-1]}>Not authorized</Mode>
                <Mode modes={[-1, 0]}>Not authorized or mode 0</Mode>
            </ExampleContainer>
        );
    }
}
