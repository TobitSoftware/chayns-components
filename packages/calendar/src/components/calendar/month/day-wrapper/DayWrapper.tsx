import React, { FC, type ReactElement, useMemo } from 'react';
import { startOfMonth, startOfWeek, addDays, isSameMonth } from 'date-fns';
import { StyledDayWrapper } from './DayWrapper.styles';
import Day from './day/Day';
import type { EMonth } from '../../../../types/calendar';

export type DayWrapperProps = {
    month: EMonth;
    year: string;
};

const DayWrapper: FC<DayWrapperProps> = ({ month, year }) => {
    const dayOfCurrentMonth = useMemo(() => new Date(Number(year), month - 1, 13), [month, year]);

    const days = useMemo(() => {
        const dateArray: Date[] = [];

        const currentDate = startOfMonth(dayOfCurrentMonth);

        const startDay = startOfWeek(currentDate, { weekStartsOn: 1 });

        for (let i = 0; i < 42; i++) {
            const newDate = addDays(startDay, i);
            dateArray.push(newDate);
        }

        return dateArray;
    }, [dayOfCurrentMonth]);

    const handleDayClick = (date: Date, shouldFireEvent: boolean) => {
        if (shouldFireEvent) {
            console.log('Clicked Date', date);
        }
    };

    const dayElements = useMemo(() => {
        const items: ReactElement[] = [];

        days.forEach((day) => {
            items.push(
                <Day
                    date={day}
                    isSameMonth={isSameMonth(day, dayOfCurrentMonth)}
                    onClick={handleDayClick}
                />,
            );
        });

        return items;
    }, [dayOfCurrentMonth, days]);

    return <StyledDayWrapper>{dayElements}</StyledDayWrapper>;
};

DayWrapper.displayName = 'DayWrapper';

export default DayWrapper;
