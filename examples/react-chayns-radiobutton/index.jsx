import React from 'react';
import ReactDom from 'react-dom';

import { RadioButton } from '../../src/index';
import ExampleContainer from '../ExampleContainer';

window.chayns.ready.then(() => {
    ReactDom.render(
        <ExampleContainer headline="RadioButton">
            <RadioButton
                onChange={(data) => {
                    console.log(data);
                }}
                onClick={(value) => {
                    console.log('click', value);
                }}
                value="Test1"
            >
                String: Test1
            </RadioButton>

            <RadioButton
                onChange={(data) => {
                    console.log(data);
                }}
            >
                Number: 2
            </RadioButton>

            <RadioButton
                onChange={(data) => {
                    console.log(data);
                }}
                disabled
            >
                Disabled
            </RadioButton>

            <RadioButton
                onChange={(data) => {
                    console.log('button1', data);
                }}
                value="1"
                name="group1"
                defaultChecked
            >
                Name: group1
            </RadioButton>

            <RadioButton
                onChange={(data) => {
                    console.log('button2', data);
                }}
                value="2"
                name="group1"
            >
                Name: group1
            </RadioButton>
        </ExampleContainer>,
        document.querySelector('#react-chayns-radiobutton')
    );
});
