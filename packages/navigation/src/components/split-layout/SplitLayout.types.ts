import { FC, ReactNode } from 'react';

export interface SplitLayoutProps {
    children: ReactNode;
    direction?: SplitLayoutDirection;
    onResize?: SplitLayoutResizeCallback;
    onResizeEnd?: SplitLayoutResizeCallback;
    onResizeStart?: SplitLayoutResizeCallback;
}

export type SplitLayoutResizeCallback = (
    id: string,
    size: number,
    sizes: Record<string, number>,
) => void;

export enum SplitLayoutDirection {
    HORIZONTAL = 'HORIZONTAL',
    VERTICAL = 'VERTICAL',
}

// Internal
export interface SplitLayoutViewProps {
    id: string;
    children: ReactNode;
    defaultSize?: number;
    minSize: number;
    maxSize: number;
}

export type SplitLayoutComponent = FC<SplitLayoutProps> & {
    View: FC<SplitLayoutViewProps>;
};

export interface NormalizedView {
    id: string;
    node: ReactNode;
    defaultSize?: number;
    minSize: number;
    maxSize: number;
}
