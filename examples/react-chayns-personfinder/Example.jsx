import React, { PureComponent } from 'react';

import { Button, PersonFinder } from '../../src';
import UacGroupContext from '../../src/react-chayns-personfinder/component/data/uacGroups/UacGroupContext';
import SimpleWrapperContext from '../../src/react-chayns-personfinder/component/data/simpleWrapper/SimpleWrapperContext';

const customData = [
    {
        email: 'herrmann.muster@uni-muenster.de',
        displayName: 'Herrmann Muster\u200b',
        imageUrl: 'https://sub60.tobit.com/u/-1',
        shortHand: 'HM',
        firstName: 'Herrmann',
        lastName: 'Muster',
    },
    {
        email: 'max.muster@tobit.software',
        displayName: 'Max Muster\u200b',
        imageUrl: 'https://sub60.tobit.com/u/-1',
        shortHand: 'MM',
        firstName: 'Max',
        lastName: 'Muster',
    },
    {
        email: 'bill.tester@tobit.software',
        displayName: 'Bill Tester',
        imageUrl: 'https://sub60.tobit.com/u/-1',
        shortHand: 'BT',
        firstName: 'Bill',
        lastName: 'Tester',
    },
];

export default class PersonFinderExample extends PureComponent {
    constructor(props) {
        super(props);
        this.simplePersonFinderRef1 = React.createRef();
        this.simplePersonFinderRef2 = React.createRef();
        this.simplePersonFinderRef3 = React.createRef();
        this.simplePersonFinderRef4 = React.createRef();
    }

    static handleSelect(user) {
        chayns.dialog.alert(JSON.stringify(user, null, 2));
    }

    static handleAdd(user) {
        console.log('added', user);
    }

    static handleRemove(user) {
        console.log('removed', user);
    }

    state = {
        data: customData.slice(0, 1),
        hasMore: true,
        moreReceiver: [
            {
                userId: 2236583,
                personId: '134-78226',
                firstName: 'Thomas',
                lastName: 'Tobit',
            },
        ],
        controlledValues: [],
        value: '',
    };

    clear = () => {
        if (this.siteFinder) this.siteFinder.clear();
        if (this.personFinder) this.personFinder.clear();
        if (this.personFinder0) this.personFinder0.clear();
        if (this.relationFinder1) this.relationFinder1.clear();
        if (this.relationFinder2) this.relationFinder2.clear();
        if (this.personFinderOwn1) this.personFinderOwn1.clear();
        if (this.personFinderOwn2) this.personFinderOwn2.clear();
        if (this.personFinderOwn3) this.personFinderOwn3.clear();
        if (this.customUserFinder) this.customUserFinder.clear();
        if (this.multipleUserFinder) this.multipleUserFinder.clear();
        if (this.uacFinder) this.uacFinder.clear();
        if (this.relationFinderUac) this.relationFinderUac.clear();
        if (this.relationFinderUacLocation)
            this.relationFinderUacLocation.clear();
        this.simplePersonFinderRef1.current.clear();
        this.simplePersonFinderRef2.current.clear();
        this.simplePersonFinderRef3.current.clear();
        this.simplePersonFinderRef4.current.clear();
        this.setState({ controlledValues: [] });
    };

