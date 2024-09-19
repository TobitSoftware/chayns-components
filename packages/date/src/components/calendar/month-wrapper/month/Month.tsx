import type { Locale } from 'date-fns';
import React, { FC, useState } from 'react';
import type {
    CalendarType,
    Categories,
    DateInterval,
    EMonth,
    HighlightedDates,
} from '../../../../types/calendar';
import { formatMonth } from '../../../../utils/calendar';
import DayWrapper from './day-wrapper/DayWrapper';
import { StyledMonth, StyledMonthHead, StyledMonthName } from './Month.styles';
import WeekdayWrapper from './weekday-wrapper/WeekdayWrapper';

export type MonthProps = {
    month: EMonth;
    year: string;
    locale: Locale;
    highlightedDates?: HighlightedDates[];
    onSelect: (date: Date) => void;
    selectedDate?: Date | Date[] | DateInterval;
    categories?: Categories[];
    height: number;
    minDate: Date;
    maxDate: Date;
    type: CalendarType;
    hoveringDay: Date | null;
    setHoveringDay: (date: Date | null) => void;
    disabledDates: Date[];
};

const Month: FC<MonthProps> = ({
    month,
    year,
    locale,
    highlightedDates,
    selectedDate,
    onSelect,
    categories,
    height,
    minDate,
    maxDate,
    type,
    hoveringDay,
    setHoveringDay,
    disabledDates,
}) => {
    const [currentYear] = useState(new Date().getFullYear());

    return (
        <StyledMonth $height={height}>
            <StyledMonthHead>
                <StyledMonthName>{`${formatMonth({ locale, month })} ${String(currentYear) !== year ? year : ''}`}</StyledMonthName>
            </StyledMonthHead>
            <WeekdayWrapper locale={locale} />
            <DayWrapper
                key={`day-wrapper-${month}`}
                categories={categories}
                selectedDate={selectedDate}
                month={month}
                year={year}
                onSelect={onSelect}
                highlightedDates={highlightedDates}
                minDate={minDate}
                maxDate={maxDate}
                type={type}
                hoveringDay={hoveringDay}
                setHoveringDay={setHoveringDay}
                disabledDates={disabledDates}
            />
        </StyledMonth>
    );
};

Month.displayName = 'Month';

export default Month;
