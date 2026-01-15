export enum NumberInputType {
    Decimal = 'decimal',
    Integer = 'integer',
    Time = 'time',
    Money = 'money',
}

export const formatDecimal = (value?: number): string => {
    if (typeof value !== 'number' || value === null || Number.isNaN(value)) return '';

    return value.toFixed(2).replace('.', ',');
};

export const formatTime = (value?: number): string => {
    if (typeof value !== 'number' || value === null || Number.isNaN(value)) return '';

    const str = Math.abs(Math.floor(value)).toString().padStart(4, '0');
    const hours = str.length > 2 ? str.slice(0, -2) : '00';
    const minutes = str.slice(-2);
    return `${hours.padStart(2, '0')}:${minutes}`;
};

export const formatMoney = (value?: number): string => {
    if (typeof value !== 'number' || value === null || Number.isNaN(value)) return '';

    return `${value.toFixed(2).replace('.', ',')} €`;
};

export const isValidNumberInput = (
    value: number | undefined,
    type: NumberInputType,
    minValue?: number,
    maxValue?: number,
): boolean => {
    if (typeof value !== 'number') return false;

    if (type === NumberInputType.Time) {
        const intVal = Math.floor(Math.abs(value));
        const hours = Math.floor(intVal / 100);
        const minutes = intVal % 100;
        if (hours < 0 || hours > 23) return false;
        return !(minutes < 0 || minutes > 59);
    }

    if (minValue !== undefined && value < minValue) return false;

    return !(maxValue !== undefined && value > maxValue);
};
