import { format, isPast } from 'date-fns';
import React, { FC, useEffect, useMemo, useState } from 'react';
import {
    getFormattedDayOfWeek,
    getFormattedTime,
    getMonthFormat,
    getTimeTillNow,
    getYearFormat,
} from './utils/format';
import { getLanguage } from './utils/language';

export type DateInfoProps = {
    /**
     * The date, that should be displayed
     */
    date: Date | string;
    /**
     * Additional text for "shouldShowDateToNowDifference" prop. Writes a text before the calculated time
     */
    preText?: string;
    /**
     * Adds the current year to the display
     */
    shouldShowThisYear?: boolean;
    /**
     * Adds the time to the display.
     * NOTE: The time is display with german text
     */
    shouldShowTime?: boolean;
    /**
     * Whether the relative day of week to today should be shown (today, yesterday or tomorrow).
     * NOTE: The text is only available in german
     */
    shouldShowRelativeDayOfWeek?: boolean;
    /**
     * Shortens the day and month text to maximum three digits
     */
    shouldUseShortText?: boolean;
    /**
     * Adds the day of week to the display
     */
    shouldShowDayOfWeek?: boolean;
    /**
     * Shows the difference from the date to now. The component handles updates itself.
     * NOTE: This option is only available in german
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
    const [formattedDate, setFormattedDate] = useState(new Date(date));
    const [formattedDateString, setFormattedDateString] = useState<string>('');
    const [language] = useState(getLanguage());

    useEffect(() => {
        // This useEffect is used for normal date formation
        if (shouldShowDateToNowDifference) {
            return;
        }

        let newFormattedDateString = getFormattedDayOfWeek({
            shouldShowDayOfWeek,
            shouldShowRelativeDayOfWeek,
            shouldUseShortText,
            date: formattedDate,
        });

        let formatString = 'dd. ';

        formatString += `${getMonthFormat({ shouldUseShortText })}`;

        formatString += `${getYearFormat({
            date: formattedDate,
            shouldShowThisYear,
        })}`;

        newFormattedDateString += format(formattedDate, formatString, { locale: language });

        newFormattedDateString += getFormattedTime({ date: formattedDate, shouldShowTime });

        setFormattedDateString(newFormattedDateString);
    }, [
        date,
        formattedDate,
        language,
        shouldShowDateToNowDifference,
        shouldShowDayOfWeek,
        shouldShowRelativeDayOfWeek,
        shouldShowThisYear,
        shouldShowTime,
        shouldUseShortText,
    ]);

    // Calculate remaining time till next minute to update time according to time left
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        // This useEffect is for calculating the current date for shouldShowDateToNowDifference option
        if (!shouldShowDateToNowDifference) {
            return () => {};
        }

        let timeoutTime = formattedDate.getSeconds() - new Date().getSeconds();

        // If the seconds of date are after seconds of current time, the timeoutTime has to be calculated differently
        if (timeoutTime < 0) {
            timeoutTime = 60 - new Date().getSeconds() + formattedDate.getSeconds();
        }

        // initialized with remaining time
        let timeDiffInMs = formattedDate.getTime() - currentDate.getTime();

        // set to elapsed time
        if (isPast(formattedDate)) {
            timeDiffInMs = currentDate.getTime() - formattedDate.getTime();
        }

        // time difference is less than a minute, time should be updated every second
        if (timeDiffInMs < 60000) {
            timeoutTime = 1;
        }

        // Set timeoutTime to at least 1000ms
        timeoutTime = Math.max(timeoutTime * 1000, 1000);

        const timeout = setTimeout(() => {
            setCurrentDate(new Date());
        }, timeoutTime);

        return () => {
            clearTimeout(timeout);
        };
    }, [currentDate, date, formattedDate, shouldShowDateToNowDifference]);

    useEffect(() => {
        // This useEffect is for showing the difference of the date to now
        if (shouldShowDateToNowDifference) {
            setFormattedDateString(getTimeTillNow({ date: formattedDate, currentDate }));
        }
    }, [currentDate, date, formattedDate, shouldShowDateToNowDifference]);

    useEffect(() => {
        setFormattedDate(new Date(date));
    }, [date]);

    return useMemo(
        () => (
            <span>
                {preText.trim()} {formattedDateString}
            </span>
        ),
        [formattedDateString, preText]
    );
};

DateInfo.displayName = 'DateInfo';

export default DateInfo;
