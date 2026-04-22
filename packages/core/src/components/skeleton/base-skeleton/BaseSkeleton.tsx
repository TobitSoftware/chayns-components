import React, { forwardRef, ReactHTML, ReactNode } from 'react';
import {
    StyledBaseSkeleton,
    StyledMotionBaseSkeletonPulse,
    StyledMotionBaseSkeletonShimmer,
} from './BaseSkeleton.styles';
import {
    PULSE_ANIMATION,
    PULSE_TRANSITION,
    SHIMMER_ANIMATION,
    SHIMMER_TRANSITION,
} from './BaseSkeleton.constants';
import { BaseSkeletonConfig, SkeletonAnimationType } from '../types';
import { useSkeletonContext } from '../skeleton-provider/SkeletonProvider';

export interface BaseSkeletonProps extends BaseSkeletonConfig {
    width: number | string;
    height: number | string;
    as?: keyof ReactHTML;
    children?: ReactNode;
}

export const BaseSkeleton = forwardRef<HTMLDivElement, BaseSkeletonProps>(
    (
        {
            baseColor,
            highlightColor,
            animationType,
            height,
            style,
            width,
            className,
            borderRadius,
            as,
            children,
        },
        ref,
    ) => {
        const values = useSkeletonContext();

        const resolvedAnimationType = animationType ?? values.animationType;

        return (
            <StyledBaseSkeleton
                as={as}
                ref={ref}
                className={className}
                style={style}
                $backgroundColor={baseColor ?? values.baseColor}
                $borderRadius={borderRadius ?? values.borderRadius}
                $height={height}
                $width={width}
                $shouldUseNativeTag={!!as}
            >
                {resolvedAnimationType === SkeletonAnimationType.SHIMMER && (
                    <StyledMotionBaseSkeletonShimmer
                        $color={highlightColor ?? values.highlightColor}
                        animate={SHIMMER_ANIMATION}
                        transition={SHIMMER_TRANSITION}
                    />
                )}
                {resolvedAnimationType === SkeletonAnimationType.PULSE && (
                    <StyledMotionBaseSkeletonPulse
                        $color={highlightColor ?? values.highlightColor}
                        animate={PULSE_ANIMATION}
                        transition={PULSE_TRANSITION}
                    />
                )}
                {children}
            </StyledBaseSkeleton>
        );
    },
);

BaseSkeleton.displayName = 'BaseSkeleton';

export default BaseSkeleton;
