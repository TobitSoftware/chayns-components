import React, { Component } from 'react';

import { ColorPicker } from '../../src/index';

export default class ColorPickerExample extends Component {
    render() {
        return (
            <div>
                <ColorPicker color={chayns.env.site.color} />
            </div>
        );
    }
}
