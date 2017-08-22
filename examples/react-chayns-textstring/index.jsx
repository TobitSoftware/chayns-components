import React from 'react';
import ReactDom from 'react-dom';

import Example from './Example';

window.chayns.ready.then(() => {
    function textStringReady() {
        ReactDom.render(
            <Example />,
            document.querySelector('#react-chayns-textstring')
        );
    }

    window.chayns.utils.lang.init({
        libs: [{
            project: 'Rating',
            middle: 'LangRes'
        }],
        language: (navigator.language || navigator.userLanguage).substring(0, 2) || 'de',
        preventOverride: false,
        successCallback: textStringReady,
        errorCallback: undefined
    });
});
