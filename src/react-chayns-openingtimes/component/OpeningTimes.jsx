import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Day from './Day';

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
    }

    onAdd(weekDay, start, end) {
        this.applyPreviousTimes(weekDay); // TEMP
        const { times, onChange } = this.props;
        if (onChange) {
            onChange(times.concat({
                weekDay,
                start,
                end,
                disabled: false,
            }));
        }
    }

    onRemove(day, span) {
        const { times, onChange } = this.props;
        if (onChange) {
            const timesOfDay = times.filter(t => t.weekDay === day);
            // eslint-disable-next-line no-nested-ternary
            const elm = timesOfDay.sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0))[span];
            const newTimes = times.slice().filter(t => !(t.weekDay === elm.weekDay && t.start === elm.start && t.end === elm.end));

            onChange(newTimes);
        }
    }

    onChange(day, span, start, end) {
        // eslint-disable-next-line no-nested-ternary
        const { times, onChange } = this.props;
        if (onChange) {
            const timesOfDay = times.filter(t => t.weekDay === day);
            // eslint-disable-next-line no-nested-ternary
            const elm = timesOfDay.sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0))[span];
            const newTimes = times.slice();
            for (let i = 0; i < newTimes.length; i += 1) {
                const t = newTimes[i];
                if (t.weekDay === elm.weekDay && t.start === elm.start && t.end === elm.end) {
                    t.start = start;
                    t.end = end;
                    break;
                }
            }
            onChange(newTimes);
        }
    }

    onDayActivation(day, status) {
        const { times, onChange } = this.props;
        if (onChange) {
            const newTimes = times.slice();
            newTimes.forEach((t) => {
                if (t.weekDay === day) {
                    // eslint-disable-next-line no-param-reassign
                    t.disabled = !status;
                }
            });
            onChange(newTimes);
        }
    }

    applyPreviousTimes(startDay) {
        console.log(this.getWeekDayTimes(this.getLatestPreviousWeekDay(startDay)));
    }

    getLatestPreviousWeekDay(startDay) {
        const { times } = this.props;
        let latest = 0;

        if (!times) return null;

        for (let i = 0; i < times.length; i += 1) {
            if (times[i].weekDay < startDay && times[i].weekDay > latest && !times[i].disabled) latest = times[i].weekDay;
        }

        return latest;
    }

    getWeekDayTimes(weekDay) {
        const { times } = this.props;
        if (!times) return null;
        return times.filter(item => item.weekDay === weekDay);
    }

    render() {
        const { times, className, style } = this.props;
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
                            times={times.filter(t => t.weekDay === index)}
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
