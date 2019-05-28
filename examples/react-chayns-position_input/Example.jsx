import React, { PureComponent } from 'react';

import PositionInput from '../../src/react-chayns-position_input/component/PositionInput';

export default class PositionInputExample extends PureComponent {
    render() {
        return (
            <PositionInput
                apiKey="YOUR_API_KEY"
                mapId="adminmap"
            />
        );
    }
}
