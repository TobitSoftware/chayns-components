import React, { PureComponent } from 'react';

import { Input } from '../../src/index';
import ExampleContainer from '../ExampleContainer';
import InputBox from '../../src/react-chayns-input_box/component/InputBox';

export default class InputBoxExample extends PureComponent {
    render() {
        return (
            <ExampleContainer headline="InputBox">
                <InputBox
                    input={(
                        <Input
                            defaultValue="Input"
                            placeholder="input"
                        />
                    )}
                >
                    {'Test'}
                </InputBox>
            </ExampleContainer>
        );
    }
}
