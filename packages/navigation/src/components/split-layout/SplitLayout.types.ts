import { ReactNode } from 'react';

export interface SplitLayoutProps {
    views: Record<string, SplitLayoutView>;
    direction?: SplitLayoutDirection;
    handleSize?: number;
    fullScreenViewId?: string;
    onChange?: (id: string, size: number) => void;
}

export interface SplitLayoutView {
    component: ReactNode;
    minSize?: number;
    maxSize?: number;
    collapseBreakpoint?: number;
    defaultSize?: number;
}

export enum SplitLayoutDirection {
    HORIZONTAL = 'HORIZONTAL',
    VERTICAL = 'VERTICAL',
}
