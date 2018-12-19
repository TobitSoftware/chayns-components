import React, { PureComponent } from 'react';

import { OpeningTimes } from '../../src/index';

import ExampleContainer from '../ExampleContainer';

export default class Example extends PureComponent {
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

        this.onAdd = this.onAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onDayActivation = this.onDayActivation.bind(this);
    }

    onAdd(day, start, end) {
        console.log('add', day, start, end);
        this.setState({
            times: [
                ...this.state.times,
                {
                    weekDay: day,
                    start,
                    end
                }
            ]
        });
    }

    onRemove(day, span) {
        console.log('remove', day, span);
        // eslint-disable-next-line no-nested-ternary
        const elm = this.state.times.filter(t => t.weekDay === day).sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0))[span];
        this.setState({
            times: this.state.times.filter(t => !(t.weekDay === elm.weekDay && t.start === elm.start && t.end === elm.end))
        });
    }

    onChange(day, span, start, end) {
        console.log('change', day, span, start, end);
        // eslint-disable-next-line no-nested-ternary
        const elm = this.state.times.filter(t => t.weekDay === day).sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0))[span];
        const times = this.state.times.slice();
        times.forEach((t) => {
            if (t.weekDay === elm.weekDay && t.start === elm.start && t.end === elm.end) {
                t.start = start;
                t.end = end;
            }
        });
        this.setState({
            times
        });
    }

    onDayActivation(day, status) {
        console.log('dayActivation', day, status);
        const times = this.state.times.slice();
        times.forEach((t) => {
            if (t.weekDay === day) {
                t.disabled = !status;
            }
        });
        this.setState({
            times
        });
    }

    render() {
        return (
            <ExampleContainer headline="OpeningTimes">
                <OpeningTimes
                    times={this.state.times}
                    onAdd={this.onAdd}
                    onRemove={this.onRemove}
                    onChange={this.onChange}
                    onDayActivation={this.onDayActivation}
                />
            </ExampleContainer>
        );
    }
}
