import { format, isPast, isThisYear, isToday, isTomorrow, isYesterday } from 'date-fns';

interface GetFormattedYearOptions {
    date: Date;
    shouldShowThisYear?: boolean;
}

export const getYearFormat = ({ date, shouldShowThisYear }: GetFormattedYearOptions) => {
    if (shouldShowThisYear) {
        return ' yyyy';
    }

    return isThisYear(date) ? '' : ' yyyy';
};

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
}

export const getFormattedDayOfWeek = ({
    shouldShowRelativeDayOfWeek,
    shouldShowDayOfWeek,
    shouldUseShortText,
    date,
}: GetFormattedDayOfWeekOptions) => {
    if (!shouldShowDayOfWeek && !shouldShowRelativeDayOfWeek) {
        return '';
    }

    if (shouldShowRelativeDayOfWeek) {
        if (isToday(date)) {
            return 'Heute, ';
        }

        if (isTomorrow(date)) {
            return 'Morgen, ';
        }

        if (isYesterday(date)) {
            return 'Gestern, ';
        }
    }

    if (shouldUseShortText) {
        return format(date, 'E., ');
    }

    return format(date, 'EEEE, ');
};

interface GetFormattedTimeOptions {
    shouldShowTime?: boolean;
    date: Date;
}

export const getFormattedTime = ({ shouldShowTime, date }: GetFormattedTimeOptions) => {
    if (!shouldShowTime) {
        return '';
    }

    return `, ${format(date, 'HH:mm')} Uhr`;
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

interface GetTimeTillNowOptions {
    date: Date;
    currentDate: Date;
}

export const getTimeTillNow = ({ date, currentDate }: GetTimeTillNowOptions): string => {
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
                time.value = Math.floor(elapsedMilliseconds / 3600000);
                time.type = TimeType.Hours;
                break;
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

        return `${time.value} ${getFormattedPastTimeString(time)}`;
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
            time.value = Math.floor(remainingMilliseconds / 3600000);
            time.type = TimeType.Hours;
            break;
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

    return `${time.value} ${getFormattedFutureTimeString(time)}`;
};

const timeTypeStrings = {
    past: {
        seconds: {
            singular: 'Sekunde',
            plural: 'Sekunden',
        },
        minutes: {
            singular: 'Minute',
            plural: 'Minuten',
        },
        hours: {
            singular: 'Stunde',
            plural: 'Stunden',
        },
        days: {
            singular: 'Tag',
            plural: 'Tagen',
        },
        weeks: {
            singular: 'Woche',
            plural: 'Wochen',
        },
        months: {
            singular: 'Monat',
            plural: 'Monaten',
        },
        years: {
            singular: 'Jahr',
            plural: 'Jahren',
        },
    },
    future: {
        seconds: {
            singular: 'Sekunde',
            plural: 'Sekunden',
        },
        minutes: {
            singular: 'Minute',
            plural: 'Minuten',
        },
        hours: {
            singular: 'Stunde',
            plural: 'Stunden',
        },
        days: {
            singular: 'Tag',
            plural: 'Tagen',
        },
        weeks: {
            singular: 'Woche',
            plural: 'Wochen',
        },
        months: {
            singular: 'Monat',
            plural: 'Monaten',
        },
        years: {
            singular: 'Jahr',
            plural: 'Jahren',
        },
    },
};

export const getFormattedPastTimeString = (time: Time): string => {
    const { value, type } = time;
    const {
        past: { seconds, days, weeks, months, years, minutes, hours },
    } = timeTypeStrings;
    const isSingular = value === 1;

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

export const getFormattedFutureTimeString = (time: Time): string => {
    const { value, type } = time;
    const {
        future: { seconds, days, weeks, months, years, minutes, hours },
    } = timeTypeStrings;
    const isSingular = value === 1;

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
