/**
 * @component
 */

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { isServer } from '../../utils/isServer';
import text from '../constants/text';

/**
 * Formats a date or date range to be easily readable and reveals the absolute
 * date on hover.
 */
export default class DateInfo extends PureComponent {
    static getRelativeDateString = (date, options = { language: 'de' }) => {
        const dateObj = new Date(date);
        const now = new Date();
        let timeBetween = now.getTime() - dateObj.getTime();
        const dateObj2 = new Date(date);
        const now2 = new Date();
        dateObj2.setHours(0);
        dateObj2.setMinutes(0);
        dateObj2.setSeconds(0);
        dateObj2.setMilliseconds(0);
        now2.setHours(0);
        now2.setMinutes(0);
        now2.setSeconds(0);
        now2.setMilliseconds(0);
        let timeBetween2 = now2.getTime() - dateObj2.getTime();
        let tense;
        if (timeBetween < 0) {
            tense = 'future';
            timeBetween *= -1;
            timeBetween2 *= -1;
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
        } else if (timeBetween2 < 1000 * 60 * 60 * 24 * 30) {
            unit = 'days';
        } else if (timeBetween < 1000 * 60 * 60 * 24 * 365) {
            unit = 'months';
        } else if (timeBetween >= 1000 * 60 * 60 * 24 * 365) {
            unit = 'years';
        }
        const relativeValues = {
            seconds: Math.floor((timeBetween /= 1000) % 60),
            minutes: Math.floor((timeBetween /= 60) % 60),
            hours: Math.floor((timeBetween /= 60) % 24),
            wrongDays: Math.floor((timeBetween /= 24) % 30),
            days: Math.floor((timeBetween2 / 1000 / 60 / 60 / 24) % 30),
            months: Math.floor(timeBetween / 30),
            years: Math.floor(timeBetween / 365),
        };
        const absoluteValues = {
            seconds: dateObj.getSeconds(),
            minutes: dateObj.getMinutes(),
            hours: dateObj.getHours(),
            days: dateObj.getDate(),
            month: dateObj.getMonth() + 1,
            monthWritten: text[options.language].MONTHS[dateObj.getMonth()],
            monthShortWritten:
                text[options.language].MONTHS_SHORT[dateObj.getMonth()],
            years: options.hideYear ? '' : dateObj.getFullYear(),
        };

        // 2019->19
        if (options.hideYear === null) {
            absoluteValues.years = absoluteValues.years
                .toString()
                .substring(absoluteValues.years.toString().length - 2);
        }

        if (
            options.showTime === !!options.showTime &&
            (unit === 'seconds' || unit === 'minutes' || unit === 'hours')
        ) {
            unit = 'days';
        }

        if (
            (relativeValues[unit] === 1 ||
                (relativeValues.days === 0 &&
                    dateObj.toDateString() !== now.toDateString())) &&
            options.useTomorrowYesterday !== false
        ) {
            // if value of unit is only 1...
            unit = unit.substring(0, unit.length - 1); // ...use singular of unit
        } else if (
            relativeValues[unit] === 0 &&
            dateObj.toDateString() === now.toDateString() &&
            options.useToday !== false
        ) {
            unit += '0';
        }

        if (
            options.showDate === false &&
            !(
                unit === 'seconds' ||
                unit === 'now' ||
                unit === 'minutes' ||
                unit === 'hours'
            ) &&
            options.showTime === null
        ) {
            unit = 'hours';
        }

        let txt = text[options.language].RELATIVE_TEXT[tense][unit];

        if (
            options.showDate === false &&
            options.showTime === true &&
            !options.useToday &&
            !options.useTomorrowYesterday
        ) {
            txt = '';
        } else if (
            (options.showDate || options.writeMonth) &&
            !(options.useTomorrowYesterday && unit === 'day') &&
            !(
                options.useToday &&
                (unit.charAt(unit.length - 1) === '0' || unit === 'now')
            )
        ) {
            if (options.writeMonth) {
                txt = text[options.language].ABSOLUTE_TEXT.dateMW;
            } else if (options.writeMonth === false) {
                txt = text[options.language].ABSOLUTE_TEXT.date;
            } else {
                txt = text[options.language].ABSOLUTE_TEXT.dateMSW;
            }
        }

        if (options.writeDay) {
            const day =
                text[options.language].WEEKDAYS[(dateObj.getDay() + 6) % 7];
            if (options.showDate || options.writeMonth) {
                txt = `${day}, ${txt}`;
            } else {
                txt = `${day} `;
            }
        }

        if (options.showTime) {
            if (txt) {
                txt += ` ${text[options.language].ABSOLUTE_TEXT.at} `;
            }
            txt += `${text[options.language].ABSOLUTE_TEXT.time}`;
        }

        return DateInfo.replace(txt, relativeValues, absoluteValues);
    };

    static getAbsoluteDateString = (date, options = { language: 'de' }) => {
        const dateObj = new Date(date);
        const txt = text[options.language].ABSOLUTE_TEXT.datetimeMSW;
        const absoluteValues = {
            seconds: dateObj.getSeconds(),
            minutes: dateObj.getMinutes(),
            hours: dateObj.getHours(),
            days: dateObj.getDate(),
            month: dateObj.getMonth() + 1,
            monthShortWritten:
                text[options.language].MONTHS_SHORT[dateObj.getMonth()],
            years: dateObj.getFullYear(),
        };
        return DateInfo.replace(txt, {}, absoluteValues);
    };

