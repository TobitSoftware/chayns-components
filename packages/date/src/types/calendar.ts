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
    year: number;
}

export interface CustomThumbColors {
    /**
     * The background color of the main thumbs (single, multi, interval)
     */
    mainBackgroundColor?: CSSProperties['color'];
    /**
     * The text color of the main thumbs (single, multi, interval)
     */
    mainTextColor?: CSSProperties['color'];
    /**
     * The background color of the middle part of the interval thumb
     */
    secondaryBackgroundColor?: CSSProperties['color'];
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

export enum CalendarType {
    Single = 'single',
    Multiple = 'multiple',
    Interval = 'interval',
}

export type DateInterval = {
    start: Date;
    end?: Date;
};
