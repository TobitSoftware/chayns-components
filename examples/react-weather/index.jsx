import React from 'react';
import ReactDom from 'react-dom';

import { WeatherWidget } from '../../src/index';

import '../../src/react-weather/index.scss';

window.chayns.ready.then(() => {
    ReactDom.render(
        <WeatherWidget
            latitude={52.090430999999995}
            longitude={6.9558824999999995}
            city="Ahaus"
        />,
        document.querySelector('#react-weather')
    );
});
