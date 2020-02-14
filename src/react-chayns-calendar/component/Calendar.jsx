/* eslint-disable react/no-array-index-key,jsx-a11y/click-events-have-key-events,no-underscore-dangle,react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';

import Month from './Month';
import areDatesEqual from '../utils/areDatesEqual';
import Icon from '../../react-chayns-icon/component/Icon';


const TODAY = new Date();
const MONTH_NAMES = {
    de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

function getMonthNames(language = chayns.env.language) {
    return MONTH_NAMES[language] || MONTH_NAMES.de;
}

export default class Calendar extends Component {
    static IsMobile = () => window.matchMedia('(max-width: 450px)').matches;

    constructor(props) {
        super();

        this.state = {
            focus: new Date(),
            months: [],
        };

        this.navigateLeftOnClick = this.navigateLeftOnClick.bind(this);
        this.navigateRightOnClick = this.navigateRightOnClick.bind(this);

        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);

        // TODO: SELECTED SHOULD NOT BE OUTSIDE THE START AND END TIME.
        //  ADDITIONALLY SELECTED SHOULD BE THE FIRST DATE IN TIME CONTEXT, NOT THE FIRST DATE OF THE LIST
        const { selected } = props;

        const active = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate());
        this.setMonths(active);
    }

    setMonths(_focus, translate) {
        const { setTimeout } = window;

        const OFFSET = Calendar.IsMobile() ? -50 : -25;

        if (this.timeout) {
            clearTimeout(this.timeout);

            this.setState({
                months: this.newMonths,
                translate: `${OFFSET}%`,
                animate: false,
            });
        }

        const _leftHidden = new Date(_focus.getFullYear(), _focus.getMonth() - 2, 1);
        const _rightShown = new Date(_focus.getFullYear(), _focus.getMonth() - 1, 1);
        const _rightHidden = new Date(_focus.getFullYear(), _focus.getMonth() + 1, 1);

        const monthNames = getMonthNames();
        const months = [
            {
                title: monthNames[_leftHidden.getMonth()],
                className: 'month',
                startDate: _leftHidden,
                endDate: new Date(_leftHidden.getFullYear(), _leftHidden.getMonth() + 1, _leftHidden.getDate(), 23, 59, 59, 999),
            },
            {
                title: monthNames[_rightShown.getMonth()],
                className: 'month',
                startDate: _rightShown,
                endDate: new Date(_rightShown.getFullYear(), _rightShown.getMonth() + 1, _rightShown.getDate(), 23, 59, 59, 999),
            },
            {
                title: monthNames[_focus.getMonth()],
                className: 'month',
                startDate: new Date(_focus.getFullYear(), _focus.getMonth(), 1),
                endDate: new Date(_focus.getFullYear(), _focus.getMonth() + 1, _focus.getDate(), 23, 59, 59, 999),
            },
            {
                title: monthNames[_rightHidden.getMonth()],
                className: 'month',
                startDate: _rightHidden,
                endDate: new Date(_rightHidden.getFullYear(), _rightHidden.getMonth() + 1, _rightHidden.getDate(), 23, 59, 59, 999),
            }];

        this.newMonths = months;

        this.timeout = window.setTimeout(() => {
            this.setState({
                animate: true,
                translate: `${OFFSET + translate}%`,
                focus: _focus,
            });

            this.timeout = setTimeout(() => {
                this.setState({
                    translate: `${OFFSET}%`,
                    animate: false,
                    months,
                });
            }, 300);
        }, 25);
    }

    getNavigateLeft() {
        const { activateAll, startDate } = this.props;
        const { focus } = this.state;

        if (!startDate) {
            return !!activateAll;
        }

        if (startDate.getFullYear() < focus.getFullYear()) {
            return true;
        }

        const FOCUS_FACTOR = Calendar.IsMobile() ? 0 : 1;

        return startDate.getFullYear() === focus.getFullYear()
            && startDate.getMonth() + FOCUS_FACTOR < focus.getMonth();
    }

    getNavigateRight() {
        const { activateAll, endDate } = this.props;
        const { focus } = this.state;

        if (!endDate) {
            return !!activateAll;
        }

        if (endDate.getFullYear() > focus.getFullYear()) {
            return true;
        }

        return endDate.getFullYear() === focus.getFullYear()
            && endDate.getMonth() > focus.getMonth();
    }

    navigateRightOnClick() {
        if (!this.getNavigateRight()) {
            return;
        }

        const { focus } = this.state;

        const newFocus = new Date(focus.getFullYear(), focus.getMonth() + 1, 1);

        this.setMonths(newFocus, -25);
    }

    navigateLeftOnClick() {
        if (!this.getNavigateLeft()) {
            return;
        }

        const { focus } = this.state;

        const newFocus = new Date(focus.getFullYear(), focus.getMonth() - 1, 1);

        this.setMonths(newFocus, 25);
    }

    /*
     TODO: DER KALENDAR MUSS SICH MIT POSITION VON HANDLE TOUCH MOVE BEWEGEN
     */

    handleTouchStart(event) {
        this.swipeX = event.touches[0].clientX;
    }

    handleTouchMove(event) {
        // console.log('ELEMENT',this.calendarMonths.offsetWidth);
        // this.move = -1*(this.swipeX-event.touches[0].clientX);
        // this.calendarMonths.style.transform= `translateX(${-1*(this.swipeX-event.touches[0].clientX)}px)`;

        this.moveSwipeX = event.touches[0].clientX;
    }

    handleTouchEnd() {
        if (this.swipeX && this.moveSwipeX) {
            if (this.moveSwipeX >= this.swipeX + 60) {
                this.navigateLeftOnClick();
                this.swipeX = null;
                this.moveSwipeX = null;
                // this.move=null;
            } else if (this.moveSwipeX <= this.swipeX - 60) {
                this.navigateRightOnClick();
                this.swipeX = null;
                this.moveSwipeX = null;
            }
        }
    }

    renderMonths() {
        const {
            startDate,
            activated: activatedProp,
            highlighted,
            selected,
            activateAll,
            onDateSelect,
        } = this.props;
        const { months } = this.state;

        /**
         * TODO
         *
         * Hier müssen die Monate gerendert werden. Für jeden Monat sollten an dieser Stelle alle Tage in ein Array gespeichert werden.
         * Das ersparrt der 'MonthTable'-Komponente noch einmal über sämtliche Einträge eines Monats zu gehen um die aktive/highlighted/etc Tage
         * zu finden
         *
         * @type {null}
         * @private
         */
        const _startDate = startDate || null;
        const _activated = activatedProp && activatedProp.length > 0 ? activatedProp : null;
        const _highlighted = highlighted || null;

        return months.map((month) => {
            const activated = [];
            const tempDates = [];
            const tempObj = [];
            let _selected;
            let tempHighlighted = [];

            if (month.startDate.getYear() === selected.getYear() && month.startDate.getMonth() === selected.getMonth()) {
                _selected = selected;
            }

            for (let i = 0; _activated && i < _activated.length; i += 1) {
                if (month.startDate.getYear() === _activated[i].getYear() && month.startDate.getMonth() === _activated[i].getMonth()) {
                    if (_startDate) {
                        if ((_startDate.getYear() < _activated[i].getYear()
                            || (_startDate.getYear() === _activated[i].getYear() && _startDate.getMonth() < _activated[i].getMonth()))
                            || (_startDate.getMonth() === _activated[i].getMonth() && _startDate.getDate() <= _activated[i].getDate())
                        ) {
                            activated.push(_activated[i]);
                        }
                    } else {
                        activated.push(_activated[i]);
                    }
                }
            }

            if (activateAll) {
                if (_highlighted instanceof Array) {
                    for (let j = 0; j < _highlighted.length; j += 1) {
                        const dates = [];

                        for (let k = 0; k < _highlighted[j].dates.length; k += 1) {
                            if (_highlighted[j].dates[k].getTime() >= month.startDate && _highlighted[j].dates[k].getTime() <= month.endDate) {
                                dates.push(_highlighted[j].dates[k]);
                            }
                        }

                        if (dates.length > 0) {
                            tempObj.push({
                                dates,
                                style: _highlighted[j].style,
                            });
                        }
                    }
                } else if (_highlighted) {
                    tempDates.push({
                        dates: _highlighted.dates,
                        style: _highlighted.style,
                    });
                }
            } else if (activated) {
                for (let i = 0; i < activated.length; i += 1) {
                    if (_highlighted instanceof Array) {
                        for (let j = 0; j < _highlighted.length; j += 1) {
                            const dates = [];

                            for (let k = 0; k < _highlighted[j].dates.length; k += 1) {
                                if (areDatesEqual(_highlighted[j].dates[k], activated[i])) {
                                    dates.push(_highlighted[j].dates[k]);
                                }
                            }

                            if (dates.length > 0) {
                                tempObj.push({
                                    dates,
                                    style: _highlighted[j].style,
                                });
                            }
                        }
                    } else if (_highlighted && _highlighted.dates) {
                        tempDates.push({
                            dates: _highlighted.dates,
                            style: _highlighted.style,
                        });
                    }
                }
            }

            if (tempDates.length > 0) {
                tempHighlighted = tempDates;
            }

            if (tempObj.length > 0) {
                tempHighlighted = tempObj;
            }

            return (
                <Month
                    onDateSelect={onDateSelect}
                    title={month.title}
                    className={month.className}
                    startDate={month.startDate}
                    endDate={month.endDate}
                    selected={_selected}
                    activated={activated}
                    highlighted={tempHighlighted}
                    activateAll={activateAll}
                    key={month.startDate.getTime()}
                />
            );
        });
    }

    render() {
        const _navigateLeft = !(this.getNavigateLeft());
        const _navigateRight = !(this.getNavigateRight());
        const { style, className } = this.props;
        const { animate, translate } = this.state;
        const _months = this.renderMonths();

        return (
            <div
                className={classNames(className, 'cc__calendar')}
                onTouchMove={this.handleTouchMove}
                onTouchStart={this.handleTouchStart}
                onTouchEnd={this.handleTouchEnd}
                style={{
                    ...{
                        minHeight: '205px',
                        overflow: 'hidden',
                    },
                    ...style,
                }}
            >
                <div className="absolute">
                    <div className="cc__calendar__navigation">
                        <div
                            onClick={this.navigateLeftOnClick}
                            className="cc__calendar__navigate left"
                            hidden={_navigateLeft}
                        >
                            <Icon icon={faChevronLeft}/>
                        </div>
                        <div className="cc__calendar__navigate middle"/>
                        <div
                            onClick={this.navigateRightOnClick}
                            className="cc__calendar__navigate right"
                            hidden={_navigateRight}
                        >
                            <Icon icon={faChevronRight}/>
                        </div>
                    </div>
                </div>
                <div className="cc__calendar__months">
                    <div
                        className={`cc__calendar__months__wrapper ${animate ? 'cc__calendar__months__wrapper--animate' : ''}`}
                        style={{
                            transform: `translateX(${translate})`,
                        }}
                    >
                        {_months}
                    </div>
                </div>
            </div>
        );
    }
}

Calendar.propTypes = {
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    onDateSelect: PropTypes.func,
    selected: PropTypes.instanceOf(Date),
    activated: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    highlighted: PropTypes.oneOfType([
        PropTypes.shape({
            dates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
            color: PropTypes.string,
        }),
        PropTypes.arrayOf(PropTypes.shape({
            dates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
            color: PropTypes.string,
        })),
    ]),
    activateAll: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string,
};

Calendar.defaultProps = {
    selected: TODAY,
    startDate: null,
    endDate: null,
    onDateSelect: null,
    activateAll: true,
    activated: null,
    highlighted: null,
    style: null,
    className: null,
};
