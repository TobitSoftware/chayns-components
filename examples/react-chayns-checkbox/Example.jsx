import React from 'react';

import {Checkbox} from '../../src/react-chayns-checkbox/index';

export default class Example extends React.Component {
    constructor() {
        super();
        this.state = {
            userName: null
        }
    }

    render() {
        return(
            <div>
               <Checkbox
                   label="testlabel"
                   onChange={(value) => { console.log(value)}}
                   toggleButton={true}
                   defaultChecked={false}
               />

                <Checkbox
                    onChange={(value) => { console.log(value)}}
                    staticChecked={true}
                    disabled={true}
                    tooltip="Description for xyz"
                >
                    Enable xyz
                </Checkbox>

                <Checkbox
                    onChange={(value) => { console.log(value)}}
                    defaultChecked={true}
                    dangerouslySetLabel={{__html: '<b>Test</b>'}}
                />
            </div>
        );
    }
}