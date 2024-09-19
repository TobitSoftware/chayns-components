import { ComboBox, Icon } from '@chayns-components/core';
import {
    addYears,
    isSameDay,
    isSameMonth,
    isWithinInterval,
    subYears,
    type Locale,
} from 'date-fns';
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
    /**
     * The type of the calendar selection.
     */
    type?: CalendarType.Single;
    /**
     * Function to be executed when the selected date changes.
     * @param date
     */
    onChange?: (date: Date) => void;
    /**
     * A date that should be preselected.
     */
    selectedDate?: Date;
    selectedDates: never;
    selectedDateInterval: never;
}

interface MultipleSelectionProps extends BaseProps {
    /**
     * The type of the calendar selection.
     */
    type: CalendarType.Multiple;
    /**
     * Function to be executed when the selected dates change.
     * @param date
     */
    onChange?: (date: Date[]) => void;
    /**
     * An array of dates that should be preselected.
     */
    selectedDates?: Date[];
    selectedDate: never;
    selectedDateInterval: never;
}

interface IntervalSelectionProps extends BaseProps {
    /**
     * The type of the calendar selection.
     */
    type: CalendarType.Interval;
    /**
     * Function to be executed when the selected interval changes.
     * @param date
     */
    onChange?: (date: DateInterval) => void;
    /**
     * An interval that should be preselected.
     */
    selectedDateInterval?: DateInterval;
    selectedDates: never;
    selectedDate: never;
}

export type CalendarProps = SingleSelectionProps | MultipleSelectionProps | IntervalSelectionProps;

const DEFAULT_MAX_DATE = addYears(new Date(), 1);
const DEFAULT_MIN_DATE = subYears(new Date(), 1);

