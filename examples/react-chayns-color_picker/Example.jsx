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
            color: chayns.env.site.color,
        };
    }

    render() {
        const { childrenColor, color } = this.state;
        return (
            <div style={{
                marginBottom: '300px',
            }}
            >
                <h2>ColorPicker with transparency</h2>
                <ColorPicker
                    color={color}
                    bubblePosition={Bubble.position.BOTTOM_RIGHT}
                    onChange={console.log}
                    onChangeEnd={(c) => {
                        console.log(hsvToHexString(c));
                        this.setState({ color: c });
                    }}
                    transparency
                    style={{
                        marginBottom: '30px',
                        marginTop: '20px',
                    }}
                />
                <h2>ColorPicker with transparency and input</h2>
                <ColorPicker
                    color={color}
                    bubblePosition={Bubble.position.BOTTOM_RIGHT}
                    onChange={console.log}
                    onChangeEnd={(c) => {
                        console.log(hsvToHexString(c));
                        this.setState({ color: c });
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
                    color={color}
                    bubblePosition={Bubble.position.BOTTOM_RIGHT}
                    onChangeEnd={(c) => {
                        console.log(hsvToRgb(c));
                        this.setState({ color: c });
                    }}
                    style={{
                        marginBottom: '30px',
                        marginTop: '20px',
                    }}
                />
                <h2>ColorPicker with input and without transparency</h2>
                <ColorPicker
                    color={color}
                    bubblePosition={Bubble.position.BOTTOM_RIGHT}
                    onChangeEnd={(c) => {
                        console.log(hsvToRgb(c));
                        this.setState({ color: c });
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
                        color={color}
                        bubblePosition={Bubble.position.BOTTOM_RIGHT}
                        onChange={(c) => {
                            const selectedColor = hsvToHexString(c);
                            console.log(selectedColor);
                            this.setState({ childrenColor: selectedColor });
                        }}
                        onChangeEnd={(c) => {
                            console.log(c);
                            this.setState({ color: c });
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
