import styled from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

export const StyledTooltipItem = styled.div`
    padding: 5px;
`;

type StyledTooltipItemHeadlineProps = WithTheme<unknown>;

export const StyledTooltipItemHeadline = styled.h5<StyledTooltipItemHeadlineProps>`
    color: ${({ theme }: StyledTooltipItemHeadlineProps) => theme.headline};
    margin: 0;
`;

type StyledTooltipItemTextProps = WithTheme<unknown>;

export const StyledTooltipItemText = styled.p<StyledTooltipItemTextProps>`
    color: ${({ theme }: StyledTooltipItemTextProps) => theme.text};
`;
