import React, { Component } from 'react';

import { Checkbox } from '../../src/index';
import ExampleContainer from '../ExampleContainer';
import Tooltip from '../../src/react-chayns-tooltip/component/Tooltip';

export default class Example extends Component {
    constructor() {
        super();
        this.state = {
            userName: null
        };
    }

    render() {
        return (
            <ExampleContainer headline="Checkbox">
                <div>
                    <Checkbox
                        label="testlabel"
                        onChange={(value) => {
                            console.log(value);
                        }}
                        toggleButton
                        defaultChecked={false}
                        stopPropagation
                    />
                </div>

                <Checkbox
                    onChange={(value) => {
                        console.log(value);
                    }}
                    checked
                    disabled
                    tooltip="Description for xyz"
                    labelStyle={{ marginRight: '10px' }}
                >
                    Enable xyz
                </Checkbox>

                <Tooltip content={{ text: 'Description' }} bindListeners position={3} minWidth={100}>
                    <Checkbox
                        onChange={(value) => {
                            console.log(value);
                        }}
                        defaultChecked
                        dangerouslySetLabel={{ __html: '<b>Test</b>' }}
                    />
                </Tooltip>
            </ExampleContainer>
        );
    }
}
