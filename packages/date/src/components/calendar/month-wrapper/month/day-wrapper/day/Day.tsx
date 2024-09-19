import { isSameDay } from 'date-fns';
import React, { FC, useMemo, useRef } from 'react';
import type {
    Categories,
    HighlightedDates,
    HighlightedDateStyles,
} from '../../../../../../types/calendar';
import Category from './category/Category';
import { StyledDay, StyledDayCategoryWrapper, StyledDayNumber } from './Day.styles';

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
    hoveringDay: Date | null;
    setHoveringDay: (date: Date | null) => void;
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
    setHoveringDay,
}) => {
    const dayRef = useRef<HTMLDivElement>(null);

    const styles: HighlightedDateStyles | undefined = useMemo(() => {
        if (!highlightedDates) {
            return undefined;
        }

        return highlightedDates.find((highlightedDate) =>
            highlightedDate.dates.some((highlighted) => isSameDay(highlighted, date)),
        )?.style;
    }, [date, highlightedDates, isSameMonth]);

    const categoryElements = useMemo(() => {
        if (!categories) return [];

        return categories.flatMap((category) =>
            category.dates
                .filter((day) => isSameDay(day, date))
                .map((day) => (
                    <Category key={day.getTime() * Math.random()} color={category.color} />
                )),
        );
    }, [categories, date]);

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
                $isSelected={isSelected}
                $isIntervalStart={isIntervalStart}
                $isIntervalEnd={isIntervalEnd}
                $isWithinIntervalSelection={isWithinIntervalSelection}
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
