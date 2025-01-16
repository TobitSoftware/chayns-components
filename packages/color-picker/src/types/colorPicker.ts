export interface Coordinates {
    x: number;
    y: number;
}

export interface Scale {
    scaleX: number;
    scaleY: number;
}

export interface RGB {
    r: number;
    g: number;
    b: number;
}

export interface RGBA extends RGB {
    a: number;
}

export interface IPresetColor {
    isCustom?: boolean;
    id: string;
    color: string;
}

export interface ItemStorageResult {
    schemeId?: string;
    siteId?: string;
    key?: string;
    value: string[];
}
