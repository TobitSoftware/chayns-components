import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';
import type { CSSProperties } from 'react';

type StyledTooltipItemProps = WithTheme<{ width?: CSSProperties['width'] }>;

export const StyledTooltipItem = styled.div<StyledTooltipItemProps>`
    padding: 5px;

    ${({ width }) =>
        width &&
        css`
            width: ${width};
        `}
`;

type StyledTooltipItemHeadlineProps = WithTheme<unknown>;

export const StyledTooltipItemHeadline = styled.h5<StyledTooltipItemHeadlineProps>`
    color: ${({ theme }: StyledTooltipItemHeadlineProps) => theme.headline};
    margin: 0;
`;

export const StyledTooltipItemImage = styled.img``;

export const StyledTooltipItemButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

type StyledTooltipItemTextProps = WithTheme<unknown>;

export const StyledTooltipItemText = styled.p<StyledTooltipItemTextProps>`
    color: ${({ theme }: StyledTooltipItemTextProps) => theme.text};
`;
