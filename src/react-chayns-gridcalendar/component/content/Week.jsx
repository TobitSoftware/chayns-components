/* eslint-disable max-len,react/forbid-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { hexStringToRgb } from '../../../utils/color';

export default class Week extends Component {
    constructor(props) {
        super(props);
        this.schemeColor = hexStringToRgb(chayns.env.site.color);
    }

    renderDays() {
        const {
            onClick, focus, groupFocus, data,
        } = this.props;
        const days = [];
        let i = 0;
        for (i; i < data.length; i += 1) {
            let background = '';
            const day = data[i];
            let percentage;
            let start;
            let color = this.schemeColor;
            const backgroundColor = day.date.getDate() === focus.getDate() && day.date.getMonth() === focus.getMonth() && day.date.getFullYear() === focus.getFullYear()
                ? `rgba(${this.schemeColor.r},${this.schemeColor.g},${this.schemeColor.b},0.3)`
                : '';
            const classes = classNames('week_item', {
                week_item_filled: day && day.id,
                week_item_focused: day && day.groupId && groupFocus === day.groupId,
            });
            if (day && day.id) {
                start = Math.round((new Date(day.startTime).getHours() / 24) * 100);
                percentage = Math.round(((day.endTime - day.startTime) / (24 * 60 * 60 * 1000)) * 100);
                if (day.color) {
                    /**
                     * For correct calculating of the percentage it is required, that the entry is in one day
                     * @type {Date}
                     */
                    color = hexStringToRgb(day.color);
                }
                background = `linear-gradient(to right, rgba(${color.r},${color.g},${color.b},0.5) ${start}%,rgba(${color.r},${color.g},${color.b},1) ${start + 1}%,rgba(${color.r},${color.g},${color.b},1) ${start + percentage}%,rgba(${color.r},${color.g},${color.b},0.5) ${start + percentage + 1}%)`;
            }

            days.push(<div className={classes} style={{ background, backgroundColor }} key={i} onClick={(event) => onClick(event, day)}/>,);
        }
        return days;
    }

    render() {
        const { weekWidth } = this.props;
        const days = this.renderDays();
        return (
            <div className="week" style={{ width: `${weekWidth * 0.9}px`, marginLeft: `${weekWidth * 0.1}px` }}>
                <div className="week_table">
                    <div className="week_row">
                        {days}
                    </div>
                </div>
            </div>
        );
    }
}

Week.propTypes = {
    startTime: PropTypes.objectOf(Date),
    data: PropTypes.array,
    onClick: PropTypes.func,
    focus: PropTypes.objectOf(Date),
    groupFocus: PropTypes.number,
    weekWidth: PropTypes.number,
};

Week.defaultProps = {
    data: [],
    startTime: null,
    onClick: null,
    focus: null,
    groupFocus: null,
    weekWidth: null,
};
