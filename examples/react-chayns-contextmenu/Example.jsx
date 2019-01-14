/* eslint-disable react/jsx-one-expression-per-line,jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { faInfoCircle, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { ContextMenu } from '../../src/index';
import ExampleContainer from '../ExampleContainer';
import Button from '../../src/react-chayns-button/component/Button';
import Icon from '../../src/react-chayns-icon/component/Icon';
import Accordion from '../../src/react-chayns-accordion/component/Accordion';

export default class Example extends Component {
    constructor() {
        super();

        this.state = {
            x: 0,
            y: 0,
            hideContextMenu: true,
            position: 0,
        };

        this.setContextMenu = this.setContextMenu.bind(this);
        this.removeContextMenu = this.removeContextMenu.bind(this);
        this.deleteOnClick = this.deleteOnClick.bind(this);
        this.addOnClick = this.addOnClick.bind(this);
        this.buttonClick = this.buttonClick.bind(this);
    }

    setContextMenu(event) {
        this.setState({
            x: event.pageX,
            y: event.pageY,
            hideContextMenu: false,
        });
    }

    removeContextMenu() {
        this.setState({
            hideContextMenu: true,
        });
    }

    deleteOnClick() {
        console.log('Löschen');
        this.setState({
            hideContextMenu: true
        });
    }

    addOnClick() {
        console.log('Hinzufügen');
        this.setState({
            hideContextMenu: true
        });
    }

    buttonClick() {
        const { position } = this.state;
        this.setState({ position: position + 1 });
    }

    render() {
        const {
            x, y, hideContextMenu, position
        } = this.state;

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
            <ExampleContainer headline="ContextMenu">
                <ContextMenu
                    coordinates={{
                        x,
                        y
                    }}
                    hide={hideContextMenu}
                    items={items}
                    onLayerClick={this.removeContextMenu}
                    position={position % 4}
                />
                <Button onClick={this.buttonClick}>
                    Position ändern
                </Button>
                <div style={{ margin: '15% 45%' }} onClick={this.setContextMenu}>
                    <Icon icon={faInfoCircle} style={{ transform: 'scale(5)' }}/>
                </div>
                <ContextMenu items={items} position={position % 4}/>
                <Accordion head="Accordion mit ContextMenu"
                           right={<ContextMenu items={items} position={position % 4}/>}>TEST</Accordion>
            </ExampleContainer>
        );
    }
}
