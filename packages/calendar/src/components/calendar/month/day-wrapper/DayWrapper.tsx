import React, { FC, type ReactElement, useMemo } from 'react';
import { startOfMonth, startOfWeek, addDays, isSameMonth, format } from 'date-fns';
import { StyledDayWrapper } from './DayWrapper.styles';
import Day from './day/Day';
import { EMonth } from '../../../../types/calendar';

export type DayWrapperProps = {
    month: EMonth;
};

const DayWrapper: FC<DayWrapperProps> = ({ month }) => {
    const days = useMemo(() => {
        const dateArray: Date[] = [];

        // Startdatum auf den ersten des aktuellen Monats setzen
        const currentDate = startOfMonth(new Date());

        // Den ersten Tag des Arrays auf den Montag der ersten Woche setzen
        const startDay = startOfWeek(currentDate, { weekStartsOn: 1 }); // 1 = Montag

        for (let i = 0; i < 42; i++) {
            const newDate = addDays(startDay, i);
            dateArray.push(newDate);
        }

        return dateArray;
    }, []);

    const dayElements = useMemo(() => {
        const items: ReactElement[] = [];

        days.forEach((day) => {
            items.push(<Day date={day} isSameMonth={isSameMonth(day, new Date())} />);
        });

        return items;
    }, [days]);

    return <StyledDayWrapper>{dayElements}</StyledDayWrapper>;
};

DayWrapper.displayName = 'DayWrapper';

export default DayWrapper;
