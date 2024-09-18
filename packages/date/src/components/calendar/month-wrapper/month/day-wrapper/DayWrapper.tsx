import {
    addDays,
    isSameDay,
    isSameMonth,
    isWithinInterval,
    startOfMonth,
    startOfWeek,
} from 'date-fns';
import React, { FC, useCallback, useMemo, type ReactElement } from 'react';
import {
    CalendarType,
    type Categories,
    type DateInterval,
    type EMonth,
    type HighlightedDates,
} from '../../../../../types/calendar';
import Day from './day/Day';
import { StyledDayWrapper } from './DayWrapper.styles';

export type DayWrapperProps = {
    month: EMonth;
    year: string;
    highlightedDates?: HighlightedDates[];
    onSelect: (date: Date) => void;
    selectedDate?: Date | Date[] | DateInterval;
    categories?: Categories[];
    minDate: Date;
    maxDate: Date;
    type: CalendarType;
    hoveringDay: Date | null;
    setHoveringDay: (date: Date | null) => void;
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
    type,
    hoveringDay,
    setHoveringDay,
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
            const isThisMonth = isSameMonth(day, dayOfCurrentMonth);
            let isSelected = false;
            let isIntervalStart = false;
            let isIntervalEnd = false;
            let isWithinIntervalSelection = false;
            let showHoverEffect = false;

            const { start, end } = selectedDate || ({} as DateInterval);

            if (type === CalendarType.Single && selectedDate instanceof Date) {
                isSelected = isSameDay(selectedDate, day);
            } else if (type === CalendarType.Multiple && Array.isArray(selectedDate)) {
                isSelected = selectedDate.some((date) => isSameDay(date, day));
            } else if (type === CalendarType.Interval && (start || end)) {
                if (start) {
                    isIntervalStart = isSameDay(start, day);
                }
                if (end) {
                    isIntervalEnd = isSameDay(end, day);
                }
                if (start && end) {
                    isWithinIntervalSelection = isWithinInterval(day, {
                        start,
                        end,
                    });
                }
            }

            if (type === CalendarType.Interval && hoveringDay) {
                if (!start) {
                    showHoverEffect = isSameDay(day, hoveringDay);
                } else if (start && !end) {
                    if (start > day) {
                        showHoverEffect = isSameDay(day, hoveringDay);
                    } else {
                        showHoverEffect = isWithinInterval(day, { start, end: hoveringDay });
                        isIntervalEnd = isSameDay(hoveringDay, day);
                    }
                } else if (start && end && isSameDay(hoveringDay, day)) {
                    showHoverEffect = !isWithinInterval(day, { start, end });
                }
            }

            items.push(
                <Day
                    key={`single-day-${day.toDateString()}`}
                    categories={categories}
                    date={day}
                    isSelected={isSelected}
                    isIntervalStart={isIntervalStart}
                    isIntervalEnd={isIntervalEnd}
                    isWithinIntervalSelection={isWithinIntervalSelection}
                    isDisabled={!isWithinInterval(day, { start: minDate, end: maxDate })}
                    isSameMonth={isSameMonth(day, dayOfCurrentMonth)}
                    onClick={handleDayClick}
                    highlightedDates={highlightedDates}
                    setHoveringDay={setHoveringDay}
                    showHoverEffect={showHoverEffect}
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
        type,
        hoveringDay,
    ]);

    return <StyledDayWrapper>{dayElements}</StyledDayWrapper>;
};

DayWrapper.displayName = 'DayWrapper';

export default DayWrapper;
