import { dialog } from 'chayns-api';
import type { ITextstring, TextstringReplacement } from '../components/textstring/types';
import type { TextstringValue } from '../types/textstring';

interface LoadLibraryOptions {
    libraryName: string;
    language: string;
}

export const loadLibrary = async ({ language, libraryName }: LoadLibraryOptions) => {
    const response = await fetch(
        `https://webapi.tobit.com/TextstringService/v1.0/LangStrings/${libraryName}?language=${language}`,
    );

    if (response.status !== 200) {
        return null;
    }

    return (await response.json()) as TextstringValue;
};

interface SelectLanguageToChangeOptions {
    textstringName: string;
}

export const selectLanguageToChange = ({ textstringName }: SelectLanguageToChangeOptions) => {
    // Note: the page is in v4
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    void dialog.iFrame({
        url: 'https://tapp-staging.chayns-static.space/text-string-tapp/v1/iframe-edit.html',
        buttons: [],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        input: { textstring: textstringName },
    });
};

interface GetTextstringValueOptions {
    textstring: ITextstring;
    libraryName: string;
    replacements?: TextstringReplacement;
}

export const getTextstringValue = ({
    libraryName,
    textstring,
    replacements,
}: GetTextstringValueOptions) => {
    const textstrings = window.Textstrings[libraryName];

    if (!textstrings) {
        return undefined;
    }

    const value = textstrings[textstring.name] ?? textstring.fallback;

    if (!replacements) {
        return value;
    }

    return Object.keys(replacements).reduce(
        (current, key) => current.replace(new RegExp(key, 'g'), <string>replacements[key] || ''),
        value,
    );
};
