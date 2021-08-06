import React, { useState } from 'react';

import { ColorPicker } from '../../src/index';
import Bubble from '../../src/react-chayns-bubble/component/Bubble';
import { hsvToHexString, hsvToRgb } from '../../src/utils/color/index';
import Input from '../../src/react-chayns-input/component/Input';
import HueSlider from '../../src/react-chayns-color_picker/component/hueSlider/HueSlider';
import { hexStringToHsv } from '../../src/utils/color';

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
                onChange={console.log}
                onChangeEnd={(c) => {
                    console.log(hsvToHexString(c));
                    setColor(c);
                }}
                onBlur={console.log}
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
                    setColor(c);
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
                onChange={console.log}
                onChangeEnd={(c) => {
                    console.log(hsvToHexString(c));
                    setColor(c);
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
                onChangeEnd={(c) => {
                    console.log(hsvToRgb(c));
                    setColor(c);
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
                    setColor(c);
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
                        setChildrenColor(selectedColor);
                    }}
                    onChangeEnd={(c) => {
                        console.log(c);
                        setColor(c);
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
                        const selectedColor = hsvToHexString(c);
                        console.log(selectedColor);
                    }}
                    onChangeEnd={(c) => {
                        console.log(c);
                        setColor(c);
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
                        const selectedColor = hsvToHexString(c);
                        console.log(selectedColor);
                    }}
                    onChangeEnd={(c) => {
                        console.log(c);
                        setColor(c);
                    }}
                />
            </div>
            <div>
                <h2>Slider only ColorPicker</h2>
                <HueSlider
                    color={hueSliderColor}
                    onChange={(c) => {
                        console.log(c);
                        setHueSliderColor(c);
                    }}
                    onChangeEnd={(c) => {
                        console.log(c);
                        setColor(c);
                    }}
                />
            </div>
        </div>
    );
};

export default ColorPickerExample;
