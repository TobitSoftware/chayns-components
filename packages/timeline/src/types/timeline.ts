export interface TimelineEvent {
    color: string;
    duration: number;
    endIcon?: string;
    endTime?: string;
    events?: TimelineEvent[];
    id: number;
    name: string;
    startIcon: string;
    startTime: string;
}

export interface TransformedTimelineEvent extends TimelineEvent {
    offset: number;
    delay: number;
    leafCount: number;
    events?: [TransformedTimelineEvent, ...TransformedTimelineEvent[]];
}
