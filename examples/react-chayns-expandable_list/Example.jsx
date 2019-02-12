import React, { Component } from 'react';

import { ExpandableList } from '../../src/index';
import ExampleContainer from '../ExampleContainer';
import ExpandableListItem from '../../src/react-chayns-expandable_list/component/ExpandableListItem';

export default class Example extends Component {
    render() {
        return(
            <ExampleContainer headline="ExpandableList">
                <ExpandableList>
                    <ExpandableListItem/>
                    <ExpandableListItem/>
                </ExpandableList>
            </ExampleContainer>
        );
    }
}
