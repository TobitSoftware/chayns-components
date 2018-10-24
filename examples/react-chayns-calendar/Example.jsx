import React, { PureComponent } from 'react';

import { Calendar } from '../../src/index';
import ExampleContainer from '../ExampleContainer';

export default class Example extends PureComponent {
    render() {
        return (
            <ExampleContainer headline="Calendar">
                <Calendar style={{ margin: '20px 0' }} onDateSelect={console.log} endDate={new Date()} selected={new Date()}/>
            </ExampleContainer>
        );
    }
}
