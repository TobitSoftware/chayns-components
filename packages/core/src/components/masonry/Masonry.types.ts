import { ReactElement, ReactNode } from 'react';

export interface MasonryProps {
    children: ReactNode;
    gap?: number;
    columnWidth?: number;
    rowHeight?: number;
}

export interface MasonryItemProps {
    children: ReactNode;
    columns?: number;
}

export interface MasonryContextValue {
    registerItem: (key: string, height: number) => void;
}

export interface MasonryLayoutItem {
    key: string;
    columns: number;
    rows: number;
}

export interface PackedMasonryItem {
    key: string;
    x: number;
    y: number;
    width: number;
}

export interface PackedMasonryGrid {
    items: Record<string, PackedMasonryItem>;
    height: number;
}

export interface InternalMasonryItemProps {
    children: ReactNode;
    itemKey: string;
    x: number;
    y: number;
    width: number;
}

export type MasonryChild = ReactElement<MasonryItemProps>;

export type MasonryComponent = React.FC<MasonryProps> & {
    Item: React.FC<MasonryItemProps>;
};
