import React, { forwardRef } from 'react';
import { BaseSkeleton } from '../../base-skeleton/BaseSkeleton';
import { BaseSkeletonConfig } from '../../types';

interface BadgeSkeletonProps extends BaseSkeletonConfig {
    width: number | string;
}

const BadgeSkeleton = forwardRef<HTMLDivElement, Omit<BadgeSkeletonProps, 'borderRadius'>>(
    ({ className, baseColor, highlightColor, style, animationType, width = 24 }, ref) => (
        <BaseSkeleton
            width={width}
            height={24}
            borderRadius="50%"
            animationType={animationType}
            baseColor={baseColor}
            className={className}
            style={style}
            highlightColor={highlightColor}
            ref={ref}
        />
    ),
);

BadgeSkeleton.displayName = 'Skeleton.Badge';

export default BadgeSkeleton;
