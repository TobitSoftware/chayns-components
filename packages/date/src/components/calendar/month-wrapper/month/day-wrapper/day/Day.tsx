import { isSameDay } from 'date-fns';
import React, { FC, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
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
    onClick: (date: Date, isSameMonth: boolean) => void;
    highlightedDates?: HighlightedDates[];
    categories?: Categories[];
};

const Day: FC<DayProps> = ({
    date,
    highlightedDates,
    categories,
    isSameMonth,
    isSelected,
    onClick,
}) => {
    const [fontSize, setFontSize] = useState<CSSProperties['fontSize']>();

    const dayRef = useRef<HTMLDivElement>(null);

    const styles: HighlightedDateStyles | undefined = useMemo(() => {
        if (!highlightedDates || !isSameMonth) {
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

    useEffect(() => {
        if (dayRef.current) {
            const resizeObserver = new ResizeObserver((entries) => {
                if (entries && entries[0]) {
                    const observedWidth = entries[0].contentRect.width;

                    setFontSize(`${observedWidth / 2}px`);
                }
            });

            resizeObserver.observe(dayRef.current);

            return () => {
                resizeObserver.disconnect();
            };
        }

        return () => {};
    }, []);

    return (
        <StyledDay
            ref={dayRef}
            onClick={() => onClick(date, isSameMonth)}
            $isSameMonth={isSameMonth}
            $backgroundColor={styles?.backgroundColor}
            $textColor={styles?.textColor}
        >
            <StyledDayNumber $isSelected={isSelected} $fontSize={fontSize}>
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
