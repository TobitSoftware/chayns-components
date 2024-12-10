import {Language} from "chayns-api";

export const addSeconds = (date: Date, seconds: number): Date => {
    const result = new Date(date);
    result.setSeconds(date.getSeconds() + seconds);
    return result;
};

export const subHours = (date: Date, hours: number): Date => {
    const result = new Date(date);
    result.setHours(date.getHours() - hours);
    return result;
};

export const differenceInHours = (date1: Date, date2: Date): number => {
    const diffInMilliseconds = date1.getTime() - date2.getTime();
    return Math.floor(diffInMilliseconds / (1000 * 60 * 60)); // Millisekunden in Stunden umrechnen
};

interface GetTimeTillNow {
    date: Date;
    currentDate: Date;
    language: Language;
}

type RelativeTimeUnit = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second';

export const getTimeTillNow = ({
                                   date,
                                   currentDate,
                                   language = Language.English,
                               }: GetTimeTillNow): string => {
    const diffInSeconds = Math.floor((currentDate.getTime() - date.getTime()) / 1000);
    const isPast = diffInSeconds > 0;

    const units: { label: RelativeTimeUnit; seconds: number }[] = [
        {label: 'year', seconds: 31536000},
        {label: 'month', seconds: 2592000},
        {label: 'day', seconds: 86400},
        {label: 'hour', seconds: 3600},
        {label: 'minute', seconds: 60},
        {label: 'second', seconds: 1},
    ];

    const absDiff = Math.abs(diffInSeconds);
    const {label, seconds} = units.find((u) => absDiff >= u.seconds) || {
        label: 'second',
        seconds: 1,
    };
    const count = Math.floor(absDiff / seconds);

    const formatter = new Intl.RelativeTimeFormat(language, {numeric: 'auto'});

    return formatter.format(isPast ? -count : count, label);
};

export const intervalToDuration = (interval: { start: Date, end: Date }): { years: number, months: number, days: number, hours: number, minutes: number, seconds: number } => {
    const startTime = interval.start.getTime();
    const endTime = interval.end.getTime();
    const diffInMilliseconds = endTime - startTime;

    const years = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

    return { years, months, days, hours, minutes, seconds };
};

export const differenceInMinutes = (date1: Date, date2: Date): number => {
    const diffInMilliseconds = date1.getTime() - date2.getTime();
    return Math.floor(diffInMilliseconds / (1000 * 60)); // Millisekunden in Minuten umrechnen
};
