import { dialog } from 'chayns-api';
import type { ITextstring, TextstringReplacement } from '../components/textstring/types';
import type { TextstringValue } from '../types/textstring';

const libraryCache = new Map<string, TextstringValue>();
const loadingLibraries = new Map<string, Promise<TextstringValue | null>>();

interface LoadLibraryOptions {
    libraryName: string;
    language: string;
}

const getCacheKey = ({ libraryName, language }: LoadLibraryOptions) =>
    `${libraryName}::${language}`;

const storeTextstrings = (cacheKey: string, libraryName: string, value: TextstringValue) => {
    libraryCache.set(cacheKey, value);

    if (typeof window !== 'undefined') {
        const prevTextstrings = window.Textstrings;

        window.Textstrings = {
            ...prevTextstrings,
            [libraryName]: value,
        };
    }
};

export const loadLibrary = async ({ language, libraryName }: LoadLibraryOptions) => {
    const cacheKey = getCacheKey({ libraryName, language });
    const cached = libraryCache.get(cacheKey);

    if (cached) {
        return cached;
    }

    const loading = loadingLibraries.get(cacheKey);

    if (loading) {
        return loading;
    }

    const request = (async () => {
        const response = await fetch(
            `https://webapi.tobit.com/TextstringService/v1.0/LangStrings/${libraryName}?language=${language}`,
        );

        if (response.status !== 200) {
            return null;
        }

        const value = (await response.json()) as TextstringValue;

        storeTextstrings(cacheKey, libraryName, value);

        return value;
    })();

    loadingLibraries.set(cacheKey, request);

    try {
        return await request;
    } finally {
        loadingLibraries.delete(cacheKey);
    }
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

interface InitTextstringsOptions {
    /**
     * The language that should be used.
     */
    language: string;
    /**
     * The name of the library.
     */
    libraryName: string;
}

export const initTextstrings = ({ libraryName, language }: InitTextstringsOptions) => {
    void loadLibrary({ libraryName, language }).then((result) => {
        if (result) {
            storeTextstrings(getCacheKey({ libraryName, language }), libraryName, result);
        }
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
}: GetTextstringValueOptions): string => {
    const textstrings =
        typeof window !== 'undefined' ? window.Textstrings?.[libraryName] : undefined;

    if (!textstrings) {
        if (!replacements) {
            return textstring.fallback;
        }

        return Object.keys(replacements).reduce(
            (current, key) =>
                current.replace(new RegExp(key, 'g'), <string>replacements[key] || ''),
            textstring.fallback,
        );
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

interface TtsToITextStringOptions {
    stringName: string;
    fallback: string;
}
export const ttsToITextString = (
    textString: TtsToITextStringOptions | string,
): { name: string; fallback: string } => {
    if (typeof textString === 'string') {
        return { name: textString, fallback: textString };
    }
    return {
        name: textString.stringName,
        fallback: textString.fallback,
    };
};
