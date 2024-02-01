import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isSameMonth, type Locale } from 'date-fns';
import { de } from 'date-fns/locale';
import { StyledCalendar } from './Calendar.styles';
import Month from './month/Month';
import { getMonthAndYear, isDateInRange } from '../../utils/calendar';
import type { HighlightedDates } from '../../types/calendar';

export type CalendarProps = {
    /**
     * The last Month that can be displayed.
     */
    endDate: Date;
    /**
     * An array with dates and corresponding styles to highlight.
     */
    highlightedDates?: HighlightedDates[];
    /**
     * The locale language to format the dates.
     */
    locale?: Locale;
    /**
     * Function to be executed when a date is selected.
     * @param date
     */
    onSelect?: (date: Date) => void;
    /**
     * A date that should be preselected.
     */
    selectedDate?: Date;
    /**
     * The first Month that can be displayed.
     */
    startDate: Date;
};

const Calendar: FC<CalendarProps> = ({
    locale = de,
    endDate,
    startDate,
    highlightedDates,
    onSelect,
    selectedDate,
}) => {
    const [currentDate, setCurrentDate] = useState<Date>();
    const [shouldRenderTwoMonths, setShouldRenderTwoMonths] = useState(true);
    const [internalSelectedDate, setInternalSelectedDate] = useState<Date>();

    const calendarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedDate) {
            setInternalSelectedDate(selectedDate);
        }
    }, [selectedDate]);

    useEffect(() => {
        if (calendarRef.current) {
            const resizeObserver = new ResizeObserver((entries) => {
                if (entries && entries[0]) {
                    const observedWidth = entries[0].contentRect.width;

                    if (observedWidth < 430) {
                        setShouldRenderTwoMonths(false);
                    } else {
                        setShouldRenderTwoMonths(true);
                    }
                }
            });

            resizeObserver.observe(calendarRef.current);

            return () => {
                resizeObserver.disconnect();
            };
        }

        return () => {};
    }, []);

    useEffect(() => {
        const date = new Date();

        setCurrentDate(isDateInRange({ startDate, endDate, currentDate: date }));
    }, [endDate, startDate]);

    const handleLeftArrowClick = useCallback(() => {
        setCurrentDate((prevDate) => {
            if (!prevDate) {
                return prevDate;
            }

            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() - 1);

            if (prevDate.getMonth() === 0 && newDate.getMonth() === 11) {
                newDate.setFullYear(prevDate.getFullYear() - 1);
            }

            return isDateInRange({ startDate, endDate, currentDate: newDate });
        });
    }, [endDate, startDate]);

    const handleRightArrowClick = useCallback(() => {
        setCurrentDate((prevDate) => {
            if (!prevDate) {
                return prevDate;
            }

            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() + 1);

            if (prevDate.getMonth() === 11 && newDate.getMonth() === 0) {
                newDate.setFullYear(prevDate.getFullYear() + 1);
            }

            return isDateInRange({ startDate, endDate, currentDate: newDate });
        });
    }, [endDate, startDate]);

    const handleSelect = useCallback(
        (date: Date) => {
            setInternalSelectedDate(date);

            if (typeof onSelect === 'function') {
                onSelect(date);
            }
        },
        [onSelect],
    );

    const months = useMemo(() => {
        if (!currentDate || !calendarRef.current) {
            return null;
        }

        const { month, year } = getMonthAndYear(currentDate);

        const firstMonthElement = (
            <Month
                selectedDate={internalSelectedDate}
                onSelect={handleSelect}
                month={month}
                year={year}
                onLeftArrowClick={handleLeftArrowClick}
                onRightArrowClick={handleRightArrowClick}
                shouldShowLeftArrow={!isSameMonth(currentDate, startDate)}
                shouldShowRightArrow={!shouldRenderTwoMonths && !isSameMonth(currentDate, endDate)}
                locale={locale}
                highlightedDates={highlightedDates}
            />
        );

        let secondMonthElement;

        if (shouldRenderTwoMonths) {
            const newDate = new Date(currentDate);
            newDate.setMonth(currentDate.getMonth() + 1);

            if (currentDate.getMonth() === 11 && newDate.getMonth() === 0) {
                newDate.setFullYear(currentDate.getFullYear() + 1);
            }

            const { month: secondMonth, year: secondYear } = getMonthAndYear(newDate);

            secondMonthElement = (
                <Month
                    selectedDate={internalSelectedDate}
                    onSelect={handleSelect}
                    month={secondMonth}
                    year={secondYear}
                    onLeftArrowClick={handleLeftArrowClick}
                    onRightArrowClick={handleRightArrowClick}
                    shouldShowLeftArrow={false}
                    shouldShowRightArrow={!isSameMonth(newDate, endDate)}
                    locale={locale}
                    highlightedDates={highlightedDates}
                />
            );
        }

        return [firstMonthElement, secondMonthElement];
    }, [
        currentDate,
        internalSelectedDate,
        handleSelect,
        handleLeftArrowClick,
        handleRightArrowClick,
        startDate,
        shouldRenderTwoMonths,
        endDate,
        locale,
        highlightedDates,
    ]);

    return <StyledCalendar ref={calendarRef}>{months}</StyledCalendar>;
};

Calendar.displayName = 'Calendar';

export default Calendar;
