import React, { useState } from 'react';

import { ColorPicker } from '../../src/index';
import Bubble from '../../src/react-chayns-bubble/component/Bubble';
import {
    hsvToHexString,
    hsvToRgb,
    hexStringToHsv,
} from '../../src/utils/color/index';
import Input from '../../src/react-chayns-input/component/Input';
import HueSlider from '../../src/react-chayns-color_picker/component/hueSlider/HueSlider';

const ColorPickerExample = () => {
    const [color, setColor] = useState(hexStringToHsv(chayns.env.site.color));
    const [childrenColor, setChildrenColor] = useState(chayns.env.site.color);
    const [hueSliderColor, setHueSliderColor] = useState(
        hexStringToHsv(chayns.env.site.color)
    );

    return (
        <div
            style={{
                marginBottom: '300px',
            }}
        >
            <h2>ColorPicker with transparency</h2>
            <ColorPicker
                color={color}
                bubblePosition={Bubble.position.BOTTOM_RIGHT}
                onChange={(c) => {
                    console.log('onChange', hsvToHexString(c));
                }}
                onChangeEnd={(c) => {
                    console.log('onChangeEnd', hsvToHexString(c));
                    setColor(c);
                }}
                onBlur={(e) => {
                    console.log('onBlur', e);
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
                onChange={(c) => {
                    console.log('onChange', hsvToHexString(c));
                }}
                onChangeEnd={(c) => {
                    console.log('onChangeEnd', hsvToHexString(c));
                    setColor(c);
                }}
                onBlur={(e) => {
                    console.log('onBlur', e);
                }}
                transparency
                input
                style={{
                    marginBottom: '30px',
                    marginTop: '20px',
                }}
            />
            <h2>ColorPicker with transparency and all colorModels</h2>
            <ColorPicker
                color={color}
                bubblePosition={Bubble.position.BOTTOM_RIGHT}
                onChange={(c) => {
                    console.log('onChange', hsvToHexString(c));
                }}
                onChangeEnd={(c) => {
                    console.log('onChangeEnd', hsvToHexString(c));
                    setColor(c);
                }}
                onBlur={(e) => {
                    console.log('onBlur', e);
                }}
                transparency
                input
                style={{
                    marginBottom: '30px',
                    marginTop: '20px',
                }}
                showAllColorModels
            />
            <h2>ColorPicker without transparency</h2>
            <ColorPicker
                color={color}
                bubblePosition={Bubble.position.BOTTOM_RIGHT}
                onChange={(c) => {
                    console.log('onChange', hsvToHexString(c));
                }}
                onChangeEnd={(c) => {
                    console.log('onChangeEnd', hsvToHexString(c));
                    setColor(c);
                }}
                onBlur={(e) => {
                    console.log('onBlur', e);
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
                onChange={(c) => {
                    console.log('onChange', hsvToHexString(c));
                }}
                onChangeEnd={(c) => {
                    console.log('onChangeEnd', hsvToHexString(c));
                    setColor(c);
                }}
                onBlur={(e) => {
                    console.log('onBlur', e);
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
                        console.log('onChange', hsvToHexString(c));
                    }}
                    onChangeEnd={(c) => {
                        console.log('onChangeEnd', hsvToHexString(c));
                        setColor(c);
                    }}
                    onBlur={(e) => {
                        console.log('onBlur', e);
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
            <div>
                <h2>Inline ColorPicker with transparency</h2>
                <ColorPicker
                    transparency
                    inline
                    input
                    color={color}
                    onChange={(c) => {
                        console.log('onChange', hsvToHexString(c));
                    }}
                    onChangeEnd={(c) => {
                        console.log('onChangeEnd', hsvToHexString(c));
                        setColor(c);
                    }}
                    onBlur={(e) => {
                        console.log('onBlur', e);
                    }}
                />
            </div>
            <div>
                <h2>Inline ColorPicker</h2>
                <ColorPicker
                    inline
                    input
                    color={color}
                    onChange={(c) => {
                        console.log('onChange', hsvToHexString(c));
                    }}
                    onChangeEnd={(c) => {
                        console.log('onChangeEnd', hsvToHexString(c));
                        setColor(c);
                    }}
                    onBlur={(e) => {
                        console.log('onBlur', e);
                    }}
                />
            </div>
            <div>
                <h2>Slider only ColorPicker</h2>
                <HueSlider
                    color={hueSliderColor}
                    onChange={(c) => {
                        console.log('onChange', hsvToHexString(c));
                    }}
                    onChangeEnd={(c) => {
                        console.log('onChangeEnd', hsvToHexString(c));
                        setColor(c);
                    }}
                    onBlur={(e) => {
                        console.log('onBlur', e);
                    }}
                />
            </div>
        </div>
    );
};

export default ColorPickerExample;
