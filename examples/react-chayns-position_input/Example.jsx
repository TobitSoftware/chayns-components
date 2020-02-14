import React, { PureComponent } from 'react';

import PositionInput from '../../src/react-chayns-position_input/component/PositionInput';

export default class PositionInputExample extends PureComponent {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        // TODO add google maps script tag with api token
    }

    render() {
        return (
            <PositionInput
                defaultPosition={{
                    lat: 52.067,
                    lng: 7.016,
                }}
                onPositionChange={console.log}
            />
        );
    }
}
