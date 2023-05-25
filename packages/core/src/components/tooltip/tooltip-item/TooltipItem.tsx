import React, { FC, useMemo } from 'react';
import {
    StyledTooltipItem,
    StyledTooltipItemHeadline,
    StyledTooltipItemText,
} from './TooltipItem.styles';

export type TooltipProps = {
    headline?: string;
    text: string;
};

const TooltipItem: FC<TooltipProps> = ({ headline, text }) =>
    useMemo(
        () => (
            <StyledTooltipItem>
                <StyledTooltipItemHeadline>{headline}</StyledTooltipItemHeadline>
                <StyledTooltipItemText>{text}</StyledTooltipItemText>
            </StyledTooltipItem>
        ),
        [headline, text]
    );

TooltipItem.displayName = 'TooltipItem';

export default TooltipItem;
