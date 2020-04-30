/* eslint-disable react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Day from './Day';
import TimeSpan from './TimeSpan';
import './OpeningTimes.scss';

import { getTimeStringMinutes, getTimeStringFromMinutes } from '../../utils/dateTimeHelper';
import validateOpeningTimes from '../utils/validateOpeningTimes';
import OpeningTimesHint, { HINT_POSITIONS } from './OpeningTimesHint';
import debounce from '../../utils/debounce';

class OpeningTimes extends Component {
    constructor(props) {
        super(props);

        this.onAdd = this.onAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onDayActivation = this.onDayActivation.bind(this);
        this.validateState = this.validateState.bind(this);
        this.onValidateStateDebounce = debounce(this.onValidateState.bind(this), 1000);

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
            timesValid: validateOpeningTimes(times),
        };
    }

    onAdd(weekDay) {
        const { onChange } = this.props;
        const newState = { ...this.state };
        const foundTimes = newState.times.filter((time) => time.weekDay === weekDay);

        let oldEnd = getTimeStringMinutes(foundTimes[0].end);
        if (oldEnd === 0) {
            oldEnd = 24 * 60;
        }

        let newStart = oldEnd + 60;
        if (oldEnd < 18 * 60) {
            newStart = 18 * 60;
        }
        if (newStart > 24 * 60) {
            newStart = Math.max(24 * 60 - 1, oldEnd);
        }

        let newEnd = newStart + 2 * 60;
        if (newEnd > 24 * 60) {
            newEnd = 24 * 60;
        }

        newState.times.push({
            weekDay,
            start: getTimeStringFromMinutes(newStart),
            end: getTimeStringFromMinutes(newEnd),
            disabled: false,
        });

        const openingTimesValid = validateOpeningTimes(newState.times);
        this.setState(newState);
        this.validateState(openingTimesValid);
        if (onChange) onChange(newState.times, openingTimesValid);
    }

    onRemove(day, span) {
        const { onChange } = this.props;
        const newState = { ...this.state };

        const timesOfDay = newState.times.filter((time) => time.weekDay === day).filter((time, index) => index !== span);
        const otherTimes = newState.times.filter((time) => time.weekDay !== day);

        newState.times = [...timesOfDay, ...otherTimes];

        if (onChange) {
            const openingTimesValid = validateOpeningTimes(newState.times);
            this.setState(newState);
            this.validateState(openingTimesValid);
            onChange(newState.times, openingTimesValid);
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

            const openingTimesValid = validateOpeningTimes(newState.times);
            this.setState(newState);
            this.validateState(openingTimesValid);

            onChange(times, openingTimesValid);
        }
    }

    onDayActivation(day, status) {
        const { onChange } = this.props;
        const newState = { ...this.state };
        const timesOfDay = newState.times.filter((time) => time.weekDay === day);
        const defaultTime = {
            weekDay: day,
            start: '08:00',
            end: '17:00',
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

        const openingTimesValid = validateOpeningTimes(newState.times);
        this.setState(newState);
        this.validateState(openingTimesValid);
        if (onChange) onChange(newState.times, openingTimesValid);
    }

    onValidateState() {
        const { times } = this.state;

        const timesValid = validateOpeningTimes(times);

        this.setState({
            timesValid,
        });
    }

    validateState(valid = false) {
        if (valid) {
            this.setState({
                timesValid: valid,
            });
        } else {
            this.onValidateStateDebounce();
        }
    }

    render() {
        const { className, style, forceMobile, hintPosition, hintText } = this.props;
        const { times, timesValid } = this.state;

        return (
            <div className={classNames(className, 'cc__opening_times', { 'cc__opening_times--force-mobile': forceMobile })} style={style}>
                {!timesValid && hintPosition === OpeningTimes.hintPositions.TOP && (
                    <OpeningTimesHint content={hintText} position={hintPosition}/>
                )}
                {OpeningTimes.weekdays.map((day) => (
                    <Day
                        // eslint-disable-next-line react/no-array-index-key
                        key={day.number}
                        weekday={day}
                        times={times.filter((t) => t.weekDay === day.number)}
                        onDayActivation={this.onDayActivation}
                        onAdd={this.onAdd}
                        onRemove={this.onRemove}
                        onChange={this.onChange}
                    />
                ))}
                {!timesValid && hintPosition === OpeningTimes.hintPositions.BOTTOM && (
                    <OpeningTimesHint content={hintText} position={hintPosition}/>
                )}
            </div>
        );
    }
}

OpeningTimes.hintPositions = HINT_POSITIONS;

OpeningTimes.weekdays = [
    {
        name: 'Montag',
        number: 1,
    },
    {
        name: 'Dienstag',
        number: 2,
    },
    {
        name: 'Mittwoch',
        number: 3,
    },
    {
        name: 'Donnerstag',
        number: 4,
    },
    {
        name: 'Freitag',
        number: 5,
    },
    {
        name: 'Samstag',
        number: 6,
    },
    {
        name: 'Sonntag',
        number: 0,
    },
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
    forceMobile: PropTypes.bool,
    hintPosition: PropTypes.oneOf([
        OpeningTimes.hintPositions.NONE,
        OpeningTimes.hintPositions.TOP,
        OpeningTimes.hintPositions.BOTTOM,
    ]),
    hintText: PropTypes.string,
};

OpeningTimes.defaultProps = {
    onChange: null,
    className: null,
    style: null,
    forceMobile: false,
    hintPosition: OpeningTimes.hintPositions.TOP,
    hintText: '',
};

OpeningTimes.displayName = 'OpeningTimes';

export default OpeningTimes;
