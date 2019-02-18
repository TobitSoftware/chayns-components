import React, { Component } from 'react';

import { Calendar } from '../../src/index';
import ExampleContainer from '../utils/components/ExampleContainer';

export default class CalendarExample extends Component {
    constructor(props) {
        super(props);
        this.state = { selected: new Date('2018-12-04T00:00:00') };
    }

    render() {
        const { selected } = this.state;
        return (
            <ExampleContainer
                headline="Calendar"
                id="react-chayns-calendar"
            >
                <Calendar
                    style={{ margin: '20px 0' }}
                    onDateSelect={(date) => {
                        this.setState({ selected: date });
                        console.log(date);
                    }}
                    startDate={new Date('2018-08-01T00:00:00')}
                    endDate={new Date('2018-12-31T00:00:00')}
                    selected={selected}
                    // activateAll={false}
                    activated={[new Date('2018-12-01T00:00:00'), new Date('2018-12-08T00:00:00'), new Date('2018-12-15T00:00:00'), new Date('2018-12-22T00:00:00'), new Date('2018-12-29T00:00:00'), new Date('2018-12-31T00:00:00')]}
                    highlighted={[{
                        dates: [new Date('2018-12-02T00:00:00'), new Date('2018-12-09T00:00:00')],
                        color: '#20C65A'
                    }, {
                        dates: [new Date('2018-12-16T00:00:00'), new Date('2018-12-23T00:00:00'), new Date('2018-12-30T00:00:00'), new Date('2018-12-31T00:00:00')],
                        color: '#E71E28'
                    }]}
                />
            </ExampleContainer>
        );
    }
}
