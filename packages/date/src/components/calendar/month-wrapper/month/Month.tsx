import type { Locale } from 'date-fns';
import React, { FC } from 'react';
import type {
    CalendarType,
    Categories,
    DateInterval,
    EMonth,
    HighlightedDates,
} from '../../../../types/calendar';
import MonthYearPickers from '../../month-year-pickers/MonthYearPickers';
import DayWrapper from './day-wrapper/DayWrapper';
import { StyledMonth, StyledMonthHead } from './Month.styles';
import WeekdayWrapper from './weekday-wrapper/WeekdayWrapper';

export type MonthProps = {
    month: EMonth;
    year: number;
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
    setCurrentDate: (date: Date) => void;
    displayIndex?: number;
    shouldShowHighlightsInMonthOverlay: boolean;
    showMonthYearPickers: boolean;
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
    shouldShowHighlightsInMonthOverlay,
    type,
    hoveringDay,
    setHoveringDay,
    disabledDates,
    setCurrentDate,
    displayIndex,
    showMonthYearPickers,
}) => (
    <StyledMonth $height={height}>
        <StyledMonthHead>
            <MonthYearPickers
                month={month}
                year={year}
                locale={locale}
                minDate={minDate}
                maxDate={maxDate}
                setCurrentDate={setCurrentDate}
                displayIndex={displayIndex}
                showMonthYearPickers={showMonthYearPickers}
            />
        </StyledMonthHead>
        <WeekdayWrapper locale={locale} />
        <DayWrapper
            key={`day-wrapper-${month}`}
            categories={categories}
            selectedDate={selectedDate}
            month={month}
            year={year}
            onSelect={onSelect}
            shouldShowHighlightsInMonthOverlay={shouldShowHighlightsInMonthOverlay}
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

Month.displayName = 'Month';

export default Month;
