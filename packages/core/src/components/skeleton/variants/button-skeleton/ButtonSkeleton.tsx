import React, { forwardRef } from 'react';
import { BaseSkeleton } from '../../base-skeleton/BaseSkeleton';
import { BaseSkeletonConfig } from '../../types';

interface ButtonSkeletonProps extends BaseSkeletonConfig {
    shouldRoundCorners?: boolean;
}

const ButtonSkeleton = forwardRef<HTMLDivElement, Omit<ButtonSkeletonProps, 'borderRadius'>>(
    (
        { className, baseColor, highlightColor, style, animationType, shouldRoundCorners = false },
        ref,
    ) => (
        <BaseSkeleton
            width={100}
            height={34}
            borderRadius={shouldRoundCorners ? '50%' : 3}
            animationType={animationType}
            baseColor={baseColor}
            className={className}
            style={style}
            highlightColor={highlightColor}
            ref={ref}
        />
    ),
);

ButtonSkeleton.displayName = 'Skeleton.Button';

export default ButtonSkeleton;
