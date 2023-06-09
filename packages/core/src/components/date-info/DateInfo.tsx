import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import type { DateInfoProps } from './types/props';
import { DateFormat } from './types/props';
import {
    getDateWithTime,
    getDateWithTimePeriod,
    getDayWithDate,
    getDayWithDatePeriod,
    getDayWithTime,
    getDayWithTimePeriod,
    getSimpleDate,
    getSimpleDatePeriod,
    getSimpleTime,
    getSimpleTimePeriod,
    getTimeTillNow,
} from './utils.ts/format';

const DateInfo: FC<DateInfoProps> = ({
    secondDate,
    date,
    format,
    formatOptions = {},
    isDisabled,
    onDateClick,
    placeholder,
}) => {
    // If set to null, the placeholder is shown, if the date is editable. To avoid this on the first render, the initial value is set to an empty string
    const [formattedDateString, setFormattedDateString] = useState<string | null>('');

    const isEditable = useMemo(() => typeof onDateClick === 'function', [onDateClick]);

    useEffect(() => {
        if (date) {
            let newFormattedDateString: string | null = null;

            switch (format) {
                case DateFormat.SimpleDate:
                    newFormattedDateString = getSimpleDate({ date, formatOptions });
                    break;
                case DateFormat.SimpleTime:
                    newFormattedDateString = getSimpleTime({ date });
                    break;
                case DateFormat.DateWithTime:
                    newFormattedDateString = getDateWithTime({ date, formatOptions });
                    break;
                case DateFormat.DayWithDate:
                    newFormattedDateString = getDayWithDate({ date, formatOptions });
                    break;
                case DateFormat.DayWithTime:
                    newFormattedDateString = getDayWithTime({ date, formatOptions });
                    break;
                case DateFormat.SimpleDatePeriod:
                    if (!secondDate) {
                        break;
                    }

                    newFormattedDateString = getSimpleDatePeriod({
                        date,
                        secondDate,
                        formatOptions,
                    });
                    break;
                case DateFormat.SimpleTimePeriod:
                    if (!secondDate) {
                        break;
                    }

                    newFormattedDateString = getSimpleTimePeriod({ date, secondDate });
                    break;
                case DateFormat.DateWithTimePeriod:
                    if (!secondDate) {
                        break;
                    }

                    newFormattedDateString = getDateWithTimePeriod({
                        date,
                        secondDate,
                        formatOptions,
                    });
                    break;
                case DateFormat.DayWithDatePeriod:
                    if (!secondDate) {
                        break;
                    }

                    newFormattedDateString = getDayWithDatePeriod({
                        date,
                        secondDate,
                        formatOptions,
                    });
                    break;
                case DateFormat.DayWithTimePeriod:
                    if (!secondDate) {
                        break;
                    }

                    newFormattedDateString = getDayWithTimePeriod({
                        date,
                        secondDate,
                        formatOptions,
                    });
                    break;
                case DateFormat.TimeTillNow:
                    if (!secondDate) {
                        break;
                    }

                    newFormattedDateString = getTimeTillNow({ date, secondDate, formatOptions });
                    break;
                default:
                    break;
            }

            setFormattedDateString(newFormattedDateString);
        } else {
            setFormattedDateString(null);
        }
    }, [date, format, formatOptions, secondDate]);

    const handleClick = useCallback(() => {
        if (onDateClick) {
            onDateClick();
        }
    }, [onDateClick]);

    return useMemo(
        () => (
            <div>
                {isEditable && (
                    <div>
                        {isDisabled ? (
                            <div>{formattedDateString ?? placeholder}</div>
                        ) : (
                            <a onClick={handleClick}>{formattedDateString ?? placeholder}</a>
                        )}
                    </div>
                )}
                {!isEditable && <div>{formattedDateString}</div>}
            </div>
        ),
        [formattedDateString, handleClick, isDisabled, isEditable, placeholder]
    );
};

DateInfo.displayName = 'DateInfo';

export default DateInfo;
