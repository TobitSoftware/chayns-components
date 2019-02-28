/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';

import { faPlus, faRocket, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Accordion } from '../../src/index';
import Input from '../../src/react-chayns-input/component/Input';
import ContextMenu from '../../src/react-chayns-contextmenu/component/ContextMenu';
import Badge from '../../src/react-chayns-badge/component/Badge';
import Checkbox from '../../src/react-chayns-checkbox/component/Checkbox';

export default class AccordionExample extends Component {
    constructor(props) {
        super(props);
        this.state = { show: true };
    }

    render() {
        const items = [
            {
                className: null,
                onClick: () => {
                    this.setState({ show: true });
                },
                text: 'Hinzufügen',
                icon: faPlus,
            },
            {
                className: null,
                onClick: () => {
                    this.setState({ show: false });
                },
                text: 'Löschen',
                icon: faTrash,
            }
        ];

        const { show } = this.state;

        return (
            <div>
                {
                    show
                        ? (
                            <Accordion
                                head="Accordion with nice search"
                                onSearch={console.log}
                                searchPlaceholder="Search"
                                right={<Badge>12</Badge>}
                                dataGroup="chayns"
                            >
                                <div className="accordion__item">
                                    Hello World
                                </div>
                                <div className="accordion__item">
                                    Hello World<br/>blabla
                                </div>
                                <div className="accordion__item">
                                    Hello World
                                </div>
                            </Accordion>
                        )
                        : null
                }
                <Accordion
                    head="Accordion with animated search input, nice dots and a very long title"
                    onSearch={console.log}
                    searchPlaceholder="Search"
                    dataGroup="chayns"
                    right={(
                        <ContextMenu
                            items={items}
                            position={1}
                        />
                    )}
                >
                    <div className="accordion__content">
                        Hello World
                    </div>
                </Accordion>
                <Accordion head="Test" right={<Badge>2</Badge>} defaultOpened>
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
                            open: (
                                <Input
                                    placeholder="Accordion title input"
                                    className="accordion--no-trigger"
                                    style={{ width: '100%' }}
                                />
                            ),
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
                    <div className="accordion__item">
                        Hello World
                    </div>
                    <div className="accordion__item">
                        Hello World<br/>blabla
                    </div>
                    <div className="accordion__item">
                        Hello World
                    </div>
                    <Accordion
                        dataGroup="abc"
                        icon="ts-tobit"
                        noRotate
                        head="noRotate"
                        right={<Badge>1</Badge>}
                        isWrapped
                    >
                        <div className="accordion__content">
                            Hello World 2
                        </div>
                    </Accordion>
                </Accordion>
                <Accordion head="Autogrow" autogrow>
                    <div className="accordion__content">
                        <div style={{
                            height: '20000px',
                            background: 'linear-gradient(0deg, red, yellow)'
                        }}
                        />
                    </div>
                </Accordion>
                <Accordion
                    head="Accordion with Button"
                    right={(
                        <Checkbox
                            toggleButton
                            className="accordion--no-trigger"
                            labelClassName="accordion--no-trigger"
                        />
                    )}
                >
                    <div className="accordion__content">
                        <div style={{
                            height: '200px',
                            background: 'linear-gradient(0deg, purple, orange)'
                        }}
                        />
                    </div>
                </Accordion>
                <Accordion head="Fixed Accordion without icon" fixed defaultOpened noIcon>
                    <div className="accordion__content">
                        <div style={{
                            height: '200px',
                            background: 'linear-gradient(0deg, blue, green)'
                        }}
                        />
                    </div>
                </Accordion>
                <Accordion
                    head="Accordion (disabled)"
                    onClick={() => console.log('Disabled accordion clicked.')}
                    disabled
                >
                    Content
                </Accordion>
                <Accordion
                    head="Accordion (animated badge)"
                    right={{
                        close: <Badge>15</Badge>,
                    }}
                >
                    Content
                </Accordion>
            </div>
        );
    }
}
