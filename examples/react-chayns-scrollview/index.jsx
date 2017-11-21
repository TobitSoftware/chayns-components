import React from 'react';
import ReactDom from 'react-dom';

import { ScrollView } from '../../src/index';
import '../../src/react-chayns-scrollview/index.scss';

import ExampleContainer from '../ExampleContainer';

window.chayns.ready.then(() => {
    ReactDom.render(
        <ExampleContainer headline="ScrollView">
            <ScrollView style={{ maxHeight: '100px' }}>
                Test<br />
                Test<br />
                Test<br />
                Test<br />
                Test<br />
                Test<br />
                Test<br />
                Test<br />
                Test<br />
                Test<br />
                Test<br />
                Test<br />
                Test<br />
                Test
            </ScrollView>
        </ExampleContainer>,
        document.querySelector('#react-chayns-scrollview')
    );
});
