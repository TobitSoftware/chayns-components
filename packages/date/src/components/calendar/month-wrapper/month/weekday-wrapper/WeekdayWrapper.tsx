import React, { FC, type ReactElement, useMemo } from 'react';
import { StyledWeekdayWrapper } from './WeekdayWrapper.styles';
import Weekday from './weekday/Weekday';
import {Language} from "chayns-api";
import {eachDayOfInterval, endOfWeek, startOfWeek} from "../../../../../utils/date";

export type WeekdayWrapperProps = {
    locale?: Language;
};

const WeekdayWrapper: FC<WeekdayWrapperProps> = ({ locale }) => {
    const monday = startOfWeek(new Date());
    const sunday = endOfWeek(new Date());
    const weekdays = eachDayOfInterval({ start: monday, end: sunday });

    const weekdayElements = useMemo(() => {
        const items: ReactElement[] = [];

        weekdays.forEach((day) => {
            const options: Intl.DateTimeFormatOptions = { weekday: 'short' };
            const formatter = new Intl.DateTimeFormat(locale, options);
            const formattedDay = formatter.format(day);

            items.push(<Weekday key={`weekday-${formattedDay}`} name={formattedDay} />);
        });

        return items;
    }, [locale, weekdays]);

    return <StyledWeekdayWrapper>{weekdayElements}</StyledWeekdayWrapper>;
};

WeekdayWrapper.displayName = 'WeekdayWrapper';

export default WeekdayWrapper;
