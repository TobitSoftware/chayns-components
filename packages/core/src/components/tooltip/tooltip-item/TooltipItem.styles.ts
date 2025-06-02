import type { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledTooltipItemProps = WithTheme<{ $width?: CSSProperties['width']; $maxWidth?: number }>;

export const StyledTooltipItem = styled.div<StyledTooltipItemProps>`
    padding: 5px;

    width: ${({ $width }) => ($width ? `${$width}px` : '100%')};

    ${({ $maxWidth }) =>
        $maxWidth &&
        css`
            max-width: ${$maxWidth}px;
        `}

    ${({ $width }) =>
        $width &&
        css`
            width: ${$width};
        `}
`;

type StyledTooltipItemHeadlineProps = WithTheme<unknown>;

export const StyledTooltipItemHeadline = styled.h5<StyledTooltipItemHeadlineProps>`
    color: ${({ theme }: StyledTooltipItemHeadlineProps) => theme.headline};
    margin: 0;

    word-break: break-word;
    overflow-wrap: anywhere;
    width: 100%;
`;

export const StyledTooltipItemImage = styled.img``;

export const StyledTooltipItemButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
`;

type StyledTooltipItemTextProps = WithTheme<unknown>;

export const StyledTooltipItemText = styled.p<StyledTooltipItemTextProps>`
    color: ${({ theme }: StyledTooltipItemTextProps) => theme.text};

    word-break: break-word;
    overflow-wrap: anywhere;
    width: 100%;
`;
