import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import text from '../constants/text';

export default class FancyDate extends PureComponent {
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
        children: <div />,
        language: (chayns.env.language || navigator.language || 'de').substring(0, 2).toLowerCase(),
        date2: null,
        showTime: null,
        showDate: null,
        writeDay: false,
        writeMonth: false,
        noTitle: false,
    };

    static getRelativeDateString = (date, options = { language: 'de' }) => {
        const dateObj = new Date(date);
        const now = new Date();
        let timeBetween = now.getTime() - dateObj.getTime();
        let tense;
        if (timeBetween < 0) {
            tense = 'future';
            timeBetween *= -1;
        } else if (timeBetween > 0) {
            tense = 'past';
        } else {
            tense = 'now';
        }
        let unit = 'now';
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
        } else if ((timeBetween >= 1000 * 60 * 60 * 24 * 365)) {
            unit = 'years';
        }
        const relativeValues = {
            seconds: Math.floor((timeBetween /= 1000) % 60),
            minutes: Math.floor((timeBetween /= 60) % 60),
            hours: Math.floor((timeBetween /= 60) % 24),
            days: Math.floor((timeBetween /= 24) % 30),
            months: Math.floor(timeBetween / 30),
            years: Math.floor(timeBetween / 365),
        };
        const absoluteValues = {
            seconds: dateObj.getSeconds(),
            minutes: dateObj.getMinutes(),
            hours: dateObj.getHours(),
            days: `${dateObj.getDate()}.`,
            months: options.writeMonth ? ` ${text[options.language].MONTHS[dateObj.getMonth()]} ` : `${dateObj.getMonth()}.`,//TODO dateMW
            years: dateObj.getFullYear(),
        };

        if (options.showTime === !!options.showTime && (unit === 'seconds' || unit === 'minutes' || unit === 'hours')) {
            unit = 'days';
        }

        if (relativeValues[unit] === 1) { // if value of unit is only 1...
            unit = unit.substring(0, unit.length - 1); // ...use singular of unit
        } else if (relativeValues[unit] === 0) {
            unit += '0';
        }

        if (options.showDate === false && !(unit === 'seconds' || unit === 'now' || unit === 'minutes' || unit === 'hours') && options.showTime === null) {
            unit = 'hours';
        }

        let txt = text[options.language].RELATIVE_TEXT[tense][unit];

        if (options.showDate === false && options.showTime === true) {
            txt = '';
        } else if (options.showDate === true) {
            txt = text[options.language].ABSOLUTE_TEXT.date;
        }

        if (options.showTime) {
            if (txt) {
                txt += ` ${text[options.language].ABSOLUTE_TEXT.at} `;
            }
            txt += `${text[options.language].ABSOLUTE_TEXT.time}`;
        }

        return FancyDate.replace(txt, relativeValues, absoluteValues);
    };

    static getAbsoluteDateString = (date, options = { language: 'de' }) => {
        const dateObj = new Date(date);
        const txt = text[options.language].ABSOLUTE_TEXT.datetime;
        const absoluteValues = {
            seconds: dateObj.getSeconds(),
            minutes: dateObj.getMinutes(),
            hours: dateObj.getHours(),
            days: dateObj.getDate(),
            months: dateObj.getMonth() + 1,
            years: dateObj.getFullYear(),
        };
        return FancyDate.replace(txt, {}, absoluteValues);
    };

    static replace = (string, relativeValues, absoluteValues) => string
        .replace('##rMINUTES##', relativeValues.minutes)
        .replace('##rHOURS##', relativeValues.hours)
        .replace('##rDAYS##', relativeValues.days)
        .replace('##rMONTHS##', relativeValues.months)
        .replace('##rYEARS##', relativeValues.years)
        .replace('##aSECONDS##', absoluteValues.seconds)
        .replace('##aMINUTES##', absoluteValues.minutes)
        .replace('##aHOURS##', absoluteValues.hours)
        .replace('##aDAYS##', absoluteValues.days)
        .replace('##aMONTHS##', absoluteValues.months)
        .replace('##aYEARS##', absoluteValues.years)
        .replace(/^\s*|\s*$/g, ''); // Matches whitespace at the start and end of the string

    render() {
        const {
            date, language, noTitle, children, showDate, showTime, writeMonth, writeDay,
        } = this.props;

        return React.cloneElement(
            children,
            noTitle || { title: FancyDate.getAbsoluteDateString(date, { language }) },
            FancyDate.getRelativeDateString(date, {
                language, showDate, showTime, writeDay, writeMonth,
            }),
        );
    }
}
