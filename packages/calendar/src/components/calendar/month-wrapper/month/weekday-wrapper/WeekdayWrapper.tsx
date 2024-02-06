import React, { FC, type ReactElement, useMemo } from 'react';
import { startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns';
import { StyledWeekdayWrapper } from './WeekdayWrapper.styles';
import Weekday from './weekday/Weekday';
import type { Locale } from 'date-fns';

export type WeekdayWrapperProps = {
    locale?: Locale;
};

const WeekdayWrapper: FC<WeekdayWrapperProps> = ({ locale }) => {
    const monday = startOfWeek(new Date(), { weekStartsOn: 1 });
    const sunday = endOfWeek(new Date(), { weekStartsOn: 1 });
    const weekdays = eachDayOfInterval({ start: monday, end: sunday });

    const weekdayElements = useMemo(() => {
        const items: ReactElement[] = [];

        weekdays.forEach((day) => {
            const formattedDay = format(day, 'EE', { locale });

            items.push(<Weekday key={`weekday-${formattedDay}`} name={formattedDay} />);
        });

        return items;
    }, [locale, weekdays]);

    return <StyledWeekdayWrapper>{weekdayElements}</StyledWeekdayWrapper>;
};

WeekdayWrapper.displayName = 'WeekdayWrapper';

export default WeekdayWrapper;
