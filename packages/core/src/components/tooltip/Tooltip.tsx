import React, { CSSProperties, FC, useMemo, useRef } from 'react';
import ContextMenu from '../context-menu/ContextMenu';
import type { ITooltipItem } from './interface';
import { TooltipAlignment } from './interface';
import { StyledTooltip, StyledTooltipChildren } from './Tooltip.styles';

export type TooltipProps = {
    /**
     * The alignment of the popup.
     */
    alignment?: TooltipAlignment;
    /**
     * The content that should be displayed.
     */
    item: ITooltipItem;
    /**
     * The maximum width of the popup.
     */
    maxWidth?: CSSProperties['width'];
    /**
     * The minimum width of the popup.
     */
    minWidth?: CSSProperties['width'];
};

const Tooltip: FC<TooltipProps> = ({
    maxWidth = '250px',
    minWidth = '100px',
    alignment = TooltipAlignment.TopCenter,
    item,
    children,
}) => {
    const contextMenuRef = useRef<{ hide: VoidFunction; show: VoidFunction }>(null);

    const handleMouseEnter = () => {
        contextMenuRef.current?.show();
    };

    const handleMouseLeave = () => {
        contextMenuRef.current?.hide();
    };

    return useMemo(
        () => (
            <StyledTooltip onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <StyledTooltipChildren>{children}</StyledTooltipChildren>
                <ContextMenu ref={contextMenuRef} items={} />
            </StyledTooltip>
        ),
        [children]
    );
};

Tooltip.displayName = 'Tooltip';

export default Tooltip;
