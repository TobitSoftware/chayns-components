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
};

const Tooltip: FC<TooltipProps> = ({ item, children, container, isDisabled, itemWidth }) => {
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
            <StyledTooltip>
                {isDisabled ? (
                    <StyledTooltipChildren $isOnlyText={isTextOnlyElement(children)}>
                        {children}
                    </StyledTooltipChildren>
                ) : (
                    <Popup
                        shouldShowOnHover
                        content={content}
                        ref={tooltipRef}
                        container={container}
                    >
                        <StyledTooltipChildren $isOnlyText={isTextOnlyElement(children)}>
                            {children}
                        </StyledTooltipChildren>
                    </Popup>
                )}
            </StyledTooltip>
        ),
        [isDisabled, children, content, container],
    );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
