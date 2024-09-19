import { format, isAfter, isBefore, startOfMonth, type Locale } from 'date-fns';
import type { EMonth, IMonth } from '../types/calendar';

export const getMonthAndYear = (date: Date): IMonth => {
    const month = date.getMonth() + 1;

    const year = String(date.getFullYear());

    return {
        month,
        year,
    };
};

interface FormatMonthOptions {
    month: EMonth;
    locale: Locale;
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

export const formatMonth = ({ month, locale }: FormatMonthOptions) =>
    format(new Date(2022, month - 1, 1), 'MMMM', { locale });

export const findNextDate = (date: Date, dateArray: Date[]): Date | undefined => {
    const futureDates = dateArray.filter((d) => d > date);

    futureDates.sort((a, b) => a.getTime() - b.getTime());

    return futureDates[0];
};
