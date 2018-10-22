import React from 'react';
import ReactDom from 'react-dom';

import Example from './Example';
import TextString from '../../src/react-chayns-textstring/component/TextString';

window.chayns.ready.then(() => {
    TextString.loadLibrary('TextStringTest').then(() => {
        ReactDom.render(
            <Example />,
            document.querySelector('#react-chayns-textstring')
        );
    });
});
