import React from 'react';
import ReactDom from 'react-dom';

import ExampleContainer from '../ExampleContainer';
import { PersonFinder } from '../../src/index';

window.chayns.ready.then(() => {
    ReactDom.render(
        <ExampleContainer headline="PersonFinder">
            <PersonFinder
                placeholder="Person finden"
                onChange={(data) => {
                    console.log(data);
                }}
                defaultValue="michael braun"
            />
        </ExampleContainer>,
        document.querySelector('#react-chayns-personfinder')
    );
});
