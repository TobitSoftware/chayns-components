import React, { FC } from 'react';
import { StyledCalendar } from './Calendar.styles';

export type CalendarProps = {};

const Calendar: FC<CalendarProps> = ({}) => {
    const maxStackSizeFactor = 1;

    return <StyledCalendar>test</StyledCalendar>;
};

Calendar.displayName = 'Calendar';

export default Calendar;
