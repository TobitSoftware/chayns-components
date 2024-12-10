import React, { FC, useMemo, useRef } from 'react';
import type {
    Categories,
    HighlightedDates,
    HighlightedDateStyles,
} from '../../../../../../types/calendar';
import Category from './category/Category';
import { StyledDay, StyledDayCategoryWrapper, StyledDayNumber } from './Day.styles';
import {isSameDay} from "../../../../../../utils/date";

export type DayProps = {
    date: Date;
    isSameMonth: boolean;
    isSelected: boolean;
    onClick: (date: Date, shouldFireEvent: boolean) => void;
    highlightedDates?: HighlightedDates[];
    categories?: Categories[];
    isDisabled: boolean;
    isIntervalStart: boolean;
    isIntervalEnd: boolean;
    isWithinIntervalSelection: boolean;
    setHoveringDay: (date: Date | null) => void;
    shouldShowHighlightsInMonthOverlay: boolean;
};

const Day: FC<DayProps> = ({
    date,
    highlightedDates,
    categories,
    isSameMonth,
    isSelected,
    onClick,
    isDisabled,
    isIntervalStart,
    isIntervalEnd,
    isWithinIntervalSelection,
    shouldShowHighlightsInMonthOverlay,
    setHoveringDay,
}) => {
    const dayRef = useRef<HTMLDivElement>(null);

    const styles: HighlightedDateStyles | undefined = useMemo(() => {
        if (!highlightedDates || (!shouldShowHighlightsInMonthOverlay && !isSameMonth)) {
            return undefined;
        }

        return highlightedDates.find((highlightedDate) =>
            highlightedDate.dates.some((highlighted) => isSameDay(highlighted, date)),
        )?.style;
    }, [date, highlightedDates, isSameMonth, shouldShowHighlightsInMonthOverlay]);

    const categoryElements = useMemo(() => {
        if (!categories || (!shouldShowHighlightsInMonthOverlay && !isSameMonth)) return [];

        return categories.flatMap((category) =>
            category.dates
                .filter((day) => isSameDay(day, date))
                .map((day) => (
                    <Category key={day.getTime() * Math.random()} color={category.color} />
                )),
        );
    }, [categories, date, isSameMonth, shouldShowHighlightsInMonthOverlay]);

    return (
        <StyledDay
            ref={dayRef}
            onClick={() => onClick(date, isSameMonth && !isDisabled)}
            $isSameMonth={isSameMonth}
            $isDisabled={isDisabled}
            $backgroundColor={styles?.backgroundColor}
            $textColor={styles?.textColor}
            onMouseEnter={() => setHoveringDay(date)}
            onMouseLeave={() => setHoveringDay(null)}
        >
            <StyledDayNumber
                $isSelected={
                    shouldShowHighlightsInMonthOverlay ? isSelected : isSelected && isSameMonth
                }
                $isIntervalStart={
                    shouldShowHighlightsInMonthOverlay
                        ? isIntervalStart
                        : isIntervalStart && isSameMonth
                }
                $isIntervalEnd={
                    shouldShowHighlightsInMonthOverlay
                        ? isIntervalEnd
                        : isIntervalEnd && isSameMonth
                }
                $isWithinIntervalSelection={
                    shouldShowHighlightsInMonthOverlay
                        ? isWithinIntervalSelection
                        : isWithinIntervalSelection && isSameMonth
                }
            >
                {date.getDate()}
            </StyledDayNumber>
            {categoryElements && (
                <StyledDayCategoryWrapper>{categoryElements}</StyledDayCategoryWrapper>
            )}
        </StyledDay>
    );
};

Day.displayName = 'Day';

export default Day;
