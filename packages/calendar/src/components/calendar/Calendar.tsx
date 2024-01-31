import React, { FC, useEffect, useMemo, useState } from 'react';
import { Locale, isAfter, isBefore } from 'date-fns';
import { de } from 'date-fns/locale';
import { StyledCalendar } from './Calendar.styles';
import Month from './month/Month';
import { getMonthAndYear } from '../../utils/calendar';

export type CalendarProps = {
    locale?: Locale;
    startDate: Date;
    endDate: Date;
};

const Calendar: FC<CalendarProps> = ({ locale = de, endDate, startDate }) => {
    const [currentDate, setCurrentDate] = useState<Date>();

    useEffect(() => {
        const date = new Date();

        switch (true) {
            case isAfter(date, endDate):
                setCurrentDate(endDate);

                return;
            case isBefore(date, startDate):
                setCurrentDate(startDate);

                return;
            default:
                setCurrentDate(date);
        }
    }, [endDate, startDate]);

    useEffect(() => {
        if (currentDate) {
            getMonthAndYear(currentDate);
        }
    }, [currentDate]);

    const months = useMemo(() => {
        if (!currentDate) {
            return null;
        }

        const { month, year } = getMonthAndYear(currentDate);

        return (
            <Month
                month={month}
                year={year}
                shouldShowLeftArrow
                shouldShowRightArrow
                locale={locale}
            />
        );
    }, [currentDate, locale]);

    return <StyledCalendar>{months}</StyledCalendar>;
};

Calendar.displayName = 'Calendar';

export default Calendar;
