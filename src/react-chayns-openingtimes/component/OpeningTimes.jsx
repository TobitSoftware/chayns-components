import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Day from './Day';

import { getTimeStringMinutes, getTimeStringFromMinutes } from '../../utils/dateTimeHelper';

class OpeningTimes extends Component {
    static propTypes = {
        times: PropTypes.arrayOf(PropTypes.shape({
            weekDay: PropTypes.number.isRequired,
            start: PropTypes.string.isRequired,
            end: PropTypes.string.isRequired,
            disabled: PropTypes.bool,
        })).isRequired,
        onChange: PropTypes.func,
        className: PropTypes.string,
        style: PropTypes.object,
    };

    static defaultProps = {
        onChange: null,
        className: null,
        style: null,
    };

    static weekdays = [
        'Montag',
        'Dienstag',
        'Mittwoch',
        'Donnerstag',
        'Freitag',
        'Samstag',
        'Sonntag',
    ];

    constructor(props) {
        super(props);

        this.onAdd = this.onAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onDayActivation = this.onDayActivation.bind(this);

        this.state = {
            times: props.times,
        };
    }

    onAdd(weekDay) {
        const { onChange } = this.props;
        const newState = Object.assign({}, this.state);
        const foundTimes = newState.times.filter(time => time.weekDay === weekDay);

        const oldStart = getTimeStringMinutes(foundTimes[0].start);
        const oldEnd = getTimeStringMinutes(foundTimes[0].end);
        let diff = oldEnd - oldStart;

        if (oldEnd < oldStart) diff += 24 * 60;

        const newStart = oldEnd + 60;
        const newEnd = newStart + diff;

        newState.times.push({
            weekDay,
            start: getTimeStringFromMinutes(newStart),
            end: getTimeStringFromMinutes(newEnd),
            disabled: false,
        });

        this.setState(newState);
        if (onChange) onChange(newState.times);
    }

    onRemove(day, span) {
        const { times } = this.state;
        const { onChange } = this.props;

        const newState = Object.assign({}, this.state);

        if (onChange) {
            const timesOfDay = times.filter(t => t.weekDay === day);
            // eslint-disable-next-line no-nested-ternary
            const elm = timesOfDay.sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0))[span];
            const newTimes = times.slice().filter(t => !(t.weekDay === elm.weekDay && t.start === elm.start && t.end === elm.end));

            newState.times = newTimes;
            this.setState(newState);

            onChange(newState.times);
        }
    }

    onChange(day, index, start, end) {
        // eslint-disable-next-line no-nested-ternary
        const { times } = this.state;
        const { onChange } = this.props;

        const newState = Object.assign({}, this.state);

        if (onChange) {
            const timesOfDay = newState.times.filter(time => time.weekDay === day);
            timesOfDay[index].start = start;
            timesOfDay[index].end = end;

            this.setState(newState);
            onChange(times);
        }
    }

    onDayActivation(day, status) {
        const { onChange } = this.props;
        const newState = Object.assign({}, this.state);
        const timesOfDay = newState.times.filter(time => time.weekDay === day);
        const defaultTime = {
            weekDay: day,
            start: '08:00',
            end: '18:00',
        };

        if (timesOfDay.length === 0) {
            timesOfDay.push(defaultTime);
        }

        if (status) {
            newState.times = this.applyPreviousTimes(day, status);
            if (newState.times.length === 0) newState.times.push(defaultTime);
        } else {
            for (let i = 0; i < timesOfDay.length; i += 1) {
                const current = timesOfDay[i];
                if (current.weekDay === day) current.disabled = !status;
            }
        }

        this.setState(newState);
        if (onChange) onChange(newState.times);
    }

    // eslint-disable-next-line react/sort-comp
    applyPreviousTimes(addedWeekDay, status = true) {
        const { times } = this.state;
        const foundTimes = this.getWeekDayTimes(this.getLatestPreviousWeekDay(addedWeekDay));
        const newTimes = times.slice().filter(time => time.weekDay !== addedWeekDay);

        if (foundTimes === null) return [];

        for (let i = 0; i < foundTimes.length; i += 1) {
            newTimes.push({
                weekDay: addedWeekDay,
                start: foundTimes[i].start,
                end: foundTimes[i].end,
                disabled: !status,
            });
        }

        return newTimes;
    }

    getLatestPreviousWeekDay(startDay) {
        const { times } = this.state;
        let latest = 0;

        if (!times) return null;

        for (let i = 0; i < times.length; i += 1) {
            if (times[i].weekDay < startDay && times[i].weekDay > latest && !times[i].disabled) latest = times[i].weekDay;
        }

        return latest;
    }

    getWeekDayTimes(weekDay) {
        const { times } = this.state;
        const foundTimes = times.filter(item => item.weekDay === weekDay && !item.disabled);

        if (!times) return null;
        if (foundTimes.length === 0) return null;

        return foundTimes;
    }

    render() {
        const { className, style } = this.props;
        const { state } = this;

        return (
            <div className={classNames(className, 'cc__opening-times')} style={style}>
                {
                    OpeningTimes.weekdays.map((day, index) => (
                        <Day
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            weekday={{
                                name: day,
                                number: index,
                            }}
                            times={state.times.filter(t => t.weekDay === index)}
                            onDayActivation={this.onDayActivation}
                            onAdd={this.onAdd}
                            onRemove={this.onRemove}
                            onChange={this.onChange}
                        />
                    ))
                }
            </div>
        );
    }
}

export default OpeningTimes;
