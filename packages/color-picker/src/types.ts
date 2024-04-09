export interface Coordinates {
    x: number;
    y: number;
}

export interface Scale {
    scaleX: number;
    scaleY: number;
}

export interface RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
}

export interface IPresetColor {
    isCustom?: boolean;
    id: string;
    color: string;
}
