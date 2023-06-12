import { format, isThisYear, isToday, isTomorrow, isYesterday } from 'date-fns';

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
