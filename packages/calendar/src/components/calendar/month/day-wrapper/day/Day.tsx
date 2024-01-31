import React, { FC } from 'react';
import { StyledDay } from './Day.styles';
import type { HighlightedDateStyles } from '../../../../../types/calendar';

export type DayProps = {
    date: Date;
    isSameMonth: boolean;
    styles?: HighlightedDateStyles;
    onClick: (date: Date) => void;
};

const Day: FC<DayProps> = ({ date, isSameMonth, styles, onClick }) => (
    <StyledDay
        onClick={() => onClick(date)}
        isSameMonth={isSameMonth}
        backgroundColor={styles?.backgroundColor}
        textColor={styles?.textColor}
    >
        {date.getDate()}
    </StyledDay>
);

Day.displayName = 'Day';

export default Day;
