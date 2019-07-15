import React, { Component } from 'react';
import './ColorPicker.scss';
import ColorArea from './colorArea/ColorArea';

export default class ColorPicker extends Component {
    render() {
        return (
            <div>
                <ColorArea
                    color={chayns.env.site.color}
                    onMove={console.log}
                    onUp={console.log}
                    preselectedColor={{
                        r: 0, g: 0, b: 0, a: 255,
                    }}
                />
            </div>
        );
    }
}
