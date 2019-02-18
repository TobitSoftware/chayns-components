import React, { PureComponent } from 'react';

import ExampleContainer from '../utils/components/ExampleContainer';
import Map from '../../src/react-chayns-map/component/Map';

export default class MapExample extends PureComponent {
    render() {
        return (
            <ExampleContainer
                headline="Map"
                id="react-chayns-map"
            >
                <Map
                    apiKey="YOUR_API_KEY"
                    mapId="adminmap"
                />
            </ExampleContainer>
        );
    }
}
