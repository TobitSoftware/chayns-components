import React, { ReactNode } from 'react';
import { PopupAlignment, PopupCoordinates } from '../types';
import { StyledMotionPopupContent } from './PopupContent.styles';

type PopupContentProps = {
    alignment: PopupAlignment;
    coordinates: PopupCoordinates;
    content: ReactNode;
};

const PopupContent = React.forwardRef<HTMLDivElement, PopupContentProps>(
    ({ alignment, coordinates, content }, ref) => {
        const isBottomLeftAlignment = alignment === PopupAlignment.BottomLeft;
        const isTopLeftAlignment = alignment === PopupAlignment.TopLeft;
        const isTopRightAlignment = alignment === PopupAlignment.TopRight;

        const percentageOffsetX = isBottomLeftAlignment || isTopLeftAlignment ? -100 : 0;
        const percentageOffsetY = isTopRightAlignment || isTopLeftAlignment ? -100 : 0;

        const anchorOffsetX = isBottomLeftAlignment || isTopLeftAlignment ? 21 : -21;
        const anchorOffsetY = isTopRightAlignment || isTopLeftAlignment ? -21 : 21;

        const exitAndInitialY = isTopLeftAlignment || isTopRightAlignment ? -16 : 16;

        return (
            <StyledMotionPopupContent
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: exitAndInitialY }}
                initial={{ opacity: 0, y: exitAndInitialY }}
                position={alignment}
                ref={ref}
                style={{ left: coordinates.x, top: coordinates.y }}
                transition={{ type: 'tween' }}
                transformTemplate={({ y = '0px' }) => `
                    translateX(${percentageOffsetX}%)
                    translateY(${percentageOffsetY}%)
                    translateX(${anchorOffsetX}px)
                    translateY(${anchorOffsetY}px)
                    translateY(${y})
                `}
            >
                {content}
            </StyledMotionPopupContent>
        );
    }
);

PopupContent.displayName = 'PopupContent';

export default PopupContent;
