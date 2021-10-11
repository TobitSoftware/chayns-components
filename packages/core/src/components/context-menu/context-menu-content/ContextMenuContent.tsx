import React from 'react';
import Icon from '../../icon/Icon';
import { ContextMenuAlignment } from '../constants/alignment';
import type { ContextMenuCoordinates, ContextMenuItem } from '../ContextMenu';
import {
    StyledContextMenuContentItem,
    StyledContextMenuContentItemIconWrapper,
    StyledContextMenuContentItemText,
    StyledMotionContextMenuContent,
} from './ContextMenuContent.styles';

type ContextMenuContentProps = {
    alignment: ContextMenuAlignment;
    coordinates: ContextMenuCoordinates;
    items: ContextMenuItem[];
};

const ContextMenuContent = React.forwardRef<HTMLDivElement, ContextMenuContentProps>(
    ({ alignment, coordinates, items }, ref) => {
        const isBottomLeftAlignment = alignment === ContextMenuAlignment.BottomLeft;
        const isTopLeftAlignment = alignment === ContextMenuAlignment.TopLeft;
        const isTopRightAlignment = alignment === ContextMenuAlignment.TopRight;

        const percentageOffsetX = isBottomLeftAlignment || isTopLeftAlignment ? -100 : 0;
        const percentageOffsetY = isTopRightAlignment || isTopLeftAlignment ? -100 : 0;

        const anchorOffsetX = isBottomLeftAlignment || isTopLeftAlignment ? 21 : -21;
        const anchorOffsetY = isBottomLeftAlignment || isTopLeftAlignment ? -21 : 21;

        const exitAndInitialY = isTopLeftAlignment || isTopRightAlignment ? -16 : 16;

        return (
            <StyledMotionContextMenuContent
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
                {items.map(({ icons, key, onClick, text }) => (
                    <StyledContextMenuContentItem key={key} onClick={onClick}>
                        <StyledContextMenuContentItemIconWrapper>
                            <Icon icons={icons} />
                        </StyledContextMenuContentItemIconWrapper>
                        <StyledContextMenuContentItemText>{text}</StyledContextMenuContentItemText>
                    </StyledContextMenuContentItem>
                ))}
            </StyledMotionContextMenuContent>
        );
    }
);

ContextMenuContent.displayName = 'ContextMenuContent';

export default ContextMenuContent;
