import React, { PureComponent } from 'react';

import { ColorPicker } from '../../src/index';
import Bubble from '../../src/react-chayns-bubble/component/Bubble';
import { hsvToHexString, hsvToRgb } from '../../src/utils/color/hsv';

export default class ColorPickerExample extends PureComponent {
    render() {
        return (
            <div style={{ marginBottom: '300px' }}>
                <h2>ColorPicker with transparency</h2>
                <ColorPicker
                    color={chayns.env.site.color}
                    bubblePosition={Bubble.position.BOTTOM_RIGHT}
                    onChange={console.log}
                    onChangeEnd={(color) => {
                        console.log(hsvToHexString(color));
                    }}
                    transparency
                    style={{ marginBottom: '30px', marginTop: '20px' }}
                />
                <h2>ColorPicker with transparency and input</h2>
                <ColorPicker
                    color={chayns.env.site.color}
                    bubblePosition={Bubble.position.BOTTOM_RIGHT}
                    onChange={console.log}
                    onChangeEnd={(color) => {
                        console.log(hsvToHexString(color));
                    }}
                    transparency
                    input
                    style={{ marginBottom: '30px', marginTop: '20px' }}
                />
                <h2>ColorPicker without transparency</h2>
                <ColorPicker
                    color={chayns.env.site.color}
                    bubblePosition={Bubble.position.BOTTOM_RIGHT}
                    onChangeEnd={(color) => {
                        console.log(hsvToRgb(color));
                    }}
                    style={{ marginBottom: '30px', marginTop: '20px' }}
                />
                <h2>ColorPicker with input and without transparency</h2>
                <ColorPicker
                    color={chayns.env.site.color}
                    bubblePosition={Bubble.position.BOTTOM_RIGHT}
                    onChangeEnd={(color) => {
                        console.log(hsvToRgb(color));
                    }}
                    input
                    style={{ marginBottom: '30px', marginTop: '20px' }}
                />
            </div>
        );
    }
}
