import { format, isThisYear, isToday, isTomorrow, isYesterday } from 'date-fns';
import { de } from 'date-fns/locale';
import type { FormatOptions } from '../types/props';

interface GetFormattedYearOptions {
    date: Date;
    formatOptions: FormatOptions;
}

export const getFormattedYear = ({ date, formatOptions }: GetFormattedYearOptions): string => {
    const { hideYear, useShortYear, hideThisYear } = formatOptions;

    if (hideYear) {
        return '';
    }

    if (useShortYear) {
        return 'yy';
    }

    if (hideThisYear) {
        return isThisYear(date) ? '' : 'yyyy';
    }

    return 'yyyy';
};

interface GetFormattedMonthOptions {
    formatOptions: FormatOptions;
}

export const getFormattedMonth = ({ formatOptions }: GetFormattedMonthOptions): string => {
    const { useMonthAsNumber, useShortMonth } = formatOptions;

    if (useMonthAsNumber) {
        return 'MM.';
    }

    if (useShortMonth) {
        return 'MMM.';
    }

    return 'MMMM';
};

interface GetTimeOptions {
    date: Date;
}

export const getTime = ({ date }: GetTimeOptions) => format(date, 'HH:mm', { locale: de });

interface GetDayOptions {
    date: Date;
    formatOptions: FormatOptions;
}

export const getDay = ({ date, formatOptions }: GetDayOptions) => {
    const { useToday, useTomorrowOrYesterday } = formatOptions;

    if (isToday(date) && useToday) {
        return 'Heute';
    }

    if (isYesterday(date) && useTomorrowOrYesterday) {
        return 'Gestern';
    }

    if (isTomorrow(date) && useTomorrowOrYesterday) {
        return 'Morgen';
    }

    return format(date, `dd. LLL.`);
};

interface GetWeekDayOptions {
    date: Date;
    formatOptions: FormatOptions;
}

export const getWeekDay = ({ date, formatOptions }: GetWeekDayOptions) => {
    const { useShortWeekDay } = formatOptions;

    if (useShortWeekDay) {
        return format(date, 'E.');
    }

    return format(date, 'EEEE');
};

export interface Time {
    value: number;
    type: TimeType;
}

export enum TimeType {
    Seconds,
    Minutes,
    Hours,
    Days,
    Weeks,
    Months,
    Years,
}

export const getFormattedPastTimeString = (time: Time): string => {
    const { value, type } = time;

    switch (true) {
        case type === TimeType.Seconds:
            return `Sekunde${value !== 1 ? 'n' : ''}`;
        case type === TimeType.Minutes:
            return `Minute${value !== 1 ? 'n' : ''}`;
        case type === TimeType.Hours:
            return `Stunde${value !== 1 ? 'n' : ''}`;
        case type === TimeType.Days:
            return `Tag${value !== 1 ? 'en' : ''}`;
        case type === TimeType.Weeks:
            return `Woche${value !== 1 ? 'n' : ''}`;
        case type === TimeType.Months:
            return `Monat${value !== 1 ? 'en' : ''}`;
        default:
            return `Jahr${value !== 1 ? 'en' : ''}`;
    }
};

export const getFormattedFutureTimeString = (time: Time): string => {
    const { value, type } = time;

    switch (true) {
        case type === TimeType.Seconds:
            return `Sekunde${value !== 1 ? 'n' : ''}`;
        case type === TimeType.Minutes:
            return `Minute${value !== 1 ? 'n' : ''}`;
        case type === TimeType.Hours:
            return `Stunde${value !== 1 ? 'n' : ''}`;
        case type === TimeType.Days:
            return `Tag${value !== 1 ? 'e' : ''}`;
        case type === TimeType.Weeks:
            return `Woche${value !== 1 ? 'n' : ''}`;
        case type === TimeType.Months:
            return `Monat${value !== 1 ? 'e' : ''}`;
        default:
            return `Jahr${value !== 1 ? 'e' : ''}`;
    }
};
