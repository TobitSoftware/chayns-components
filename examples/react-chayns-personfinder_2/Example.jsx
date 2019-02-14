import React, { PureComponent } from 'react';

import ExampleContainer from '../ExampleContainer';
import PersonFinder2 from '../../src/react-chayns-personfinder_2/component/PersonFinder';

export default class PersonFinder2Example extends PureComponent {
    static handleSelect(user) {
        chayns.dialog.alert(JSON.stringify(user, null, 2));
    }

    render() {
        return (
            <ExampleContainer headline="PersonFinder (using chayns-Relations)">
                <PersonFinder2
                    style={{ width: '100%' }}
                    dynamic
                    placeholder="User/Site"
                    onSelect={PersonFinder2Example.handleSelect}
                />
                <PersonFinder2
                    style={{ width: '100%' }}
                    dynamic
                    placeholder="Sites"
                    defaultValue={{
                        name: 'Tobit.Software',
                        siteId: '67231-11058'
                    }}
                    onSelect={PersonFinder2Example.handleSelect}
                    persons={false}
                />
                <PersonFinder2
                    style={{ width: '100%' }}
                    dynamic
                    placeholder="Users"
                    onSelect={PersonFinder2Example.handleSelect}
                    sites={false}
                />
            </ExampleContainer>
        );
    }
}
