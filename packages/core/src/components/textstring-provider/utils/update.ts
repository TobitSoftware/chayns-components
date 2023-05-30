// interface UpdateTextStringOptions {
//     text: string;
//     textStringName: string;
//     language: string;
//     accessToken: string;
// }
//
// export const updateTextString = async ({
//     textStringName,
//     text,
//     language,
//     accessToken,
// }: UpdateTextStringOptions) => {
//     const body = {
//         textStringName,
//     };
//
//     body[`text${language}`] = text;
//
//     const response = await fetch('https://webapi.tobit.com/TextStringService/v1.0/V2/LangStrings', {
//         method: 'put',
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(body),
//     });
//
//     if (response.status === 200) {
//         void chayns.dialog.alert(
//             '',
//             'Die Änderungen wurden erfolgreich gespeichert. Es kann bis zu 5 Minuten dauern, bis die Änderung sichtbar wird.'
//         );
//     } else {
//         void chayns.dialog.alert('', 'Es ist ein Fehler aufgetreten.');
//     }
// };

interface updateTextstringOptions {}

const updateTextstring = ({}: updateTextstringOptions) => {
    const body = {
        stringName,
    };

    body[`text${language}`] = text;
    return new Promise((resolve, reject) => {
        fetch(`${CHAYNS_RES_URL}/V2/LangStrings`, {
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

interface SelectLanguageDialog {
    textstringName: string;
}

const selectLanguageDialog = ({ textstringName }: SelectLanguageDialog) => {
    void chayns.dialog
        .iFrame({
            url: 'https://tapp-staging.chayns-static.space/text-string-tapp/v1/iframe-edit.html',
            buttons: [],
            input: { textstring: textstringName },
        })
        .then(() => {});
};

interface UpdateTextstringDialogOptions {
    textstringName: string;
    textstringText: string;
}

export const updateTextstringDialog = ({
    textstringName,
    textstringText,
}: UpdateTextstringDialogOptions) => {
    if (textstringText) {
        chayns.register({ apiDialogs: true });
        void chayns.dialog
            .iFrame({
                url: 'https://frontend.tobit.com/dialog-html-editor/v1.0/',
                input: { textstringText },
                title: textstringName,
                message: 'Sprache: Deutsch',
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
            .then((result: string) => {
                // ToDo open fetch to update textstring
            });
    } else {
        void chayns.dialog.alert(textstringName, 'Der TextString existiert nicht.');
    }
};
