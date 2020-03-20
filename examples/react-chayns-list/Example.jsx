import React, { Component } from 'react';

import { ContextMenu, List, ListItem } from '../../src/index';
import Button from '../../src/react-chayns-button/component/Button';
import Tooltip from '../../src/react-chayns-tooltip/component/Tooltip';

export default class ListExample extends Component {
    constructor(props) {
        super(props);
        this.state = { open1: false, open2: false };
        this.tooltipRef = React.createRef();
    }

    render() {
        const { open1, open2 } = this.state;
        return (
            <div>
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
                        title={<b>bold title</b>}
                        subtitle={<i>italic subtitle</i>}
                        notExpandable
                    />
                    <Tooltip content={{ text: 'Tooltip' }} position={Tooltip.position.TOP_CENTER} ref={this.tooltipRef}>
                        <ListItem
                            title="ListItem (accordion-style, with image, without indicator)"
                            subtitle="Description"
                            image="https://chayns.tobit.com/storage/59140-09519/Images/icon-72.png"
                            hideIndicator
                            noContentClass
                            onOpen={(...e) => { console.log('onOpen', ...e); }}
                            onClose={(...e) => { console.log('onClose', ...e); }}
                            headerProps={{
                                onMouseEnter: () => {
                                    this.tooltipRef.current.show();
                                },
                                onMouseLeave: () => {
                                    this.tooltipRef.current.hide();
                                },
                            }}
                        >
                            Content
                        </ListItem>
                    </Tooltip>
                    <ListItem
                        title="ListItem (accordion-style, with image)"
                        subtitle="Description"
                        image="https://chayns.tobit.com/storage/59143-10608/Images/icon-72.png"
                        onOpen={(...e) => { console.log('onOpen', ...e); }}
                        onClose={(...e) => { console.log('onClose', ...e); }}
                    >
                        Content
                    </ListItem>
                    <ListItem
                        title="ListItem (accordion-style, with Icon)"
                        subtitle="Description"
                        // image="https://chayns.tobit.com/storage/59141-06162/Images/icon-72.png"
                        icon="ts-tobit"
                    >
                        Content
                    </ListItem>
                    <ListItem
                        title="ListItem (accordion-style, without image or Icon)"
                        subtitle="Description"
                        style={{
                            head: {
                                backgroundColor: chayns.utils.colors.get(100, '#49516a'),
                            },
                            body: {
                                backgroundColor: chayns.utils.colors.get(70, '#5b6c7f'),
                            },
                        }}
                    >
                        Content
                    </ListItem>
                    <ListItem
                        title="ListItem (accordion-style, with Icon)"
                        subtitle="Description"
                        // image="https://chayns.tobit.com/storage/59141-06162/Images/icon-72.png"
                        icon="ts-tobit"
                        style={{
                            backgroundColor: chayns.env.site.color,
                        }}
                    >
                        Content
                    </ListItem>
                    <ListItem
                        title={<b>bold title</b>}
                        subtitle={<i>italic subtitle</i>}
                    >
                        Content
                    </ListItem>
                    <ListItem
                        title="ListItem (accordion-style, with image, with ContextMenu)"
                        subtitle="Description"
                        open={open1}
                        onOpen={() => { this.setState({ open1: true }); }}
                        onClose={() => { this.setState({ open1: false }); }}
                        // image="https://chayns.tobit.com/storage/59143-10991/Images/icon-72.png"
                        icon="fa fa-rocket"
                        right={(
                            <div
                                style={{
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ContextMenu
                                    items={[{
                                        icon: 'ts-plus',
                                        onClick: () => chayns.dialog.alert('Create'),
                                        text: 'Create',
                                    }, {
                                        icon: 'ts-trash',
                                        onClick: () => chayns.dialog.alert('Delete'),
                                        text: 'Delete',
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
                    <ListItem
                        onClick={() => { this.setState({ open2: !open2 }); }}
                        open={open2}
                        title="ListItem (button controlled)"
                        subtitle="Description"
                        image="https://chayns.tobit.com/storage/70231-10288/Images/icon-72.png"
                        right={(
                            <div
                                style={{
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ContextMenu
                                    items={[{
                                        icon: 'ts-plus',
                                        onClick: () => chayns.dialog.alert('Create'),
                                        text: 'Create',
                                    }, {
                                        icon: 'ts-trash',
                                        onClick: () => chayns.dialog.alert('Delete'),
                                        text: 'Delete',
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
                <Button
                    onClick={() => {
                        this.setState({ open2: !open2 });
                    }}
                >
                    Open/Close
                </Button>
            </div>
        );
    }
}
