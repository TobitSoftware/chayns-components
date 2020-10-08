import React from 'react';
import ReactDom from 'react-dom';
import TextString from '../src/react-chayns-textstring/component/TextString';
/* eslint-disable-next-line import/no-unresolved */
import ExampleList from './ExampleList';

async function bootstrap() {
    await window.chayns.ready;

    // load textString library "TextStringTest"
    await TextString.loadLibrary('TextStringTest');
    // load textString library "TextStringTest" in dutch
    await TextString.loadLibrary('TextStringTest', 'langRes', 'nl');

    ReactDom.render(<ExampleList />, document.querySelector('#app'));
}

bootstrap();
