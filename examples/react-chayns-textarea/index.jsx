import React from 'react';
import ReactDom from 'react-dom';

import TextArea from '../../src/react-chayns-textarea/index';

window.chayns.ready.then(() => {
    ReactDom.render(
        <TextArea placeholder="Input" onChange={function(data) {
            console.log(data.target.value);
        }} autogrow={true} defaultValue="Test" />,
        document.querySelector('#react-chayns-textarea')
    );
});