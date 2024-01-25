export interface Weekday {
    name: string;
    id: number;
}

export interface Time {
    start: string;
    end: string;
}

export interface OpeningTime {
    weekdayId: Weekday['id'];
    id: string;
    isDisabled?: boolean;
    times: Time[];
}

export enum OpeningTimesButtonType {
    NONE,
    ADD,
    REMOVE,
}
