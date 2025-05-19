import React, { FC, useMemo, type CSSProperties } from 'react';
import Button from '../../button/Button';
import {
    StyledTooltipItem,
    StyledTooltipItemButtonWrapper,
    StyledTooltipItemHeadline,
    StyledTooltipItemImage,
    StyledTooltipItemText,
} from './TooltipItem.styles';

export type TooltipProps = {
    headline?: string;
    text: string;
    imageUrl?: string;
    button?: { text: string; onClick: () => void };
    width?: CSSProperties['width'];
    maxWidth?: number;
};

const TooltipItem: FC<TooltipProps> = ({ headline, text, button, imageUrl, width, maxWidth }) =>
    useMemo(
        () => (
            <StyledTooltipItem $width={width} $maxWidth={maxWidth}>
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
        [button, headline, imageUrl, text, width, maxWidth],
    );

TooltipItem.displayName = 'TooltipItem';

export default TooltipItem;
