import type { CSSProperties } from 'react';

export interface HighlightedDates {
    dates: Date[];
    style: HighlightedDateStyles;
}

export interface HighlightedDateStyles {
    backgroundColor: CSSProperties['backgroundColor'];
    textColor: CSSProperties['color'];
}

export interface Categories {
    id: string;
    dates: Date[];
    color: CSSProperties['color'];
}

export interface IMonth {
    month: EMonth;
    year: string;
}

export enum EMonth {
    January = 1,
    February,
    March,
    April,
    May,
    June,
    July,
    August,
    September,
    October,
    November,
    December,
}
