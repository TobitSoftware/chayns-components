import React from 'react';
import ReactDom from 'react-dom';

import Example from './Example';

window.chayns.ready.then(() => {
    ReactDom.render(
        <Example />,
        document.querySelector('#react-chayns-expandable_content')
    );
});