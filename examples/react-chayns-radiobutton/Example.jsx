import React, { PureComponent } from 'react';

import { RadioButton } from '../../src/index';
import ExampleContainer from '../utils/components/ExampleContainer';

export default class RadioButtonExample extends PureComponent {
    render() {
        return (
            <ExampleContainer
                headline="RadioButton"
                id="react-chayns-radiobutton"
            >
                <RadioButton
                    stopPropagation
                    onChange={(data) => {
                        console.log(data);
                    }}
                    onClick={(value) => {
                        console.log('click', value);
                    }}
                    value="Test1"
                >
                    {'String: Test1'}
                </RadioButton>

                <RadioButton
                    onChange={(data) => {
                        console.log(data);
                    }}
                >
                    {'Number: 2'}
                </RadioButton>

                <RadioButton
                    onChange={(data) => {
                        console.log(data);
                    }}
                    disabled
                >
                    {'Disabled'}
                </RadioButton>

                <RadioButton
                    onChange={(data) => {
                        console.log('button1', data);
                    }}
                    value="1"
                    name="group1"
                    defaultChecked
                >
                    {'Name: group1'}
                </RadioButton>

                <RadioButton
                    onChange={(data) => {
                        console.log('button2', data);
                    }}
                    value="2"
                    name="group1"
                >
                    {'Name: group1'}
                </RadioButton>
            </ExampleContainer>
        );
    }
}
