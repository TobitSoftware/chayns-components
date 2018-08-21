import React, { Component } from 'react';

import { connectToModeSwitch } from '../../src/index';

@connectToModeSwitch(0)
export default class ExampleDecorator extends Component {
    render() {
        return(
            <div>
                Decorators<br />
                {JSON.stringify(this.props.mode)}
            </div>
        );
    }
}