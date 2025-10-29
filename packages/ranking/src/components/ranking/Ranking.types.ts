import { ReactNode } from 'react';

export interface IRankingEntry {
    rank: number;
    name: string;
    personId: string;
    points: number;
    content?: IRankingContent[];
    icons?: string[] | ReactNode;
}

export type IRankingContent = IRankingContentHeadline | IRankingContentEntry;

export interface IRankingContentHeadline {
    headline: string;
    id: string;
}

export interface IRankingContentEntry {
    id: string;
    name: string;
    value: string;
}
