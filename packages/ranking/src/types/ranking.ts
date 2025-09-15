export interface IRankingEntry {
    rank: number;
    name: string;
    personId: string;
    points: number;
    content?: RankingContent[];
    icons?: string[];
}

export type RankingContent = RankingContentHeadline | RankingContentEntry;

export interface RankingContentHeadline {
    headline: string;
    id: string;
}

export interface RankingContentEntry {
    id: string;
    name: string;
    value: string;
}
