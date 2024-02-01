import React, { FC, type ReactElement, useCallback, useMemo } from 'react';
import { startOfMonth, startOfWeek, addDays, isSameMonth } from 'date-fns';
import { StyledDayWrapper } from './DayWrapper.styles';
import Day from './day/Day';
import type { EMonth, HighlightedDates } from '../../../../types/calendar';

export type DayWrapperProps = {
    month: EMonth;
    year: string;
    highlightedDates?: HighlightedDates[];
    onSelect?: (date: Date) => void;
};

const DayWrapper: FC<DayWrapperProps> = ({ month, year, highlightedDates, onSelect }) => {
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

    const handleDayClick = useCallback(
        (date: Date, shouldFireEvent: boolean) => {
            if (shouldFireEvent && typeof onSelect === 'function') {
                onSelect(date);
            }
        },
        [onSelect],
    );

    const dayElements = useMemo(() => {
        const items: ReactElement[] = [];

        days.forEach((day) => {
            items.push(
                <Day
                    date={day}
                    isSameMonth={isSameMonth(day, dayOfCurrentMonth)}
                    onClick={handleDayClick}
                    highlightedDates={highlightedDates}
                />,
            );
        });

        return items;
    }, [dayOfCurrentMonth, days, handleDayClick, highlightedDates]);

    return <StyledDayWrapper>{dayElements}</StyledDayWrapper>;
};

DayWrapper.displayName = 'DayWrapper';

export default DayWrapper;
