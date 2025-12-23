import React, { isValidElement, useMemo } from 'react';
import Icon from '../../icon/Icon';
import {
    StyledContextMenuContentHeadline,
    StyledContextMenuContentItem,
    StyledContextMenuContentItemIconWrapper,
    StyledContextMenuContentItemSpacer,
    StyledContextMenuContentItemText,
    StyledContextMenuContentItemWrapper,
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
    onKeySelect: (index: number) => void;
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
            onKeySelect,
            focusedIndex,
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
                items.map(({ onClick, key, text, icons, shouldShowSpacer }, index) => {
                    const isFocused = index === focusedIndex;

                    let iconElement = null;

                    if (isValidElement(icons)) {
                        iconElement = icons;
                    } else if (Array.isArray(icons) && icons.length > 0) {
                        iconElement = (
                            <StyledContextMenuContentItemIconWrapper>
                                <Icon icons={icons} />
                            </StyledContextMenuContentItemIconWrapper>
                        );
                    }

                    return (
                        <StyledContextMenuContentItem
                            key={`context-menu-item-${key}`}
                            data-index={index}
                        >
                            <StyledContextMenuContentItemWrapper
                                key={key}
                                onClick={(event) => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    void onClick(event);
                                }}
                                tabIndex={0}
                                $shouldHidePopupArrow={shouldHidePopupArrow}
                                $isFocused={isFocused}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        onKeySelect(index);
                                    }
                                }}
                            >
                                {iconElement}
                                <StyledContextMenuContentItemText>
                                    {text}
                                </StyledContextMenuContentItemText>
                            </StyledContextMenuContentItemWrapper>

                            {shouldShowSpacer && <StyledContextMenuContentItemSpacer />}
                        </StyledContextMenuContentItem>
                    );
                }),
            [items, focusedIndex, shouldHidePopupArrow, onKeySelect],
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
