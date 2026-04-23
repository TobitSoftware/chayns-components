import React, { forwardRef } from 'react';
import { BaseSkeletonConfig } from '../../types';
import { StyledListItemSkeleton, StyledListItemSkeletonBars } from './ListItemSkeleton.styles';
import CircleSkeleton from '../circle-skeleton/CircleSkeleton';
import BoxSkeleton from '../box-skeleton/BoxSkeleton';
import SkeletonProvider from '../../skeleton-provider/SkeletonProvider';

const ListItemSkeleton = forwardRef<HTMLDivElement, BaseSkeletonConfig>(
    ({ className, baseColor, highlightColor, style, animationType, borderRadius }, ref) => (
        <StyledListItemSkeleton className={className} style={style} ref={ref}>
            <SkeletonProvider
                highlightColor={highlightColor}
                baseColor={baseColor}
                animationType={animationType}
                borderRadius={borderRadius}
            >
                <CircleSkeleton size={40} />
                <StyledListItemSkeletonBars>
                    <BoxSkeleton height={16} width="90%" />
                    <BoxSkeleton height={16} width="60%" />
                </StyledListItemSkeletonBars>
            </SkeletonProvider>
        </StyledListItemSkeleton>
    ),
);

ListItemSkeleton.displayName = 'Skeleton.ListItem';

export default ListItemSkeleton;
