/* eslint-disable react/prefer-stateless-function */
import React, { PureComponent } from 'react';

import { Badge, Icon } from '../../src/index';

export default class BadgeExample extends PureComponent {
    render() {
        return (
            <div>
                <Badge>30</Badge>
                <Badge>
                    <Icon icon="ts-chayns" />
                </Badge>
                <Badge style={{ color: 'white', backgroundColor: 'red' }}>
                    1
                </Badge>
            </div>
        );
    }
}
