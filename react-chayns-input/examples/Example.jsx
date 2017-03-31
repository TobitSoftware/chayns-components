import React from 'react';

import {Input} from '../src/index';

export default class Example extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <Input
                    placeholder="Looking for 3 lowercase a's"
                    regExp="^a{3}$"
                    onChange={ (text) => { console.log(text); }}
                    responsive={false}
                />
            </div>
        );
    }
}