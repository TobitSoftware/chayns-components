import React from 'react';

import {Checkbox} from '../src/index';

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
               />
            </div>
        );
    }
}