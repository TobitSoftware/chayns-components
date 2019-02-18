import React, { PureComponent } from 'react';

import Map from '../../src/react-chayns-map/component/Map';

export default class MapExample extends PureComponent {
    render() {
        return (
            <Map
                apiKey="YOUR_API_KEY"
                mapId="adminmap"
            />
        );
    }
}
