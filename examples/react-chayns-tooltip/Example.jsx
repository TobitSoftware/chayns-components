/* eslint-disable jsx-a11y/click-events-have-key-events,no-return-assign,react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import ExampleContainer from '../utils/components/ExampleContainer';

import Tooltip from '../../src/react-chayns-tooltip/component/Tooltip';

export default class TooltipExample extends Component {
    constructor() {
        super();
        this.state = { x: 0, y: 0 };
    }

    render() {
        const { x, y } = this.state;
        return (
            <ExampleContainer
                headline="Tooltip"
                id="react-chayns-tooltip"
            >
                <div style={{ marginBottom: '20px' }}>
                    Simple&nbsp;
                    <Tooltip
                        bindListeners
                        position={3}
                        content={{ text: 'This is a tooltip with a custom width of 150px. Optional, you can add a headline and an image.' }}
                        minWidth={150}
                        maxWidth={150}
                    >
                        <p>Tooltip</p>
                    </Tooltip>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <Tooltip
                        bindListeners
                        position={3}
                        content={{
                            text: 'H5 will be used as headline inside of a tooltip.',
                            headline: 'Headline',
                        }}
                    >
                        <p>Tooltip with headline</p>
                    </Tooltip>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div>
                            <Tooltip
                                bindListeners
                                position={0}
                                content={{
                                    text: 'This is a tooltip with an image. The image will be displayed with a maximum height of 100px.',
                                    headline: 'Headline',
                                    imageUrl: 'https://tapp01.tobit.com/content/design/Designguide/chayns_design_guide/chayns_icon.png',
                                }}
                            >
                                <p>Tooltip with headline and image</p>
                            </Tooltip>
                        </div>
                        <div style={{ marginBottom: '20px' }}>
                            <Tooltip
                                bindListeners
                                position={1}
                                content={{
                                    text: 'Buttons within tooltips can be used to show more informations.',
                                    buttonText: 'More informations',
                                    buttonOnClick: console.log,
                                }}
                            >
                                <p>Tooltip with button</p>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <Tooltip
                        position={2}
                        content={{
                            html: <div style={{ height: '224px', transform: 'rotate(45deg) translate(0, 40%)' }}>
                                This is a static Tooltip with custom html content.
                                  </div>
                        }}
                        removeIcon
                        ref={ref => this.staticTooltip = ref}
                    >
                        <p
                            onClick={() => {
                                this.staticTooltip.show();
                            }}
                        >
                            Static Tooltip
                        </p>
                    </Tooltip>
                </div>
                <div
                    style={{ height: '100px', width: '100%' }}
                    onClick={(e) => {
                        this.clickTooltip.show();
                        this.setState({ x: e.clientX, y: e.clientY });
                    }}
                    className="chayns__background-color--white-4"
                />
                <Tooltip
                    minWidth={100}
                    maxWidth={200}
                    removeIcon
                    content={{ text: 'Test' }}
                    coordinates={{ x, y }}
                    ref={ref => this.clickTooltip = ref}
                />

            </ExampleContainer>
        );
    }
}
