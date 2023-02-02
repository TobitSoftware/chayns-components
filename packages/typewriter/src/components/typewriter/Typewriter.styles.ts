import type { WithTheme } from '@chayns-components/core';
import styled, { css, keyframes } from 'styled-components';

export const StyledTypewriter = styled.span`
    position: relative;
`;

const blinkAnimation = keyframes`
  100% {
    visibility: hidden;
  }
`;

export const StyledTypewriterPseudoText = styled.span`
    opacity: 0;
    pointer-events: none;
    user-select: none;
`;

type StyledTypewriterTextProps = WithTheme<{
    isAnimatingText: boolean;
}>;

export const StyledTypewriterText = styled.span<StyledTypewriterTextProps>`
    color: ${({ theme }: StyledTypewriterTextProps) => theme.text};
    position: ${({ isAnimatingText }) => (isAnimatingText ? 'absolute' : 'relative')};

    ${({ isAnimatingText }) =>
        isAnimatingText &&
        css`
            &:after {
                animation: ${blinkAnimation} 1s steps(5, start) infinite;
                color: ${({ theme }: StyledTypewriterTextProps) => theme.text};
                content: '▋';
                margin-left: 0.25rem;
                opacity: 0.85;
                vertical-align: baseline;
            }
        `}
`;
