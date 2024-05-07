import { useSite } from 'chayns-api';
import React, { ReactNode, type MouseEventHandler } from 'react';
import { PopupAlignment, PopupCoordinates } from '../../../types/popup';
import { StyledMotionPopupContentWrapper } from './PopupContentWrapper.styles';

type PopupContentProps = {
    alignment: PopupAlignment;
    children: ReactNode;
    offset: number;
    coordinates: PopupCoordinates;
    onMouseLeave: MouseEventHandler<HTMLSpanElement>;
    onMouseEnter: MouseEventHandler<HTMLSpanElement>;
};

const PopupContentWrapper = React.forwardRef<HTMLDivElement, PopupContentProps>(
    ({ alignment, children, coordinates, offset, onMouseLeave, onMouseEnter }, ref) => {
        const { colorMode } = useSite();

        const isBottomLeftAlignment = alignment === PopupAlignment.BottomLeft;
        const isTopLeftAlignment = alignment === PopupAlignment.TopLeft;
        const isTopRightAlignment = alignment === PopupAlignment.TopRight;

        const percentageOffsetX = isBottomLeftAlignment || isTopLeftAlignment ? -100 : 0;
        const percentageOffsetY = isTopRightAlignment || isTopLeftAlignment ? -100 : 0;

        const anchorOffsetX = isBottomLeftAlignment || isTopLeftAlignment ? 21 : -21;
        const anchorOffsetY = isTopRightAlignment || isTopLeftAlignment ? -21 : 21;

        const exitAndInitialY = isTopLeftAlignment || isTopRightAlignment ? -16 : 16;

        return (
            <StyledMotionPopupContentWrapper
                animate={{ opacity: 1, y: 0 }}
                $colorMode={colorMode}
                $offset={offset}
                exit={{ opacity: 0, y: exitAndInitialY }}
                initial={{ opacity: 0, y: exitAndInitialY }}
                $position={alignment}
                ref={ref}
                data-ispopup="true"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
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
                {children}
            </StyledMotionPopupContentWrapper>
        );
    },
);

PopupContentWrapper.displayName = 'PopupContent';

export default PopupContentWrapper;
