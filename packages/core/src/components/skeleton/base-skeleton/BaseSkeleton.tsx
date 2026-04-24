import React, { forwardRef, ReactHTML, ReactNode } from 'react';
import {
    StyledBaseSkeleton,
    StyledMotionBaseSkeletonPulse,
    StyledMotionBaseSkeletonShimmer,
} from './BaseSkeleton.styles';
import { BaseSkeletonConfig, SkeletonAnimationType } from '../types';
import { useSkeletonAnimation, useSkeletonContext } from '../skeleton-provider/SkeletonProvider';

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
        const animationStyle = useSkeletonAnimation();

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
                        style={animationStyle}
                    />
                )}
                {resolvedAnimationType === SkeletonAnimationType.PULSE && (
                    <StyledMotionBaseSkeletonPulse
                        $color={highlightColor ?? values.highlightColor}
                        style={animationStyle}
                    />
                )}
                {children}
            </StyledBaseSkeleton>
        );
    },
);

BaseSkeleton.displayName = 'BaseSkeleton';

export default BaseSkeleton;
