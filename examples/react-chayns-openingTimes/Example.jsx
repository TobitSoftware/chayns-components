import React, { PureComponent } from 'react';

import { OpeningTimes } from '../../src/index';

import ExampleContainer from '../ExampleContainer';

export default class OpeningTimesExample extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            times: [
                {
                    weekDay: 0,
                    start: '10:00',
                    end: '11:00'
                },
                {
                    weekDay: 0,
                    start: '15:00',
                    end: '16:00'
                },
                {
                    weekDay: 3,
                    start: '18:00',
                    end: '20:00'
                },
                {
                    weekDay: 5,
                    start: '18:00',
                    end: '20:00'
                },
                {
                    weekDay: 5,
                    start: '08:00',
                    end: '12:00'
                }
            ]
        };
    }

    render() {
        const { times } = this.state;
        return (
            <ExampleContainer headline="OpeningTimes">
                <OpeningTimes
                    times={times}
                    onChange={(newTimes) => {
                        console.log(times, newTimes);
                        this.setState({
                            times: newTimes
                        });
                    }}
                />
            </ExampleContainer>
        );
    }
}
