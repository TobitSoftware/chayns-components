/* eslint-disable jsx-a11y/click-events-have-key-events,no-return-assign,react/jsx-one-expression-per-line */
import React, { Component } from 'react';

import Tooltip from '../../src/react-chayns-tooltip/component/Tooltip';
import Button from '../../src/react-chayns-button/component/Button';

export default class TooltipExample extends Component {
    constructor() {
        super();
        this.state = { x: 0, y: 0, position: 0 };
    }

    render() {
        const { x, y, position } = this.state;
        return (
            <div style={{ marginBottom: '500px' }}>
                <div style={{ marginBottom: '20px' }}>
                    Simple&nbsp;
                    <Tooltip
                        bindListeners
                        position={Tooltip.position.BOTTOM_RIGHT}
                        content={{
                            text:
                                'This is a tooltip with a custom width of 150px. Optional, you can add a headline and an image.',
                        }}
                        minWidth={150}
                        maxWidth={150}
                    >
                        <p>Tooltip</p>
                    </Tooltip>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <Tooltip
                        bindListeners
                        position={Tooltip.position.TOP_RIGHT}
                        content={{
                            text:
                                'H5 will be used as headline inside of a tooltip.',
                            headline: 'Headline',
                        }}
                    >
                        <p>Tooltip with headline</p>
                    </Tooltip>
                </div>
                <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                    <Tooltip
                        position={Tooltip.position.BOTTOM_CENTER}
                        content={{
                            text: 'Tooltip that has the arrow in the middle',
                        }}
                        bindListeners
                    >
                        <p>Tooltip (centered)</p>
                    </Tooltip>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ marginBottom: '20px' }}>
                            <Tooltip
                                bindListeners
                                position={Tooltip.position.TOP_LEFT}
                                content={{
                                    text:
                                        'Buttons within tooltips can be used to show more informations.',
                                    buttonText: 'More informations',
                                    buttonOnClick: console.log,
                                }}
                            >
                                <p>Tooltip with button</p>
                            </Tooltip>
                        </div>
                        <div>
                            <Tooltip
                                bindListeners
                                position={Tooltip.position.BOTTOM_LEFT}
                                content={{
                                    text:
                                        'This is a tooltip with an image. The image will be displayed with a maximum height of 100px.',
                                    headline: 'Headline',
                                    imageUrl:
                                        'https://tapp01.tobit.com/content/design/Designguide/chayns_design_guide/chayns_icon.png',
                                }}
                            >
                                <p>Tooltip with headline and image</p>
                            </Tooltip>
                        </div>
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <Tooltip
                        position={position}
                        content={{
                            html: (
                                <div
                                    style={{
                                        height: '224px',
                                        transform:
                                            'rotate(45deg) translate(0, 40%)',
                                    }}
                                >
                                    This is a static Tooltip with custom html
                                    content.
                                </div>
                            ),
                        }}
                        removeIcon
                        ref={(ref) => (this.staticTooltip = ref)}
                    >
                        <p
                            onClick={() => {
                                this.staticTooltip.show();
                            }}
                        >
                            Static Tooltip
                        </p>
                    </Tooltip>
                    <Button
                        onClick={() => {
                            this.setState({ position: (position + 1) % 6 });
                        }}
                    >
                        Change Position
                    </Button>
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
                    ref={(ref) => (this.clickTooltip = ref)}
                />
                <Tooltip
                    bindListeners
                    position={Tooltip.position.BOTTOM_RIGHT}
                    content={{
                        text:
                            'This is a tooltip with a custom width of 150px and a specified parent.',
                    }}
                    minWidth={150}
                    maxWidth={150}
                    parent={document.querySelector(
                        '.cc__list.list--expandable.examples'
                    )}
                    hideOnChildrenLeave
                >
                    <p>Tooltip</p>
                </Tooltip>
            </div>
        );
    }
}
