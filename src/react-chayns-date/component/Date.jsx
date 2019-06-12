import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import de from '../constants/text';

export default class Date extends PureComponent {
    static propTypes = {
        children: PropTypes.node,
        language: PropTypes.string,
        date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]).isRequired,
        date2: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
        showTime: PropTypes.bool,
        showDate: PropTypes.bool,
        writeDay: PropTypes.bool,
        writeMonth: PropTypes.bool,
        noTitle: PropTypes.bool,
    };

    static defaultProps = {
        children: <span />,
        language: (chayns.env.language || navigator.language || 'de').substring(0, 2).toLowerCase(),
        date2: null,
        showTime: null,
        showDate: null,
        writeDay: false,
        writeMonth: false,
        noTitle: false,
    };

    static getRelativeDateString = (date, language) => {
        const dateObj = new Date(date);
        const now = new Date();

        let timeBetween = now.getTime() - dateObj.getTime();
        let tense;
        if (timeBetween > 0) {
            tense = 'future';
        } else if (timeBetween < 0) {
            tense = 'past';
            timeBetween *= -1;
        } else {
            tense = 'now';
        }
        let unit;
        if (timeBetween < 1000 * 60) {
            unit = 'seconds';
        } else if (timeBetween < 1000 * 60 * 60) {
            unit = 'minutes';
        } else if (timeBetween < 1000 * 60 * 60 * 24) {
            unit = 'hours';
        } else if (timeBetween < 1000 * 60 * 60 * 24 * 30) {
            unit = 'days';
        } else if (timeBetween < 1000 * 60 * 60 * 24 * 365) {
            unit = 'months';
        } else {
            unit = 'years';
        }
        const values = {
            seconds: Math.ceil((timeBetween /= 1000) % 60),
            minutes: Math.ceil((timeBetween /= 60) % 60),
            hours: Math.ceil((timeBetween /= 60) % 24),
            days: Math.ceil((timeBetween /= 24) % 30),
            months: Math.ceil(timeBetween / 30),
            years: Math.ceil(timeBetween / 365),
        };

        if (values[unit] === 1) { // if value of unit is only 1...
            unit = unit.substring(0, unit.length - 1); // ...use singular of unit
        }
    };

    static getAbsoluteDateString = (date, language) => {
        const dateObj = new Date(date);
    };

    static getDateIntervalString = (date1, date2, language) => {
        const dateObj1 = new Date(date1);
        const dateObj2 = new Date(date2);
    };

    render() {
        const {
            date, language, noTitle, children,
        } = this.props;

        return React.cloneElement(
            children,
            noTitle || { title: Date.getAbsoluteDateString(date, language) },
            Date.getRelativeDateString(date, language),
        );
    }
}
