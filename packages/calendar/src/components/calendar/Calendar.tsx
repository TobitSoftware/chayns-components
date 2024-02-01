import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isSameMonth, type Locale } from 'date-fns';
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
    onSelect?: (date: Date) => void;
};

const Calendar: FC<CalendarProps> = ({
    locale = de,
    endDate,
    startDate,
    highlightedDates,
    onSelect,
}) => {
    const [currentDate, setCurrentDate] = useState<Date>();
    const [shouldRenderTwoMonths, setShouldRenderTwoMonths] = useState(true);

    const calendarRef = useRef<HTMLDivElement>(null);

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

    const months = useMemo(() => {
        if (!currentDate || !calendarRef.current) {
            return null;
        }

        const { month, year } = getMonthAndYear(currentDate);

        const firstMonthElement = (
            <Month
                onSelect={onSelect}
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
                    onSelect={onSelect}
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
        onSelect,
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
