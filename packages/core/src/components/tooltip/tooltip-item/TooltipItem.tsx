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
};

const TooltipItem: FC<TooltipProps> = ({ headline, text, button, imageUrl, width }) =>
    useMemo(
        () => (
            <StyledTooltipItem $width={width}>
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
        [button, headline, imageUrl, text, width],
    );

TooltipItem.displayName = 'TooltipItem';

export default TooltipItem;
