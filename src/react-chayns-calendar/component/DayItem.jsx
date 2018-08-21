/* eslint-disable react/no-array-index-key, jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import areDatesEqual from '../utils/areDatesEqual';

class DayItem extends Component {
    static propTypes = {
        day: PropTypes.instanceOf(Date).isRequired,
        onDateSelect: PropTypes.func.isRequired,
        activateAll: PropTypes.func,
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

    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { onDateSelect, day } = this.props;

        if (onDateSelect) {
            onDateSelect(day.date);
        }
    }

    render() {
        const {
            day,
            activateAll,
            activated,
            selected,
            highlighted,
        } = this.props;

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
                if (areDatesEqual(activated[i], day.date)) {
                    _active = true;
                    _marked = true;
                    _onClick = true;
                    break;
                }
            }
        }

        if (selected && areDatesEqual(selected, day.date)) {
            _active = true;
            _selected = true; // `-is-active-is-selected${_marked} chayns__color--100`;
        }

        if (highlighted instanceof Array) { // TODO: Merge data in MonthTable
            for (let k = 0; k < highlighted.length; k += 1) {
                for (let l = 0; highlighted[k].dates && l < highlighted[k].dates.length; l += 1) {
                    if (areDatesEqual(highlighted[k].dates[l], day.date)) {
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
                if (areDatesEqual(highlighted.dates[k], day.date)) {
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

            return (
                <div
                    className={_className}
                    style={_style}
                    onClick={_onClick && this.onClick}
                >
                    {day.date.getDate()}
                </div>
            );
        }

        return (
            <div
                className="day__item day-out-month"
            >
                {day.date.getDate()}
            </div>
        );
    }
}

export default DayItem;
