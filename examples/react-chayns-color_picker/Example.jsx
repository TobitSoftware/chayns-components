import React, { PureComponent } from 'react';

import { ColorPicker } from '../../src/index';
import Bubble from '../../src/react-chayns-bubble/component/Bubble';
import { hsvToRgb1, rgb1ToRgb255, rgb255ToHex } from '../../src/react-chayns-color_picker/utils/colorHelper';

export default class ColorPickerExample extends PureComponent {
    render() {
        return (
            <div style={{ marginBottom: '300px' }}>
                <ColorPicker
                    color={chayns.env.site.color}
                    bubblePosition={Bubble.position.BOTTOM_RIGHT}
                    onChange={console.log}
                    onChangeEnd={(color) => {
                        console.log(rgb255ToHex(rgb1ToRgb255(hsvToRgb1(color))));
                    }}
                    transparency
                />
                <ColorPicker
                    color={chayns.env.site.color}
                    bubblePosition={Bubble.position.BOTTOM_RIGHT}
                    onChangeEnd={(color) => {
                        console.log(rgb1ToRgb255(hsvToRgb1(color)));
                    }}
                />
            </div>
        );
    }
}
