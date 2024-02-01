import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { isBefore, type Locale } from 'date-fns';
import { de } from 'date-fns/locale';
import { StyledCalendar } from './Calendar.styles';
import Month from './month/Month';
import { getMonthAndYear, isDateInRange } from '../../utils/calendar';
import type { HighlightedDates } from '../../types/calendar';

export type CalendarProps = {
    locale?: Locale;
    startDate: Date;
    endDate: Date;
    highlightedDates?: HighlightedDates[];
};

const Calendar: FC<CalendarProps> = ({ locale = de, endDate, startDate, highlightedDates }) => {
    const [currentDate, setCurrentDate] = useState<Date>();

    useEffect(() => {
        const date = new Date();

        setCurrentDate(isDateInRange({ startDate, endDate, currentDate: date }));
    }, [endDate, startDate]);

    const handleLeftArrowClick = useCallback(() => {
        setCurrentDate((prevDate) => {
            if (!prevDate) {
                return prevDate;
            }

            const date = new Date();

            const newDate = new Date(date.setMonth(prevDate.getMonth() - 1));

            return isDateInRange({ startDate, endDate, currentDate: newDate });
        });
    }, [endDate, startDate]);

    const handleRightArrowClick = useCallback(() => {
        setCurrentDate((prevDate) => {
            if (!prevDate) {
                return prevDate;
            }

            const date = new Date();

            const newDate = new Date(date.setMonth(prevDate.getMonth() + 1));

            return isDateInRange({ startDate, endDate, currentDate: newDate });
        });
    }, [endDate, startDate]);

    const months = useMemo(() => {
        if (!currentDate) {
            return null;
        }

        const { month, year } = getMonthAndYear(currentDate);

        return (
            <Month
                month={month}
                year={year}
                onLeftArrowClick={handleLeftArrowClick}
                onRightArrowClick={handleRightArrowClick}
                shouldShowLeftArrow
                shouldShowRightArrow={isBefore(currentDate, endDate)}
                locale={locale}
                highlightedDates={highlightedDates}
            />
        );
    }, [
        highlightedDates,
        currentDate,
        endDate,
        handleLeftArrowClick,
        handleRightArrowClick,
        locale,
    ]);

    return <StyledCalendar>{months}</StyledCalendar>;
};

Calendar.displayName = 'Calendar';

export default Calendar;
