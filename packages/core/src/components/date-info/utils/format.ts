import { format, isPast } from 'date-fns';
import type { FormatOptions } from '../types/props';
import {
    getDay,
    getFormattedFutureTimeString,
    getFormattedMonth,
    getFormattedPastTimeString,
    getFormattedYear,
    getTime,
    getWeekDay,
    Time,
    TimeType,
} from './helper';

interface GetSimpleDateOptions {
    date: Date;
    formatOptions: FormatOptions;
}

export const getSimpleDate = ({ date, formatOptions }: GetSimpleDateOptions) => {
    const formatString = `dd. ${getFormattedMonth({ formatOptions })} ${getFormattedYear({
        date,
        formatOptions,
    })}`;

    return format(date, formatString);
};

interface GetSimpleTimeOptions {
    date: Date;
}

export const getSimpleTime = ({ date }: GetSimpleTimeOptions) => `${getTime({ date })} Uhr`;

interface GetDateWithTimeOptions {
    date: Date;
    formatOptions: FormatOptions;
}

export const getDateWithTime = ({ date, formatOptions }: GetDateWithTimeOptions) =>
    `${getDay({ date, formatOptions })}, ${getSimpleTime({ date })}`;

interface GetDayWithDateOptions {
    date: Date;
    formatOptions: FormatOptions;
}

export const getDayWithDate = ({ date, formatOptions }: GetDayWithDateOptions) =>
    `${getWeekDay({ date, formatOptions })}, ${getSimpleDate({ date, formatOptions })}`;

interface GetDayWithTimeOptions {
    date: Date;
    formatOptions: FormatOptions;
}

export const getDayWithTime = ({ date, formatOptions }: GetDayWithTimeOptions) =>
    `${getWeekDay({ date, formatOptions })}, ${getSimpleTime({ date })}`;

interface GetSimpleDatePeriodOptions {
    date: Date;
    secondDate: Date;
    formatOptions: FormatOptions;
}

export const getSimpleDatePeriod = ({
    date,
    secondDate,
    formatOptions,
}: GetSimpleDatePeriodOptions) =>
    `${getSimpleDate({ date, formatOptions })} - ${getSimpleDate({
        date: secondDate,
        formatOptions,
    })}`;

interface GetSimpleTimePeriodOptions {
    date: Date;
    secondDate: Date;
}

export const getSimpleTimePeriod = ({ date, secondDate }: GetSimpleTimePeriodOptions) =>
    `${getSimpleTime({ date })} - ${getSimpleTime({ date: secondDate })}`;

interface GetDateWithTimePeriodOptions {
    date: Date;
    secondDate: Date;
    formatOptions: FormatOptions;
}

export const getDateWithTimePeriod = ({
    date,
    secondDate,
    formatOptions,
}: GetDateWithTimePeriodOptions) =>
    `${getDateWithTime({ date, formatOptions })} - ${getDateWithTime({
        date: secondDate,
        formatOptions,
    })}`;

interface GetDayWithDatePeriodOptions {
    date: Date;
    secondDate: Date;
    formatOptions: FormatOptions;
}

export const getDayWithDatePeriod = ({
    date,
    secondDate,
    formatOptions,
}: GetDayWithDatePeriodOptions) =>
    `${getDayWithDate({ date, formatOptions })} - ${getDayWithDate({
        date: secondDate,
        formatOptions,
    })}`;

interface GetDayWithTimePeriodOptions {
    date: Date;
    secondDate: Date;
    formatOptions: FormatOptions;
}

export const getDayWithTimePeriod = ({
    date,
    secondDate,
    formatOptions,
}: GetDayWithTimePeriodOptions) =>
    `${getDayWithTime({ date, formatOptions })} - ${getDayWithTime({
        date: secondDate,
        formatOptions,
    })}`;

interface GetTimeTillNowOptions {
    date: Date;
    secondDate: Date;
    formatOptions: FormatOptions;
}

export const getTimeTillNow = ({ date, secondDate, formatOptions }: GetTimeTillNowOptions) => {
    const { hideTimeTillNowText } = formatOptions;
    const time: Time = {
        value: 0,
        type: TimeType.Years,
    };

    if (isPast(date)) {
        const elapsedMilliseconds = secondDate.getTime() - date.getTime();

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

        return `${!hideTimeTillNowText ? 'vor' : ''} ${time.value} ${getFormattedPastTimeString(
            time
        )}`;
    }

    const remainingMilliseconds = date.getTime() - secondDate.getTime();

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

    return `${!hideTimeTillNowText ? 'noch' : ''} ${time.value} ${getFormattedFutureTimeString(
        time
    )}`;
};
