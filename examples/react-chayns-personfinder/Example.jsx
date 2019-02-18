import React, { PureComponent } from 'react';

import ExampleContainer from '../ExampleContainer';
import { Button } from '../../src';
import PersonFinder from '../../src/react-chayns-personfinder/component/PersonFinder';

export default class PersonFinder2Example extends PureComponent {
    static handleSelect(user) {
        chayns.dialog.alert(JSON.stringify(user, null, 2));
    }

    clear = () => {
        if (this.siteFinder) this.siteFinder.clear();
        if (this.personFinder) this.personFinder.clear();
        if (this.relationFinder) this.relationFinder.clear();
        if (this.personFinderOwn) this.personFinderOwn.clear();
    };

    render() {
        return (
            <ExampleContainer
                headline="PersonFinder"
                id="react-person-finder"
                style={{ marginBottom: '300px' }}
            >
                <PersonFinder
                    style={{ width: '100%' }}
                    ref={(ref) => { this.relationFinder = ref; }}
                    dynamic
                    placeholder="User/Site"
                    onChange={PersonFinder2Example.handleSelect}
                />
                <PersonFinder
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
                <PersonFinder
                    style={{ width: '100%' }}
                    ref={(ref) => { this.personFinder = ref; }}
                    dynamic
                    placeholder="Users"
                    onChange={PersonFinder2Example.handleSelect}
                    sites={false}
                />
                <PersonFinder
                    style={{ width: '100%' }}
                    ref={(ref) => { this.personFinderOwn = ref; }}
                    dynamic
                    placeholder="Users (including own)"
                    onChange={PersonFinder2Example.handleSelect}
                    sites={false}
                    canFindOwn
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
