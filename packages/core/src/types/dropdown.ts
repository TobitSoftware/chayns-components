export interface DropdownCoordinates {
    x: number;
    y: number;
}

export interface DropdownTransform {
    x: string;
    y: string;
}

export enum DropdownDirection {
    BOTTOM,
    TOP,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    TOP_LEFT,
    TOP_RIGHT,
    LEFT,
    RIGHT,
}

export interface DropdownMeasurements {
    width: number;
    height: number;
    scrollHeight: number;
    x: number;
    y: number;
    element: Element;
}
