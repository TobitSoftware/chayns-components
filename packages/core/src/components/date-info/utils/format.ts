import { format, isPast, isThisYear, isToday, isTomorrow, isYesterday } from 'date-fns';

interface GetFormattedYearOptions {
    date: Date;
    shouldShowThisYear?: boolean;
}

export const getFormattedYear = ({ date, shouldShowThisYear }: GetFormattedYearOptions) => {
    if (shouldShowThisYear) {
        return ' yyyy';
    }

    return isThisYear(date) ? '' : ' yyyy';
};

interface GetFormattedMonthOptions {
    shouldUseShortText?: boolean;
}

export const getFormattedMonth = ({ shouldUseShortText }: GetFormattedMonthOptions) => {
    if (shouldUseShortText) {
        return 'MMM.';
    }

    return 'MMMM';
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
