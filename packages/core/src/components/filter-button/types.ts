import type { CSSProperties } from 'react';

export enum FilterButtonItemShape {
    Round,
    Rectangular,
}
export enum FilterButtonSize {
    Small,
    Normal,
}

export interface IFilterButtonItem {
    id: string;
    text: string;
    color?: CSSProperties['color'];
    icons?: string[];
}
