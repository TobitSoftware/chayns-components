/* eslint-disable react/no-array-index-key, jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import areDatesEqual from '../utils/areDatesEqual';

class DayItem extends PureComponent {
    static propTypes = {
        date: PropTypes.instanceOf(Date).isRequired,
        inMonth: PropTypes.bool.isRequired,
        onDateSelect: PropTypes.func,
        activateAll: PropTypes.bool,
        selected: PropTypes.instanceOf(Date),
        activated: PropTypes.bool,
        highlighted: PropTypes.bool,
        highlightStyle: PropTypes.object,
    };

    static defaultProps = {
        selected: null,
        activated: false,
        highlighted: false,
        activateAll: null,
        highlightStyle: null,
        onDateSelect: null,
    };

    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { onDateSelect, date } = this.props;

        if (onDateSelect) {
            onDateSelect(date);
        }
    }

    render() {
        const {
            date,
            inMonth,
            activateAll,
            activated,
            selected,
            highlighted,
            highlightStyle,
        } = this.props;

        let _active = activateAll;
        let _selected = false;
        let _marked = false;
        let _highlighted = false;
        let _onClick = false;
        let _className = 'day__item day-in-month';
        let _style = null;

        if (_active) {
            _onClick = true;
        }

        if (activated) {
            _active = true;
            _marked = true;
            _onClick = true;
        }

        if (selected && areDatesEqual(selected, date)) {
            _active = true;
            _selected = true; // `-is-active-is-selected${_marked} chayns__color--100`;
        }

        if (highlighted) {
            _active = true;
            _marked = true;
            _onClick = true;
            _highlighted = true;

            if (highlightStyle) {
                _style = highlightStyle;
            }
        }

        if (inMonth) {
            _className = classNames('day__item day-in-month', {
                'is-active': _active,
                'is-deactive': !_active,
                'is-selected': _selected,
                'is-marked': _marked,
                'is-marked-is-highlighted': _marked && _highlighted,
                'chayns__background-color--80 chayns__color--5': _active && _marked,
                'chayns__background-color--80': !_active && _marked && !_selected,

            });

            return (
                <div
                    className={_className}
                    style={_style}
                    onClick={_onClick ? this.onClick : null}
                >
                    <div className="day__item__content">
                        {date.getDate()}
                    </div>
                </div>
            );
        }

        return (
            <div
                className="day__item day-out-month"
            >
                <div className="day__item__content">
                    {date.getDate()}
                </div>
            </div>
        );
    }
}

export default DayItem;
