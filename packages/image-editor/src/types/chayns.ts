declare global {
    let chayns: Chayns;
}

export interface Chayns {
    dialog: Dialog;
    env: Env;
}

export interface Dialog {
    select(config: {
        title?: string;
        message?: string;
        list: Array<SelectDialogItem>;
        multiselect?: boolean;
        type?: SelectType;
        preventCloseOnClick?: boolean;
        buttons?: DialogButton[];
        selectAllButton?: string;
    }): Promise<SelectDialogResult>;
}

declare enum ButtonText {
    Cancel = 'Abbrechen',
    No = 'Nein',
    Ok = 'OK',
    Yes = 'Ja',
}

export enum ButtonType {
    Cancel = -1,
    Negative = 0,
    Positive = 1,
}

export interface DialogButton {
    text: ButtonText | string;
    buttonType: ButtonType | number;
    collapseTime?: number;
    textColor?: string;
    backgroundColor?: string;
}

export interface SelectDialogItem {
    name: string;
    value: string | number;
    isSelected?: boolean;
}

export interface SelectDialogResult {
    buttonType: ButtonType | number;
    selection: Array<SelectDialogItem>;
}

declare enum SelectType {
    Default = 0,
    Icon = 1,
    IconAndText,
}

export interface Env {
    isMobile: boolean;
    isTablet: boolean;
}
