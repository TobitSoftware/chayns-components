import { Language, useLanguage } from 'chayns-api';

export const useCommunicationHeaderDate = (date: string) => {
    const { active: language } = useLanguage();

    const parsedDate = new Date(date);

    const timeParts: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
    };

    const formattedTime = `${parsedDate.toLocaleTimeString(language, timeParts)} ${language === Language.German ? 'Uhr' : ''}`;

    if (isToday(parsedDate)) {
        const todayWord = capitalizeFirstLetter(
            new Intl.RelativeTimeFormat(language, { numeric: 'auto' }).format(0, 'day'),
        );

        return `${todayWord} ${formattedTime}`;
    }

    if (isYesterday(parsedDate)) {
        const yesterdayWord = capitalizeFirstLetter(
            new Intl.RelativeTimeFormat(language, { numeric: 'auto' }).format(-1, 'day'),
        );

        return `${yesterdayWord} ${formattedTime}`;
    }

    const dateParts: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'long',
        year: !isCurrentYear(parsedDate) ? 'numeric' : undefined,
    };

    const formattedDate = parsedDate.toLocaleDateString(language, dateParts);

    return `${formattedDate}, ${formattedTime}`;
};

export const capitalizeFirstLetter = (text: string): string =>
    text.charAt(0).toUpperCase() + text.slice(1);

export const isToday = (date: Date): boolean => {
    const today = new Date();
    return today.toDateString() === date.toDateString();
};

export const isYesterday = (date: Date): boolean => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toDateString() === date.toDateString();
};

export const isCurrentYear = (date: Date): boolean => {
    const currentYear = new Date().getFullYear();
    const yearOfGivenDate = date.getFullYear();
    return currentYear === yearOfGivenDate;
};
