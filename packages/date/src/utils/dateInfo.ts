import { getLanguage as getChaynsLanguage } from 'chayns-api';
import {
    format,
    isPast,
    isThisYear,
    isToday,
    isTomorrow,
    isYesterday,
    type Locale,
} from 'date-fns';
import { de, enGB, es, fr, it, nl, pl, pt, tr, uk } from 'date-fns/locale';
import { TIME_TYPE_STRINGS, type TimeTypeStringsRecord } from '../constants/dateInfo';

export const getLanguage = (): Locale => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    switch (getChaynsLanguage().translation || getChaynsLanguage().site) {
        case 'en':
            return enGB;
        case 'nl':
            return nl;
        case 'fr':
            return fr;
        case 'it':
            return it;
        case 'pl':
            return pl;
        case 'pt':
            return pt;
        case 'es':
            return es;
        case 'tr':
            return tr;
        case 'uk':
            return uk;
        default:
            return de;
    }
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

export const getFormattedDayOfWeek = ({
    shouldShowRelativeDayOfWeek,
    shouldShowDayOfWeek,
    shouldUseShortText,
    date,
    language,
}: GetFormattedDayOfWeekOptions) => {
    if (!shouldShowDayOfWeek && !shouldShowRelativeDayOfWeek) {
        return '';
    }

    if (shouldShowRelativeDayOfWeek) {
        if (isToday(date)) {
            switch (language?.code) {
                case 'en-GB':
                    return 'Today, ';
                case 'nl':
                    return 'Vandaag, ';
                case 'fr':
                    return "Aujourd'hui, ";
                case 'it':
                    return 'Oggi, ';
                case 'pl':
                    return 'Dzisiaj, ';
                case 'pt':
                    return 'Hoje, ';
                case 'es':
                    return 'Hoy, ';
                case 'tr':
                    return 'Bugün, ';
                case 'uk':
                    return 'Сьогодні, ';
                default:
                    return 'Heute, ';
            }
        }

        if (isTomorrow(date)) {
            switch (language?.code) {
                case 'en-GB':
                    return 'Tomorrow, ';
                case 'nl':
                    return 'Morgen, ';
                case 'fr':
                    return 'Demain, ';
                case 'it':
                    return 'Domani, ';
                case 'pl':
                    return 'Jutro, ';
                case 'pt':
                    return 'Amanhã, ';
                case 'es':
                    return 'Mañana, ';
                case 'tr':
                    return 'Yarın, ';
                case 'uk':
                    return 'Завтра, ';
                default:
                    return 'Morgen, ';
            }
        }

        if (isYesterday(date)) {
            switch (language?.code) {
                case 'en-GB':
                    return 'Yesterday, ';
                case 'nl':
                    return 'Gisteren, ';
                case 'fr':
                    return 'Hier, ';
                case 'it':
                    return 'Ieri, ';
                case 'pl':
                    return 'Wczoraj, ';
                case 'pt':
                    return 'Ontem, ';
                case 'es':
                    return 'Ayer, ';
                case 'tr':
                    return 'Dün, ';
                case 'uk':
                    return 'Вчора, ';
                default:
                    return 'Gestern, ';
            }
        }
    }

    if (shouldUseShortText) {
        return format(date, 'E, ', { locale: language });
    }

    return format(date, 'EEEE, ', { locale: language });
};

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

