import React, { PureComponent } from 'react';

import { ColorPicker } from '../../src/index';
import Bubble from '../../src/react-chayns-bubble/component/Bubble';
import { hsvToHexString, hsvToRgb } from '../../src/utils/color/hsv';
import Input from '../../src/react-chayns-input/component/Input';

export default class ColorPickerExample extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            childrenColor: chayns.env.site.color,
        };
    }

    render() {
        const { childrenColor } = this.state;
        return (
            <div style={{
                marginBottom: '300px',
            }}
            >
                <h2>ColorPicker with transparency</h2>
                <ColorPicker
                    color={chayns.env.site.color}
                    bubblePosition={Bubble.position.BOTTOM_RIGHT}
                    onChange={console.log}
                    onChangeEnd={(color) => {
                        console.log(hsvToHexString(color));
                    }}
                    transparency
                    style={{
                        marginBottom: '30px',
                        marginTop: '20px',
                    }}
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
                    style={{
                        marginBottom: '30px',
                        marginTop: '20px',
                    }}
                />
                <h2>ColorPicker without transparency</h2>
                <ColorPicker
                    color={chayns.env.site.color}
                    bubblePosition={Bubble.position.BOTTOM_RIGHT}
                    onChangeEnd={(color) => {
                        console.log(hsvToRgb(color));
                    }}
                    style={{
                        marginBottom: '30px',
                        marginTop: '20px',
                    }}
                />
                <h2>ColorPicker with input and without transparency</h2>
                <ColorPicker
                    color={chayns.env.site.color}
                    bubblePosition={Bubble.position.BOTTOM_RIGHT}
                    onChangeEnd={(color) => {
                        console.log(hsvToRgb(color));
                    }}
                    input
                    style={{
                        marginBottom: '30px',
                        marginTop: '20px',
                    }}
                />
                <h2>ColorPicker with children</h2>
                <div
                    style={{
                        marginBottom: '30px',
                        marginTop: '20px',
                        display: 'flex',
                    }}
                >
                    <ColorPicker
                        color={chayns.env.site.color}
                        bubblePosition={Bubble.position.BOTTOM_RIGHT}
                        onChange={(color) => {
                            const selectedColor = hsvToHexString(color);
                            console.log(selectedColor);
                            this.setState({ childrenColor: selectedColor });
                        }}
                        input
                    >
                        <div
                            style={{
                                backgroundColor: childrenColor,
                                height: '20px',
                                width: '20px',
                            }}
                        />
                    </ColorPicker>
                    <Input
                        style={{
                            marginLeft: '5px',
                        }}
                    />
                </div>
            </div>
        );
    }
}
