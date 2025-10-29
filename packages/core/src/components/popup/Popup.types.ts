export enum PopupAlignment {
    TopLeft,
    TopCenter,
    TopRight,
    BottomLeft,
    BottomCenter,
    BottomRight,
}

export type PopupCoordinates = {
    x: number;
    y: number;
};

export interface PopupRef {
    hide: VoidFunction;
    show: VoidFunction;
}
