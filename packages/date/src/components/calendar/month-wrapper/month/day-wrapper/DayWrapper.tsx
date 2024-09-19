import {
    addDays,
    isAfter,
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
import { findNextDate } from '../../../../../utils/calendar';
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
    disabledDates: Date[];
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
    disabledDates,
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

        const { start, end } = (selectedDate || {}) as DateInterval;
        const firstDisabledDateAfterStart = findNextDate(start, disabledDates);

        days.forEach((day) => {
            let isSelected = false;
            let isIntervalStart = false;
            let isIntervalEnd = false;
            let isWithinIntervalSelection = false;
            let showHoverEffect = false;

            let isDisabled =
                // Disables dates, that are not between minDate and maxDate.
                !isWithinInterval(day, { start: minDate, end: maxDate }) ||
                // Disables
                disabledDates.some((disabledDate) => isSameDay(disabledDate, day));

            if (type === CalendarType.Single && selectedDate instanceof Date) {
                isSelected = isSameDay(selectedDate, day);
            } else if (type === CalendarType.Multiple && Array.isArray(selectedDate)) {
                isSelected = selectedDate.some((date) => isSameDay(date, day));
            } else if (type === CalendarType.Interval && start) {
                isIntervalStart = isSameDay(start, day);
                if (end) {
                    isIntervalEnd = isSameDay(end, day);

                    isWithinIntervalSelection = isWithinInterval(day, {
                        start,
                        end,
                    });
                } else if (
                    firstDisabledDateAfterStart &&
                    !isDisabled &&
                    isAfter(day, firstDisabledDateAfterStart)
                ) {
                    // Ensures, that the interval end can't be set in a way, that the interval includes disabled dates.
                    isDisabled = true;
                }
            }

            if (
                type === CalendarType.Interval &&
                hoveringDay &&
                !isIntervalStart &&
                !isIntervalEnd &&
                !isWithinIntervalSelection
            ) {
                if (!start) {
                    isIntervalStart = isSameDay(day, hoveringDay);
                } else if (start && !end) {
                    if (start > day) {
                        isIntervalStart = isSameDay(day, hoveringDay);
                    } else {
                        isWithinIntervalSelection = isWithinInterval(day, {
                            start,
                            end: hoveringDay,
                        });
                        isIntervalEnd = isSameDay(hoveringDay, day);
                    }
                } else if (start && end && isSameDay(hoveringDay, day)) {
                    isIntervalStart = !isWithinInterval(day, { start, end });
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
                    isDisabled={isDisabled}
                    isSameMonth={isSameMonth(day, dayOfCurrentMonth)}
                    onClick={handleDayClick}
                    highlightedDates={highlightedDates}
                    setHoveringDay={setHoveringDay}
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
        disabledDates,
        setHoveringDay,
    ]);

    return <StyledDayWrapper>{dayElements}</StyledDayWrapper>;
};

DayWrapper.displayName = 'DayWrapper';

export default DayWrapper;
