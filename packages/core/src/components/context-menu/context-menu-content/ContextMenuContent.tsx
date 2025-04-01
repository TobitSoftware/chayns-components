import React, { useMemo } from 'react';
import { ContextMenuAlignment } from '../../../types/contextMenu';
import Icon from '../../icon/Icon';
import type { ContextMenuCoordinates, ContextMenuItem } from '../ContextMenu';
import {
    StyledContextMenuContentHeadline,
    StyledContextMenuContentItem,
    StyledContextMenuContentItemBorder,
    StyledContextMenuContentItemIconWrapper,
    StyledContextMenuContentItemText,
    StyledMotionContextMenuContent,
} from './ContextMenuContent.styles';

type ContextMenuContentProps = {
    alignment: ContextMenuAlignment;
    coordinates: ContextMenuCoordinates;
    items: ContextMenuItem[];
    shouldHidePopupArrow: boolean;
    headline?: string;
    zIndex: number;
};

const ContextMenuContent = React.forwardRef<HTMLDivElement, ContextMenuContentProps>(
    ({ alignment, coordinates, items, zIndex, shouldHidePopupArrow, headline }, ref) => {
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
                items.map(({ onClick, key, text, icons }, index) => {
                    const item = (
                        <StyledContextMenuContentItem
                            key={key}
                            onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();

                                void onClick(event);
                            }}
                            $shouldHidePopupArrow={shouldHidePopupArrow}
                        >
                            <StyledContextMenuContentItemIconWrapper>
                                <Icon icons={icons} />
                            </StyledContextMenuContentItemIconWrapper>
                            <StyledContextMenuContentItemText>
                                {text}
                            </StyledContextMenuContentItemText>
                        </StyledContextMenuContentItem>
                    );

                    if (shouldHidePopupArrow && index + 1 === items.length) {
                        return (
                            <>
                                <StyledContextMenuContentItemBorder />
                                {item}
                            </>
                        );
                    }

                    return item;
                }),
            [items, shouldHidePopupArrow],
        );

        return (
            <StyledMotionContextMenuContent
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
