import React from 'react';
import ReactDom from 'react-dom';

import { TextArea } from '../../src/index';

window.chayns.ready.then(() => {
    ReactDom.render(
        <TextArea
            placeholder="Input"
            onChange={(data) => {
                console.log(data);
            }}
            defaultValue="Test"
            autogrow
        />,
        document.querySelector('#react-chayns-textarea')
    );
});
