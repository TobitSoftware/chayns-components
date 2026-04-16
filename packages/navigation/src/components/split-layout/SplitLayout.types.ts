import { ReactNode } from 'react';

export interface SplitLayoutProps {
    children: ReactNode;
    direction?: SplitLayoutDirection;
    sizes?: SplitLayoutSizes;
    defaultSizes?: SplitLayoutSizes;
    onResize?: SplitLayoutResizeCallback;
    onResizeEnd?: SplitLayoutResizeCallback;
    onResizeStart?: SplitLayoutResizeCallback;
}

export interface SplitLayoutViewProps {
    id: string;
    children: ReactNode;
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
    visibleFrom?: number;
    visibleUntil?: number;
}

export interface NormalizedSplitLayoutView {
    id: string;
    node: ReactNode;
    defaultSize?: number;
    minSize: number;
    maxSize?: number;
    visibleFrom?: number;
    visibleUntil?: number;
}

export type SplitLayoutSizes = Record<string, number>;

export type SplitLayoutResizeCallback = (id: string, size: number, sizes: SplitLayoutSizes) => void;

export enum SplitLayoutDirection {
    HORIZONTAL = 'HORIZONTAL',
    VERTICAL = 'VERTICAL',
}
