import { DECIMAL_TEST, INTEGER_TEST, MONEY_TEST } from '../constants/number';

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
}

export const formateNumber = ({ number, isMoneyInput }: FormateNumberOptions) => {
    if (typeof number !== 'number') {
        return '';
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
    }): boolean;
}

export const isValidString: IsValidString = (
    {
        isDecimalInput, isMoneyInput, string
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

    // Allows numbers but excludes numbers with leading 0
    if (!isDecimalInput && !isMoneyInput && INTEGER_TEST.test(string)) {
        isValid = true;
    }

    if (string.length === 0) {
        isValid = true;

    }

    return isValid;
};
