export interface Weekday {
    name: string;
    id: number;
}

export interface Time {
    id: string;
    start: string;
    end: string;
}

export interface OpeningTime {
    weekdayId: Weekday['id'];
    id: string;
    isDisabled?: boolean;
    times: Time[];
}

export interface OnTimeAdd {
    dayId: OpeningTime['id'];
    time: Time;
    isValid: boolean;
}

export interface OnChange {
    enabledDays?: OpeningTime['id'][];
    dayId?: OpeningTime['id'];
    time?: Time;
    isValid?: boolean;
}

export enum OpeningTimesButtonType {
    NONE,
    ADD,
    REMOVE,
}

export enum HintTextPosition {
    Top,
    Bottom,
}
