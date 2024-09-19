import { ComboBox } from '@chayns-components/core';
import type { Locale } from 'date-fns';
import React, { FC, useMemo, useState } from 'react';
import type {
    CalendarType,
    Categories,
    DateInterval,
    EMonth,
    HighlightedDates,
} from '../../../../types/calendar';
import { formatMonth, getYearsBetween, isDateInRange } from '../../../../utils/calendar';
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
    displayIndex: number;
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
    setCurrentDate,
    displayIndex,
}) => {
    const [currentYear] = useState(new Date().getFullYear());

    const months = useMemo(
        () =>
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((tempMonth) => ({
                text: formatMonth({ month: tempMonth, locale }),
                value: tempMonth,
            })),
        [locale],
    );

    const years = useMemo(
        () =>
            getYearsBetween(minDate, maxDate).map((tempYear) => ({
                text: tempYear.toString(),
                value: tempYear,
            })),
        [minDate, maxDate],
    );

    return (
        <StyledMonth $height={height}>
            <StyledMonthHead>
                <ComboBox
                    onSelect={(selectedItem) => {
                        const tempSelectedDate = isDateInRange({
                            minDate,
                            maxDate,
                            currentDate: new Date(year, selectedItem.value - 1 - displayIndex, 1),
                        });

                        setCurrentDate(tempSelectedDate);
                    }}
                    lists={[
                        {
                            list: months,
                        },
                    ]}
                    selectedItem={{
                        text: formatMonth({ month, locale }),
                        value: month,
                    }}
                    placeholder=""
                    isDisabled={months.length === 1}
                />
                <ComboBox
                    onSelect={(selectedItem) => {
                        const tempSelectedDate = isDateInRange({
                            minDate,
                            maxDate,
                            currentDate: new Date(
                                selectedItem.value as number,
                                month - 1 - displayIndex,
                                1,
                            ),
                        });

                        setCurrentDate(tempSelectedDate);
                    }}
                    lists={[
                        {
                            list: years,
                        },
                    ]}
                    selectedItem={{
                        text: year.toString(),
                        value: year,
                    }}
                    placeholder=""
                    isDisabled={years.length === 1}
                />
                {/*<StyledMonthName>*/}
                {/*    {`${formatMonth({ locale, month })} ${String(currentYear) !== year ? year : ''}`}*/}
                {/*</StyledMonthName>*/}
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
