import React, { isValidElement, useId, useState } from 'react';
import Icon from '../../../icon/Icon';
import Tooltip from '../../../tooltip/Tooltip';
import type { ContextMenuItem } from '../../ContextMenu.types';
import {
    StyledContextMenuContentItem,
    StyledContextMenuContentItemIconWrapper,
    StyledContextMenuContentItemSpacer,
    StyledContextMenuContentItemText,
    StyledContextMenuContentItemWrapper,
} from '../ContextMenuContent.styles';

type ContextMenuContentItemProps = {
    item: ContextMenuItem;
    index: number;
    isFocused: boolean;
    shouldHidePopupArrow: boolean;
    onItemFocus: (index: number) => void;
};

const ContextMenuContentItem = ({
    item,
    index,
    isFocused,
    shouldHidePopupArrow,
    onItemFocus,
}: ContextMenuContentItemProps) => {
    const disabledReasonId = useId();

    const [tooltipContainer, setTooltipContainer] = useState<HTMLDivElement | null>(null);

    const { icons, text, onClick, isDisabled = false, disabledReason, shouldShowSpacer } = item;

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

    const content = (
        <StyledContextMenuContentItemWrapper
            onClick={(event) => {
                if (isDisabled) {
                    return;
                }

                event.preventDefault();
                event.stopPropagation();
                void onClick(event);
            }}
            tabIndex={0}
            role="menuitem"
            aria-disabled={isDisabled}
            aria-describedby={isDisabled && disabledReason ? disabledReasonId : undefined}
            $shouldHidePopupArrow={shouldHidePopupArrow}
            $isFocused={isFocused}
            $isDisabled={isDisabled}
            onFocus={() => onItemFocus(index)}
        >
            {iconElement}
            <StyledContextMenuContentItemText>{text}</StyledContextMenuContentItemText>
        </StyledContextMenuContentItemWrapper>
    );

    return (
        <StyledContextMenuContentItem
            ref={setTooltipContainer}
            className="context-menu-content-item"
            data-index={index}
            aria-disabled={isDisabled}
            onClick={isDisabled ? (event) => event.stopPropagation() : undefined}
        >
            {isDisabled && disabledReason ? (
                <Tooltip
                    item={{ text: disabledReason }}
                    container={tooltipContainer ?? undefined}
                    shouldUseFullWidth
                >
                    {content}
                </Tooltip>
            ) : (
                content
            )}
            {isDisabled && disabledReason && (
                <span id={disabledReasonId} hidden>
                    {disabledReason}
                </span>
            )}
            {shouldShowSpacer && <StyledContextMenuContentItemSpacer />}
        </StyledContextMenuContentItem>
    );
};

export default ContextMenuContentItem;
