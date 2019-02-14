import React, { PureComponent } from 'react';

import ExampleContainer from '../ExampleContainer';
import PersonFinder2 from '../../src/react-chayns-personfinder_2/component/PersonFinder';

export default class PersonFinder2Example extends PureComponent {
    render() {
        return (
            <ExampleContainer headline="PersonFinder2 (using chayns-Relations)">
                <PersonFinder2 style={{ width: '100%' }} dynamic placeholder="User" />
            </ExampleContainer>
        );
    }
}
