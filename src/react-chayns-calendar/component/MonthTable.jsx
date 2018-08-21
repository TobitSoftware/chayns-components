/* eslint-disable react/no-array-index-key, jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

export default class MonthTable extends Component {
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

    /**
     * Compares two dates with year, month and date (looser equality than == operator)
     * @param {Date} date1 - First date for comparison
     * @param {Date} date2 - First date for comparison
     */
    static areDatesEqual(date1, date2) {
        return date1.getUTCFullYear() === date2.getUTCFullYear() && date1.getUTCMonth() === date2.getUTCMonth() && date1.getUTCDate() === date2.getUTCDate();
    }

    createTable() {
        const { startDate } = this.props;

        const _table = [];
        let normalWeekStart;

        if (startDate.getDay() > 0) {
            normalWeekStart = new Date(startDate.getFullYear(), startDate.getMonth(), (9 - startDate.getDay()));
        } else {
            normalWeekStart = new Date(startDate.getFullYear(), startDate.getMonth(), (2 - startDate.getDay()));
        }

        for (let i = 0; i < 6; i += 1) {
            const _row = [];

            if (i === 0) {
                if (startDate.getDay() > 0) {
                    for (let j = 2; j <= startDate.getDay(); j += 1) {
                        _row.push({
                            date: new Date(startDate.getFullYear(), startDate.getMonth(), (startDate.getDay() * -1) + j),
                            inMonth: false
                        });
                    }
                    for (let k = 1; k <= (8 - startDate.getDay()); k += 1) {
                        _row.push({
                            date: new Date(startDate.getFullYear(), startDate.getMonth(), k),
                            inMonth: true
                        });
                    }
                } else {
                    for (let j = 6; j > 0; j -= 1) {
                        _row.push({
                            date: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDay() - j),
                            inMonth: false
                        });
                    }

                    _row.push({
                        date: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()),
                        inMonth: true
                    });
                }
            } else {
                for(let j = 0; j < 7; j += 1) {
                    const _date = new Date(normalWeekStart.getFullYear(), normalWeekStart.getMonth(), normalWeekStart.getDate() + j);
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
                normalWeekStart = new Date(normalWeekStart.getFullYear(), normalWeekStart.getMonth(), normalWeekStart.getDate() + 7);
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
            highlighted,
            onDateSelect,
        } = this.props;
        const _table = this.createTable();

        return(
            <div className="month__table noselect">
                <div className="day__row">
                    {DAYS.map((day, index) => (
                        <div
                            className="day__item day-text chayns__color--100"
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
                            let _active = activateAll;
                            let _selected = false;
                            let _marked = false;
                            let _highlighted = false;
                            let _onClick = false;
                            let _className = 'day__item day-in-month';
                            const _style = {};

                            if (_active) {
                                _onClick = true;
                            }

                            if (activated) {
                                for (let i = 0; i < activated.length; i += 1) {
                                    if (MonthTable.areDatesEqual(activated[i], day.date)) {
                                        _active = true;
                                        _marked = true;
                                        _onClick = true;
                                        break;
                                    }
                                }
                            }

                            if (selected && MonthTable.areDatesEqual(selected, day.date)) {
                                _active = true;
                                _selected = true; // `-is-active-is-selected${_marked} chayns__color--100`;
                            }

                            if (highlighted instanceof Array) {
                                for (let k = 0; k < highlighted.length; k += 1) {
                                    for (let l = 0; highlighted[k].dates && l < highlighted[k].dates.length; l += 1) {
                                        if (MonthTable.areDatesEqual(highlighted[k].dates[l], day.date)) {
                                            _active = true;
                                            _marked = true;
                                            _onClick = true;
                                            _highlighted = true;
                                            if (highlighted[k].color) {
                                                _style.backgroundColor = `${highlighted[k].color}`;
                                            }
                                        }
                                    }
                                }
                            } else if (highlighted && highlighted.dates) {
                                for (let k = 0; k < highlighted.dates.length; k += 1) {
                                    if (MonthTable.areDatesEqual(highlighted.dates[k], day.date)) {
                                        _active = true;
                                        _marked = true;
                                        _onClick = true;
                                        _highlighted = true;
                                        if (highlighted.color) {
                                            _style.backgroundColor = `${highlighted.color}`;
                                        }
                                        break;
                                    }
                                }
                            }

                            if (day.inMonth) {
                                _className = classNames('day__item day-in-month', {
                                    'is-active': _active,
                                    'is-deactive': !_active,
                                    'is-selected': _selected,
                                    'is-marked': _marked,
                                    'is-marked-is-highlighted': _marked && _highlighted,
                                    'chayns__background-color--80 chayns__color--5': _active && _marked,
                                    'chayns__background-color--80': !_active && _marked && !_selected

                                });

                                if (_onClick && onDateSelect) {
                                    return (
                                        <div
                                            className={_className}
                                            style={_style}
                                            key={day.date.getTime()}
                                            onClick={() => onDateSelect(day.date)}
                                        >
                                            {day.date.getDate()}
                                        </div>
                                    );
                                }

                                return (
                                    <div
                                        className={_className}
                                        style={_style}
                                        key={day.date.getTime()}
                                    >
                                        {day.date.getDate()}
                                    </div>
                                );
                            }

                            return (
                                <div
                                    className="day__item day-out-month"
                                    key={day.date.getTime()}
                                >
                                    {day.date.getDate()}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        );
    }
}
