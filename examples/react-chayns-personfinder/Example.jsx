import React, { PureComponent } from 'react';

import { Button, PersonFinder } from '../../src';

export default class PersonFinder2Example extends PureComponent {
    static handleSelect(user) {
        chayns.dialog.alert(JSON.stringify(user, null, 2));
    }

    static handleAdd(user) {
        console.log('added', user);
    }

    static handleRemove(user) {
        console.log('removed', user);
    }

    clear = () => {
        if (this.siteFinder) this.siteFinder.clear();
        if (this.personFinder) this.personFinder.clear();
        if (this.relationFinder) this.relationFinder.clear();
        if (this.personFinderOwn) this.personFinderOwn.clear();
    };

    render() {
        return (
            <div style={{ marginBottom: '300px' }}>
                <PersonFinder
                    defaultValue="Smith"
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
                    includeOwn
                />
                <PersonFinder
                    style={{ width: '100%' }}
                    ref={(ref) => { this.personFinderOwn = ref; }}
                    dynamic
                    placeholder="Users (multiple)"
                    onAdd={PersonFinder2Example.handleAdd}
                    onRemove={PersonFinder2Example.handleRemove}
                    onChange={PersonFinder2Example.handleSelect}
                    multiple
                />
                <Button
                    onClick={this.clear}
                >
                    {'Clear all'}
                </Button>
            </div>
        );
    }
}
