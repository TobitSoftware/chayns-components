import React from 'react';
import ReactDom from 'react-dom';

import Example from './Example.jsx';

window.chayns.ready.then(() => {
    ReactDom.render(
        <Example />,
        document.querySelector('#react-chayns-accordion')
    );
});