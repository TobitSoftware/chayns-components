import React, { PureComponent } from 'react';

import { PersonFinder } from '../../src/index';
import ExampleContainer from '../ExampleContainer';
import Button from '../../src/react-chayns-button/component/Button';

export default class Example extends PureComponent {
    render() {
        return (
            <ExampleContainer headline="PersonFinder">
                <PersonFinder
                    stopPropagation
                    placeholder="Person finden"
                    onChange={(data) => {
                        console.log(data);
                    }}
                    defaultValue="michael braun"
                    style={{ width: '100%' }}
                    ref={ref => this.personfinder = ref}
                />
                <Button
                    onClick={() => {
                        this.personfinder.clear();
                    }}
                    style={{ marginTop: '10px' }}
                >

                    Clear
                </Button>
            </ExampleContainer>
        );
    }
}
