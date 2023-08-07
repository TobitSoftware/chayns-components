/* eslint-disable react/no-array-index-key, jsx-a11y/click-events-have-key-events,react/forbid-prop-types,no-underscore-dangle */
import classNames from 'clsx';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import areDatesEqual from '../utils/areDatesEqual';

class DayItem extends PureComponent {
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
            categories,
            circleColor,
        } = this.props;

        let _active = activateAll;
        let _selected = false;
        let _marked = false;
        let _highlighted = false;
        let _onClick = false;
        let _className = 'day__item day-in-month';
        let _contentClassName = 'day__item__content';
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
            _selected = true;
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
                'is-marked': _marked,
                'is-marked-is-highlighted': _marked && _highlighted,
                'chayns__background-color--80 chayns__color--5':
                    _active && _marked,
                'chayns__background-color--80':
                    !_active && _marked && !_selected,
            });

            _contentClassName = classNames('day__item__content', {
                'is-selected': _selected,
            });

            return (
                <div
                    className={_className}
                    style={_style}
                    onClick={_onClick ? this.onClick : null}
                >
                    <div
                        className={_contentClassName}
                        style={
                            _selected && circleColor
                                ? { backgroundColor: circleColor }
                                : undefined
                        }
                    >
                        {date.getDate()}
                    </div>
                    {categories?.length > 0 && (
                        <div className="day__item__category--wrapper">
                            {categories.map((color) => (
                                <div
                                    className="day__item__category-circle"
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            );
        }

        return (
            <div className="day__item day-out-month">
                <div className="day__item__content">{date.getDate()}</div>
            </div>
        );
    }
}

DayItem.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    inMonth: PropTypes.bool.isRequired,
    onDateSelect: PropTypes.func,
    activateAll: PropTypes.bool,
    selected: PropTypes.instanceOf(Date),
    activated: PropTypes.bool,
    highlighted: PropTypes.bool,
    highlightStyle: PropTypes.object,
    circleColor: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
};

DayItem.defaultProps = {
    selected: null,
    activated: false,
    highlighted: false,
    activateAll: null,
    highlightStyle: null,
    circleColor: null,
    onDateSelect: null,
    categories: null,
};

DayItem.displayName = 'DayItem';

export default DayItem;
