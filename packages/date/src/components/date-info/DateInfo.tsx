import React, { FC, useMemo } from 'react';
import { useDateInfo } from '../../hooks/useDateInfo';
import { UseDateInfoOptions } from '../../types/dateinfo';

export type DateInfoProps = UseDateInfoOptions;

const DateInfo: FC<DateInfoProps> = ({
    date,
    preText = '',
    shouldShowYear,
    shouldShowTime,
    shouldShowRelativeDayOfWeek,
    shouldUseShortText,
    shouldShowDayOfWeek,
    shouldShowDateToNowDifference,
    shouldShowOnlyTime,
}) => {
    const formattedDate = useDateInfo({
        date,
        preText,
        shouldShowYear,
        shouldShowOnlyTime,
        shouldShowTime,
        shouldUseShortText,
        shouldShowDayOfWeek,
        shouldShowRelativeDayOfWeek,
        shouldShowDateToNowDifference,
    });

    return useMemo(() => <span>{formattedDate}</span>, [formattedDate]);
};

DateInfo.displayName = 'DateInfo';

export default DateInfo;