    render() {
        const {
            data,
            hasMore,
            moreReceiver,
            controlledValues,
            value,
        } = this.state;
        return (
            <div style={{ marginBottom: '500px' }}>
                <h2>Simple PersonFinders</h2>
                <PersonFinder
                    onChange={console.log}
                    onInput={console.log}
                    ref={this.simplePersonFinderRef1}
                    disableFriends
                />
                <PersonFinder
                    value={value}
                    onChange={(value) => {
                        console.log(value);
                        this.setState({ value });
                    }}
                    onInput={(value) => {
                        console.log(value);
                        this.setState({ value });
                    }}
                    ref={this.simplePersonFinderRef2}
                />
                <PersonFinder
                    defaultValue="Jonas Gossens"
                    onChange={console.log}
                    ref={this.simplePersonFinderRef3}
                />
                <PersonFinder
                    defaultValue={{
                        type: 'PERSON',
                        fullName: 'Test User',
                        firstName: 'Test',
                        lastName: 'User',
                    }}
                    onChange={console.log}
                    ref={this.simplePersonFinderRef4}
                />
                <PersonFinder
                    ref={(ref) => {
                        this.relationFinder1 = ref;
                    }}
                    placeholder="Users with reducer: show only persons with an 'e' in the name"
                    onChange={PersonFinderExample.handleSelect}
                    reducerFunction={(state) => {
                        console.log('added', state);
                        const newState = {
                            ...state,
                            personsRelated: state.personsRelated.filter(
                                (person) => {
                                    console.log(person);
                                    return (
                                        person.name.indexOf('e') >= 0 ||
                                        person.name.indexOf('e') >= 0
                                    );
                                }
                            ),
                            personsUnrelated: state.personsUnrelated.filter(
                                (person) => {
                                    console.log(person);
                                    return (
                                        person.name.indexOf('e') >= 0 ||
                                        person.name.indexOf('e') >= 0
                                    );
                                }
                            ),
                        };
                        return newState;
                    }}
                />
                <PersonFinder
                    defaultValue="Smith"
                    ref={(ref) => {
                        this.relationFinder2 = ref;
                    }}
                    placeholder="User/Site"
                    onChange={PersonFinderExample.handleSelect}
                    showSites
                />
                <PersonFinder
                    ref={(ref) => {
                        this.relationFinderUac = ref;
                    }}
                    placeholder="UAC 1"
                    uacId={1}
                    onChange={PersonFinderExample.handleSelect}
                />
                <PersonFinder
                    ref={(ref) => {
                        this.relationFinderUacLocation = ref;
                    }}
                    placeholder="UAC 1 Location 1"
                    uacId={1}
                    locationId={1}
                    onChange={PersonFinderExample.handleSelect}
                />
                <PersonFinder
                    ref={(ref) => {
                        this.siteFinder = ref;
                    }}
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
                    ref={(ref) => {
                        this.personFinder = ref;
                    }}
                    placeholder="Users"
                    onChange={PersonFinderExample.handleSelect}
                />
                <PersonFinder
                    ref={(ref) => {
                        this.personFinderOwn1 = ref;
                    }}
                    placeholder="Users (including own, showId)"
                    onChange={PersonFinderExample.handleSelect}
                    removeIcon
                    includeOwn
                    showId
                />

                <h2>Multiple PersonFinders</h2>
                <PersonFinder
                    max={3}
                    placeholder="Empfänger"
                    showPersons
                    multiple
                    onChange={console.log}
                    onAdd={(value) => {
                        console.log(value);
                        this.setState({
                            moreReceiver: [
                                ...moreReceiver,
                                {
                                    userId: value.userId,
                                    personId: value.personId,
                                    firstName: value.firstName,
                                    lastName: value.lastName,
                                },
                            ],
                        });
                    }}
                    onInput={console.log}
                    defaultValues={moreReceiver}
                    onRemove={(value) => {
                        const newReceiver = moreReceiver.filter(
                            (rec) => rec.userId !== value.userId
                        );
                        this.setState({
                            moreReceiver: newReceiver,
                        });
                    }}
                    ref={(ref) => {
                        this.personFinder0 = ref;
                    }}
                    onKeyDown={(...e) => {
                        console.log('onkeydown personfinder', ...e);
                    }}
                    autoSelectFirst
                />
                <PersonFinder
                    values={controlledValues}
                    multiple
                    onAdd={(value) => {
                        console.log('add', value);
                        controlledValues.push(value);
                        this.setState({ controlledValues });
                    }}
                    onRemove={(value) => {
                        console.log('remove', value, controlledValues);
                        controlledValues.splice(
                            controlledValues.findIndex(
                                (v) => v.userId === value.userId
                            ),
                            1
                        );
                        this.setState({ controlledValues });
                    }}
                    placeholder="Controlled PersonFinder"
                />
                <PersonFinder
                    autoSelectFirst
                    ref={(ref) => {
                        this.customUserFinder = ref;
                    }}
                    placeholder="Users (Custom)"
                    context={SimpleWrapperContext({
                        showName: 'displayName',
                        identifier: 'email',
                        search: ['email', 'displayName'],
                        imageUrl: 'imageUrl',
                        filter: (inputValue) => (e) =>
                            ['email', 'displayName'].some(
                                (key) =>
                                    e[key] &&
                                    e[key]
                                        .toLowerCase()
                                        .startsWith(
                                            (inputValue || '').toLowerCase()
                                        )
                            ),
                    })}
                    contextProps={{
                        data,
                        hasMore,
                        onLoadMore: async () => {
                            await new Promise((resolve) =>
                                setTimeout(resolve, 2000)
                            );
                            this.setState((state) => ({
                                data: customData.slice(
                                    0,
                                    state.data.length + 1
                                ),
                            }));
                        },
                        onInput: async () => {
                            this.setState({ data: [] });
                            await new Promise((resolve) =>
                                setTimeout(resolve, 1000)
                            );
                            this.setState({
                                data: customData.slice(0, 1),
                            });
                        },
                    }}
                    multiple
                    onAdd={console.log}
                    onRemove={PersonFinderExample.handleRemove}
                    onChange={PersonFinderExample.handleSelect}
                    defaultValues={[
                        {
                            displayName: 'Herrmann Muster\u200b',
                            email: 'herrmann.muster@uni-muenster.de',
                        },
                        {
                            displayName: 'Bill Tester',
                            email: 'bill.tester@tobit.software',
                        },
                    ]}
                />
                <PersonFinder
                    ref={(ref) => {
                        this.uacFinder = ref;
                    }}
                    placeholder="UAC Groups (Custom)"
                    context={UacGroupContext}
                    multiple
                    onAdd={(group) => console.log('add group', group)}
                    onRemove={PersonFinderExample.handleRemove}
                    onChange={PersonFinderExample.handleSelect}
                />
                <PersonFinder
                    ref={(ref) => {
                        this.personFinderOwn2 = ref;
                    }}
                    placeholder="Users/Sites (multiple)"
                    onAdd={PersonFinderExample.handleAdd}
                    onRemove={PersonFinderExample.handleRemove}
                    onChange={PersonFinderExample.handleSelect}
                    showSites
                    multiple
                />
                <PersonFinder
                    ref={(ref) => {
                        this.personFinderOwn3 = ref;
                    }}
                    placeholder="Sites (multiple, default)"
                    defaultValues={[
                        {
                            type: 'SITE',
                            id: '59140-09519',
                            name: 'BamBoo! Ahaus',
                            imageUrl:
                                'https://sub60.tobit.com/l/59140-09519?size=40',
                            siteId: '59140-09519',
                            locationId: 1,
                        },
                    ]}
                    onAdd={PersonFinderExample.handleAdd}
                    onRemove={PersonFinderExample.handleRemove}
                    onChange={PersonFinderExample.handleSelect}
                    showPersons={false}
                    showSites
                    multiple
                    parent={document.body}
                    boxClassName="custom-personfinder-overlay"
                />
                <PersonFinder
                    ref={(ref) => {
                        this.multipleUserFinder = ref;
                    }}
                    placeholder="Users (multiple)"
                    multiple
                />
                <Button onClick={this.clear}>Clear all</Button>
            </div>
        );
    }
}
