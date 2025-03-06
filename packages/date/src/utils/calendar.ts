import type { EMonth, IMonth } from '../types/calendar';
import { isAfter, isBefore, startOfMonth } from './date';
import { Language } from 'chayns-api';

export const getMonthAndYear = (date: Date): IMonth => {
    const month = date.getMonth() + 1;

    const year = date.getFullYear();

    return {
        month,
        year,
    };
};

interface FormatMonthOptions {
    month: EMonth;
    locale: Language;
}

interface IsDateInRange {
    minDate: Date;
    maxDate: Date;
    currentDate: Date;
}

export const isDateInRange = ({ minDate, maxDate, currentDate }: IsDateInRange): Date => {
    const monthStartOfCurrentDate = startOfMonth(currentDate);
    const monthStartOfMaxDate = startOfMonth(maxDate);
    const monthStartOfMinDate = startOfMonth(minDate);

    switch (true) {
        case isAfter(monthStartOfCurrentDate, monthStartOfMaxDate):
            return monthStartOfMaxDate;
        case isBefore(monthStartOfCurrentDate, monthStartOfMinDate):
            return monthStartOfMinDate;
        default:
            return monthStartOfCurrentDate;
    }
};

export const getNewDate = (index: number, currentDate: Date) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + index);

    if (currentDate.getMonth() === 11 && newDate.getMonth() === 0) {
        newDate.setFullYear(currentDate.getFullYear() + 1);
    }

    if (currentDate.getMonth() === 0 && newDate.getMonth() === 11) {
        newDate.setFullYear(currentDate.getFullYear() - 1);
    }

    return newDate;
};

export const formatMonth = ({ month, locale }: FormatMonthOptions) => {
    const date = new Date(2022, month - 1, 1);
    return date.toLocaleString(locale, { month: 'long' });
};

export const findNextDate = (date: Date, dateArray: Date[]): Date | undefined => {
    const futureDates = dateArray.filter((d) => d > date);

    futureDates.sort((a, b) => a.getTime() - b.getTime());

    return futureDates[0];
};

export const getYearsBetween = (startDate: Date, endDate: Date): number[] => {
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    const years: number[] = [];

    for (let year = startYear; year <= endYear; year++) {
        years.push(year);
    }

    return years;
};
