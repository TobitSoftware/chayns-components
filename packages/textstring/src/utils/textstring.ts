import type { ITextstring, TextstringReplacement } from '../components/textstring/types';
import { useContext } from 'react';
import {
    TextStringContext,
    TextStringValue,
} from '../components/textstring-provider/TextStringProvider';

interface LoadLibraryOptions {
    libraryName: string;
    language: string;
}

export const loadLibrary = async ({ language, libraryName }: LoadLibraryOptions) => {
    const response = await fetch(
        `https://webapi.tobit.com/TextStringService/v1.0/LangStrings/${libraryName}?language=${language}`
    );

    if (response.status !== 200) {
        return null;
    }

    return (await response.json()) as TextStringValue;
};

interface SelectLanguageToChangeOptions {
    textstringName: string;
}

export const selectLanguageToChange = ({ textstringName }: SelectLanguageToChangeOptions) => {
    void chayns.dialog.iFrame({
        url: 'https://tapp-staging.chayns-static.space/text-string-tapp/v1/iframe-edit.html',
        buttons: [],
        input: { textstring: textstringName },
    });
};

export interface GetTextstringValue {
    textString: ITextstring;
    replacements?: TextstringReplacement[];
}

export const getTextstringValue = ({ replacements, textString }: GetTextstringValue) => {
    // Ignore rule to get the textstrings from the library
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const textStrings = useContext(TextStringContext);

    const value = textStrings[textString.name] ?? textString.fallback;

    if (!replacements) {
        return value;
    }

    let newValue = value;

    replacements.forEach(({ replacement, key }) => {
        newValue = newValue.replace(key, replacement);
    });

    return newValue;
};
