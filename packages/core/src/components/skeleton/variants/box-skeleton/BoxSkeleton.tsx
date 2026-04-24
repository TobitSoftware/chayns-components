import React, { forwardRef } from 'react';
import { BaseSkeleton } from '../../base-skeleton/BaseSkeleton';
import { BaseSkeletonConfig } from '../../types';

interface BoxSkeletonProps extends BaseSkeletonConfig {
    height: number | string;
    width: number | string;
}

const BoxSkeleton = forwardRef<HTMLDivElement, BoxSkeletonProps>(
    (
        { className, baseColor, highlightColor, style, borderRadius, animationType, height, width },
        ref,
    ) => (
        <BaseSkeleton
            width={width}
            height={height}
            borderRadius={borderRadius}
            animationType={animationType}
            baseColor={baseColor}
            className={className}
            style={style}
            highlightColor={highlightColor}
            ref={ref}
        />
    ),
);

BoxSkeleton.displayName = 'Skeleton.Box';

export default BoxSkeleton;
