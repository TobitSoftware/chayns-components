import React from 'react';
import ReactDom from 'react-dom';

import ExampleContainer from '../ExampleContainer';

import { TextArea } from '../../src/index';

window.chayns.ready.then(() => {
    ReactDom.render(
        <ExampleContainer headline="TextArea">
            <TextArea
                placeholder="Input"
                onChange={(data) => {
                    console.log(data);
                }}
                defaultValue="Test"
                autogrow
                style={{ width: '100%' }}
            />
        </ExampleContainer>,
        document.querySelector('#react-chayns-textarea')
    );
});
