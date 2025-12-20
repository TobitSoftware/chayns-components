import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import TextString from '../src/react-chayns-textstring/component/TextString';
/* eslint-disable-next-line import/no-unresolved */
import ExampleList from './ExampleList';

async function bootstrap() {
    await window.chayns.ready;

    // load textString library "TextStringTest"
    await TextString.loadLibrary('TextStringTest');
    // load textString library "TextStringTest" in dutch
    await TextString.loadLibrary('TextStringTest', 'langRes', 'nl');

    const $root = document.getElementById('app');
    if (typeof createRoot === 'function') {
        const root = createRoot($root);
        root.render(<ExampleList />);
    } else {
        ReactDOM.render(<ExampleList />, $root);
    }
}

bootstrap();
