/**
 * @component
 */

import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { isServer } from '../../utils/isServer';
import {
    getAbsoluteDateString,
    getRelativeDateString,
} from './utils/formatDate';
import Tooltip from '../../react-chayns-tooltip/component/Tooltip';

/**
 * Formats a date or date range to be easily readable and reveals the absolute
 * date on hover.
 */
export default class DateInfo extends PureComponent {
    static getAbsoluteDateString = getAbsoluteDateString;

    static getRelativeDateString = getRelativeDateString;

    constructor(props) {
        super(props);

        this.setLanguage((language) => {
            this.state = { language };
        });
    }

    componentDidUpdate(prevProps) {
        const { language } = this.props;

        if (prevProps.language !== language) {
            this.setLanguage((lang) => this.setState({ language: lang }));
        }
    }

    setLanguage = (callback) => {
        let { language } = this.props;

        if (!language) {
            if (isServer()) {
                language = 'de';
            } else {
                language = (
                    chayns.env.parameters.translang ||
                    chayns.env.site.translang ||
                    chayns.env.language ||
                    window.navigator.language ||
                    'de'
                )
                    .substring(0, 2)
                    .toLowerCase();
            }
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

        callback(language);
    };

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

        let txt = getRelativeDateString(date, {
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
                txt += getRelativeDateString(date2, {
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
                txt += getRelativeDateString(date2, {
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

        const childElement = Array.isArray(children) ? children[0] : children;
        const newChild = React.cloneElement(
            childElement,
            { style: { display: 'inline-block' } },
            txt
        );

        if (noTitle) {
            return newChild;
        }

        return (
            <Tooltip
                content={{
                    html: (
                        <div style={{ whiteSpace: 'nowrap' }}>
                            {getAbsoluteDateString(date, { language })}
                        </div>
                    ),
                }}
                bindListeners
            >
                {newChild}
            </Tooltip>
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
    language: undefined,
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