export interface Time {
    value: number;
    type: TimeType;
    isPast: boolean;
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

export const getTimeTypeStrings = (language: string): TimeTypeStringsRecord | undefined =>
    TIME_TYPE_STRINGS[language === 'en-GB' ? 'en' : language];

interface GetTimeTillNowOptions {
    date: Date;
    currentDate: Date;
    language: Locale;
}

export const getTimeTillNow = ({ date, currentDate, language }: GetTimeTillNowOptions): string => {
    const time: Time = {
        value: 0,
        type: TimeType.Years,
        isPast: false,
    };

    if (isPast(date)) {
        const elapsedMilliseconds = currentDate.getTime() - date.getTime();

        switch (true) {
            case elapsedMilliseconds < 60000:
                time.value = Math.floor(elapsedMilliseconds / 1000);
                time.type = TimeType.Seconds;
                break;
            case elapsedMilliseconds < 3600000:
                time.value = Math.floor(elapsedMilliseconds / 60000);
                time.type = TimeType.Minutes;
                break;
            case elapsedMilliseconds < 86400000:
                const hours = Math.floor(elapsedMilliseconds / 3600000);
                const minutes = Math.floor((elapsedMilliseconds % 3600000) / 60000);
                return `${hours} ${getFormattedPastTimeString({ value: hours, type: TimeType.Hours, isPast: true }, language)} 
                        ${minutes > 0 ? `${getTimeTypeStrings(language.code ?? 'de')?.and ?? ''} ${minutes} ${getFormattedPastTimeString({ value: minutes, type: TimeType.Minutes, isPast: true }, language)}` : ''}`;
            case elapsedMilliseconds < 604800000:
                time.value = Math.floor(elapsedMilliseconds / 86400000);
                time.type = TimeType.Days;
                break;
            case elapsedMilliseconds < 2592000000:
                time.value = Math.floor(elapsedMilliseconds / 604800000);
                time.type = TimeType.Weeks;
                break;
            case elapsedMilliseconds < 31536000000:
                time.value = Math.floor(elapsedMilliseconds / 2592000000);
                time.type = TimeType.Months;
                break;
            default:
                time.value = Math.floor(elapsedMilliseconds / 31536000000);
                time.type = TimeType.Years;
                break;
        }

        return `${time.value} ${getFormattedPastTimeString(time, language)}`;
    }

    const remainingMilliseconds = date.getTime() - currentDate.getTime();

    switch (true) {
        case remainingMilliseconds < 60000:
            time.value = Math.floor(remainingMilliseconds / 1000);
            time.type = TimeType.Seconds;
            break;
        case remainingMilliseconds < 3600000:
            time.value = Math.floor(remainingMilliseconds / 60000);
            time.type = TimeType.Minutes;
            break;
        case remainingMilliseconds < 86400000:
            const hours = Math.floor(remainingMilliseconds / 3600000);
            const minutes = Math.floor((remainingMilliseconds % 3600000) / 60000);
            return `${hours} ${getFormattedFutureTimeString({ value: hours, type: TimeType.Hours, isPast: false }, language)} 
                    ${minutes > 0 ? `${getTimeTypeStrings(language.code ?? 'de')?.and ?? ''} ${minutes} ${getFormattedFutureTimeString({ value: minutes, type: TimeType.Minutes, isPast: false }, language)}` : ''}`;
        case remainingMilliseconds < 604800000:
            time.value = Math.floor(remainingMilliseconds / 86400000);
            time.type = TimeType.Days;
            break;
        case remainingMilliseconds < 2592000000:
            time.value = Math.floor(remainingMilliseconds / 604800000);
            time.type = TimeType.Weeks;
            break;
        case remainingMilliseconds < 31536000000:
            time.value = Math.floor(remainingMilliseconds / 2592000000);
            time.type = TimeType.Months;
            break;
        default:
            time.value = Math.floor(remainingMilliseconds / 31536000000);
            time.type = TimeType.Years;
            break;
    }

    return `${time.value} ${getFormattedFutureTimeString(time, language)}`;
};

export const getFormattedPastTimeString = (time: Time, language: Locale): string => {
    const { value, type } = time;

    const timeTypeStrings = getTimeTypeStrings(language.code ?? 'de');
    const isSingular = value === 1;

    if (!timeTypeStrings) {
        return '';
    }

    const { seconds, days, weeks, months, years, minutes, hours } = timeTypeStrings.past;

    switch (true) {
        case type === TimeType.Seconds:
            return isSingular ? seconds.singular : seconds.plural;
        case type === TimeType.Minutes:
            return isSingular ? minutes.singular : minutes.plural;
        case type === TimeType.Hours:
            return isSingular ? hours.singular : hours.plural;
        case type === TimeType.Days:
            return isSingular ? days.singular : days.plural;
        case type === TimeType.Weeks:
            return isSingular ? weeks.singular : weeks.plural;
        case type === TimeType.Months:
            return isSingular ? months.singular : months.plural;
        default:
            return isSingular ? years.singular : years.plural;
    }
};

export const getFormattedFutureTimeString = (time: Time, language: Locale): string => {
    const { value, type } = time;
    const timeTypeStrings = getTimeTypeStrings(language.code ?? 'de');
    const isSingular = value === 1;

    if (!timeTypeStrings) {
        return '';
    }

    const { seconds, days, weeks, months, years, minutes, hours } = timeTypeStrings.future;

    switch (true) {
        case type === TimeType.Seconds:
            return isSingular ? seconds.singular : seconds.plural;
        case type === TimeType.Minutes:
            return isSingular ? minutes.singular : minutes.plural;
        case type === TimeType.Hours:
            return isSingular ? hours.singular : hours.plural;
        case type === TimeType.Days:
            return isSingular ? days.singular : days.plural;
        case type === TimeType.Weeks:
            return isSingular ? weeks.singular : weeks.plural;
        case type === TimeType.Months:
            return isSingular ? months.singular : months.plural;
        default:
            return isSingular ? years.singular : years.plural;
    }
};
