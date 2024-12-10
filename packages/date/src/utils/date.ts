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
