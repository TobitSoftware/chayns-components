import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isServer } from '../../utils/isServer';
import Groups from './content/Groups';
import Navigator from './content/Navigator';
import User from './content/User';

const WEEK_WIDTH = 50;

let focusWeek;
let isDesktop = isServer() ? false : window.innerWidth > 450;

export default class ProgressCalendar extends Component {
    static dateInterval(dateStart, dateEnd) {
        const startDate =
            dateStart.getDate() < 10
                ? `0${dateStart.getDate()}`
                : dateStart.getDate();
        const startMonth =
            dateStart.getMonth() + 1 < 10
                ? `0${dateStart.getMonth() + 1}`
                : dateStart.getMonth() + 1;
        const endDate =
            dateEnd.getDate() < 10
                ? `0${dateEnd.getDate()}`
                : dateEnd.getDate();
        const endMonth =
            dateEnd.getMonth() + 1 < 10
                ? `0${dateEnd.getMonth() + 1}`
                : dateEnd.getMonth() + 1;
        return `${startDate}.${startMonth} - ${endDate}.${endMonth}.${dateEnd.getFullYear()}`;
    }

    static getWeek(currentStart) {
        let monday;
        let sunday;
        if (currentStart.getDay() === 0) {
            monday = new Date(
                currentStart.getFullYear(),
                currentStart.getMonth(),
                currentStart.getDate() - 6
            );
            sunday = new Date(
                currentStart.getFullYear(),
                currentStart.getMonth(),
                currentStart.getDate(),
                23,
                59
            );
        } else {
            monday = new Date(
                currentStart.getFullYear(),
                currentStart.getMonth(),
                currentStart.getDate() - (currentStart.getDay() - 1)
            );
            sunday = new Date(
                currentStart.getFullYear(),
                currentStart.getMonth(),
                currentStart.getDate() + (7 - currentStart.getDay()),
                23,
                59
            );
        }
        return [monday, sunday];
    }

    static sortEntries(entries) {
        if (entries) {
            const temp = entries;
            for (let j = 1; j < temp.length; j += 1) {
                const entry = temp[j];
                let i = j - 1;
                while (i >= 0 && entry.startTime < temp[i].startTime) {
                    temp[i + 1] = temp[i];
                    i -= 1;
                }
                temp[i + 1] = entry;
            }
            return temp;
        }
        return null;
    }

    static realDay(day) {
        if (day.getDay() === 0) {
            return 6;
        }
        return day.getDay() - 1;
    }

    constructor() {
        super();

        this.state = {
            week: 0,
            focusGroup: null,
        };

        this.onNavigateLeft = this.onNavigateLeft.bind(this);
        this.onNavigateRight = this.onNavigateRight.bind(this);
        this.onClick = this.onClick.bind(this);
        this.groupOnClick = this.groupOnClick.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);

