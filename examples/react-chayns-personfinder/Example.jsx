import React, { PureComponent } from 'react';

import { PersonFinder } from '../../src/index';
import Button from '../../src/react-chayns-button/component/Button';

export default class PersonFinderExample extends PureComponent {
    render() {
        return (
            <div>
                <PersonFinder
                    stopPropagation
                    placeholder="Person finden"
                    onChange={(data) => {
                        console.log(data);
                    }}
                    defaultValue="michael braun"
                    style={{ width: '100%' }}
                    ref={(ref) => { this.personfinder = ref; }}
                />
                <Button
                    onClick={() => {
                        this.personfinder.clear();
                    }}
                    style={{ marginTop: '10px' }}
                >
                    {'Clear'}
                </Button>
                <PersonFinder
                    stopPropagation
                    placeholder="Seite finden"
                    onChange={(data) => {
                        console.log(data);
                    }}
                    defaultValue="tobit"
                    style={{ width: '100%' }}
                    showSites
                    showPersons={false}
                />
            </div>
        );
    }
}
