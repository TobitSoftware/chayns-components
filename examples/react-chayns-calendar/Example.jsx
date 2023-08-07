import React, { Component } from 'react';

import { Calendar } from '../../src/index';

export default class CalendarExample extends Component {
    constructor(props) {
        super(props);
        this.state = { selected: new Date('2018-12-04T00:00:00') };
    }

    handleDateSelect = (date) => {
        this.setState({ selected: date });
    };

    handleMonthSelect = (date) => {
        console.log('month selected', date);
        // handle e.g. data loading after selecting another month
    };

    render() {
        const { selected } = this.state;
        return (
            <div>
                <Calendar
                    style={{ margin: '20px 0' }}
                    onDateSelect={this.handleDateSelect}
                    onMonthSelect={this.handleMonthSelect}
                    startDate={new Date('2018-08-01T00:00:00')}
                    endDate={new Date('2018-12-31T00:00:00')}
                    selected={selected}
                    // activateAll={false}
                    activated={[
                        new Date('2018-12-01T00:00:00'),
                        new Date('2018-12-08T00:00:00'),
                        new Date('2018-12-15T00:00:00'),
                        new Date('2018-12-22T00:00:00'),
                        new Date('2018-12-29T00:00:00'),
                        new Date('2018-12-31T00:00:00'),
                    ]}
                    highlighted={[
                        {
                            dates: [
                                new Date('2018-12-02T00:00:00'),
                                new Date('2018-12-09T00:00:00'),
                            ],
                            style: {
                                color: '#FFFFFF',
                                backgroundColor: '#20C65A',
                            },
                        },
                        {
                            dates: [
                                new Date('2018-12-16T00:00:00'),
                                new Date('2018-12-23T00:00:00'),
                                new Date('2018-12-30T00:00:00'),
                                new Date('2018-12-31T00:00:00'),
                            ],
                            style: {
                                color: '#FFFFFF',
                                backgroundColor: '#E71E28',
                            },
                        },
                    ]}
                    circleColor="#000000"
                />
                <Calendar
                    style={{ margin: '20px 0' }}
                    onDateSelect={this.handleDateSelect}
                    startDate={new Date('2018-01-01T00:00:00')}
                    endDate={new Date('2018-12-31T00:00:00')}
                    selected={selected}
                    // activateAll={false}
                    activated={[
                        new Date('2018-12-01T00:00:00'),
                        new Date('2018-12-08T00:00:00'),
                        new Date('2018-12-15T00:00:00'),
                        new Date('2018-12-22T00:00:00'),
                        new Date('2018-12-29T00:00:00'),
                        new Date('2018-12-31T00:00:00'),
                    ]}
                    highlighted={[
                        {
                            dates: [
                                new Date('2018-12-02T00:00:00'),
                                new Date('2018-12-09T00:00:00'),
                            ],
                        },
                    ]}
                />
                <Calendar
                    style={{ margin: '20px 0' }}
                    onDateSelect={this.handleDateSelect}
                    startDate={new Date('2018-08-01T00:00:00')}
                    endDate={new Date('2018-12-31T00:00:00')}
                    selected={selected}
                    // activateAll={false}
                    activated={[
                        new Date('2018-12-01T00:00:00'),
                        new Date('2018-12-08T00:00:00'),
                        new Date('2018-12-15T00:00:00'),
                    ]}
                    highlighted={{
                        dates: [
                            new Date('2018-12-16T00:00:00'),
                            new Date('2018-12-23T00:00:00'),
                        ],
                    }}
                    categories={[
                        { date: '2018-12-21T00:00:00', color: '#4fae32' },
                        { date: '2018-12-22T00:00:00', color: '#4fae32' },
                        { date: '2018-12-22T00:00:00', color: '#1ba3d3' },
                        { date: '2018-12-23T00:00:00', color: '#4fae32' },
                        { date: '2018-12-23T00:00:00', color: '#1ba3d3' },
                        { date: '2018-12-24T00:00:00', color: '#1ba3d3' },
                    ]}
                />
            </div>
        );
    }
}