    static replace = (string, relativeValues, absoluteValues) =>
        string
            .replace('##rMINUTES##', relativeValues.minutes)
            .replace('##rHOURS##', relativeValues.hours)
            .replace('##rDAYS##', relativeValues.days)
            .replace('##rMONTHS##', relativeValues.months)
            .replace('##rYEARS##', relativeValues.years)
            .replace('##aSECONDS##', absoluteValues.seconds)
            .replace(
                '##aMINUTES##',
                DateInfo.leadingZero(absoluteValues.minutes)
            )
            .replace('##aHOURS##', DateInfo.leadingZero(absoluteValues.hours))
            .replace('##aDAYS##', DateInfo.leadingZero(absoluteValues.days))
            .replace('##aMONTH##', DateInfo.leadingZero(absoluteValues.month))
            .replace('##aMONTHsw##', absoluteValues.monthShortWritten)
            .replace('##aMONTHw##', absoluteValues.monthWritten)
            .replace('##aYEARS##', absoluteValues.years)
            .replace(/^\s*|\s*$/g, ''); // Matches whitespace at the start and end of the string

    static leadingZero = (value) => value.toString().padStart(2, '0');

    constructor(props) {
        super(props);
        let { language } = props;

        if (!language && isServer()) {
            language = 'de';
        } else {
            language = (
                chayns.env.language ||
                window.navigator.language ||
                'de'
            )
                .substring(0, 2)
                .toLowerCase();
        }

        if (
            !(
                language.indexOf('de') > -1 ||
                language.indexOf('en') > -1 ||
                language.indexOf('nl') > -1
            )
        ) {
            language = 'de';
        }

        this.state = { language };
    }

    render() {
        const { language } = this.state;
        const {
            date,
            noTitle,
            children,
            showDate,
            showTime,
            writeMonth,
            writeDay,
            date2,
            useToday,
            useTomorrowYesterday,
            hideYear,
        } = this.props;

        let txt = DateInfo.getRelativeDateString(date, {
            language,
            showDate,
            showTime,
            writeDay,
            writeMonth,
            useToday,
            useTomorrowYesterday,
            hideYear,
        });
        if (date2) {
            txt += ' - ';
            if (
                new Date(date).toDateString() === new Date(date2).toDateString()
            ) {
                txt += DateInfo.getRelativeDateString(date2, {
                    language,
                    showDate: false,
                    showTime,
                    writeDay,
                    writeMonth,
                    useToday,
                    useTomorrowYesterday,
                    hideYear,
                });
            } else {
                txt += DateInfo.getRelativeDateString(date2, {
                    language,
                    showDate,
                    showTime,
                    writeDay,
                    writeMonth,
                    useToday,
                    useTomorrowYesterday,
                    hideYear,
                });
            }
        }
        if (date2 && date > date2) {
            // eslint-disable-next-line no-console
            console.warn('[chayns components]: date2 is smaller than date');
        }

        return React.cloneElement(
            children,
            noTitle || {
                title: DateInfo.getAbsoluteDateString(date, { language }),
            },
            txt
        );
    }
}

DateInfo.propTypes = {
    /**
     * The node the text is written into.
     */
    children: PropTypes.node,

    /**
     * The language of the text as an
     * [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
     * string.
     */
    language: PropTypes.string,

    /**
     * The date that should be formatted. If a date range is supplied, this
     * should be the earier date. You can supply a date as the number of
     * milliseconds since 1970, ISO-8601 string or via a JavaScript
     * `Date`-object,
     */
    date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date),
    ]).isRequired,

    /**
     * The later date for a date range.
     */
    date2: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.instanceOf(Date),
    ]),

    /**
     * Wether the formatted text should show the time.
     */
    showTime: PropTypes.bool,

    /**
     * Wether the formatted text should show the date.
     */
    showDate: PropTypes.bool,

    /**
     * Wether the day of the week should be written out.
     */
    writeDay: PropTypes.bool,

    /**
     * Determines how to write the month. If `true`, the whole name will be
     * written out ("december"), if false only the number will be displayed
     * ("12."), otherwise it will show the short form of the month ("dec.").
     */
    writeMonth: PropTypes.bool,

    /**
     * Set this to true if the `title`-attribute should not be added to the
     * children.
     */
    noTitle: PropTypes.bool,

    /**
     * Wether the component should say "today" if the date matches today.
     */
    useToday: PropTypes.bool,

    /**
     * Wether the component should use "tomorrow" and "yesterday".
     */
    useTomorrowYesterday: PropTypes.bool,

    /**
     * When `true` the year will be omitted from the output, if `null` the year
     * will be shortened ("20" for 2020). When this is false, the full year will
     * be shown.
     */
    hideYear: PropTypes.bool,
};

DateInfo.defaultProps = {
    children: <div />,
    language: isServer()
        ? 'de'
        : (window.chayns?.env.language || navigator.language || 'de')
              .substring(0, 2)
              .toLowerCase(),
    date2: null,
    showTime: null,
    showDate: null,
    writeDay: false,
    writeMonth: null,
    noTitle: false,
    useToday: null,
    useTomorrowYesterday: null,
    hideYear: false,
};

DateInfo.displayName = 'DateInfo';
