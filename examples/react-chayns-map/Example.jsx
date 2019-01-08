import React, { PureComponent } from 'react';

import ExampleContainer from '../ExampleContainer';
import Map from '../../src/react-chayns-map/component/Map';

export default class Example extends PureComponent {
    render() {
        return (
            <ExampleContainer headline="Map">
                <Map
                    apiKey="YOUR_API_KEY"
                    mapId="adminmap"
                />
            </ExampleContainer>
        );
    }
}
