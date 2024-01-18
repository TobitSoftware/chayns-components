import React, { FC, useMemo } from 'react';
import {
    StyledTooltipItem,
    StyledTooltipItemButtonWrapper,
    StyledTooltipItemHeadline,
    StyledTooltipItemImage,
    StyledTooltipItemText,
} from './TooltipItem.styles';
import Button from '../../button/Button';

export type TooltipProps = {
    headline?: string;
    text: string;
    imageUrl?: string;
    button?: { text: string; onClick: () => void };
};

const TooltipItem: FC<TooltipProps> = ({ headline, text, button, imageUrl }) =>
    useMemo(
        () => (
            <StyledTooltipItem>
                {headline && <StyledTooltipItemHeadline>{headline}</StyledTooltipItemHeadline>}
                {imageUrl && <StyledTooltipItemImage src={imageUrl} />}
                <StyledTooltipItemText>{text}</StyledTooltipItemText>
                {button && (
                    <StyledTooltipItemButtonWrapper>
                        <Button onClick={button.onClick}>{button.text}</Button>
                    </StyledTooltipItemButtonWrapper>
                )}
            </StyledTooltipItem>
        ),
        [button, headline, imageUrl, text]
    );

TooltipItem.displayName = 'TooltipItem';

export default TooltipItem;