const Calendar: FC<CalendarProps> = ({
    locale = de,
    maxDate = DEFAULT_MAX_DATE,
    minDate = DEFAULT_MIN_DATE,
    highlightedDates,
    onChange,
    selectedDate,
    selectedDates,
    selectedDateInterval,
    categories,
    isDisabled,
    type = CalendarType.Single,
    disabledDates = [],
}) => {
    const [currentDate, setCurrentDate] = useState<Date>();
    const [shouldRenderTwoMonths, setShouldRenderTwoMonths] = useState(true);
    const [internalSelectedDate, setInternalSelectedDate] = useState<Date | Date[] | DateInterval>(
        type === CalendarType.Multiple ? [] : null,
    );
    const [direction, setDirection] = useState<'left' | 'right'>();
    const [width, setWidth] = useState(0);

    const calendarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const bounds = {
            start: minDate,
            end: maxDate,
        };
        if (type === CalendarType.Single) {
            if (selectedDate) {
                const isDisabledDate = disabledDates.some((disabledDate) =>
                    isSameDay(selectedDate, disabledDate),
                );
                const isDateInBounds = isWithinInterval(selectedDate, bounds);

                if (!isDisabledDate && isDateInBounds) {
                    setInternalSelectedDate(selectedDate);
                } else {
                    console.warn(
                        '[@chayns-components/date] Warning: Failed to set selectedDate, because it is disabled or out of bounds.',
                        '\nselectedDate:',
                        selectedDate,
                        ...(isDisabledDate ? ['\nselectedDate is disabled'] : []),
                        ...(isDateInBounds
                            ? []
                            : ['\nselectedDate is outside of bounds:', { minDate, maxDate }]),
                    );
                    setInternalSelectedDate(null);
                }
            } else {
                setInternalSelectedDate(null);
            }
        } else if (type === CalendarType.Multiple) {
            if (selectedDates) {
                const disabledSelectedDates: Date[] = [];
                const datesOutsideOfBounds: Date[] = [];

                const filteredDates = selectedDates.filter((date) => {
                    if (disabledDates.some((disabledDate) => isSameDay(date, disabledDate))) {
                        disabledSelectedDates.push(date);
                        return false;
                    }

                    if (!isWithinInterval(date, bounds)) {
                        datesOutsideOfBounds.push(date);
                        return false;
                    }

                    return true;
                });

                if (disabledSelectedDates.length > 0 || datesOutsideOfBounds.length > 0) {
                    console.warn(
                        '[@chayns-components/date] Warning: Failed to set all selectedDates, because some are disabled or out of bounds.',
                        ...(disabledSelectedDates.length > 0
                            ? ['\nselectedDates that are disabled:', disabledSelectedDates]
                            : []),
                        ...(datesOutsideOfBounds.length > 0
                            ? [
                                  '\nselectedDates that are outside of bounds:',
                                  datesOutsideOfBounds,
                                  'bounds:',
                                  { minDate, maxDate },
                              ]
                            : []),
                    );
                }

                setInternalSelectedDate(filteredDates);
            } else {
                setInternalSelectedDate([]);
            }
        } else if (type === CalendarType.Interval) {
            if (selectedDateInterval) {
                const intervalIncludesDisabledDate =
                    selectedDateInterval.end &&
                    disabledDates.some((disabledDate) =>
                        isWithinInterval(disabledDate, {
                            start: selectedDateInterval.start,
                            end: selectedDateInterval.end as Date,
                        }),
                    );

                const intervalIsInBounds =
                    isWithinInterval(selectedDateInterval.start, bounds) &&
                    (!selectedDateInterval.end ||
                        isWithinInterval(selectedDateInterval.end, bounds));

                if (!intervalIncludesDisabledDate && intervalIsInBounds) {
                    setInternalSelectedDate(selectedDateInterval);
                } else {
                    console.warn(
                        '[@chayns-components/date] Warning: Failed to set selectedDateInterval, because it includes disabled dates or dates that are out of bounds.',
                        '\nselectedDateInterval:',
                        selectedDateInterval,
                        ...(intervalIncludesDisabledDate
                            ? ['\ndisabled dates:', disabledDates]
                            : []),
                        ...(intervalIsInBounds ? [] : ['\nbounds:', { minDate, maxDate }]),
                    );
                    setInternalSelectedDate(null);
                }
            }
        }
    }, [type, selectedDate, selectedDates, selectedDateInterval, disabledDates, minDate, maxDate]);

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
                let onChangePayload: Date | Date[] | DateInterval;
                let newInternalSelectedDate: Date | Date[] | DateInterval;

                if (type === CalendarType.Single) {
                    onChangePayload = date;
                    newInternalSelectedDate = date;
                } else if (type === CalendarType.Multiple) {
                    const prevSelectedDates = prevDate as Date[];
                    // Selects or unselects date , depending on if it is already selected.
                    if (prevSelectedDates.some((d) => isSameDay(d, date))) {
                        newInternalSelectedDate = prevSelectedDates.filter(
                            (d) => !isSameDay(d, date),
                        );
                    } else {
                        newInternalSelectedDate = [...prevSelectedDates, date];
                    }

                    onChangePayload = newInternalSelectedDate;
                } else if (type === CalendarType.Interval) {
                    const prevSelectedDateInterval = prevDate as DateInterval;

                    const updateInterval = (start: Date, end?: Date): void => {
                        const newInterval = { start, end };
                        onChangePayload = newInterval;
                        newInternalSelectedDate = newInterval;
                    };

                    // Sets first selection as interval start.
                    if (!prevSelectedDateInterval) {
                        updateInterval(date);
                    } else if (prevSelectedDateInterval.start && !prevSelectedDateInterval.end) {
                        // Sets second selection as interval start, if it is earlier than the previous interval start.
                        // Else sets it as interval end.
                        if (date < prevSelectedDateInterval.start) {
                            updateInterval(date);
                        } else {
                            updateInterval(prevSelectedDateInterval.start, date);
                        }
                    } else {
                        // Resets interval if a third date is selected.
                        updateInterval(date);
                    }
                }

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
                    <div // TODO Use styled-components instead of inline styles
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                            height: 'fit-content',
                        }}
                    >
                        <div
                            style={{
                                height: 'fit-content',
                                width: '0',
                                overflow: 'hidden',
                                pointerEvents: 'none',
                                userSelect: 'none',
                            }}
                        >
                            <ComboBox lists={[{ list: [] }]} />
                        </div>
                        <Icon icons={['fa fa-angle-left']} />
                    </div>
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
                    setCurrentDate={setCurrentDate}
                />
            )}
            {ShouldShowRightArrow ? (
                <StyledCalendarIconWrapper onClick={handleRightArrowClick}>
                    <div // TODO Use styled-components instead of inline styles
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexWrap: 'nowrap',
                            height: 'fit-content',
                        }}
                    >
                        <div
                            style={{
                                height: 'fit-content',
                                width: '0',
                                overflow: 'hidden',
                                pointerEvents: 'none',
                                userSelect: 'none',
                            }}
                        >
                            <ComboBox lists={[{ list: [] }]} />
                        </div>
                        <Icon icons={['fa fa-angle-right']} />
                    </div>
                </StyledCalendarIconWrapper>
            ) : (
                <StyledCalendarIconWrapperPseudo />
            )}
        </StyledCalendar>
    );
};

Calendar.displayName = 'Calendar';

export default Calendar;
