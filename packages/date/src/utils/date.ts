export const isToday = (date: Date): boolean => {
    const today = new Date();
    return today.toDateString() === date.toDateString();
};

export const isTomorrow = (date: Date): boolean => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toDateString() === date.toDateString();
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

export const getIsDateNearToday = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const diffInDays = (targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

    return diffInDays === 0 || diffInDays === -1 || diffInDays === 1;
};

export const isMorning = (date: Date) => {
    const hours = date.getHours();

    return hours >= 0 && hours < 12;
};

export const isAfter = (firstDate: Date, secondDate: Date): boolean => {
    return firstDate.getTime() > secondDate.getTime();
};

export const isBefore = (firstDate: Date, secondDate: Date): boolean => {
    return firstDate.getTime() < secondDate.getTime();
};

export const startOfMonth = (date: Date): Date => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
};

export const addYears = (date: Date, years: number): Date => {
    return new Date(date.getFullYear() + years, date.getMonth(), date.getDate());
};

export const differenceInCalendarMonths = (firstDate: Date, secondDate: Date): number => {
    return (
        (firstDate.getFullYear() - secondDate.getFullYear()) * 12 +
        (firstDate.getMonth() - secondDate.getMonth())
    );
};

export const isSameDay = (firstDate: Date, secondDate: Date): boolean => {
    return (
        firstDate.getFullYear() === secondDate.getFullYear() &&
        firstDate.getMonth() === secondDate.getMonth() &&
        firstDate.getDate() === secondDate.getDate()
    );
};

export const isSameMonth = (firstDate: Date, secondDate: Date): boolean => {
    return (
        firstDate.getFullYear() === secondDate.getFullYear() &&
        firstDate.getMonth() === secondDate.getMonth()
    );
};

interface Interval {
    start: Date;
    end: Date;
}

export const isWithinInterval = (date: Date, interval: Interval): boolean => {
    return date.getTime() >= interval.start.getTime() && date.getTime() <= interval.end.getTime();
};

export const subYears = (date: Date, years: number): Date => {
    return new Date(date.getFullYear() - years, date.getMonth(), date.getDate());
};

export const startOfWeek = (date: Date): Date => {
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    const start = new Date(date);
    start.setDate(date.getDate() + diff);
    start.setHours(0, 0, 0, 0);
    return start;
};

export const endOfWeek = (date: Date): Date => {
    const day = date.getDay();
    const diff = day === 0 ? 0 : 7 - day;
    const end = new Date(date);
    end.setDate(date.getDate() + diff);
    end.setHours(23, 59, 59, 999);
    return end;
};

export const eachDayOfInterval = (interval: { start: Date; end: Date }): Date[] => {
    const days: Date[] = [];
    const currentDate = new Date(interval.start);

    while (currentDate <= interval.end) {
        days.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return days;
};

export const addDays = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
};
