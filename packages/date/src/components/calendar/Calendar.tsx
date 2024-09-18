import { Icon } from '@chayns-components/core';
import { addYears, isSameMonth, subYears, type Locale } from 'date-fns';
import { de } from 'date-fns/locale';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Categories, HighlightedDates } from '../../types/calendar';
import { getNewDate, isDateInRange } from '../../utils/calendar';
import {
    StyledCalendar,
    StyledCalendarIconWrapper,
    StyledCalendarIconWrapperPseudo,
} from './Calendar.styles';
import MonthWrapper from './month-wrapper/MonthWrapper';

export type CalendarProps = {
    /**
     * An array to group dates into a category.
     */
    categories?: Categories[];
    /**
     * An array with dates and corresponding styles to highlight.
     */
    highlightedDates?: HighlightedDates[];
    /**
     * To disable the Calendar
     */
    isDisabled?: boolean;
    /**
     * The locale language to format the dates.
     */
    locale?: Locale;
    /**
     * The maximum date that can be selected.
     */
    maxDate?: Date;
    /**
     * The minimum date that can be selected.
     */
    minDate?: Date;
    /**
     * Function to be executed when a date is selected.
     * @param date
     */
    onSelect?: (date: Date) => void;
    /**
     * A date that should be preselected.
     */
    selectedDate?: Date;
};

const DEFAULT_MAX_DATE = addYears(new Date(), 1);
const DEFAULT_MIN_DATE = subYears(new Date(), 1);

const Calendar: FC<CalendarProps> = ({
    locale = de,
    maxDate = DEFAULT_MAX_DATE,
    minDate = DEFAULT_MIN_DATE,
    highlightedDates,
    onSelect,
    selectedDate,
    categories,
    isDisabled,
}) => {
    console.log('Calendar', minDate, maxDate);
    const [currentDate, setCurrentDate] = useState<Date>();
    const [shouldRenderTwoMonths, setShouldRenderTwoMonths] = useState(true);
    const [internalSelectedDate, setInternalSelectedDate] = useState<Date>();
    const [direction, setDirection] = useState<'left' | 'right'>();
    const [width, setWidth] = useState(0);

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

                    setWidth(observedWidth - 30);

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

        setCurrentDate(isDateInRange({ minDate, maxDate, currentDate: date }));
    }, [maxDate, minDate]);

    const handleLeftArrowClick = useCallback(() => {
        setDirection('left');

        setCurrentDate((prevDate) => {
            if (!prevDate) {
                return prevDate;
            }

            const newDate = getNewDate(-1, prevDate);

            return isDateInRange({ minDate, maxDate, currentDate: newDate });
        });
    }, [maxDate, minDate]);

    const handleRightArrowClick = useCallback(() => {
        setDirection('right');

        setCurrentDate((prevDate) => {
            if (!prevDate) {
                return prevDate;
            }

            const newDate = getNewDate(1, prevDate);

            return isDateInRange({ minDate, maxDate, currentDate: newDate });
        });
    }, [maxDate, minDate]);

    const handleSelect = useCallback(
        (date: Date) => {
            setInternalSelectedDate(date);

            if (typeof onSelect === 'function') {
                onSelect(date);
            }
        },
        [onSelect],
    );

    const handleAnimationFinished = () => {
        setDirection(undefined);
    };

    const ShouldShowLeftArrow = useMemo(() => {
        if (!currentDate) {
            return false;
        }

        return !isSameMonth(currentDate, minDate);
    }, [currentDate, minDate]);

    const ShouldShowRightArrow = useMemo(() => {
        if (!currentDate) {
            return false;
        }

        return !isSameMonth(currentDate, maxDate);
    }, [currentDate, maxDate]);

    return (
        <StyledCalendar ref={calendarRef} $isDisabled={isDisabled}>
            {ShouldShowLeftArrow ? (
                <StyledCalendarIconWrapper onClick={handleLeftArrowClick}>
                    <Icon icons={['fa fa-angle-left']} />
                </StyledCalendarIconWrapper>
            ) : (
                <StyledCalendarIconWrapperPseudo />
            )}
            {currentDate && (
                <MonthWrapper
                    shouldRenderTwo={shouldRenderTwoMonths}
                    currentDate={currentDate}
                    width={width}
                    locale={locale}
                    direction={direction}
                    onSelect={handleSelect}
                    selectedDate={internalSelectedDate}
                    highlightedDates={highlightedDates}
                    categories={categories}
                    onAnimationFinished={handleAnimationFinished}
                    minDate={minDate}
                    maxDate={maxDate}
                />
            )}
            {ShouldShowRightArrow ? (
                <StyledCalendarIconWrapper onClick={handleRightArrowClick}>
                    <Icon icons={['fa fa-angle-right']} />
                </StyledCalendarIconWrapper>
            ) : (
                <StyledCalendarIconWrapperPseudo />
            )}
        </StyledCalendar>
    );
};

Calendar.displayName = 'Calendar';

export default Calendar;
