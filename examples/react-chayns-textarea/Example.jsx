import React, { PureComponent } from 'react';
import { TextArea } from '../../src';
import ExampleContainer from '../ExampleContainer';

export default class TextAreaExample extends PureComponent {
    render() {
        return (
            <ExampleContainer headline="TextArea">
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
            </ExampleContainer>
        );
    }
}
