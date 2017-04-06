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
                   checked={false}
               />
            </div>
        );
    }
}