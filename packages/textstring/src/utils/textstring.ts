import type { TextStringValue } from '../components/textstring-provider/TextStringProvider';

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
    // createDialog({
    //     animation: {},
    //     type: DialogType.IFRAME,
    //     url: 'https://tapp-staging.chayns-static.space/text-string-tapp/v1/iframe-edit.html',
    //     dialogInput: { textstring: textstringName },
    // });
};
