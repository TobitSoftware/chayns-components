import { getLanguage, Language } from 'chayns-api';
import { UseDateInfoOptions } from '../types/dateinfo';
import { isCurrentYear, isToday, isTomorrow, isYesterday } from './date';

export const getDateInfo = ({
    date,
    shouldShowYear,
    shouldShowTime,
    shouldShowDayOfWeek,
    shouldShowRelativeDayOfWeek,
    shouldUseShortText,
}: Omit<UseDateInfoOptions, 'shouldShowDateToNowDifference' & 'preText'>) => {
    const { active: language } = getLanguage();

    let dayPart = '';

    if (shouldShowRelativeDayOfWeek) {
        const rtf = new Intl.RelativeTimeFormat(language, { numeric: 'auto' });

        if (isToday(date)) {
            dayPart = capitalizeFirstLetter(rtf.format(0, 'day'));
        }

        if (isTomorrow(date)) {
            dayPart = capitalizeFirstLetter(rtf.format(1, 'day'));
        }

        if (isYesterday(date)) {
            dayPart = capitalizeFirstLetter(rtf.format(-1, 'day'));
        }
    }

    if (!dayPart && shouldShowDayOfWeek) {
        dayPart = date.toLocaleDateString(language, {
            weekday: shouldUseShortText ? 'short' : 'long',
        });
    }

    const dateParts: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: shouldUseShortText ? 'short' : 'long',
    };

    if (shouldShowYear && !isCurrentYear(date)) {
        dateParts.year = 'numeric';
    }

    const timeParts: Intl.DateTimeFormatOptions = {};

    if (shouldShowTime) {
        timeParts.hour = '2-digit';
        timeParts.minute = '2-digit';
    }

    let formattedTime = '';
    if (Object.keys(timeParts).length > 0) {
        formattedTime = `, ${date.toLocaleTimeString(language, { ...timeParts })}`;
    }

    const hourWord = getTimeString({ language });

    formattedTime += shouldShowTime ? ` ${hourWord}` : '';

    const formattedDate = `${date.toLocaleDateString(language, dateParts)}${formattedTime}`;

    return `${dayPart}${dayPart ? ', ' : ''}${formattedDate}`;
};

const capitalizeFirstLetter = (text: string): string =>
    text.charAt(0).toUpperCase() + text.slice(1);

type RelativeTimeUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';

interface GetTimeTillNow {
    date: Date;
    currentDate: Date;
    language: Language;
}

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

interface GetFormattedTimeOptions {
    date: Date;
    shouldShowSeconds?: boolean;
}

export const getFormattedTime = ({
    date,
    shouldShowSeconds = false,
}: GetFormattedTimeOptions): string => {
    const { active: language } = getLanguage();

    const timeOptions: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        second: shouldShowSeconds ? '2-digit' : undefined,
    };

    const formattedTime = date.toLocaleTimeString(language, timeOptions).replace(/^0/, '');

    const hourWord = getTimeString({ language });

    return `${formattedTime} ${hourWord}`.trim();
};

interface GetTimeStringProps {
    language?: Language;
}

export const getTimeString = ({ language }: GetTimeStringProps) => {
    const map: { [key: string]: string } = {
        nl: 'uur',
        fr: 'heures',
        de: 'Uhr',
        es: 'horas',
        it: 'ore',
        pt: 'horas',
        pl: 'godzina',
        tr: 'saat',
        uk: 'година',
        en: '',
    };

    return map[language ?? ''] ?? '';
};