        if (!isServer()) {
            window.addEventListener('orientationchange', () => {
                isDesktop = window.screen.availWidth > 450;
                this.forceUpdate();
            });
        }
    }

    componentDidMount() {
        this.setState({
            contentWidth: this.content.clientWidth,
        });
        this.entries = this.getEntries();
    }

    shouldComponentUpdate(nextProps) {
        const { focus, data, columns, groups, startTime, endTime } = this.props;

        // eslint-disable-next-line guard-for-in,no-restricted-syntax
        for (const i in nextProps.data) {
            if (nextProps.data.length !== data.length) {
                this.entries = this.getEntries(
                    nextProps.data,
                    nextProps.startTime,
                    nextProps.endTime
                );
                return true;
            }
            if (nextProps.data[i].entries.length !== data[i].entries.length) {
                this.entries = this.getEntries(
                    nextProps.data,
                    nextProps.startTime,
                    nextProps.endTime
                );
                return true;
            }
        }
        if (
            nextProps.columns.length !== columns.length ||
            nextProps.groups.length !== groups.length ||
            nextProps.startTime.getTime() !== startTime.getTime() ||
            nextProps.endTime.getTime() !== endTime.getTime()
        ) {
            this.entries = this.getEntries(
                nextProps.data,
                nextProps.startTime,
                nextProps.endTime
            );
            return true;
        }
        if (nextProps.focus !== focus) {
            return true;
        }
        return true;
    }

    componentDidUpdate() {
        const { contentWidth } = this.state;
        if (contentWidth !== this.content.clientWidth) {
            // eslint-disable-next-line react/no-did-update-set-state
            this.setState({
                contentWidth: this.content.clientWidth,
            });
        }
    }

    handleTouchStart(event) {
        this.swipeX = event.touches[0].clientX;
    }

    handleTouchMove(event) {
        this.moveSwipeX = event.touches[0].clientX;
    }

    handleTouchEnd(leftHidden, rightHidden) {
        if (this.swipeX && this.moveSwipeX) {
            if (this.moveSwipeX >= this.swipeX + 60) {
                if (!leftHidden) {
                    this.onNavigateLeft();
                }
                this.swipeX = null;
                this.moveSwipeX = null;
                // this.move=null;
            } else if (this.moveSwipeX <= this.swipeX - 60) {
                if (!rightHidden) {
                    this.onNavigateRight();
                }
                this.swipeX = null;
                this.moveSwipeX = null;
            }
        }
    }

    onNavigateLeft() {
        const { onNavigateLeft } = this.props;
        const { week } = this.state;
        onNavigateLeft(this.weeks[focusWeek + (week - 1)]);
        this.setState({
            week: week - 1,
        });
    }

    onNavigateRight() {
        const { onNavigateRight } = this.props;
        const { week } = this.state;
        const factor = isDesktop ? 2 : 1;
        const retval = this.weeks[focusWeek + (week + factor)]
            ? this.weeks[focusWeek + (week + factor)]
            : [];
        onNavigateRight(retval);
        this.setState({
            week: week + 1,
        });
    }

    onClick(event, entry) {
        const { onClick, week } = this.state;
        onClick({ event, selected: entry });
        const dateTime = entry.date.getTime();
        const weekEnd = this.weeks[focusWeek + week][1];
        let buffer = 0;
        if (weekEnd < dateTime) {
            buffer = 1;
        }
        // eslint-disable-next-line no-restricted-syntax
        for (const i in this.weeks) {
            if (
                this.weeks[i][0] <= entry.date.getTime() &&
                this.weeks[i][1] >= entry.date.getTime()
            ) {
                focusWeek = i - buffer;
                break;
            }
        }
        this.setState({
            focusGroup: null,
            week: 0,
        });
    }

    getWeeks(startTime, endTime) {
        const { focus } = this.props;
        const retval = [];
        let currentStart = startTime;
        while (currentStart.getTime() < endTime.getTime()) {
            const [monday, sunday] = ProgressCalendar.getWeek(currentStart);
            const mondayTS = monday.getTime();
            const sundayTS = sunday.getTime();
            if (focus.getTime() >= mondayTS && focus.getTime() <= sundayTS) {
                focusWeek = retval.length;
            }
            retval.push([mondayTS, sundayTS]);
            currentStart = new Date(
                currentStart.getFullYear(),
                currentStart.getMonth(),
                currentStart.getDate() + 7
            );
        }
        this.weeks = retval;
        return retval;
    }

    getNavigatorDays(weekStart, weekEnd) {
        const { focus, columns } = this.props;
        const temp = [];
        let i = 0;
        const date = new Date(weekStart);
        const [nextWeekStart, nextWeekEnd] = ProgressCalendar.getWeek(
            new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7)
        );
        const weekDay = ProgressCalendar.realDay(focus);
        for (i; i < (isDesktop ? 2 : 1); i += 1) {
            const days = [];
            let j = 0;
            // eslint-disable-next-line no-restricted-syntax
            for (j in columns.names) {
                if (i === 0) {
                    days.push({
                        name: columns.names[j],
                        date: new Date(
                            weekStart.getFullYear(),
                            weekStart.getMonth(),
                            weekStart.getDate() + parseInt(j, 10)
                        ),
                    });
                } else if (i === 1) {
                    days.push({
                        name: columns.names[j],
                        date: new Date(
                            nextWeekStart.getFullYear(),
                            nextWeekStart.getMonth(),
                            nextWeekStart.getDate() + parseInt(j, 10)
                        ),
                    });
                }
            }
            temp.push(days);
        }
        if (focus.getTime() >= weekStart && focus.getTime() <= weekEnd) {
            temp[0][weekDay].selected = true;
        } else if (
            temp[1] &&
            focus.getTime() >= nextWeekStart.getTime() &&
            focus.getTime() <= nextWeekEnd.getTime()
        ) {
            temp[1][weekDay].selected = true;
        }
        return temp;
    }

    getEntries(dataParameter, startTimeParameter, endTimeParameter) {
        const {
            groups,
            data: dataProp,
            endTime: endTimeProp,
            startTime: startTimeProp,
        } = this.props;
        const data = dataParameter || dataProp;
        const startTime = startTimeParameter || startTimeProp;
        const endTime = endTimeParameter || endTimeProp;

        if (!startTime || !endTime) {
            return [];
        }

        const convertedEntries = [];
        const weeks = this.getWeeks(startTime, endTime);
        let i;
        // eslint-disable-next-line
        for (i in data) {
            const entries = ProgressCalendar.sortEntries(data[i].entries);
            const userEntries = [];
            let kIndex = 0;
            let j;
            if (entries) {
                // eslint-disable-next-line
                for (j in weeks) {
                    let m = 0;
                    const weekEntries = [];
                    for (m; m < 7; m += 1) {
                        let retval = {};
                        let k;
                        // eslint-disable-next-line no-shadow
                        let startTime = new Date(
                            weeks[j][0] + m * 24 * 60 * 60 * 1000
                        );
                        // eslint-disable-next-line no-shadow
                        let endTime = new Date(
                            startTime.getTime() +
                                (23 * 60 * 60 * 1000 + 59 * 60 * 1000)
                        );

                        startTime = startTime.getTime();
                        endTime = endTime.getTime();
                        for (k = kIndex; k < entries.length; k += 1) {
                            /**
                             * Only possible for entries, which are not longer than a day
                             */
                            if (
                                entries[k].startTime >= startTime &&
                                entries[k].endTime <= endTime
                            ) {
                                let l;
                                if (groups.length > 0) {
                                    let isGrouped = false;
                                    // eslint-disable-next-line no-restricted-syntax
                                    for (l in groups) {
                                        if (
                                            entries[k].groupId === groups[l].id
                                        ) {
                                            retval = entries[k];
                                            retval.color = groups[l].color;
                                            isGrouped = true;
                                            break;
                                        }
                                    }
                                    if (!isGrouped) {
                                        retval = entries[k];
                                    }
                                } else {
                                    retval = entries[k];
                                }
                                retval.date = new Date(startTime);
                                retval.user = {
                                    id: data[i].id,
                                    name: data[i].name,
                                };
                                kIndex = k + 1;
                            } else if (entries[k].endTime > endTime) {
                                break;
                            }
                        }
                        weekEntries.push(
                            retval.user
                                ? retval
                                : {
                                      date: new Date(startTime),
                                      user: {
                                          id: data[i].id,
                                          name: data[i].name,
                                      },
                                  }
                        );
                    }
                    userEntries.push(weekEntries);
                }
            }
            convertedEntries.push({ entries: userEntries, userId: data[i].id });
        }
        return convertedEntries;
    }

    groupOnClick(event, group) {
        const { focusGroup } = this.state;
        if (focusGroup === group.id) {
            this.setState({
                focusGroup: null,
            });
        } else {
            this.setState({
                focusGroup: group.id,
            });
        }
    }

    renderUser() {
        const { data } = this.props;
        if (this.content && data) {
            return (
                <div
                    className="calendar__content_groups"
                    style={{ width: '35%', paddingRight: '5px' }}
                >
                    {data.map((user) => (
                        <div className="calendar__user ellipsis" key={user.id}>
                            {user.name}
                        </div>
                    ))}
                </div>
            );
        }
        return '';
    }

    renderEntries() {
        const { contentWidth, week, focusGroup } = this.state;
        /**
         * TODO: PROBLEM WITH REF. REF GOT OLD WIDTH
         */
        const { focus, groups } = this.props;
        const wrapperWidth = this.weeks
            ? this.weeks.length * WEEK_WIDTH * (isDesktop ? 1 : 2)
            : 0;
        const weekWidth = this.content
            ? (contentWidth / 2) * (isDesktop ? 1 : 2)
            : 0;

        const content = this.content
            ? this.entries.map((entries) => (
                  <User
                      entries={entries.entries}
                      groups={groups}
                      key={entries.userId}
                      onClick={this.onClick}
                      focus={focus}
                      groupFocus={focusGroup}
                      weekWidth={weekWidth}
                  />
              ))
            : '';

        return (
            // eslint-disable-next-line no-return-assign
            <div
                className="calendar__content_weeks"
                ref={(ref) => {
                    this.content = ref;
                }}
            >
                <div
                    className="calendar__content_wrapper"
                    style={{
                        width: `${wrapperWidth}%`,
                        transform: `translateX(${
                            -1 * (focusWeek + week) * weekWidth
                        }px)`,
                    }}
                >
                    {content}
                </div>
            </div>
        );
    }

    render() {
        const { week, focusGroup } = this.state;
        const { className, style, startTime, endTime, groups } = this.props;

        let navText = '';
        let [weekStart, weekEnd] = [new Date(), new Date()];
        let days;
        if (this.weeks) {
            [weekStart, weekEnd] = this.weeks[focusWeek + week];
            weekStart = new Date(weekStart);
            weekEnd = new Date(weekEnd);
            if (isDesktop) {
                const start = weekStart;
                const end = new Date(
                    start.getFullYear(),
                    start.getMonth(),
                    start.getDate() + 13
                );
                navText = `${ProgressCalendar.dateInterval(start, end)}`;
            } else {
                const start = weekStart;
                const end = new Date(
                    start.getFullYear(),
                    start.getMonth(),
                    start.getDate() + 6
                );
                navText = `${ProgressCalendar.dateInterval(start, end)}`;
            }
            days = this.getNavigatorDays(weekStart, weekEnd);
        }

        const leftHidden = weekStart.getTime() <= startTime;
        const rightHidden = isDesktop
            ? new Date(
                  weekEnd.getFullYear(),
                  weekEnd.getMonth(),
                  weekEnd.getDate() + 7
              ).getTime() >= endTime
            : weekEnd.getTime() >= endTime;

        return (
            <div className={classNames('calendar', className)} style={style}>
                <div
                    className="calendar_header"
                    onTouchMove={this.handleTouchMove}
                    onTouchStart={this.handleTouchStart}
                    onTouchEnd={() =>
                        this.handleTouchEnd(leftHidden, rightHidden)
                    }
                >
                    <Navigator
                        text={navText}
                        onClick={{
                            left: this.onNavigateLeft,
                            right: this.onNavigateRight,
                            day: this.onClick,
                        }}
                        hidden={{
                            left: leftHidden,
                            right: rightHidden,
                        }}
                        days={days}
                    />
                </div>
                <div
                    className="calendar__content"
                    onTouchMove={this.handleTouchMove}
                    onTouchStart={this.handleTouchStart}
                    onTouchEnd={() =>
                        this.handleTouchEnd(leftHidden, rightHidden)
                    }
                >
                    {this.renderUser()}
                    {this.renderEntries()}
                </div>
                <Groups
                    groups={groups}
                    onClick={this.groupOnClick}
                    focus={focusGroup}
                />
            </div>
        );
    }
}

ProgressCalendar.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            entries: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number,
                    groupId: PropTypes.number,
                    startTime: PropTypes.number,
                    endTime: PropTypes.number,
                })
            ),
        })
    ),
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            names: PropTypes.arrayOf(PropTypes.string),
            highlightedColor: PropTypes.string,
        })
    ),
    groups: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
            color: PropTypes.string,
        })
    ),
    onNavigateLeft: PropTypes.func,
    onNavigateRight: PropTypes.func,
    focus: PropTypes.objectOf(Date),
    startTime: PropTypes.objectOf(Date).isRequired,
    endTime: PropTypes.objectOf(Date).isRequired,
    className: PropTypes.string,
    style: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    ),
};

ProgressCalendar.defaultProps = {
    data: null,
    columns: {
        names: ['Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.', 'So.'],
        highlightedColor: isServer() ? undefined : chayns.env.site.color,
    },
    groups: [],
    focus: new Date(),
    onNavigateRight: () => {},
    onNavigateLeft: () => {},
    className: null,
    style: null,
};

ProgressCalendar.displayName = 'GridCalendar';
