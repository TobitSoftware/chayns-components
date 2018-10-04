/* eslint-disable jsx-a11y/click-events-have-key-events, react/no-array-index-key */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import Icon from '../../../react-chayns-icon/component/Icon';

export default class Navigator extends PureComponent {
    static propTypes = {
        text: PropTypes.string,
        onClick: PropTypes.shape({
            left: PropTypes.func.isRequired,
            right: PropTypes.func.isRequired,
            day: PropTypes.func.isRequired
        }),
        hidden: PropTypes.shape({
            left: PropTypes.bool,
            right: PropTypes.bool
        }),
        days: PropTypes.array,
    };

    static defaultProps = {
        text: '',
        onClick: null,
        hidden: {},
        days: [],
    };

    render() {
        const {
            text, onClick, hidden, days
        } = this.props;

        return (
            <div className="calendar__navigator no_select">
                <div className="calendar__navigator_wrapper">
                    <div className="calendar__navigator_icon">
                        {hidden.left ? '' : (
                            <span onClick={onClick.left}>
                            <Icon icon={faChevronLeft}/>
                            </span>
                        )}
                    </div>
                    {text}
                    <div className="calendar__navigator_icon">
                        {hidden.right ? '' : (
                            <span onClick={onClick.right}>
                            <Icon icon={faChevronRight}/>
                            </span>
                        )}
                    </div>
                </div>
                <div className="calendar__navigator_days">
                    {
                        days.map((day, i) => {
                            return (
                                <div className="calendar__navigator_days_table" key={i}>
                                    {day.map((value, j) => {
                                        const selected = value.selected
                                            ? 'bold'
                                            : 'normal';
                                        return (
                                            <div
                                                className="calendar__navigator_days_item ellipsis"
                                                style={{ fontWeight: selected }}
                                                key={j}
                                                onClick={event => onClick.day(event, value)}
                                            >
                                                {value.name}
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
