import React, { FC, useMemo } from 'react';
import { useDateInfo, type UseDateInfoOptions } from '../../hooks/useDateInfo';

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
}) => {
    const formattedDate = useDateInfo({
        date,
        preText,
        shouldShowYear,
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
