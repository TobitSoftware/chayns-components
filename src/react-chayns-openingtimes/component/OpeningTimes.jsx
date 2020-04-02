/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Day from './Day';
import TimeSpan from './TimeSpan';
import './OpeningTimes.scss';

import { getTimeStringMinutes, getTimeStringFromMinutes } from '../../utils/dateTimeHelper';

class OpeningTimes extends Component {
    constructor(props) {
        super(props);

        this.onAdd = this.onAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onDayActivation = this.onDayActivation.bind(this);

        const { times } = this.props;

        for (let i = 0; i < times.length; i += 1) {
            const current = times[i];
            if (current && (current.disabled === null || current.disabled === undefined)) current.disabled = false;
        }

        for (let i = 0; i < OpeningTimes.weekdays.length; i += 1) {
            if (times.findIndex((element) => element.weekDay === i) < 0) {
                times.push({
                    weekDay: i,
                    start: TimeSpan.defaultStart,
                    end: TimeSpan.defaultEnd,
                    disabled: true,
                });
            }
        }

        this.state = {
            times,
        };
    }

    onAdd(weekDay) {
        const { onChange } = this.props;
        const newState = { ...this.state };
        const foundTimes = newState.times.filter((time) => time.weekDay === weekDay);

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
        const { onChange } = this.props;
        const newState = { ...this.state };

        const timesOfDay = newState.times.filter((time) => time.weekDay === day).filter((time, index) => index !== span);
        const otherTimes = newState.times.filter((time) => time.weekDay !== day);

        newState.times = [...timesOfDay, ...otherTimes];

        if (onChange) {
            this.setState(newState);
            onChange(newState.times);
        }
    }

    onChange(day, index, start, end) {
        // eslint-disable-next-line no-nested-ternary
        const { times } = this.state;
        const { onChange } = this.props;

        const newState = { ...this.state };

        if (onChange) {
            const timesOfDay = newState.times.filter((time) => time.weekDay === day);
            timesOfDay[index].start = start;
            timesOfDay[index].end = end;
            this.setState(newState);
            onChange(times);
        }
    }

    onDayActivation(day, status) {
        const { onChange } = this.props;
        const newState = { ...this.state };
        const timesOfDay = newState.times.filter((time) => time.weekDay === day);
        const defaultTime = {
            weekDay: day,
            start: '08:00',
            end: '18:00',
            disabled: false,
        };

        if (timesOfDay.length === 0) {
            timesOfDay.push(defaultTime);
        }

        if (status) {
            if (newState.times.length === newState.times.filter((time) => time.disabled).length || newState.times.length === 0) {
                if (newState.times.find((time) => time.weekDay === day)) {
                    newState.times = newState.times.map((time) => (time.weekDay === day ? {
                        weekDay: time.weekDay,
                        start: time.start,
                        end: time.end,
                        disabled: !time.disabled,
                    } : time));
                } else newState.times.push(defaultTime);
            }
            // else newState.times = this.applyPreviousTimes(day, status);
            let foundTimeForDay = false;
            for (let i = 0; i < newState.times.length; i += 1) {
                if (newState.times[i].weekDay === day) {
                    if (newState.times[i].disabled === true) {
                        newState.times[i].disabled = false;
                    }
                    foundTimeForDay = true;
                }
            }
            if (!foundTimeForDay) newState.times.push(defaultTime);
        } else {
            for (let i = 0; i < timesOfDay.length; i += 1) {
                const current = timesOfDay[i];
                if (current.weekDay === day) current.disabled = true;
            }
        }

        this.setState(newState);
        if (onChange) onChange(newState.times);
    }

    render() {
        const { className, style } = this.props;
        const { state } = this;
        return (
            <div className={classNames(className, 'cc__opening_times')} style={style}>
                {
                    OpeningTimes.weekdays.map((day, index) => (
                        <Day
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            weekday={{
                                name: day,
                                number: index,
                            }}
                            times={state.times.filter((t) => t.weekDay === index)}
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

OpeningTimes.weekdays = [
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag',
    'Sonntag',
];

OpeningTimes.propTypes = {
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

OpeningTimes.defaultProps = {
    onChange: null,
    className: null,
    style: null,
};

OpeningTimes.displayName = 'OpeningTimes';

export default OpeningTimes;
