import { Icon } from '@chayns-components/core';
import { addYears, isSameDay, isSameMonth, subYears, type Locale } from 'date-fns';
import { de } from 'date-fns/locale';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { Categories, DateInterval, HighlightedDates } from '../../types/calendar';
import { CalendarType } from '../../types/calendar';
import { getNewDate, isDateInRange } from '../../utils/calendar';
import {
    StyledCalendar,
    StyledCalendarIconWrapper,
    StyledCalendarIconWrapperPseudo,
} from './Calendar.styles';
import MonthWrapper from './month-wrapper/MonthWrapper';

interface BaseProps {
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
     * An array of dates that should be disabled.
     */
    disabledDates?: Date[];
}

interface SingleSelectionProps extends BaseProps {
    /* type?: CalendarType.Single; */
    /**
     * Function to be executed when the selected date changes.
     * @param date
     */
    onChange?: (date: Date) => void;
    /**
     * A date that should be preselected.
     */
    selectedDate?: Date;
}

interface MultipleSelectionProps extends BaseProps {
    type?: CalendarType.Multiple;
    /**
     * Function to be executed when the selected dates change.
     * @param date
     */
    onChange?: (date: Date[]) => void;
    /**
     * An array of dates that should be preselected.
     */
    selectedDate?: Date[];
}

interface IntervalSelectionProps extends BaseProps {
    type?: CalendarType.Interval;
    /**
     * Function to be executed when the selected interval changes.
     * @param date
     */
    onChange?: (date: DateInterval) => void;
    /**
     * An interval that should be preselected.
     */
    selectedDate?: DateInterval;
}

export type CalendarProps =
    SingleSelectionProps /* | MultipleSelectionProps | IntervalSelectionProps */;

const DEFAULT_MAX_DATE = addYears(new Date(), 1);
const DEFAULT_MIN_DATE = subYears(new Date(), 1);

const Calendar: FC<CalendarProps> = ({
    locale = de,
    maxDate = DEFAULT_MAX_DATE,
    minDate = DEFAULT_MIN_DATE,
    highlightedDates,
    onChange,
    selectedDate,
    categories,
    isDisabled,
    // type = CalendarType.Single,
    disabledDates = [],
}) => {
    const type = CalendarType.Single;

    const [currentDate, setCurrentDate] = useState<Date>();
    const [shouldRenderTwoMonths, setShouldRenderTwoMonths] = useState(true);
    const [internalSelectedDate, setInternalSelectedDate] = useState<
        Date | Date[] | DateInterval
    >();
    const [direction, setDirection] = useState<'left' | 'right'>();
    const [width, setWidth] = useState(0);

    const calendarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (
            selectedDate &&
            type === CalendarType.Single &&
            !disabledDates.some((disabledDate) => isSameDay(selectedDate, disabledDate))
        ) {
            setInternalSelectedDate(selectedDate);
        } else {
            setInternalSelectedDate(undefined);
        }

        // if (
        //     selectedDate &&
        //     ((type === CalendarType.Single && selectedDate instanceof Date) ||
        //         (type === CalendarType.Multiple && Array.isArray(selectedDate)))
        // ) {
        //     setInternalSelectedDate(selectedDate);
        // } else if (type === CalendarType.Interval && (selectedDate as DateInterval)?.start) {
        //     setInternalSelectedDate({
        //         start: (selectedDate as DateInterval).start,
        //         end: (selectedDate as DateInterval).end,
        //     });
        // } else if (type === CalendarType.Multiple) {
        //     setInternalSelectedDate([]);
        // } else if (type === CalendarType.Interval) {
        //     setInternalSelectedDate({});
        // } else {
        //     setInternalSelectedDate(undefined);
        // }
    }, [type, selectedDate, disabledDates]);

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
            setInternalSelectedDate((prevDate) => {
                let onChangePayload: Date /* | Date[] | DateInterval */;
                let newInternalSelectedDate: Date /* | Date[] | DateInterval */;

                /* if (type === CalendarType.Single) { */
                onChangePayload = date;
                newInternalSelectedDate = date;
                /* } else if (type === CalendarType.Multiple) {
                    if ((prevDate as Date[]).some((d) => isSameDay(d, date))) {
                        newInternalSelectedDate = (prevDate as Date[]).filter(
                            (d) => !isSameDay(d, date),
                        );
                    } else {
                        newInternalSelectedDate = [...prevDate, date];
                    }

                    onChangePayload = newInternalSelectedDate;
                } else if (type === CalendarType.Interval) {
                    if ((prevDate as DateInterval).start && !(prevDate as DateInterval).end) {
                        if (date < (prevDate as DateInterval).start) {
                            onChangePayload = { start: date, end: undefined };
                            newInternalSelectedDate = { start: date, end: undefined };
                        } else {
                            onChangePayload = {
                                start: (prevDate as DateInterval).start,
                                end: date,
                            };
                            newInternalSelectedDate = {
                                start: (prevDate as DateInterval).start,
                                end: date,
                            };
                        }
                    } else {
                        onChangePayload = { start: date, end: undefined };
                        newInternalSelectedDate = { start: date, end: undefined };
                    }
                } */

                if (typeof onChange === 'function') {
                    onChange(onChangePayload);
                }

                return newInternalSelectedDate;
            });
        },
        [type, onChange],
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
                    type={type}
                    disabledDates={disabledDates}
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
