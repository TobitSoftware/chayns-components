import React, { forwardRef } from 'react';
import { BaseSkeleton } from '../../base-skeleton/BaseSkeleton';
import { BaseSkeletonConfig } from '../../types';

interface CircleSkeletonProps extends BaseSkeletonConfig {
    size: number;
}

const CircleSkeleton = forwardRef<HTMLDivElement, Omit<CircleSkeletonProps, 'borderRadius'>>(
    ({ className, baseColor, highlightColor, style, animationType, size }, ref) => (
        <BaseSkeleton
            width={size}
            height={size}
            borderRadius="100%"
            animationType={animationType}
            baseColor={baseColor}
            className={className}
            style={style}
            highlightColor={highlightColor}
            ref={ref}
        />
    ),
);

CircleSkeleton.displayName = 'Skeleton.Box';

export default CircleSkeleton;
