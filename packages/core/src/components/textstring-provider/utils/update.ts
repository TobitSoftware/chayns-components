import type { SelectDialogItem } from '../../../types/chayns';
import type { TextStringValue } from '../TextStringProvider';

interface ChangeTextStringOptions {
    textstringName: string;
    textstringText: string;
    language: string;
}

const changeTextString = ({
    textstringText,
    textstringName,
    language,
}: ChangeTextStringOptions) => {
    const body = {
        textstringName,
    };

    body[`text${language}`] = textstringText;
    return new Promise((resolve, reject) => {
        fetch(`https://webapi.tobit.com/TextStringService/v1.0/V2/LangStrings`, {
            method: 'put',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${chayns.env.user.tobitAccessToken}`,
            },
            body: JSON.stringify(body),
        }).then((response) => {
            if (response.status === 200) {
                resolve({ ResultCode: 0 });
            } else {
                reject(response.statusText);
            }
        }, reject);
    });
};

interface ChangeStringResultOptions {
    textstringName: string;
    textstringText: string;
    language: string;
    // data: ;
}

const changeStringResult = ({
    data,
    language,
    textstringText,
    textstringName,
}: ChangeStringResultOptions) => {
    if (data.buttonType === 1 && (data.text || data.value)) {
        changeTextString({
            textstringName,
            textstringText,
            language,
        })
            .then((result) => {
                if (result.ResultCode === 0) {
                    void chayns.dialog.alert(
                        '',
                        'Die Änderungen wurden erfolgreich gespeichert. Es kann bis zu 5 Minuten dauern, bis die Änderung sichtbar wird.'
                    );
                } else {
                    void chayns.dialog.alert('', 'Es ist ein Fehler aufgetreten.');
                }
            })
            .catch(() => {
                void chayns.dialog.alert('', 'Es ist ein Fehler aufgetreten.');
            });
    }
};

interface ChangeStringDialogOptions {
    textstringName: string;
    textstringText: string;
    language: string;
}

const changeStringDialog = ({
    textstringName,
    textstringText,
    language,
}: ChangeStringDialogOptions) => {
    if (textstringText) {
        chayns.register({ apiDialogs: true });
        void chayns.dialog
            .iFrame({
                url: 'https://frontend.tobit.com/dialog-html-editor/v1.0/',
                input: { textstringText },
                title: textstringName,
                buttons: [
                    {
                        text: 'Speichern',
                        buttonType: 1,
                    },
                    {
                        text: 'Abbrechen',
                        buttonType: -1,
                    },
                ],
            })
            .then((result) => {
                changeStringResult({ data: result, language });
            });
    } else {
        void chayns.dialog.alert(textstringName, 'Der TextString existiert nicht.');
    }
};

interface SelectLanguageToChangeOptions {
    textstringName: string | number | undefined;
    textstringText: string;
}

const selectLanguageToChange = ({
    textstringName,
    textstringText,
}: SelectLanguageToChangeOptions) => {
    void chayns.dialog
        .iFrame({
            url: 'https://tapp-staging.chayns-static.space/text-string-tapp/v1/iframe-edit.html',
            buttons: [],
            input: { textstring: textstringName },
        })
        .then((result: string) => {
            changeStringDialog({
                textstringName: textstringName?.toString() ?? '',
                textstringText,
                language: result,
            });
        });
};

interface UpdateTextstringOptions {
    textstringText: string;
    textstringList: TextStringValue;
}

export const updateTextstring = ({ textstringList, textstringText }: UpdateTextstringOptions) => {
    const formattedList: SelectDialogItem[] = [];

    Object.keys(textstringList).forEach((key) => {
        formattedList.push({
            name: key,
            value: key,
        });
    });

    void chayns.dialog
        .select({
            title: 'TextString wählen',
            message: 'Wähle den TextString, den du ändern möchtest:',
            multiselect: false,
            list: formattedList,
        })
        .then((data) => {
            if (data.buttonType === 1 && data.selection && data.selection.length > 0) {
                selectLanguageToChange({
                    textstringName: data.selection[0]?.value,
                    textstringText,
                });
            }
        });
};
