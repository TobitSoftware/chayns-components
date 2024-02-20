import React, { FC, isValidElement, ReactNode, useMemo, useRef, type CSSProperties } from 'react';
import type { PopupRef } from '../../types/popup';
import type { ITooltipItem } from '../../types/tooltip';
import Popup from '../popup/Popup';
import TooltipItem from './tooltip-item/TooltipItem';
import { StyledTooltip } from './Tooltip.styles';

export type TooltipProps = {
    /**
     * The elements that the tooltip should surround.
     */
    children: ReactNode;
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

const Tooltip: FC<TooltipProps> = ({ item, children, isDisabled, itemWidth }) => {
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
                    children
                ) : (
                    <Popup shouldShowOnHover content={content} ref={tooltipRef}>
                        {children}
                    </Popup>
                )}
            </StyledTooltip>
        ),
        [isDisabled, children, content],
    );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
