import React, { FC } from 'react';
import type { Locale } from 'date-fns';
import { de } from 'date-fns/locale';
import { StyledCalendar } from './Calendar.styles';
import Month from './month/Month';

export type CalendarProps = {
    locale?: Locale;
};

const Calendar: FC<CalendarProps> = ({ locale = de }) => {
    const test = '';

    return (
        <StyledCalendar>
            <Month month="August" shouldShowLeftArrow shouldShowRightArrow locale={locale} />
        </StyledCalendar>
    );
};

Calendar.displayName = 'Calendar';

export default Calendar;
