import React, { PureComponent } from 'react';

import { Input } from '../../src/index';
import ExampleContainer from '../ExampleContainer';
import InputBox from '../../src/react-chayns-input_box/component/InputBox';

export default class InputBoxExample extends PureComponent {
    state = {
        value: '',
    };

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        this.setState({
            value,
        });
    }

    render() {
        const { value } = this.state;

        return (
            <ExampleContainer headline="InputBox">
                <InputBox
                    type="password"
                    inputComponent={Input}
                    value={value}
                    onChange={this.onChange}
                    placeholder="input"
                >
                    {`Password: ${value}`}
                </InputBox>
            </ExampleContainer>
        );
    }
}
