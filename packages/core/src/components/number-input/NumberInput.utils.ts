import { Language } from 'chayns-api';

export enum NumberInputType {
    Decimal = 'decimal',
    Integer = 'integer',
    Time = 'time',
    Money = 'money',
}

export const parseLocaleNumber = (stringNumber: string, locale: Language): number | undefined => {
    if (!stringNumber) {
        return undefined;
    }

    const parts = new Intl.NumberFormat(locale).formatToParts(1.1);
    const decimalPart = parts.find((part) => part.type === 'decimal');
    const decimalSeparator = decimalPart ? decimalPart.value : '.';

    const groupPart = parts.find((part) => part.type === 'group');
    const groupSeparator = groupPart ? groupPart.value : ',';

    const normalized = stringNumber
        .replace(new RegExp(`[^0-9${decimalSeparator}-]`, 'g'), '')
        .replace(new RegExp(`\${groupSeparator}`, 'g'), '')
        .replace(decimalSeparator, '.');

    const result = parseFloat(normalized);

    return Number.isNaN(result) ? undefined : result;
};

export const formatDecimal = (value?: number): string => {
    if (typeof value !== 'number' || Number.isNaN(value)) return '';

    return value.toFixed(2).replace('.', ',');
};

export const formatTime = (value?: number): string => {
    if (typeof value !== 'number' || Number.isNaN(value)) return '';

    const str = Math.abs(Math.floor(value)).toString().padStart(4, '0');
    const hours = str.length > 2 ? str.slice(0, -2) : '00';
    const minutes = str.slice(-2);
    return `${hours.padStart(2, '0')}:${minutes}`;
};

export const formatMoney = (value?: number): string => {
    if (typeof value !== 'number' || Number.isNaN(value)) return '';

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
