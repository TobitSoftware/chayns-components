declare global {
    let chayns: Chayns;
}

export interface Chayns {
    dialog: Dialog;
    env: Env;
    openImage(urls: string | string[], start?: number): Promise<undefined>;
    openVideo(url: string): Promise<void>;
    register(config: object): any;
    getWindowMetrics(): Promise<WindowMetrics>;
}

export interface WindowMetrics {
    bottomBarHeight: number;
    coverHeight: 0;
    frameX: number;
    frameY: number;
    height: number;
    menuHeight: number;
    offsetTop: number;
    pageYOffset: number;
    scrollTop: number;
    windowHeight: number;
    windowWidth: number;
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
    alert(headline: string, text: string): Promise<ButtonType>;
    iFrame(config: {
        url: string;
        input?: object;
        title?: string;
        message?: string;
        buttons?: DialogButton[];
        seamless?: boolean;
        transparent?: boolean;
        waitCursor?: boolean;
        maxHeight?: string;
        width?: number;
        customTransitionTimeout?: number;
    }): Promise<any>;
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

export interface Group {
    id: number;
    isActive: boolean;
}

export interface User {
    name: string;
    firstName: string;
    gender: number;
    lastName: string;
    id: number;
    personId: string;
    tobitAccessToken: string;
    groups: Group[];
    isAuthenticated: boolean;
    adminMode: boolean;
    isAdmin: boolean;
}

export interface Site {
    id: string;
}

export interface Env {
    site: Site;
    user: User;
    language: any;
    parameters: any;
    isApp: boolean;
    isMobile: boolean;
    isTablet: boolean;
}
