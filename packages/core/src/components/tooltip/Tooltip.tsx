import React, { FC, useMemo, useRef } from 'react';
import type { PopupRef } from '../popup/interface';
import Popup from '../popup/Popup';
import type { ITooltipItem } from './interface';
import TooltipItem from './tooltip-item/TooltipItem';
import { StyledTooltip } from './Tooltip.styles';

export type TooltipProps = {
    /**
     * The content that should be displayed.
     */
    item: ITooltipItem;
};

const Tooltip: FC<TooltipProps> = ({ item, children }) => {
    const tooltipRef = useRef<PopupRef>(null);

    return useMemo(
        () => (
            <StyledTooltip>
                <Popup
                    shouldShowOnHover
                    content={<TooltipItem text={item.text} headline={item.headline} />}
                    ref={tooltipRef}
                >
                    {children}
                </Popup>
            </StyledTooltip>
        ),
        [item, children]
    );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
