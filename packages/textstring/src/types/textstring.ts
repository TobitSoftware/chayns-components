declare global {
    interface Window {
        Textstrings: TextstringValues;
    }
}

type TextstringValues = {
    [key: string]: TextstringValue;
};

export type TextstringValue = {
    [key: string]: string;
};
