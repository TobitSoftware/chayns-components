/* eslint-disable react/jsx-one-expression-per-line,jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';

import { faCoffee } from '@fortawesome/free-solid-svg-icons/faCoffee';
import { ContextMenu } from '../../src/index';
import Button from '../../src/react-chayns-button/component/Button';
import Accordion from '../../src/react-chayns-accordion/component/Accordion';

export default class ContextMenuExample extends Component {
    constructor() {
        super();

        this.state = {
            x: 0,
            y: 0,
            position: 0,
        };

        this.buttonClick = this.buttonClick.bind(this);
    }

    buttonClick() {
        const { position } = this.state;
        this.setState({ position: position + 1 });
    }

    render() {
        const {
            x, y, position
        } = this.state;

        const items = [
            {
                className: null,
                onClick: console.log,
                text: 'Coffee',
                icon: faCoffee,
            },
            {
                className: null,
                onClick: console.log,
                text: 'Tobit',
                icon: 'ts-tobit',
            }
        ];

        return (
            <div>
                <Button onClick={this.buttonClick}>
                    Position ändern
                </Button>
                <Accordion
                    head="Accordion mit ContextMenu"
                    right={<ContextMenu items={items} position={position % 4}/>}
                >
                    TEST
                </Accordion>
                <div
                    style={{ height: '100px', width: '100%', margin: '20px 0' }}
                    onClick={(e) => {
                        this.setState({ x: e.clientX, y: e.clientY });
                        this.clickContextMenu.show();
                    }}
                    id="clickZone"
                    className="chayns__background-color--white-4"
                />
                <ContextMenu
                    items={items}
                    coordinates={{ x, y }}
                    ref={ref => this.clickContextMenu = ref}
                    onLayerClick={(e) => {
                        console.log(e);
                        if (e.srcElement.id !== 'clickZone') this.clickContextMenu.hide();
                    }}
                />
            </div>
        );
    }
}
