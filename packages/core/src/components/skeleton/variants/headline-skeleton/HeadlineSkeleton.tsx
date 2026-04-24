import React, { forwardRef } from 'react';
import { BaseSkeleton } from '../../base-skeleton/BaseSkeleton';
import { BaseSkeletonConfig } from '../../types';

type HeadlineType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface BaseHeadlineSkeletonProps extends BaseSkeletonConfig {
    width?: number | string;
    type: HeadlineType;
}

interface HeadlineSkeletonProps extends BaseSkeletonConfig {
    width?: number | string;
}

const BaseHeadlineSkeleton = forwardRef<HTMLDivElement, BaseHeadlineSkeletonProps>(
    (
        {
            className,
            baseColor,
            highlightColor,
            style,
            borderRadius,
            animationType,
            width = '60%',
            type,
        },
        ref,
    ) => (
        <BaseSkeleton
            as={type}
            ref={ref}
            width={width}
            height={0}
            borderRadius={borderRadius}
            animationType={animationType}
            baseColor={baseColor}
            className={className}
            style={style}
            highlightColor={highlightColor}
        >
            Pseudo Headline
        </BaseSkeleton>
    ),
);

BaseHeadlineSkeleton.displayName = 'BaseHeadlineSkeleton';

const createHeadlineSkeleton = (type: HeadlineType, displayName: string) => {
    const Component = forwardRef<HTMLDivElement, HeadlineSkeletonProps>((props, ref) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <BaseHeadlineSkeleton ref={ref} type={type} {...props} />
    ));

    Component.displayName = displayName;

    return Component;
};

export const H1Skeleton = createHeadlineSkeleton('h1', 'Skeleton.H1');
export const H2Skeleton = createHeadlineSkeleton('h2', 'Skeleton.H2');
export const H3Skeleton = createHeadlineSkeleton('h3', 'Skeleton.H3');
export const H4Skeleton = createHeadlineSkeleton('h4', 'Skeleton.H4');
export const H5Skeleton = createHeadlineSkeleton('h5', 'Skeleton.H5');
export const H6Skeleton = createHeadlineSkeleton('h6', 'Skeleton.H6');
