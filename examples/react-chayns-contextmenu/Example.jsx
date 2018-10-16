import React, { Component } from 'react';
import { faInfoCircle, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { ContextMenu } from '../../src/index';
import ExampleContainer from '../ExampleContainer';
import Button from '../../src/react-chayns-button/component/Button';
import Icon from '../../src/react-chayns-icon/component/Icon';

export default class Example extends Component {
    constructor() {
        super();

        this.state = {
            x: 0,
            y: 0,
            hideContextMenu1: true,
            hideContextMenu2: true,
            position: 0,
        };

        this.setContextMenu1 = this.setContextMenu1.bind(this);
        this.setContextMenu2 = this.setContextMenu2.bind(this);
        this.removeContextMenu = this.removeContextMenu.bind(this);
        this.deleteOnClick = this.deleteOnClick.bind(this);
        this.addOnClick = this.addOnClick.bind(this);
    }

    setContextMenu1(event) {
        this.setState({
            x: event.pageX,
            y: event.pageY,
            hideContextMenu1: false,
        });
    }

    setContextMenu2() {
        this.setState({
            hideContextMenu2: false,
        });
    }

    removeContextMenu() {
        this.setState({
            hideContextMenu1: true,
            hideContextMenu2: true,
        });
    }

    deleteOnClick() {
        console.log('Löschen');
        this.setState({
            hideContextMenu1: true,
            hideContextMenu2: true,
        });
    }

    addOnClick() {
        console.log('Hinzufügen');
        this.setState({
            hideContextMenu1: true,
            hideContextMenu2: true,
        });
    }

    render() {
        const {
            x, y, hideContextMenu1, hideContextMenu2, position
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
                    coordinates={{ x, y }}
                    hide={hideContextMenu1}
                    items={items}
                    onLayerClick={this.removeContextMenu}
                    position={position}
                />
                <Button onClick={() => {
                    this.setState({ position: (position + 1) % 4 });
                }}
                >


                    Position ändern
                </Button>
                <div style={{ margin: '15% 45%' }} onClick={this.setContextMenu1}>
                    <Icon icon={faInfoCircle} style={{ transform: 'scale(5)' }}/>
                </div>

                <div
                    style={{
                        margin: '50px',
                        width: '30px',
                        height: '30px',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        lineHeight: '30px'
                    }}
                    className="chayns__background-color--white-3"
                >
                    <ContextMenu
                        hide={hideContextMenu2}
                        items={items}
                        onLayerClick={this.removeContextMenu}
                        position={position}
                        onChildrenClick={this.setContextMenu2}
                    >
                        <Icon icon="ts-ellipsis_v" style={{ transform: 'scale(2)' }}/>
                    </ContextMenu>
                </div>
            </ExampleContainer>
        );
    }
}
