/* eslint-disable react/no-array-index-key,jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import Month from './Month';
import areDatesEqual from '../utils/areDatesEqual';
import Icon from '../../react-chayns-icon/component/Icon';


const TODAY = new Date();
const TRANSITION_TIME = 300;
const MONTH_NAMES = {
    de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
};

function getMonthNames(language = chayns.env.language) {
    return MONTH_NAMES[language] || MONTH_NAMES.de;
}

export default class Calendar extends Component {
    static propTypes = {
        startDate: PropTypes.instanceOf(Date).isRequired,
        endDate: PropTypes.instanceOf(Date).isRequired,
        onDateSelect: PropTypes.func.isRequired,
        selected: PropTypes.instanceOf(Date),
        activated: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
        highlighted: PropTypes.oneOfType([
            PropTypes.shape({
                dates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
                color: PropTypes.string
            }),
            PropTypes.arrayOf(PropTypes.shape({
                dates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
                color: PropTypes.string
            }))
        ]),
        activateAll: PropTypes.bool,
    };

    static defaultProps = {
        selected: TODAY,
        activateAll: true,
        activated: null,
        highlighted: null,
    };

    constructor() {
        super();

        this.state = {
            focus: new Date(),
            animationKey: 0.05,
            months: [],
            animation: '',
        };

        this.navigateLeftOnClick = this.navigateLeftOnClick.bind(this);
        this.navigateRightOnClick = this.navigateRightOnClick.bind(this);

        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
    }

    componentWillMount() {
        const { selected } = this.props; // TODO: SELECTED SHOULD NOT BE OUTSIDE THE START AND END TIME. ADDITIONALLY SELECTED SHOULD BE THE FIRST DATE IN TIME CONTEXT, NOT THE FIRST DATE OF THE LIST

        const active = new Date(selected.getFullYear(), selected.getMonth(), selected.getDate());
        this.setMonths(active);
    }

    setMonths(_focus) {
        const _leftHidden = new Date(_focus.getFullYear(), _focus.getMonth() - 1, 1);
        const _rightShown = new Date(_focus.getFullYear(), _focus.getMonth() + 1, 1);
        const _rightHidden = new Date(_focus.getFullYear(), _focus.getMonth() + 2, 1);

        const monthNames = getMonthNames();

        this.setState({
            focus: _focus,
            months: [
                {
                    title: monthNames[_leftHidden.getMonth()],
                    className: 'left__hidden month',
                    startDate: _leftHidden,
                    endDate: new Date(_leftHidden.getFullYear(), _leftHidden.getMonth() + 1, 0)
                },
                {
                    title: monthNames[_focus.getMonth()],
                    className: 'left__shown month',
                    startDate: new Date(_focus.getFullYear(), _focus.getMonth(), 1),
                    endDate: new Date(_focus.getFullYear(), _focus.getMonth() + 1, 0)
                },
                {
                    title: monthNames[_rightShown.getMonth()],
                    className: 'right__shown month',
                    startDate: _rightShown,
                    endDate: new Date(_rightShown.getFullYear(), _rightShown.getMonth() + 1, 0)
                },
                {
                    title: monthNames[_rightHidden.getMonth()],
                    className: 'right__hidden month',
                    startDate: _rightHidden,
                    endDate: new Date(_rightHidden.getFullYear(), _rightHidden.getMonth() + 1, 0)
                }]
        });
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

        if (startDate.getFullYear() === focus.getFullYear()
            && startDate.getMonth() < focus.getMonth()) {
            return true;
        }

        return false;
    }

    getNavigateRight() {
        const { activateAll, endDate } = this.props;
        const { focus } = this.state;

        const FOCUS_FACTOR = window.screen.width < 450 ? 0 : 1;

        if (!endDate) {
            return !!activateAll;
        }

        if (endDate.getFullYear() > focus.getFullYear()) {
            return true;
        }

        if (endDate.getFullYear() === focus.getFullYear()
            && endDate.getMonth() - FOCUS_FACTOR > focus.getMonth()) {
            return true;
        }

        return false;
    }

    navigateRightOnClick() {
        if (!this.getNavigateRight()) {
            return;
        }

        const { focus, animationKey } = this.state;

        const newFocus = new Date(focus.getFullYear(), focus.getMonth() + 1, 1);

        this.setMonths(newFocus);
        this.setState({
            animationKey: animationKey + 1,
            animation: 'right'
        });
    }

    navigateLeftOnClick() {
        if (!this.getNavigateLeft()) {
            return;
        }

        const { focus, animationKey } = this.state;

        const newFocus = new Date(focus.getFullYear(), focus.getMonth() - 1, 1);

        this.setMonths(newFocus);
        this.setState({
            animationKey: animationKey + 1,
            animation: 'left'
        });
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
        const { months, animation } = this.state;

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

        return months.map((month, index) => {
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
                                color: _highlighted[j].color
                            });
                        }
                    }
                } else {
                    // TODO
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
                                    color: _highlighted[j].color
                                });
                            }
                        }
                    } else if (_highlighted && _highlighted.dates) {
                        for (let j = 0; _highlighted.dates.length < j; j += 1) {
                            if (areDatesEqual(_highlighted.dates[j], activated[i])) {
                                tempDates.push(_highlighted.dates[j]);
                            }
                        }
                    }
                }
            }

            if (tempDates.length > 0) {
                tempHighlighted = {
                    dates: tempDates,
                    color: _highlighted.color
                };
            }

            if (tempObj.length > 0) {
                tempHighlighted = tempObj;
            }

            return (
                <CSSTransition
                    classNames={animation}
                    timeout={{
                        enter: TRANSITION_TIME,
                    }}
                    appear
                    exit={false}
                    key={month.startDate.getTime() * (index + 1)}
                >
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
                        key={month.startDate.getTime() * (index + 1)}
                    />
                </CSSTransition>
            );
        });
    }

    render() {
        const _navigateLeft = !(this.getNavigateLeft());
        const _navigateRight = !(this.getNavigateRight());

        const _months = this.renderMonths();

        return (
            <div
                className="buffer"
                onTouchMove={this.handleTouchMove}
                onTouchStart={this.handleTouchStart}
                onTouchEnd={this.handleTouchEnd}
            >
                <div className="absolute">
                    <div className="calendar__navigation">
                        <div
                            onClick={this.navigateLeftOnClick}
                            className="calendar__navigate left"
                            hidden={_navigateLeft}
                        >
                            <Icon icon={faChevronLeft}/>
                        </div>
                        <div
                            onClick={this.navigateRightOnClick}
                            className="calendar__navigate right"
                            hidden={_navigateRight}
                        >
                            <Icon icon={faChevronRight}/>
                        </div>
                    </div>
                </div>
                <div className="calendar__months">
                    <TransitionGroup>
                        {_months}
                    </TransitionGroup>
                </div>
            </div>
        );
    }
}
