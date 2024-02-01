import React, { FC, useMemo } from 'react';
import { isSameDay } from 'date-fns';
import { StyledDay } from './Day.styles';
import type { HighlightedDates, HighlightedDateStyles } from '../../../../../types/calendar';

export type DayProps = {
    date: Date;
    isSameMonth: boolean;
    onClick: (date: Date, isSameMonth: boolean) => void;
    highlightedDates?: HighlightedDates[];
};

const Day: FC<DayProps> = ({ date, highlightedDates, isSameMonth, onClick }) => {
    const styles: HighlightedDateStyles | undefined = useMemo(() => {
        if (!highlightedDates || !isSameMonth) {
            return undefined;
        }

        return highlightedDates.find((highlightedDate) =>
            highlightedDate.dates.some((highlighted) => isSameDay(highlighted, date)),
        )?.style;
    }, [date, highlightedDates, isSameMonth]);

    return (
        <StyledDay
            onClick={() => onClick(date, isSameMonth)}
            isSameMonth={isSameMonth}
            backgroundColor={styles?.backgroundColor}
            textColor={styles?.textColor}
        >
            {date.getDate()}
        </StyledDay>
    );
};

Day.displayName = 'Day';

export default Day;
