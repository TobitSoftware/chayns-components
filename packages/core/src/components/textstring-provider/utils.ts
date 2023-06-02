import type { TextStringValue } from './TextStringProvider';

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
