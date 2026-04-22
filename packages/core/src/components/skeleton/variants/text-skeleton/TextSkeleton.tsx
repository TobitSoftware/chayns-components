import React, { forwardRef, useMemo } from 'react';
import { BaseSkeleton } from '../../base-skeleton/BaseSkeleton';
import { BaseSkeletonConfig } from '../../types';
import { StyledTextSkeleton } from './TextSkeleton.styles';

interface TextSkeletonProps extends BaseSkeletonConfig {
    width?: number | string;
    lines?: number;
    randomWithBounds?: [number, number];
}

const TextSkeleton = forwardRef<HTMLDivElement, TextSkeletonProps>(
    (
        {
            className,
            baseColor,
            highlightColor,
            style,
            borderRadius,
            animationType,
            width = '100%',
            lines = 1,
            randomWithBounds,
        },
        ref,
    ) => {
        const renderedLines = useMemo(
            () =>
                Array.from({ length: lines }).map(() => (
                    <BaseSkeleton
                        key={Math.random()}
                        as="p"
                        ref={ref}
                        width={
                            randomWithBounds
                                ? `${Math.floor(Math.random() * (randomWithBounds[1] - randomWithBounds[0] + 1)) + randomWithBounds[0]}%`
                                : width
                        }
                        height={0}
                        borderRadius={borderRadius}
                        animationType={animationType}
                        baseColor={baseColor}
                        className={className}
                        style={style}
                        highlightColor={highlightColor}
                    >
                        Pseudo Text
                    </BaseSkeleton>
                )),
            [
                animationType,
                baseColor,
                borderRadius,
                className,
                highlightColor,
                lines,
                randomWithBounds,
                ref,
                style,
                width,
            ],
        );

        return <StyledTextSkeleton>{renderedLines}</StyledTextSkeleton>;
    },
);

TextSkeleton.displayName = 'Skeleton.Text';

export default TextSkeleton;
