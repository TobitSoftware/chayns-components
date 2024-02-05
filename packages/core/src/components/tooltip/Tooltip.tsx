import React, { type CSSProperties, FC, ReactNode, useMemo, useRef } from 'react';
import type { PopupRef } from '../../types/popup';
import type { ITooltipItem } from '../../types/tooltip';
import TooltipItem from './tooltip-item/TooltipItem';
import { StyledTooltip } from './Tooltip.styles';
import Popup from '../popup/Popup';

export type TooltipProps = {
    /**
     * The elements that the tooltip should surround.
     */
    children: ReactNode;
    /**
     * The content that should be displayed.
     */
    item: ITooltipItem;
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

    return useMemo(
        () => (
            <StyledTooltip>
                {isDisabled ? (
                    children
                ) : (
                    <Popup
                        shouldShowOnHover
                        content={
                            <TooltipItem
                                width={itemWidth}
                                text={item.text}
                                headline={item.headline}
                                imageUrl={item.imageUrl}
                                button={item.button}
                            />
                        }
                        ref={tooltipRef}
                    >
                        {children}
                    </Popup>
                )}
            </StyledTooltip>
        ),
        [isDisabled, children, itemWidth, item.text, item.headline, item.imageUrl, item.button],
    );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
