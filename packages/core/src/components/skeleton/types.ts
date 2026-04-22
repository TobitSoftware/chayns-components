import { CSSProperties } from 'react';

export enum SkeletonAnimationType {
    SHIMMER = 'SHIMMER',
    PULSE = 'PULSE',
    NONE = 'NONE',
}

export interface BaseSkeletonConfig {
    animationType?: SkeletonAnimationType;
    borderRadius?: number | string;
    baseColor?: string;
    highlightColor?: string;
    className?: string;
    style?: CSSProperties;
}
