/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';

import { faPlus, faRocket, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Accordion } from '../../src/index';
import ExampleContainer from '../ExampleContainer';
import Button from '../../src/react-chayns-button/component/Button';
import Input from '../../src/react-chayns-input/component/Input';
import Icon from '../../src/react-chayns-icon/component/Icon';
import ContextMenu from '../../src/react-chayns-contextmenu/component/ContextMenu';

export default class Example extends Component {
    render() {
        const items = [
            {
                className: null,
                onClick: this.addOnClick,
                text: 'Hinzufügen',
                icon: faPlus,
            },
            {
                className: null,
                onClick: this.deleteOnClick,
                text: 'Löschen',
                icon: faTrash,
            }
        ];

        return (
            <ExampleContainer headline="Accordion">
                <Accordion
                    head="Accordion with nice search"
                    onSearch={console.log}
                    searchPlaceholder="Search"
                    badge={12}
                    dataGroup="chayns"
                >
                    <div className="accordion__content">
                        Hello World
                    </div>
                </Accordion>
                <Accordion
                    head="Accordion with animated search input, nice dots and a very long title"
                    onSearch={console.log}
                    searchPlaceholder="Search"
                    dataGroup="chayns"
                    right={(
                        <ContextMenu
                            items={items}
                            position={1}
                        >
                            <Icon className="accordion--no-trigger" icon="ts-ellipsis_v"/>
                        </ContextMenu>
                    )}
                >
                    <div className="accordion__content">
                        Hello World
                    </div>
                </Accordion>
                <Accordion head="Test" badge="2" defaultOpened>
                    <Accordion
                        head={(
                            <span style={{ color: '#FF0000' }}>
                                Test
                            </span>
                        )}
                        isWrapped
                        open
                    >
                        <div className="accordion__content">
                            Hello World 1
                        </div>
                    </Accordion>
                    <Accordion
                        head={{
                            open: <Input placeholder="Accordion title input" className="accordion--no-trigger" style={{ width: '100%' }}/>,
                            close: 'Accordion Title Input'
                        }}
                        isWrapped
                        icon={faRocket}
                        dataGroup="abc"
                        noTitleTrigger
                    >
                        <div className="accordion__content">
                            Hello World 2
                        </div>
                    </Accordion>
                    <Accordion
                        dataGroup="abc"
                        icon="ts-tobit"
                        noRotate
                        head="noRotate"
                        badge={1}
                        badgeStyle={{ fontWeight: 'bold' }}
                        isWrapped
                    >
                        <div className="accordion__content">
                            Hello World 2
                        </div>
                    </Accordion>
                </Accordion>
                <Accordion head="Autogrow" autogrow>
                    <div style={{ height: '20000px', background: 'linear-gradient(0deg, red, yellow)' }}/>
                </Accordion>
                <Accordion head="Accordion with Button" right={<Button className="accordion--no-trigger">Test</Button>}>
                    <div style={{ height: '200px', background: 'linear-gradient(0deg, purple, orange)' }}/>
                </Accordion>
                <Accordion head="Fixed Accordion without icon" fixed defaultOpened noIcon>
                    <div style={{ height: '200px', background: 'linear-gradient(0deg, blue, green)' }}/>
                </Accordion>
            </ExampleContainer>
        );
    }
}
