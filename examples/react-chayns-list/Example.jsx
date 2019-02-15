import React, { Component } from 'react';

import { ContextMenu, List, ListItem } from '../../src/index';
import ExampleContainer from '../ExampleContainer';

export default class ListExample extends Component {
    render() {
        return(
            <ExampleContainer
                headline="List"
                id="react-chayns-list"
            >
                <List>
                    <ListItem
                        title="ListItem"
                        subtitle="Description"
                        notExpandable
                    />
                    <ListItem
                        title="ListItem (clickable)"
                        subtitle="Description"
                        onClick={() => chayns.dialog.alert('"ListItem (clickable)" clicked')}
                        notExpandable
                    />
                    <ListItem
                        title="ListItem (with image, clickable)"
                        subtitle="Description"
                        image="https://chayns.tobit.com/storage/60038-22141/Images/icon-72.png"
                        onClick={() => chayns.dialog.alert('"ListItem (with image, clickable)" clicked')}
                        notExpandable
                    />
                    <ListItem
                        title="ListItem (accordion-style, with image, without indicator)"
                        subtitle="Description"
                        image="https://chayns.tobit.com/storage/59140-09519/Images/icon-72.png"
                        hideIndicator
                    >
                        {'Content'}
                    </ListItem>
                    <ListItem
                        title="ListItem (accordion-style, with image)"
                        subtitle="Description"
                        image="https://chayns.tobit.com/storage/59143-10608/Images/icon-72.png"
                    >
                        {'Content'}
                    </ListItem>
                    <ListItem
                        title="ListItem (accordion-style, with image)"
                        subtitle="Description"
                        image="https://chayns.tobit.com/storage/59141-06162/Images/icon-72.png"
                    >
                        {'Content'}
                    </ListItem>
                    <ListItem
                        title="ListItem (accordion-style, with image, with ContextMenu)"
                        subtitle="Description"
                        image="https://chayns.tobit.com/storage/59143-10991/Images/icon-72.png"
                        right={(
                            <div
                                style={{
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                onClick={e => e.stopPropagation()}
                            >
                                <ContextMenu
                                    items={[{
                                        icon: 'ts-plus',
                                        onClick: () => chayns.dialog.alert('Create'),
                                        text: 'Create'
                                    }, {
                                        icon: 'ts-trash',
                                        onClick: () => chayns.dialog.alert('Delete'),
                                        text: 'Delete'
                                    }]}
                                />
                            </div>
                        )}
                    >
                        {`
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                            labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                            labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
                            et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        `}
                    </ListItem>
                </List>
            </ExampleContainer>
        );
    }
}
