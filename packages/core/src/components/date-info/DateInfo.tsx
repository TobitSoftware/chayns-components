import { format, isPast } from 'date-fns';
import React, { FC, useEffect, useMemo, useState } from 'react';
import {
    getFormattedDayOfWeek,
    getFormattedMonth,
    getFormattedTime,
    getFormattedYear,
    getTimeTillNow,
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
     */
    shouldShowDateToNowDifference?: boolean;
};

const DateInfo: FC<DateInfoProps> = ({
    date,
    preText = '',
    shouldShowTime,
    shouldShowRelativeDayOfWeek,
    shouldShowThisYear,
    shouldUseShortText,
    shouldShowDayOfWeek,
    shouldShowDateToNowDifference,
}) => {
    const [formattedDateString, setFormattedDateString] = useState<string>('');

    useEffect(() => {
        // This useEffect is used for normal date formation
        if (shouldShowDateToNowDifference) {
            return;
        }

        let formatString = 'dd. ';

        formatString += ` ${getFormattedMonth({ shouldUseShortText })}`;

        formatString += `${getFormattedYear({
            date,
            shouldShowThisYear,
        })}`;

        let string = getFormattedDayOfWeek({
            shouldShowDayOfWeek,
            shouldShowRelativeDayOfWeek,
            shouldUseShortText,
            date,
        });

        string += format(date, formatString);

        string += getFormattedTime({ date, shouldShowTime });

        setFormattedDateString(string);
    }, [
        date,
        shouldShowDateToNowDifference,
        shouldShowDayOfWeek,
        shouldShowRelativeDayOfWeek,
        shouldShowThisYear,
        shouldShowTime,
        shouldUseShortText,
    ]);

    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        // This useEffect is for calculating date to now difference
        if (!shouldShowDateToNowDifference) {
            return () => {};
        }

        let timeoutTime = date.getSeconds() - new Date().getSeconds();

        if (timeoutTime < 0) {
            timeoutTime = 60 - new Date().getSeconds() + date.getSeconds();
        }

        // initial remaining time
        let timeDiffInMs = date.getTime() - currentDate.getTime();

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
