import { ReactNode } from 'react';

export interface MasonryProps {
    children: ReactNode;
    gap?: number;
    minColumnWidth?: number;
}

export interface MasonryItemLayout {
    x: number;
    y: number;
    width: number;
}

export type MasonryLayouts = Record<string, MasonryItemLayout>;
