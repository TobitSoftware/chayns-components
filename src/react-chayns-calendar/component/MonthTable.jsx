/* eslint-disable react/no-array-index-key,no-underscore-dangle */
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import areDatesEqual from '../utils/areDatesEqual';
import DateStorage from '../utils/DateStorage';
import DayItem from './DayItem';

const DAYS = {
    de: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
    en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
};

function getDayNames(language = chayns.env.language) {
    return DAYS[language] || DAYS.de;
}

export default class MonthTable extends PureComponent {
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
            for (
                let l = 0;
                highlighted[k].dates && l < highlighted[k].dates.length;
                l += 1
            ) {
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

    static getCategoryData(categories, date) {
        if (!categories) {
            return null;
        }

        return categories
            .filter((c) => areDatesEqual(new Date(c.date), date))
            .map((c) => c.color);
    }

    createTable() {
        const { startDate } = this.props;

        const _table = [];
        let normalWeekStart;

        if (startDate.getDay() > 0) {
            normalWeekStart = DateStorage.From(
                startDate.getFullYear(),
                startDate.getMonth(),
                9 - startDate.getDay()
            );
        } else {
            normalWeekStart = DateStorage.From(
                startDate.getFullYear(),
                startDate.getMonth(),
                2 - startDate.getDay()
            );
        }

        for (let i = 0; i < 6; i += 1) {
            const _row = [];

            if (i === 0) {
                if (startDate.getDay() > 0) {
                    for (let j = 2; j <= startDate.getDay(); j += 1) {
                        _row.push({
                            date: DateStorage.From(
                                startDate.getFullYear(),
                                startDate.getMonth(),
                                startDate.getDay() * -1 + j
                            ),
                            inMonth: false,
                        });
                    }
                    for (let k = 1; k <= 8 - startDate.getDay(); k += 1) {
                        _row.push({
                            date: DateStorage.From(
                                startDate.getFullYear(),
                                startDate.getMonth(),
                                k
                            ),
                            inMonth: true,
                        });
                    }
                } else {
                    for (let j = 6; j > 0; j -= 1) {
                        _row.push({
                            date: DateStorage.From(
                                startDate.getFullYear(),
                                startDate.getMonth(),
                                startDate.getDate() - j
                            ),
                            inMonth: false,
                        });
                    }

                    _row.push({
                        date: DateStorage.From(
                            startDate.getFullYear(),
                            startDate.getMonth(),
                            startDate.getDate()
                        ),
                        inMonth: true,
                    });
                }
            } else {
                for (let j = 0; j < 7; j += 1) {
                    const _date = DateStorage.From(
                        normalWeekStart.getFullYear(),
                        normalWeekStart.getMonth(),
                        normalWeekStart.getDate() + j
                    );
                    if (_date.getMonth() === startDate.getMonth()) {
                        _row.push({
                            date: _date,
                            inMonth: true,
                        });
                    } else {
                        _row.push({
                            date: _date,
                            inMonth: false,
                        });
                    }
                }
                normalWeekStart = DateStorage.From(
                    normalWeekStart.getFullYear(),
                    normalWeekStart.getMonth(),
                    normalWeekStart.getDate() + 7
                );
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
            circleColor,
            categories,
            onDateSelect,
        } = this.props;
        const _table = this.createTable();

        const daysList = getDayNames();

        return (
            <div className="month__table noselect">
                <div className="day__row">
                    {daysList.map((day, index) => (
                        <div
                            className="day__item--text chayns__color--headline"
                            key={index}
                        >
                            {day}
                        </div>
                    ))}
                </div>
                {_table.map((row, index) => (
                    <div className="day__row" key={index}>
                        {/* TODO: SELECTED DATE SHOULD NOT HAVE EVENT LISTENER */}
                        {row.map((day) => {
                            const { style, highlighted } =
                                MonthTable.getHighlightedData(
                                    highlightedList,
                                    day.date
                                );

                            return (
                                <DayItem
                                    key={day.date.getTime()}
                                    date={day.date}
                                    inMonth={day.inMonth}
                                    categories={MonthTable.getCategoryData(
                                        categories,
                                        day.date
                                    )}
                                    activateAll={activateAll}
                                    activated={MonthTable.isActivated(
                                        activated,
                                        day.date
                                    )}
                                    selected={selected}
                                    highlightStyle={style}
                                    highlighted={highlighted}
                                    circleColor={circleColor}
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

MonthTable.propTypes = {
    onDateSelect: PropTypes.func,
    activateAll: PropTypes.bool,
    startDate: PropTypes.instanceOf(Date),
    selected: PropTypes.instanceOf(Date),
    activated: PropTypes.arrayOf(Date),
    highlighted: PropTypes.arrayOf(
        PropTypes.shape({
            dates: PropTypes.arrayOf(Date).isRequired,
            // eslint-disable-next-line react/forbid-prop-types
            style: PropTypes.object,
        })
    ),
    categories: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.oneOfType([
                PropTypes.instanceOf(Date),
                PropTypes.string,
            ]),
            color: PropTypes.string,
        })
    ),
    circleColor: PropTypes.string,
};

MonthTable.defaultProps = {
    selected: null,
    activated: null,
    highlighted: null,
    circleColor: null,
    categories: null,
    startDate: null,
    activateAll: true,
    onDateSelect: null,
};

MonthTable.displayName = 'MonthTable';
