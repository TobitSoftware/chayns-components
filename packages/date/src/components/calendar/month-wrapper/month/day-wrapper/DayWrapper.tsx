import {
    addDays,
    isSameDay,
    isSameMonth,
    isWithinInterval,
    startOfMonth,
    startOfWeek,
} from 'date-fns';
import React, { FC, useCallback, useMemo, type ReactElement } from 'react';
import type { Categories, EMonth, HighlightedDates } from '../../../../../types/calendar';
import Day from './day/Day';
import { StyledDayWrapper } from './DayWrapper.styles';

export type DayWrapperProps = {
    month: EMonth;
    year: string;
    highlightedDates?: HighlightedDates[];
    onSelect: (date: Date) => void;
    selectedDate?: Date | Date[];
    categories?: Categories[];
    minDate: Date;
    maxDate: Date;
};

const DayWrapper: FC<DayWrapperProps> = ({
    month,
    year,
    highlightedDates,
    onSelect,
    selectedDate,
    categories,
    minDate,
    maxDate,
}) => {
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
            if (shouldFireEvent) {
                onSelect(date);
            }
        },
        [onSelect],
    );

    const dayElements = useMemo(() => {
        const items: ReactElement[] = [];

        days.forEach((day) => {
            let isSelected = false;

            if (Array.isArray(selectedDate)) {
                isSelected = selectedDate.some((date) => isSameDay(date, day));
            } else if (selectedDate) {
                isSelected = isSameDay(selectedDate, day);
            }

            items.push(
                <Day
                    key={`single-day-${day.toDateString()}`}
                    categories={categories}
                    date={day}
                    isSelected={isSelected}
                    isDisabled={!isWithinInterval(day, { start: minDate, end: maxDate })}
                    isSameMonth={isSameMonth(day, dayOfCurrentMonth)}
                    onClick={handleDayClick}
                    highlightedDates={highlightedDates}
                />,
            );
        });

        return items;
    }, [
        categories,
        dayOfCurrentMonth,
        days,
        handleDayClick,
        highlightedDates,
        selectedDate,
        minDate,
        maxDate,
    ]);

    return <StyledDayWrapper>{dayElements}</StyledDayWrapper>;
};

DayWrapper.displayName = 'DayWrapper';

export default DayWrapper;
