import React, { Component } from 'react';

import { ExpandableList } from '../../src/index';
import ExampleContainer from '../ExampleContainer';
import AbstractExpandableListItem from '../../src/react-chayns-list/component/ExpandableList/AbstractExpandableListItem';
import ExpandableListHeader from '../../src/react-chayns-list/component/ListItem/ExpandableListHeader';

import './index.scss';

export default class Example extends Component {
    render() {
        return(
            <ExampleContainer headline="ExpandableList">
                <ExpandableList>
                    <AbstractExpandableListItem
                        header={<div>Test</div>}
                    >
                        {'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'}
                    </AbstractExpandableListItem>
                    <AbstractExpandableListItem
                        header={<ExpandableList.Context.Consumer>{s => JSON.stringify(s) + s.onOpen}</ExpandableList.Context.Consumer>}
                    >
                        {'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'}
                    </AbstractExpandableListItem>
                </ExpandableList>
                <div className="list-item--expanded">
                    <ExpandableListHeader
                        image="https://chayns.tobit.com/storage/75508-06235/Images/icon-72.png"
                        title="ListItem (als Accordion, mit Bild) sadashd sda dgsagdasgd hgasdjajsdkgajhgd as dgashgdasg jkgdsgadjhsgajhd gdgdjksagdjkagdsa sjkd agjhgk gakdsa"
                        subtitle="Beschreibung"
                    />
                </div>
            </ExampleContainer>
        );
    }
}
