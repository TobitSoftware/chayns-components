import React from 'react';
import ReactDom from 'react-dom';

import ExampleContainer from '../ExampleContainer';

import { WeatherWidget } from '../../src/index';

import '../../src/react-weather/index.scss';

window.chayns.ready.then(() => {
    ReactDom.render(
        <ExampleContainer headline="WatherWidget">
            <WeatherWidget
                latitude={52.090430999999995}
                longitude={6.9558824999999995}
                city="Ahaus"
            />
        </ExampleContainer>,
        document.querySelector('#react-weather')
    );
});
