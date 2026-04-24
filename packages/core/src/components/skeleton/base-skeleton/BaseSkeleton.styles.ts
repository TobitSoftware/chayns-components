import styled, { css } from 'styled-components';
import { motion } from 'motion/react';
import { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledBaseSkeletonProps = WithTheme<{
    $borderRadius: number | string;
    $backgroundColor: string;
    $width: number | string;
    $height: number | string;
    $shouldUseNativeTag: boolean;
}>;

export const StyledBaseSkeleton = styled.div<StyledBaseSkeletonProps>`
    position: relative;
    overflow: hidden;
    border-radius: ${({ $borderRadius }) =>
        `${$borderRadius}${typeof $borderRadius === 'number' ? 'px' : ''}`};

    background-color: ${({ $backgroundColor }) => $backgroundColor};

    width: ${({ $width }) => `${$width}${typeof $width === 'number' ? 'px' : ''}`};

    user-select: none;

    white-space: nowrap;

    ${({ $shouldUseNativeTag, $height }) =>
        $shouldUseNativeTag
            ? css`
                  color: transparent;
              `
            : css`
                  height: ${$height}${typeof $height === 'number' ? 'px' : ''};
              `}
`;

type StyledMotionBaseSkeletonShimmerProps = WithTheme<{
    $color: string;
}>;

export const StyledMotionBaseSkeletonShimmer = styled(
    motion.div,
)<StyledMotionBaseSkeletonShimmerProps>`
    background: ${({ $color }) =>
        `linear-gradient(
            90deg,
            transparent 0%,
            ${$color} 50%,
            transparent 100%
        )`};

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 100%;

    pointer-events: none;
    border-radius: 0;

    will-change: transform;

    opacity: 0.06;
`;

type StyledMotionBaseSkeletonPulseProps = WithTheme<{
    $color: string;
}>;

export const StyledMotionBaseSkeletonPulse = styled(motion.div)<StyledMotionBaseSkeletonPulseProps>`
    width: 100%;
    height: 100%;

    position: absolute;

    opacity: 0.06;

    background-color: ${({ $color }) => $color};
`;
