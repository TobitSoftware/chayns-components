import { format, isPast } from 'date-fns';
import { de, enGB, es, fr, it, nl, pl, pt, tr, uk } from 'date-fns/locale';
import React, { FC, useEffect, useMemo, useState } from 'react';
import {
    getFormattedDayOfWeek,
    getFormattedTime,
    getMonthFormat,
    getTimeTillNow,
    getYearFormat,
} from './utils/format';

export type DateInfoProps = {
    /*
     * The date, that should be displayed
     */
    date: Date;
    /*
     * Additional text for "shouldShowDateToNowDifference" prop. Writes a text before the calculated time
     */
    preText?: string;
    /*
     * Adds the current year to the display
     */
    shouldShowThisYear?: boolean;
    /*
     * Adds the time to the display
     */
    shouldShowTime?: boolean;
    /*
     * Whether the relative day of week to today should be shown (today, yesterday or tomorrow)
     */
    shouldShowRelativeDayOfWeek?: boolean;
    /*
     * Shortens the day and month text to maximum three digits
     */
    shouldUseShortText?: boolean;
    /*
     * Adds the day of week to the display
     */
    shouldShowDayOfWeek?: boolean;
    /*
     * Shows the difference from the date to now. The component handels updates itself
     * NOTE: This options is only available in german
     */
    shouldShowDateToNowDifference?: boolean;
};

const DateInfo: FC<DateInfoProps> = ({
    date,
    preText = '',
    shouldShowThisYear,
    shouldShowTime,
    shouldShowRelativeDayOfWeek,
    shouldUseShortText,
    shouldShowDayOfWeek,
    shouldShowDateToNowDifference,
}) => {
    const [formattedDateString, setFormattedDateString] = useState<string>('');
    const [language, setLanguage] = useState(de);

    useEffect(() => {
        switch (chayns.env.parameters.translang || chayns.env.language) {
            case 'en':
                setLanguage(enGB);
                break;
            case 'nl':
                setLanguage(nl);
                break;
            case 'fr':
                setLanguage(fr);
                break;
            case 'it':
                setLanguage(it);
                break;
            case 'pl':
                setLanguage(pl);
                break;
            case 'pt':
                setLanguage(pt);
                break;
            case 'es':
                setLanguage(es);
                break;
            case 'tr':
                setLanguage(tr);
                break;
            case 'uk':
                setLanguage(uk);
                break;
            default:
                break;
        }
    }, []);

    useEffect(() => {
        // This useEffect is used for normal date formation
        if (shouldShowDateToNowDifference) {
            return;
        }

        let newFormattedDateString = getFormattedDayOfWeek({
            shouldShowDayOfWeek,
            shouldShowRelativeDayOfWeek,
            shouldUseShortText,
            date,
        });

        let formatString = 'dd. ';

        formatString += `${getMonthFormat({ shouldUseShortText })}`;

        formatString += `${getYearFormat({
            date,
            shouldShowThisYear,
        })}`;

        newFormattedDateString += format(date, formatString, { locale: language });

        newFormattedDateString += getFormattedTime({ date, shouldShowTime });

        setFormattedDateString(newFormattedDateString);
    }, [
        date,
        language,
        shouldShowDateToNowDifference,
        shouldShowDayOfWeek,
        shouldShowRelativeDayOfWeek,
        shouldShowThisYear,
        shouldShowTime,
        shouldUseShortText,
    ]);

    // Calculate remaining time till next minute to update time according to time left
    // Optimise interval for time difference greater one minute
    const [currentDate, setCurrentDate] = useState(new Date());

    // If the seconds of date are after seconds of current time, the timeoutTime has to be calculated differently
    useEffect(() => {
        // This useEffect is for calculating date to now difference
        if (!shouldShowDateToNowDifference) {
            return () => {};
        }

        let timeoutTime = date.getSeconds() - new Date().getSeconds();

        if (timeoutTime < 0) {
            timeoutTime = 60 - new Date().getSeconds() + date.getSeconds();
        }
        // time difference is less than a minute

        // initial set remaining time
        let timeDiffInMs = date.getTime() - currentDate.getTime();

        // Set timeoutTime to at least 1000ms
        // set to elapsed time
        if (isPast(date)) {
            timeDiffInMs = currentDate.getTime() - date.getTime();
        }

        if (timeDiffInMs < 60000) {
            timeoutTime = 1;
        }

        timeoutTime = Math.max(timeoutTime * 1000, 1000);

        const intervall = setTimeout(() => {
            setCurrentDate(new Date());
        }, timeoutTime);

        return () => {
            clearTimeout(intervall);
        };
    }, [currentDate, date, shouldShowDateToNowDifference]);

    useEffect(() => {
        if (shouldShowDateToNowDifference) {
            setFormattedDateString(getTimeTillNow({ date, currentDate }));
        }
    }, [currentDate, date, shouldShowDateToNowDifference]);

    return useMemo(
        () => (
            <div>
                {preText} {formattedDateString}
            </div>
        ),
        [formattedDateString, preText]
    );
};

DateInfo.displayName = 'DateInfo';

export default DateInfo;
