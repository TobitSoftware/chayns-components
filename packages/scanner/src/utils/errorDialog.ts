import { createDialog, DialogType } from 'chayns-api';

export const createErrorAlertDialog = (text: string) =>
    createDialog({
        type: DialogType.ALERT,
        text: `<p style="text-align: center;">%%DialogErrorIcon%%</p><p>${text}</p>`,
    });
