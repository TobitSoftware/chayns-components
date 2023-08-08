import React, { FC, ReactNode, useMemo, useRef } from 'react';
import Popup from '../popup/Popup';
import type { PopupRef } from '../popup/types';
import type { ITooltipItem } from './interface';
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
    item: ITooltipItem;
    /**
     * whether the tooltip should be shown.
     */
    isDisabled?: boolean;
};

const Tooltip: FC<TooltipProps> = ({ item, children, isDisabled }) => {
    const tooltipRef = useRef<PopupRef>(null);

    return useMemo(
        () => (
            <StyledTooltip>
                {isDisabled ? (
                    children
                ) : (
                    <Popup
                        shouldShowOnHover
                        content={<TooltipItem text={item.text} headline={item.headline} />}
                        ref={tooltipRef}
                    >
                        {children}
                    </Popup>
                )}
            </StyledTooltip>
        ),
        [isDisabled, children, item]
    );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
