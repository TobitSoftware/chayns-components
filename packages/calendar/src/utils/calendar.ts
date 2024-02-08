import { format, isAfter, isBefore, startOfMonth } from 'date-fns';
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
    startDate: Date;
    endDate: Date;
    currentDate: Date;
}

export const isDateInRange = ({ startDate, endDate, currentDate }: IsDateInRange): Date => {
    const monthStartOfCurrentDate = startOfMonth(currentDate);
    const monthStartOfEndDate = startOfMonth(endDate);
    const monthStartOfStartDate = startOfMonth(startDate);

    switch (true) {
        case isAfter(monthStartOfCurrentDate, monthStartOfEndDate):
            return monthStartOfEndDate;
        case isBefore(monthStartOfCurrentDate, monthStartOfStartDate):
            return monthStartOfStartDate;
        default:
            return monthStartOfCurrentDate;
    }
};

export const getNewDate = (index: number, currentDate: Date) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + index);

    if (currentDate.getMonth() === 11 && newDate.getMonth() === 0) {
        newDate.setFullYear(currentDate.getFullYear() + index);
    }

    if (currentDate.getMonth() === 0 && newDate.getMonth() === 11) {
        newDate.setFullYear(currentDate.getFullYear() - index);
    }

    return newDate;
};

export const formatMonth = ({ month, locale }: FormatMonthOptions) =>
    format(new Date(2022, month - 1, 1), 'MMMM', { locale });
