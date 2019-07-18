import React, { Component } from 'react';

import { ColorPicker } from '../../src/index';
import Bubble from '../../src/react-chayns-bubble/component/Bubble';

export default class ColorPickerExample extends Component {
    render() {
        return (
            <div style={{ marginBottom: '300px' }}>
                <ColorPicker
                    color={chayns.env.site.color}
                    bubblePosition={Bubble.position.BOTTOM_RIGHT}
                    onChange={console.log}
                    onChangeEnd={console.log}
                    transparency
                />
            </div>
        );
    }
}
