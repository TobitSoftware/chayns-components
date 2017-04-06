import React from 'react';

import {Input} from '../../src/react-chayns-input/index';

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
                <Input
                    placeholder="Looking for 3 lowercase a's"
                    regExp="^a{3}$"
                    onBlur={ (text) => { this.setState({userName: text}, () => { console.log(this.state)}) }}
                    responsive={false}
                    ref={(ref) => {this._node = ref}}
                />
            </div>
        );
    }
}