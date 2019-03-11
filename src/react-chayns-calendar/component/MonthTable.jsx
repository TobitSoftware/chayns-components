/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DayItem from './DayItem';
import DateStorage from '../utils/DateStorage';
import areDatesEqual from '../utils/areDatesEqual';

const DAYS = {
    de: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
};

function getDayNames(language = chayns.env.language) {
    return DAYS[language] || DAYS.de;
}

export default class MonthTable extends PureComponent {
    static propTypes = {
        onDateSelect: PropTypes.func.isRequired,
        activateAll: PropTypes.func,
        startDate: PropTypes.instanceOf(Date).isRequired,
        selected: PropTypes.instanceOf(Date),
        activated: PropTypes.bool,
        highlighted: PropTypes.bool,
    };

    static defaultProps = {
        selected: null,
        activated: false,
        highlighted: false,
        activateAll: null,
    };

    static isActivated(activated, date) {
        for (let i = 0; i < activated.length; i += 1) {
            if (areDatesEqual(activated[i], date)) {
                return true;
            }
        }

        return false;
    }

    static getHighlightedData(highlighted, date) {
        for (let k = 0; k < highlighted.length; k += 1) {
            for (let l = 0; highlighted[k].dates && l < highlighted[k].dates.length; l += 1) {
                if (areDatesEqual(highlighted[k].dates[l], date)) {
                    return {
                        highlighted: true,
                        style: highlighted[k].style || null,
                    };
                }
            }
        }

        return {
            highlighted: false,
            style: null,
        };
    }

    createTable() {
        const { startDate } = this.props;

        const _table = [];
        let normalWeekStart;

        if (startDate.getDay() > 0) {
            normalWeekStart = DateStorage.From(startDate.getFullYear(), startDate.getMonth(), (9 - startDate.getDay()));
        } else {
            normalWeekStart = DateStorage.From(startDate.getFullYear(), startDate.getMonth(), (2 - startDate.getDay()));
        }

        for (let i = 0; i < 6; i += 1) {
            const _row = [];

            if (i === 0) {
                if (startDate.getDay() > 0) {
                    for (let j = 2; j <= startDate.getDay(); j += 1) {
                        _row.push({
                            date: DateStorage.From(startDate.getFullYear(), startDate.getMonth(), (startDate.getDay() * -1) + j),
                            inMonth: false
                        });
                    }
                    for (let k = 1; k <= (8 - startDate.getDay()); k += 1) {
                        _row.push({
                            date: new DateStorage.From(startDate.getFullYear(), startDate.getMonth(), k),
                            inMonth: true
                        });
                    }
                } else {
                    for (let j = 6; j > 0; j -= 1) {
                        _row.push({
                            date: new DateStorage.From(startDate.getFullYear(), startDate.getMonth(), startDate.getDay() - j),
                            inMonth: false
                        });
                    }

                    _row.push({
                        date: DateStorage.From(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()),
                        inMonth: true
                    });
                }
            } else {
                for(let j = 0; j < 7; j += 1) {
                    const _date = DateStorage.From(normalWeekStart.getFullYear(), normalWeekStart.getMonth(), normalWeekStart.getDate() + j);
                    if (_date.getMonth() === startDate.getMonth()) {
                        _row.push({
                            date: _date,
                            inMonth: true
                        });
                    } else {
                        _row.push({
                            date: _date,
                            inMonth: false
                        });
                    }
                }
                normalWeekStart = DateStorage.From(normalWeekStart.getFullYear(), normalWeekStart.getMonth(), normalWeekStart.getDate() + 7);
            }
            _table.push(_row);
        }
        return _table;
    }

    render() {
        const {
            activateAll,
            activated,
            selected,
            highlighted: highlightedList,
            onDateSelect,
        } = this.props;
        const _table = this.createTable();

        const daysList = getDayNames();

        return(
            <div className="month__table noselect">
                <div className="day__row">
                    {daysList.map((day, index) => (
                        <div
                            className="day__item--text chayns__color--100"
                            key={index}
                        >
                            {day}
                        </div>
                    ))}
                </div>
                {_table.map((row, index) => (
                    <div
                        className="day__row"
                        key={index}
                    >
                    {/* TODO: SELECTED DATE SHOULD NOT HAVE EVENT LISTENER */}
                        {row.map((day) => {
                            const { style, highlighted } = MonthTable.getHighlightedData(highlightedList, day.date);

                            return (
                                <DayItem
                                    key={day.date.getTime()}
                                    date={day.date}
                                    inMonth={day.inMonth}
                                    activateAll={activateAll}
                                    activated={MonthTable.isActivated(activated, day.date)}
                                    selected={selected}
                                    highlightStyle={style}
                                    highlighted={highlighted}
                                    onDateSelect={onDateSelect}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    }
}
