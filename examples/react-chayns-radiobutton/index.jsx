import React from 'react';
import ReactDom from 'react-dom';

import { RadioButton } from '../../src/index';

window.chayns.ready.then(() => {
    ReactDom.render(
        <div style={{ border: '1px solid black' }}>
            <RadioButton
                onChange={(data) => {
                    console.log(data);
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
        </div>,
        document.querySelector('#react-chayns-radiobutton')
    );
});
