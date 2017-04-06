import React from 'react';
import ReactDom from 'react-dom';

import PersonFinder from '../../src/react-chayns-personfinder/index';

window.chayns.ready.then(() => {
    ReactDom.render(
        <PersonFinder
            placeholder="Person finden"
            onChange={function(data) {
                console.log(data)
            }}
            defaultValue="michael braun"
        />,
        document.querySelector('#react-chayns-personfinder')
    );
});