import React, { PureComponent } from 'react';
import { TextArea } from '../../src';

export default class TextAreaExample extends PureComponent {
    render() {
        return (
            <TextArea
                stopPropagation
                placeholder="Input"
                onChange={(data) => {
                    console.log(data);
                }}
                defaultValue="Test"
                autogrow
                style={{ width: '100%' }}
            />
        );
    }
}
