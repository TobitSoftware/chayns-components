import type { WithTheme } from '@chayns-components/core';
import styled, { css } from 'styled-components';

type StyledAnimatedTypewriterTextProps = WithTheme<{
    $isAnimatingText?: boolean;
    $shouldRemainSingleLine: boolean;
}>;

export const StyledAnimatedTypewriterText = styled.span<StyledAnimatedTypewriterTextProps>`
    color: inherit;
    position: ${({ $isAnimatingText }) => ($isAnimatingText ? 'absolute' : 'relative')};
    width: fit-content;

    ${({ $isAnimatingText }) =>
        $isAnimatingText &&
        css`
            pointer-events: none;
        `}

    ${({ $shouldRemainSingleLine }) =>
        $shouldRemainSingleLine &&
        css`
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
        `}
`;
