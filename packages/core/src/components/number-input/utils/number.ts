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
