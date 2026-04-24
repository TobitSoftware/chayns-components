import React, { forwardRef } from 'react';
import { BaseSkeletonConfig } from '../../types';
import { StyledAccordionSkeleton } from './AccordionSkeleton.styles';
import BoxSkeleton from '../box-skeleton/BoxSkeleton';
import SkeletonProvider, { useSkeletonContext } from '../../skeleton-provider/SkeletonProvider';

const AccordionSkeleton = forwardRef<HTMLDivElement, BaseSkeletonConfig>(
    ({ className, baseColor, highlightColor, style, animationType, borderRadius }, ref) => {
        const context = useSkeletonContext();

        return (
            <StyledAccordionSkeleton className={className} style={style} ref={ref}>
                <SkeletonProvider
                    highlightColor={highlightColor ?? context.highlightColor}
                    baseColor={baseColor ?? context.baseColor}
                    animationType={animationType ?? context.animationType}
                    borderRadius={borderRadius ?? context.borderRadius}
                >
                    <BoxSkeleton height={16} width={16} />
                    <BoxSkeleton height={22} width="60%" />
                </SkeletonProvider>
            </StyledAccordionSkeleton>
        );
    },
);

AccordionSkeleton.displayName = 'Skeleton.Accordion';

export default AccordionSkeleton;
