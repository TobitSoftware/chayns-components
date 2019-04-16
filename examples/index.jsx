import React from 'react';
import ReactDom from 'react-dom';

import TextString from '../src/react-chayns-textstring/component/TextString';

/* eslint-disable-next-line import/no-unresolved */
import ExampleList from './ExampleList';

async function bootstrap() {
    await window.chayns.ready;

    await TextString.loadLibrary('TextStringTest');
    await TextString.loadLibrary('TextStringTest', 'langRes', 'nl');

    ReactDom.render(
        <ExampleList />,
        document.querySelector('#app')
    );
}

bootstrap();

if (process.env.NODE_ENV !== 'production') {
    /* eslint-disable-next-line global-require */
    const { whyDidYouUpdate } = require('why-did-you-update');
    whyDidYouUpdate(React);
}
