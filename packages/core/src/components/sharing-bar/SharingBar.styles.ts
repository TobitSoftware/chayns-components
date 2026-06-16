import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import { keyboardFocusHighlightingRingCss } from '../../utils/keyboardFocusHighlighting.styles';

export const StyledSharingBar = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    width: fit-content;

    &[data-should-show-keyboard-highlighting='true']:focus-visible {
        ${keyboardFocusHighlightingRingCss}
    }
`;

export const StyledSharingBarIconWrapper = styled.div``;

type StyledSharingBarTextProps = WithTheme<unknown>;

export const StyledSharingBarText = styled.p<StyledSharingBarTextProps>`
    color: ${({ theme }: StyledSharingBarTextProps) => theme.text};
    margin: 0 0 0 5px;
`;
