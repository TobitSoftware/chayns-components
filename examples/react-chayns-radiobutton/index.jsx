import React from 'react';
import ReactDom from 'react-dom';

import {RadioButton} from '../../src/react-chayns-radiobutton/index';

window.chayns.ready.then(() => {
    ReactDom.render(
        <div>
            <RadioButton
                onChange={function(data) {
                    console.log(data)
                }}
                value="Test1"
            >
                String: Test1
            </RadioButton>

            <RadioButton
                onChange={function(data) {
                    console.log(data)
                }}
            >
                Number: 2
            </RadioButton>

            <RadioButton
                onChange={function(data) {
                    console.log(data)
                }}
                disabled
            >
                Disabled
            </RadioButton>

            <RadioButton
                onChange={function(data) {
                    console.log('button1', data)
                }}
                value="1"
                name="group1"
            >
                Name: group1
            </RadioButton>

            <RadioButton
                onChange={function(data) {
                    console.log('button2', data)
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