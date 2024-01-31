import { format } from 'date-fns';
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

export const formatMonth = ({ month, locale }: FormatMonthOptions) =>
    format(new Date(2022, month - 1, 1), 'MMMM', { locale });
