import React, { FC, isValidElement, ReactNode, useMemo, useRef, type CSSProperties } from 'react';
import type { PopupRef } from '../../types/popup';
import type { ITooltipItem } from '../../types/tooltip';
import { isTextOnlyElement } from '../../utils/tooltip';
import Popup from '../popup/Popup';
import TooltipItem from './tooltip-item/TooltipItem';
import { StyledTooltip, StyledTooltipChildren } from './Tooltip.styles';

export type TooltipProps = {
    /**
     * The elements that the tooltip should surround.
     */
    children: ReactNode;
    /**
     * The element where the content of the `Tooltip` should be rendered via React Portal.
     */
    container?: Element;
    /**
     * The content that should be displayed.
     */
    item: ITooltipItem | ReactNode;
    /**
     * The width of an item.
     */
    itemWidth?: CSSProperties['width'];
    /**
     * whether the tooltip should be shown.
     */
    isDisabled?: boolean;
    /**
     * Whether the tooltip should be hidden after the children is not hovered.
     */
    shouldHideOnChildrenLeave?: boolean;
    /**
     * Whether the width of the children should be used.
     */
    shouldUseChildrenWidth?: boolean;
    /**
     * Whether the tooltip children should use the full width.
     */
    shouldUseFullWidth?: boolean;
    /**
     * The Y offset of the tooltip to the children.
     */
    yOffset?: number;
};

const Tooltip: FC<TooltipProps> = ({
    item,
    children,
    container,
    isDisabled,
    shouldHideOnChildrenLeave,
    yOffset,
    itemWidth,
    shouldUseFullWidth = false,
    shouldUseChildrenWidth = !shouldUseFullWidth,
}) => {
    const tooltipRef = useRef<PopupRef>(null);

    const content = useMemo(() => {
        if (isValidElement(item)) {
            return item;
        }

        return (
            <TooltipItem
                width={itemWidth}
                text={(item as ITooltipItem).text}
                headline={(item as ITooltipItem).headline}
                imageUrl={(item as ITooltipItem).imageUrl}
                button={(item as ITooltipItem).button}
            />
        );
    }, [item, itemWidth]);

    return useMemo(
        () => (
            <StyledTooltip className="beta-chayns-tooltip">
                {isDisabled ? (
                    <StyledTooltipChildren
                        $isOnlyText={isTextOnlyElement(children)}
                        $shouldUseChildrenWidth={shouldUseChildrenWidth}
                        $shouldUseFullWidth={shouldUseFullWidth}
                    >
                        {children}
                    </StyledTooltipChildren>
                ) : (
                    <Popup
                        shouldShowOnHover
                        shouldHideOnChildrenLeave={shouldHideOnChildrenLeave}
                        content={content}
                        ref={tooltipRef}
                        container={container}
                        yOffset={yOffset}
                        shouldUseChildrenWidth={shouldUseChildrenWidth}
                        shouldUseFullWidth={shouldUseFullWidth}
                    >
                        <StyledTooltipChildren
                            $isOnlyText={isTextOnlyElement(children)}
                            $shouldUseChildrenWidth={shouldUseChildrenWidth}
                            $shouldUseFullWidth={shouldUseFullWidth}
                        >
                            {children}
                        </StyledTooltipChildren>
                    </Popup>
                )}
            </StyledTooltip>
        ),
        [
            isDisabled,
            children,
            shouldUseChildrenWidth,
            shouldUseFullWidth,
            shouldHideOnChildrenLeave,
            content,
            container,
            yOffset,
        ],
    );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
