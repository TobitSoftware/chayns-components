import type { Locale } from 'date-fns';
import React, { FC, useState } from 'react';
import type { Categories, EMonth, HighlightedDates } from '../../../../types/calendar';
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
    selectedDate?: Date;
    categories?: Categories[];
    height: number;
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
            />
        </StyledMonth>
    );
};

Month.displayName = 'Month';

export default Month;
