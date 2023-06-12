import { format } from 'date-fns';
import React, { FC, useEffect, useMemo, useState } from 'react';
import {
    getFormattedDayOfWeek,
    getFormattedMonth,
    getFormattedTime,
    getFormattedYear,
} from './utils/format';

export type DateInfoProps = {
    /*
     * The date, that should be displayed
     */
    date: Date;
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
};

const DateInfo: FC<DateInfoProps> = ({
    date,
    shouldShowDayOfWeek,
    shouldShowRelativeDayOfWeek,
    shouldShowTime,
    shouldShowThisYear,
    shouldUseShortText,
}) => {
    // If set to null, the placeholder is shown, if the date is editable. To avoid this on the first render, the initial value is set to an empty string
    const [formattedDateString, setFormattedDateString] = useState<string | null>('');

    useEffect(() => {
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
        shouldShowDayOfWeek,
        shouldShowRelativeDayOfWeek,
        shouldShowThisYear,
        shouldShowTime,
        shouldUseShortText,
    ]);

    return useMemo(() => <div>{formattedDateString}</div>, [formattedDateString]);
};

DateInfo.displayName = 'DateInfo';

export default DateInfo;
