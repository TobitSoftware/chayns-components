import React, { Component } from 'react';
import './ColorPicker.scss';
import ColorArea from './colorArea/ColorArea';
import HueSelector from './colorSelector/HueSelector';

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
                <HueSelector onChange={(hue1) => { this.setState({ hue:hue1 }); }} hue={hue} />
            </div>
        );
    }
}
