import React, { forwardRef } from 'react';
import { BaseSkeletonConfig } from '../../types';
import { StyledAccordionSkeleton } from './AccordionSkeleton.styles';
import BoxSkeleton from '../box-skeleton/BoxSkeleton';
import SkeletonProvider from '../../skeleton-provider/SkeletonProvider';

const AccordionSkeleton = forwardRef<HTMLDivElement, BaseSkeletonConfig>(
    ({ className, baseColor, highlightColor, style, animationType, borderRadius }, ref) => (
        <StyledAccordionSkeleton className={className} style={style} ref={ref}>
            <SkeletonProvider
                highlightColor={highlightColor}
                baseColor={baseColor}
                animationType={animationType}
                borderRadius={borderRadius}
            >
                <BoxSkeleton height={16} width={16} />
                <BoxSkeleton height={22} width="60%" />
            </SkeletonProvider>
        </StyledAccordionSkeleton>
    ),
);

AccordionSkeleton.displayName = 'Skeleton.Accordion';

export default AccordionSkeleton;
