import React from 'react';

import {connectToModeSwitch} from '../../src/react-chayns-modeswitch/index';

@connectToModeSwitch(0)
export default class ExampleDecorator extends React.Component {
    render() {
        return(
            <div>
                Decorators<br />
                {JSON.stringify(this.props.mode)}
            </div>
        );
    }
}