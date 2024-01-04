import { differenceInCalendarDays, format } from 'date-fns';
import { de } from 'date-fns/locale';

export const toRelativeShortDateString = (date: string): string => {
    const dateDifference = differenceInCalendarDays(new Date(date), new Date());
    if (dateDifference === 0) {
        return `Heute`;
    }
    if (dateDifference === -1) {
        return `Gestern`;
    }


    return `${toShortDate(date)}`;
};

export const toShortDate = (date: string, withYear = false): string =>
    format(date, withYear ? 'dd. MMMM yyyy' : 'dd. MMM', { locale: de });
