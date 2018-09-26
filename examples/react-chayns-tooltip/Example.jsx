import React, { Component } from 'react';
import ExampleContainer from '../ExampleContainer';

import Tooltip from '../../src/react-chayns-tooltip/component/Tooltip';

import '../../src/react-chayns-tooltip/index.scss';

export default class Example extends Component {
    render() {
        return (
            <ExampleContainer headline="Tooltip">
                Simple&nbsp;
                <Tooltip
                    bindListeners
                    position={3}
                    content={{ text: 'This is a tooltip with a custom width of 150px. Optional, you can add a headline and an image.' }}
                    width={150}
                >
                    <a>Tooltip</a>
                </Tooltip>
                <br/>
                <br/>
                <Tooltip
                    bindListeners
                    position={3}
                    content={{
                        text: 'H5 will be used as headline inside of a tooltip.',
                        headline: 'Headline',
                    }}
                >
                    <a>Tooltip with headline</a>
                </Tooltip>
                <br/>
                <br/>
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
                            <a>Tooltip with headline and image</a>
                        </Tooltip>
                        <br/>
                        <br/>
                        <Tooltip
                            bindListeners
                            position={1}
                            content={{
                                text: 'Buttons within tooltips can be used to show more informations.',
                                buttonText: 'More informations',
                                buttonOnClick: console.log,
                            }}
                        >
                            <a>Tooltip with button</a>
                        </Tooltip>
                    </div>
                </div>
                <br/>
                <br/>
                <Tooltip
                    position={2}
                    content={{
                        html: <div style={{ height: '224px', transform: 'rotate(45deg) translate(0, 40%)' }}>
                            This is a static Tooltip with custom html content.
                        </div>
                    }}
                    ref={ref => this.staticTooltip = ref}
                    removeIcon
                >
                    <a
                        onClick={() => {
                            this.staticTooltip.show();
                        }}
                    >
                        Static Tooltip
                    </a>
                </Tooltip>
            </ExampleContainer>
        );
    }
}
