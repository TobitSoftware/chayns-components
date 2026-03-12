import { useSite } from 'chayns-api';
import React, { type MouseEventHandler, ReactNode } from 'react';
import { PopupAlignment, PopupCoordinates } from '../../../types/popup';
import {
    StyledMotionPopupContentWrapper,
    StyledPopupContentWrapperContent,
} from './PopupContentWrapper.styles';

type PopupContentProps = {
    alignment: PopupAlignment;
    children: ReactNode;
    offset: number;
    coordinates: PopupCoordinates;
    onMouseLeave: MouseEventHandler<HTMLSpanElement>;
    onMouseEnter: MouseEventHandler<HTMLSpanElement>;
    shouldScrollWithContent: boolean;
    width: number;
    maxHeight?: number;
};

const PopupContentWrapper = React.forwardRef<HTMLDivElement, PopupContentProps>(
    (
        {
            alignment,
            children,
            coordinates,
            offset,
            width,
            onMouseLeave,
            shouldScrollWithContent,
            onMouseEnter,
            maxHeight,
        },
        ref,
    ) => {
        const { colorMode } = useSite();

        const isBottomLeftAlignment = alignment === PopupAlignment.BottomLeft;
        const isBottomCenterAlignment = alignment === PopupAlignment.BottomCenter;
        const isTopLeftAlignment = alignment === PopupAlignment.TopLeft;
        const isTopCenterAlignment = alignment === PopupAlignment.TopCenter;
        const isTopRightAlignment = alignment === PopupAlignment.TopRight;
        const isCenterAlignment = isBottomCenterAlignment || isTopCenterAlignment;
        const isTopAlignment = isTopLeftAlignment || isTopCenterAlignment || isTopRightAlignment;

        let percentageOffsetX = 0;

        if (isCenterAlignment) {
            percentageOffsetX = -50;
        } else if (isBottomLeftAlignment || isTopLeftAlignment) {
            percentageOffsetX = -100;
        }

        const percentageOffsetY = isTopAlignment ? -100 : 0;

        let anchorOffsetX = -13;

        if (isCenterAlignment) {
            anchorOffsetX = 0;
        } else if (isBottomLeftAlignment || isTopLeftAlignment) {
            anchorOffsetX = 13;
        }

        const anchorOffsetY = isTopAlignment ? -21 : 21;

        const exitAndInitialY = isTopAlignment ? -16 : 16;

        return (
            <StyledMotionPopupContentWrapper
                animate={{ opacity: 1, y: 0 }}
                $colorMode={colorMode}
                $offset={offset}
                exit={{ opacity: 0, y: exitAndInitialY }}
                initial={{ opacity: 0, y: exitAndInitialY }}
                $position={alignment}
                $shouldScrollWithContent={shouldScrollWithContent}
                ref={ref}
                data-ispopup="true"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                style={{ left: coordinates.x, top: coordinates.y, width }}
                transition={{ type: 'tween', duration: 0.15 }}
                transformTemplate={({ y = '0px' }) => `
                    translateX(${percentageOffsetX}%)
                    translateY(${percentageOffsetY}%)
                    translateX(${anchorOffsetX}px)
                    translateY(${anchorOffsetY}px)
                    translateY(${y})
                `}
            >
                <StyledPopupContentWrapperContent
                    className="chayns-scrollbar"
                    $maxHeight={maxHeight}
                >
                    {children}
                </StyledPopupContentWrapperContent>
            </StyledMotionPopupContentWrapper>
        );
    },
);

PopupContentWrapper.displayName = 'PopupContent';

export default PopupContentWrapper;
