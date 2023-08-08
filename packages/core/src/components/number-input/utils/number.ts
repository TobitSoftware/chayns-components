interface ParseFloatAndRoundOptions {
    stringValue: string;
    decimals?: number;
}

export const parseFloatAndRound = ({ stringValue, decimals }: ParseFloatAndRoundOptions) => {
    const parsed = parseFloat(stringValue.replace(',', '.'));

    if (decimals) {
        return parseFloat(parsed.toFixed(decimals));
    }

    return parsed;
};

interface FormateNumberOptions {
    number: number | null;
}

export const formateNumber = ({ number }: FormateNumberOptions) => {
    if (typeof number !== 'number') {
        return '';
    }

    return number.toLocaleString('de-DE', {
        useGrouping: true,
        maximumSignificantDigits: 20,
    });
};
