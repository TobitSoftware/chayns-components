import React from 'react';
import ReactDom from 'react-dom';

import '../../src/react-chayns-scrollview/index.scss';

import Example from './Example';

window.chayns.ready.then(() => {
    ReactDom.render(
        <Example />,
        document.querySelector('#react-chayns-scrollview')
    );
});
