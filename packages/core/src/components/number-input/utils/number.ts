import { DECIMAL_TEST, INTEGER_TEST, MONEY_TEST, TIME_TEST } from '../constants/number';

interface ParseFloatWithDecimals {
    ({ stringValue, decimals }: { stringValue: string; decimals?: number }): number;
}

export const parseFloatWithDecimals: ParseFloatWithDecimals = ({ stringValue, decimals }) => {
    const parsed = parseFloat(stringValue);

    if (decimals) {
        return parseFloat(parsed.toFixed(decimals));
    }

    return parsed;
};

interface FormateNumberOptions {
    number: number | null;
    isMoneyInput?: boolean;
    isTimeInput?: boolean;
}

export const formateNumber = ({ number, isMoneyInput, isTimeInput }: FormateNumberOptions) => {
    if (typeof number !== 'number') {
        return '';
    }

    if (isTimeInput) {
        let hours = 0;
        let minutes = 0;

        const firstTwoNumbers = Number(String(number).substring(0, 2));
        const lastTwoNumbers = Number(String(number).substring(2, 4));

        hours = firstTwoNumbers > 23 ? 23 : firstTwoNumbers;
        if (lastTwoNumbers < 7) {
            minutes = lastTwoNumbers * 10;
        } else {
            minutes = lastTwoNumbers > 59 ? 59 : lastTwoNumbers;
        }

        const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
        const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;

        return `${hoursStr}:${minutesStr}`;
    }

    return number.toLocaleString('de-DE', {
        useGrouping: true,
        minimumFractionDigits: isMoneyInput ? 2 : undefined,
        maximumFractionDigits: isMoneyInput ? 2 : undefined,
        maximumSignificantDigits: !isMoneyInput ? 20 : undefined,
    });
};

interface IsValidString {
    (config: {
        string: string;
        isDecimalInput?: boolean;
        isMoneyInput?: boolean;
        isTimeInput?: boolean;
    }): boolean;
}

export const isValidString: IsValidString = ({
    isDecimalInput,
    isMoneyInput,
    isTimeInput,
    string,
}) => {
    let isValid = false;

    // Allows numbers, one (comma/point) and any number of decimal places
    if (isDecimalInput && DECIMAL_TEST.test(string)) {
        isValid = true;
    }

    // Allows numbers but excludes numbers with leading 0
    if (isMoneyInput && MONEY_TEST.test(string)) {
        isValid = true;
    }

    if (isTimeInput && TIME_TEST) {
        isValid = true;
    }

    // Allows numbers but excludes numbers with leading 0
    if (!isDecimalInput && !isMoneyInput && !isTimeInput && INTEGER_TEST.test(string)) {
        isValid = true;
    }

    if (string.length === 0) {
        isValid = true;
    }

    return isValid;
};
