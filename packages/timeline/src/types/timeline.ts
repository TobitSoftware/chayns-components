export interface TimelineEvent {
    color: string;
    duration: number;
    endIcon?: string;
    endTime?: string;
    events?: TimelineEvent[];
    groupingMode: number;
    id: number;
    name: string;
    startIcon: string;
    startTime: string;
}
