import React from 'react';
import ReactDom from 'react-dom';

import { ScrollView } from '../../src/index';
import ExampleContainer from '../ExampleContainer';

window.chayns.ready.then(() => {
    ReactDom.render(
        <ExampleContainer headline="ScrollView">
            <ScrollView>
                Test
            </ScrollView>
        </ExampleContainer>,
        document.querySelector('#react-chayns-scrollview')
    );
});
