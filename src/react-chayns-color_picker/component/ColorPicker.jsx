import React, { Component } from 'react';
import './ColorPicker.scss';
import ColorArea from './colorArea/ColorArea';
import HueSlider from './hueSlider/HueSlider';
import TransparencySlider from './transparencySlider/TransparencySlider';

export default class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = { hue: { r: 255, g: 0, b: 0 } };
    }


    render() {
        const { hue } = this.state;
        return (
            <div>
                <ColorArea
                    color={hue}
                    onMove={console.log}
                    onUp={console.log}
                    preselectedColor={{
                        r: 0, g: 0, b: 0, a: 255,
                    }}
                />
                <HueSlider
                    onChange={(hue1) => {
                        this.setState({ hue: hue1 });
                    }}
                    hue={hue}
                />
                <TransparencySlider
                    color={hue}
                    onChange={(hue1) => {
                        this.setState({ hue: hue1 });
                    }}
                />
            </div>
        );
    }
}
