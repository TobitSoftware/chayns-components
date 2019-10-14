import React, { PureComponent } from 'react';

import { Button, PersonFinder } from '../../src';

export default class PersonFinderExample extends PureComponent {
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
                    ref={(ref) => { this.relationFinder = ref; }}
                    dynamic
                    placeholder="Users with reducer: show only persons with an 'e' in the name"
                    onChange={PersonFinderExample.handleSelect}
                    reducerFunction={state => new Promise((resolve) => {
                        console.log(state);
                        const newState = {
                            ...state,
                            persons: {
                                ...state.persons,
                                related: state.persons.related.filter((person) => {
                                    console.log(person);
                                    return person.firstName.indexOf('e') >= 0 || person.lastName.indexOf('e') >= 0;
                                }),
                                unrelated: state.persons.unrelated.filter((person) => {
                                    console.log(person);
                                    return person.firstName.indexOf('e') >= 0 || person.lastName.indexOf('e') >= 0;
                                }),
                            },
                        };
                        resolve(newState);
                    })}
                />
                <PersonFinder
                    defaultValue="Smith"
                    ref={(ref) => { this.relationFinder = ref; }}
                    dynamic
                    placeholder="User/Site"
                    onChange={PersonFinderExample.handleSelect}
                    showSites
                />
                <PersonFinder
                    dynamic
                    placeholder="UAC 1"
                    uacId={1}
                    onChange={PersonFinderExample.handleSelect}
                />
                <PersonFinder
                    dynamic
                    placeholder="UAC 1 Location 1"
                    uacId={1}
                    locationId={1}
                    onChange={PersonFinderExample.handleSelect}
                />
                <PersonFinder
                    ref={(ref) => { this.siteFinder = ref; }}
                    dynamic
                    placeholder="Sites"
                    defaultValue={{
                        name: 'Tobit.Software',
                        siteId: '67231-11058',
                    }}
                    onChange={PersonFinderExample.handleSelect}
                    showPersons={false}
                    showSites
                />
                <PersonFinder
                    ref={(ref) => { this.personFinder = ref; }}
                    dynamic
                    placeholder="Users"
                    onChange={PersonFinderExample.handleSelect}
                />
                <PersonFinder
                    ref={(ref) => { this.personFinderOwn = ref; }}
                    dynamic
                    placeholder="Users (including own, showId)"
                    onChange={PersonFinderExample.handleSelect}
                    includeOwn
                    showId
                />
                <PersonFinder
                    ref={(ref) => { this.personFinderOwn = ref; }}
                    dynamic
                    placeholder="Users/Sites (multiple, dynamic)"
                    onAdd={PersonFinderExample.handleAdd}
                    onRemove={PersonFinderExample.handleRemove}
                    onChange={PersonFinderExample.handleSelect}
                    showSites
                    multiple
                />
                <PersonFinder
                    ref={(ref) => { this.personFinderOwn = ref; }}
                    dynamic
                    placeholder="Sites (multiple, default)"
                    defaultValues={[{
                        type: 'LOCATION',
                        name: 'BamBoo!',
                        siteId: '77891-25316',
                    }]}
                    onAdd={PersonFinderExample.handleAdd}
                    onRemove={PersonFinderExample.handleRemove}
                    onChange={PersonFinderExample.handleSelect}
                    showPersons={false}
                    showSites
                    multiple
                    parent={document.getElementById('portal-example')}
                    boxClassName="custom-personfinder-overlay"
                />
                <PersonFinder onInput={console.log} />
                <PersonFinder placeholder="Users (multiple)" multiple />
                <Button
                    onClick={this.clear}
                >
                    {'Clear all'}
                </Button>
            </div>
        );
    }
}
