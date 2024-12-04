import { getLanguage, Language } from 'chayns-api';
import { UseDateInfoOptions } from '../types/dateinfo';

export const getDateInfo = ({
    date,
    shouldShowYear,
    shouldShowTime,
    shouldShowDayOfWeek,
    shouldShowRelativeDayOfWeek,
    shouldUseShortText,
}: Omit<UseDateInfoOptions, 'shouldShowDateToNowDifference' & 'preText'>) => {
    const isDateNearToday = getIsDateNearToday(date);
    const { active: language } = getLanguage();

    let formattedString = getFormattedDayOfWeek({
        shouldShowDayOfWeek,
        shouldUseShortText,
        date,
        language,
        shouldShowRelativeDayOfWeek,
    });

    const options: Intl.DateTimeFormatOptions = {};

    if (shouldShowYear) {
        options.year = isCurrentYear(date) ? undefined : 'numeric';
    }

    // if (shouldShowTime) {
    //     options.hour = "2-digit";
    //     options.minute = "2-digit";
    // }

    if (shouldShowDayOfWeek) {
        options.weekday = shouldUseShortText ? 'short' : 'long';
    }

    return formattedString + date.toLocaleDateString(language, options);
};

type RelativeTimeUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';

interface GetTimeTillNow {
    date: Date;
    currentDate: Date;
    language: Language;
}

export const isCurrentYear = (date: Date): boolean => {
    const currentYear = new Date().getFullYear();
    const yearOfGivenDate = date.getFullYear();
    return currentYear === yearOfGivenDate;
};

export const getTimeTillNow = ({
    date,
    currentDate,
    language = Language.English,
}: GetTimeTillNow): string => {
    const diffInSeconds = Math.floor((currentDate.getTime() - date.getTime()) / 1000);
    const isPast = diffInSeconds > 0;

    const units: { label: RelativeTimeUnit; seconds: number }[] = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 },
    ];

    const absDiff = Math.abs(diffInSeconds);
    const { label, seconds } = units.find((u) => absDiff >= u.seconds) || {
        label: 'second',
        seconds: 1,
    };
    const count = Math.floor(absDiff / seconds);

    const formatter = new Intl.RelativeTimeFormat(language, { numeric: 'auto' });

    return formatter.format(isPast ? -count : count, label);
};

export const getIsDateNearToday = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const diffInDays = (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    return diffInDays === 0 || diffInDays === -1 || diffInDays === 1;
};

interface GetFormattedDayOfWeekOptions {
    shouldShowDayOfWeek?: boolean;
    shouldShowRelativeDayOfWeek?: boolean;
    shouldUseShortText?: boolean;
    date: Date;
    language?: Language;
}

export const getFormattedDayOfWeek = ({
    shouldShowRelativeDayOfWeek,
    shouldShowDayOfWeek,
    shouldUseShortText,
    date,
    language,
}: GetFormattedDayOfWeekOptions): string => {
    if (!shouldShowDayOfWeek && !shouldShowRelativeDayOfWeek) {
        return '';
    }

    const isToday = (date: Date): boolean => {
        const today = new Date();
        return today.toDateString() === date.toDateString();
    };

    const isTomorrow = (date: Date): boolean => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toDateString() === date.toDateString();
    };

    const isYesterday = (date: Date): boolean => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday.toDateString() === date.toDateString();
    };

    const relativeDayOfWeek = (): string => {
        const rtf = new Intl.RelativeTimeFormat(language, { numeric: 'auto' });

        if (isToday(date)) {
            return rtf.format(0, 'day');
        }

        if (isTomorrow(date)) {
            return rtf.format(1, 'day');
        }

        if (isYesterday(date)) {
            return rtf.format(-1, 'day');
        }

        return '';
    };

    if (shouldShowRelativeDayOfWeek) {
        return relativeDayOfWeek();
    }

    const options: Intl.DateTimeFormatOptions = {
        weekday: shouldUseShortText ? 'short' : 'long',
    };

    return new Intl.DateTimeFormat(language, options).format(date);
};

interface GetTimeStringProps {
    language?: string;
    isMorning?: boolean;
}

export const getTimeString = ({ language, isMorning }: GetTimeStringProps) => {
    switch (language) {
        case 'en-GB':
        case 'pt':
            return isMorning ? 'AM' : 'PM';
        case 'nl':
            return 'uur';
        case 'fr':
            return 'heures';
        case 'de':
            return 'Uhr';
        case 'es':
            return 'h';
        default:
            return '';
    }
};

interface GetFormattedYearOptions {
    date: Date;
    shouldShowYear?: boolean;
}

export const getYearFormat = ({ date, shouldShowYear }: GetFormattedYearOptions) =>
    (typeof shouldShowYear === 'boolean' && !shouldShowYear) || isThisYear(date) ? '' : ' yyyy';

interface GetFormattedMonthOptions {
    shouldUseShortText?: boolean;
}

export const getMonthFormat = ({ shouldUseShortText }: GetFormattedMonthOptions) => {
    if (shouldUseShortText) {
        return 'LLL.';
    }

    return 'LLLL';
};

interface GetFormattedDayOfWeekOptions {
    shouldShowDayOfWeek?: boolean;
    shouldShowRelativeDayOfWeek?: boolean;
    shouldUseShortText?: boolean;
    date: Date;
    language?: Locale;
}

interface GetFormattedTimeOptions {
    shouldShowTime?: boolean;
    date: Date;
    language: Locale;
}

export const getFormattedTime = ({ shouldShowTime, date, language }: GetFormattedTimeOptions) => {
    if (!shouldShowTime) {
        return '';
    }

    let timeFormat = 'HH:mm';

    if (language.code === 'en-GB' || language.code === 'pt') {
        timeFormat = 'KK:mm';
    }

    return `, ${format(date, timeFormat)} ${getTimeString({
        language: language.code,
        isMorning: isMorning(date),
    })}`;
};

export const isMorning = (date: Date) => {
    const hours = date.getHours();

    return hours >= 0 && hours < 12;
};
