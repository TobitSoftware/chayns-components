import type { ButtonType } from './chayns';

export interface GetUserSignatureResult {
    key: string;
    personId: string;
    value: string;
}

export interface SignatureDialogResult {
    buttonType: ButtonType;
    result: string;
}
