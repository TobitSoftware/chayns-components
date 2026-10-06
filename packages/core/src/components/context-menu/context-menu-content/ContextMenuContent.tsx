import React, { useMemo } from 'react';
import ContextMenuContentItem from './context-menu-content-item/ContextMenuContentItem';
import {
    StyledContextMenuContentHeadline,
    StyledMotionContextMenuContent,
} from './ContextMenuContent.styles';
import {
    ContextMenuAlignment,
    type ContextMenuCoordinates,
    type ContextMenuItem,
} from '../ContextMenu.types';

type ContextMenuContentProps = {
    alignment: ContextMenuAlignment;
    coordinates: ContextMenuCoordinates;
    items: ContextMenuItem[];
    shouldHidePopupArrow: boolean;
    headline?: string;
    zIndex: number;
    focusedIndex: number;
    onItemFocus: (index: number) => void;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
    onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
};

const ContextMenuContent = React.forwardRef<HTMLDivElement, ContextMenuContentProps>(
    (
        {
            alignment,
            coordinates,
            items,
            zIndex,
            shouldHidePopupArrow,
            headline,
            onItemFocus,
            focusedIndex,
            onMouseEnter,
            onMouseLeave,
        },
        ref,
    ) => {
        const isBottomLeftAlignment = alignment === ContextMenuAlignment.BottomLeft;
        const isTopLeftAlignment = alignment === ContextMenuAlignment.TopLeft;
        const isTopRightAlignment = alignment === ContextMenuAlignment.TopRight;
        const isTopCenterAlignment = alignment === ContextMenuAlignment.TopCenter;
        const isBottomCenterAlignment = alignment === ContextMenuAlignment.BottomCenter;

        const percentageOffsetX = useMemo(() => {
            if (isBottomLeftAlignment || isTopLeftAlignment) {
                return -100;
            }

            if (isBottomCenterAlignment || isTopCenterAlignment) {
                return -50;
            }

            return 0;
        }, [
            isBottomCenterAlignment,
            isBottomLeftAlignment,
            isTopCenterAlignment,
            isTopLeftAlignment,
        ]);

        const anchorOffsetX = useMemo(() => {
            if (isBottomLeftAlignment || isTopLeftAlignment) {
                return 15;
            }

            if (isBottomCenterAlignment || isTopCenterAlignment) {
                return 0;
            }

            return -15;
        }, [
            isBottomCenterAlignment,
            isBottomLeftAlignment,
            isTopCenterAlignment,
            isTopLeftAlignment,
        ]);

        const percentageOffsetY =
            isTopRightAlignment || isTopLeftAlignment || isTopCenterAlignment ? -100 : 0;

        const anchorOffsetY =
            isTopRightAlignment || isTopLeftAlignment || isTopCenterAlignment ? -21 : 21;

        const exitAndInitialY = isTopLeftAlignment || isTopRightAlignment ? -16 : 16;

        const content = useMemo(
            () =>
                items.map((item, index) => (
                    <ContextMenuContentItem
                        key={item.key}
                        item={item}
                        index={index}
                        isFocused={index === focusedIndex}
                        shouldHidePopupArrow={shouldHidePopupArrow}
                        onItemFocus={onItemFocus}
                    />
                )),
            [items, focusedIndex, shouldHidePopupArrow, onItemFocus],
        );

        return (
            <StyledMotionContextMenuContent
                role="menu"
                aria-label={headline}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: exitAndInitialY }}
                initial={{ opacity: 0, y: exitAndInitialY }}
                $position={alignment}
                $shouldHidePopupArrow={shouldHidePopupArrow}
                $zIndex={zIndex}
                ref={ref}
                style={{ left: coordinates.x, top: coordinates.y }}
                transition={{ ease: 'anticipate' }}
                transformTemplate={({ y = '0px' }) => `
                    translateX(${percentageOffsetX}%)
                    translateY(${percentageOffsetY}%)
                    translateX(${anchorOffsetX}px)
                    translateY(${anchorOffsetY}px)
                    translateY(${y})
                `}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {headline && (
                    <StyledContextMenuContentHeadline>{headline}</StyledContextMenuContentHeadline>
                )}
                {content}
            </StyledMotionContextMenuContent>
        );
    },
);

ContextMenuContent.displayName = 'ContextMenuContent';

export default ContextMenuContent;
