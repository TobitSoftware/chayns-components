import { getLanguage } from 'chayns-api';
import { useEffect, useMemo, useState } from 'react';
import { UseDateInfoOptions } from '../types/dateinfo';
import { getDateInfo, getTimeTillNow } from '../utils/dateInfo';

export const useDateInfo = ({
    date,
    shouldShowDateToNowDifference,
    shouldShowRelativeDayOfWeek,
    shouldShowDayOfWeek,
    shouldShowTime,
    shouldUseShortText,
    shouldShowOnlyTime,
    shouldShowYear,
    preText,
}: UseDateInfoOptions) => {
    const { active: language } = getLanguage();

    const [formattedDate, setFormattedDate] = useState(date.toLocaleDateString());
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        if (shouldShowDateToNowDifference) {
            return;
        }

        setFormattedDate(
            getDateInfo({
                date,
                shouldShowYear,
                shouldShowOnlyTime,
                shouldShowTime,
                shouldUseShortText,
                shouldShowDayOfWeek,
                shouldShowRelativeDayOfWeek,
            }),
        );
    }, [
        date,
        shouldShowDateToNowDifference,
        shouldShowDayOfWeek,
        shouldShowOnlyTime,
        shouldShowRelativeDayOfWeek,
        shouldShowTime,
        shouldShowYear,
        shouldUseShortText,
    ]);

    useEffect(() => {
        if (!shouldShowDateToNowDifference) return () => {};

        const updateCurrentDate = () => setCurrentDate(new Date());
        const now = new Date();
        const timeDiffInMs = Math.abs(date.getTime() - now.getTime());

        const updateInterval = timeDiffInMs < 60000 ? 1000 : 60000 - now.getSeconds() * 1000;

        const intervalId = setInterval(updateCurrentDate, 1000);
        const timeout = setTimeout(updateCurrentDate, updateInterval);

        return () => {
            clearTimeout(timeout);
            clearInterval(intervalId);
        };
    }, [date, shouldShowDateToNowDifference]);

    useEffect(() => {
        if (shouldShowDateToNowDifference) {
            setFormattedDate(getTimeTillNow({ date, currentDate, language }));
        }
    }, [date, currentDate, language, shouldShowDateToNowDifference]);

    return useMemo(
        () => `${preText ? `${preText.trim()} ` : ''}${formattedDate}`,
        [formattedDate, preText],
    );
};
