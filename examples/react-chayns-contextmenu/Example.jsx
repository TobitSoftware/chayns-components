/* eslint-disable react/jsx-one-expression-per-line,jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';

import { faCoffee } from '@fortawesome/free-solid-svg-icons/faCoffee';
import { ContextMenu } from '../../src/index';
import Button from '../../src/react-chayns-button/component/Button';
import Accordion from '../../src/react-chayns-accordion/component/Accordion';
import Gallery from '../../src/react-chayns-gallery/component/Gallery';

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
                    <div className="accordion__content">
                        Hello World
                    </div>
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
                <div style={{ position: 'relative' }}>
                    <Gallery
                        height={300}
                        images={[{
                            url: 'https://tsimg.cloud/127-89061/9d6979d3ac95a053c532f86af9acfb5af9262020.jpg',
                            preview: '/9j/2wBDAFA3PEY8MlBGQUZaVVBfeMiCeG5uePWvuZHI////////////////////////////////////////////////////2wBDAVVaWnhpeOuCguv/////////////////////////////////////////////////////////////////////////wAARCAAoADwDASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAAAgABAwT/xAAjEAEAAwABBQABBQAAAAAAAAABAAIRIQMSMUFRgSJCYWKx/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAGBEBAQEBAQAAAAAAAAAAAAAAABEBMVH/2gAMAwEAAhEDEQA/APN2JVc4mViOo9oewyb0qi8+DlgOleQzl+zerRDN9h4iAd4y3khFbnd6fEjXAek+mFMvzPStV7ahv+Tj1acNh3PMUnira1Hh5Zyva1rKvMlcyGVlpOlDZzBDfUdHIM674mBZ5++oba2NR/tFU7jfnr7Le67hmASNIUM7T8MzqNu12mGRGVWr5/awdS36f5eJBxSGJMhmmSrxXfktV3dlKTDXSt3znP2bXqZZsvuUpYUep1C3g/MDbXXllKIWsXXmGUoH/9k=',
                            width: 640,
                            height: 426,
                        }]}
                    />
                    <ContextMenu
                        items={items}
                        position={position % 4}
                        showTriggerBackground
                        childrenStyle={{ position: 'absolute', top: '1px', right: '1px' }}
                    />
                </div>
            </div>
        );
    }
}
