interface ParseFloatAndRoundOptions {
    stringValue: string;
    decimals?: number;
}

export const parseFloatAndRound = ({ stringValue, decimals }: ParseFloatAndRoundOptions) => {
    const parsed = parseFloat(stringValue.replace(',', '.'));

    return parseFloat(parsed.toFixed(decimals ?? 2));
};

interface FormateNumberOptions {
    number: number | null;
    forceFractionDigits?: boolean;
}

export const formateNumber = ({ number, forceFractionDigits }: FormateNumberOptions) => {
    if (typeof number !== 'number') {
        return '';
    }

    return number.toLocaleString('de-DE', {
        useGrouping: true,
        minimumFractionDigits: forceFractionDigits ? 2 : 0,
        maximumFractionDigits: 2,
    });
};
