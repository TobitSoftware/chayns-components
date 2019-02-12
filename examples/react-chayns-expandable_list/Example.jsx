import React, { Component } from 'react';

import { ExpandableList } from '../../src/index';
import ExampleContainer from '../ExampleContainer';

export default class Example extends Component {
    render() {
        return(
            <ExampleContainer headline="ExpandableList">
                <ExpandableList />
            </ExampleContainer>
        );
    }
}
