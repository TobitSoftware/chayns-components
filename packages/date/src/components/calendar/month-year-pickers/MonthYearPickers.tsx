import { ComboBox } from '@chayns-components/core';
import { differenceInCalendarMonths, Locale } from 'date-fns';
import React, { FC, useMemo, useState } from 'react';
import { EMonth } from '../../../types/calendar';
import { formatMonth, getYearsBetween, isDateInRange } from '../../../utils/calendar';
import { StyledMonthName } from '../month-wrapper/month/Month.styles';

export enum MonthYearPickerType {
    Month = 'month',
    Year = 'year',
}

type MonthYearPickerProps = {
    month: EMonth;
    year: number;
    locale: Locale;
    minDate: Date;
    maxDate: Date;
    setCurrentDate: (date: Date) => void;
    displayIndex: number;
    showMonthYearPickers: boolean;
};

const MonthYearPickers: FC<MonthYearPickerProps> = ({
    month,
    year,
    locale,
    minDate,
    maxDate,
    setCurrentDate,
    displayIndex,
    showMonthYearPickers,
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

    const hasMultipleMonths = useMemo(
        () => differenceInCalendarMonths(maxDate, minDate) > 0,
        [minDate, maxDate],
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
        <>
            {showMonthYearPickers && hasMultipleMonths ? (
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
                />
            ) : (
                <StyledMonthName>{formatMonth({ locale, month })}</StyledMonthName>
            )}
            {showMonthYearPickers && years.length > 1 ? (
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
                />
            ) : (
                <StyledMonthName>{currentYear !== year ? year : ''}</StyledMonthName>
            )}
        </>
    );
};

export default MonthYearPickers;
