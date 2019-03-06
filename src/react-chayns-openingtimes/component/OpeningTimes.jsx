import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Day from './Day';

class OpeningTimes extends Component {
    static propTypes = {
        days: PropTypes.arrayOf(PropTypes.shape({
            weekDay: PropTypes.number.isRequired,
            times: PropTypes.arrayOf(PropTypes.shape({
                start: PropTypes.string.isRequired,
                end: PropTypes.string.isRequired,
            })),
            disabled: PropTypes.bool,
        })).isRequired,
        onChange: PropTypes.func.isRequired,
        onAdd: PropTypes.func.isRequired,
        onRemove: PropTypes.func.isRequired,
        onDayAdd: PropTypes.func.isRequired,
        onDayRemove: PropTypes.func.isRequired,
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
    }

    onAdd(weekDay, start, end) {
        const { days, onAdd } = this.props;
        if (onAdd) {
            const retVal = days;

            const day = retVal.find(x => x.weekDay === weekDay);
            let slots = day.times;
            slots = slots.concat({
                start,
                end,
            });
            day.times = slots;
            onAdd(retVal, day);
        }
    }

    onDayAdd = (weekDay, start, end) => {
        const { days, onDayAdd } = this.props;
        if (onDayAdd) {
            const newDays = days;
            newDays.sort((a, b) => a.weekDay - b.weekDay);

            onDayAdd(newDays.concat({
                weekDay,
                day: OpeningTimes.weekdays[weekDay],
                disabled: false,
                times: [
                    {
                        start,
                        end,
                    },
                ],
            }), {
                weekDay,
                day: OpeningTimes.weekdays[weekDay],
                disabled: false,
                times: [
                    {
                        start,
                        end,
                    },
                ],
            });
        }
    };

    onDayRemove = (weekDay) => {
        const { days, onDayRemove } = this.props;
        if (onDayRemove) {
            const newTimes = days.slice();
            const itemIndex = newTimes.findIndex(x => x.weekDay === weekDay);
            newTimes.splice(itemIndex, 1);
            onDayRemove(newTimes, days[itemIndex]);
        }
    };

    onRemove(day, span) {
        const { days, onRemove } = this.props;

        if (onRemove) {
            const dayIndex = days.findIndex(t => t.weekDay === day);
            // eslint-disable-next-line no-nested-ternary
            const elm = days[dayIndex].times[span];
            const newTimes = days.slice()[dayIndex].times.filter(t => !(t.weekDay === elm.weekDay && t.start === elm.start && t.end === elm.end));
            const output = days;
            output[dayIndex].times = newTimes;
            onRemove(output, output[dayIndex]);
        }
    }

    onChange(day, span, start, end) {
        // eslint-disable-next-line no-nested-ternary

        const { days, onChange } = this.props;
        if (onChange) {
            const newTime = {
                start,
                end,
            };
            const dayObj = days[day];
            dayObj.times[span] = newTime;
            const newTimes = days.slice();
            const objIndex = newTimes.findIndex(x => x.weekDay === day);
            newTimes[objIndex] = dayObj;
            onChange(newTimes, dayObj);
        }
    }

    render() {
        const { days } = this.props;
        return (
            <div className="cc__opening-times">
                {
                    OpeningTimes.weekdays.map((day, index) => (
                        <Day
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            weekday={{
                                name: day,
                                number: index,
                            }}
                            times={days && days.find(x => x.weekDay === index) && days.find(x => x.weekDay === index).times ? days.find(x => x.weekDay === index).times : []}
                            defaultStart={days && days.length > 0 && days[0].times && days[0].times.length > 0 ? days[0].times[0].start : '08:00'}
                            defaultEnd={days && days.length > 0 && days[0].times && days[0].times.length > 0 ? days[0].times[0].end : '18:00'}
                            disabled={!((days && days.find(x => x.weekDay === index) && days.find(x => x.weekDay === index).length === 0) || (days && days.find(x => x.weekDay === index) && days.find(x => x.weekDay === index).disabled) === false)}
                            onDayRemove={this.onDayRemove}
                            onDayAdd={this.onDayAdd}
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
