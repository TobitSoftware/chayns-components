import React, { PureComponent } from 'react';

import ExampleContainer from '../ExampleContainer';
import PersonFinder2 from '../../src/react-chayns-personfinder_2/component/PersonFinder';
import { Button } from '../../src';

export default class PersonFinder2Example extends PureComponent {
    static handleSelect(user) {
        chayns.dialog.alert(JSON.stringify(user, null, 2));
    }

    clear = () => {
        if (this.siteFinder) this.siteFinder.clear();
        if (this.personFinder) this.personFinder.clear();
        if (this.relationFinder) this.relationFinder.clear();

    };

    render() {
        return (
            <ExampleContainer
                headline="PersonFinder (using chayns-Relations)"
                id="react-person-finder2"
                style={{ marginBottom: '300px' }}
            >
                <PersonFinder2
                    style={{ width: '100%' }}
                    ref={(ref) => { this.relationFinder = ref; }}
                    dynamic
                    placeholder="User/Site"
                    onChange={PersonFinder2Example.handleSelect}
                />
                <PersonFinder2
                    style={{ width: '100%' }}
                    ref={(ref) => { this.siteFinder = ref; }}
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
                    ref={(ref) => { this.personFinder = ref; }}
                    dynamic
                    placeholder="Users"
                    onChange={PersonFinder2Example.handleSelect}
                    sites={false}
                />
                <Button
                    onClick={this.clear}
                >
                    {'Clear all'}
                </Button>
            </ExampleContainer>
        );
    }
}
