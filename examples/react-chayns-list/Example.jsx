import React, { Component } from 'react';

import { ExpandableList } from '../../src/index';
import ExampleContainer from '../ExampleContainer';
import ExpandableListItem from '../../src/react-chayns-list/component/ExpandableList/ExpandableListItem';

export default class Example extends Component {
    render() {
        return(
            <ExampleContainer headline="ExpandableList">
                <ExpandableList>
                    <ExpandableListItem
                        header={<div>Test</div>}
                    >
                        {'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'}
                    </ExpandableListItem>
                    <ExpandableListItem
                        header={<ExpandableList.Context.Consumer>{s => JSON.stringify(s) + s.onOpen}</ExpandableList.Context.Consumer>}
                    >
                        {'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'}
                    </ExpandableListItem>
                </ExpandableList>
            </ExampleContainer>
        );
    }
}
