import React, { PureComponent } from 'react';

import ExampleContainer from '../ExampleContainer';
import PersonFinder2 from '../../src/react-chayns-personfinder_2/component/PersonFinder';

export default class PersonFinder2Example extends PureComponent {
    static handleSelect(user) {
        chayns.dialog.alert(JSON.stringify(user, null, 2));
    }

    render() {
        return (
            <ExampleContainer
                headline="PersonFinder (using chayns-Relations)"
                id="react-person-finder2"
                style={{ marginBottom: '300px' }}
            >
                <PersonFinder2
                    style={{ width: '100%' }}
                    dynamic
                    placeholder="User/Site"
                    onChange={PersonFinder2Example.handleSelect}
                />
                <PersonFinder2
                    style={{ width: '100%' }}
                    dynamic
                    placeholder="Sites"
                    defaultValue={{
                        name: 'Tobit.Software',
                        siteId: '67231-11058'
                    }}
                    onChange={PersonFinder2Example.handleSelect}
                    persons={false}
                />
                <PersonFinder2
                    style={{ width: '100%' }}
                    dynamic
                    placeholder="Users"
                    onChange={PersonFinder2Example.handleSelect}
                    sites={false}
                />
            </ExampleContainer>
        );
    }
}
