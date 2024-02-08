import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Locale } from 'date-fns';
import { de } from 'date-fns/locale';
import { StyledCalendar, StyledCalendarIconWrapper } from './Calendar.styles';
import { getNewDate, isDateInRange } from '../../utils/calendar';
import type { Categories, HighlightedDates } from '../../types/calendar';
import { Icon } from '@chayns-components/core';
import MonthWrapper from './month-wrapper/MonthWrapper';
import { AnimatePresence } from 'framer-motion';

const END_DATE = new Date(new Date().setFullYear(new Date().getFullYear() + 100));

export type CalendarProps = {
    /**
     * An array to group dates into a category.
     */
    categories?: Categories[];
    /**
     * The last Month that can be displayed.
     */
    endDate?: Date;
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
    endDate = END_DATE,
    startDate,
    highlightedDates,
    onSelect,
    selectedDate,
    categories,
}) => {
    const [currentDate, setCurrentDate] = useState<Date>();
    const [shouldRenderTwoMonths, setShouldRenderTwoMonths] = useState(true);
    const [internalSelectedDate, setInternalSelectedDate] = useState<Date>();
    const [direction, setDirection] = useState<'left' | 'right'>();

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
        setDirection('left');

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
        setDirection('right');

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

    return (
        <StyledCalendar ref={calendarRef}>
            <StyledCalendarIconWrapper onClick={handleLeftArrowClick}>
                <Icon icons={['fa fa-angle-left']} />
            </StyledCalendarIconWrapper>
            <AnimatePresence initial={false}>
                <MonthWrapper
                    currentDate={currentDate}
                    locale={locale}
                    direction={direction}
                    onSelect={handleSelect}
                    selectedDate={internalSelectedDate}
                    highlightedDates={highlightedDates}
                    categories={categories}
                />
            </AnimatePresence>
            <StyledCalendarIconWrapper onClick={handleRightArrowClick}>
                <Icon icons={['fa fa-angle-right']} />
            </StyledCalendarIconWrapper>
        </StyledCalendar>
    );
};

Calendar.displayName = 'Calendar';

export default Calendar;
