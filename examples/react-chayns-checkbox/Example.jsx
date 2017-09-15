import React from 'react';

import { Checkbox } from '../../src/index';
import ExampleContainer from '../ExampleContainer';

export default class Example extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: null
        };
    }

    render() {
        return(
            <ExampleContainer headline="Checkbox">
               <Checkbox
                   label="testlabel"
                   onChange={(value) => { console.log(value); }}
                   toggleButton
                   defaultChecked={false}
               />

                <Checkbox
                    onChange={(value) => { console.log(value); }}
                    checked
                    disabled
                    tooltip="Description for xyz"
                >
                    Enable xyz
                </Checkbox>

                <Checkbox
                    onChange={(value) => { console.log(value); }}
                    defaultChecked
                    dangerouslySetLabel={{ __html: '<b>Test</b>' }}
                />
            </ExampleContainer>
        );
    }
}
