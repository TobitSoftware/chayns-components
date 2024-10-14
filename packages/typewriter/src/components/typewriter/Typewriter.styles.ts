import type { WithTheme } from '@chayns-components/core';
import styled, { css, keyframes } from 'styled-components';

const typewriterCursorElement = ({
    $isAnimatingText,
    $shouldHideCursor,
}: {
    $isAnimatingText?: boolean;
    $shouldHideCursor?: boolean;
}) =>
    $isAnimatingText &&
    !$shouldHideCursor &&
    css`
      .typewriter-lastWithContent {
        &:after {
          animation: ${blinkAnimation} 1s steps(2, start) infinite;
          color: ${({ theme }: StyledTypewriterTextProps) => theme.text};
          content: '▋';
          margin-left: 0.25rem;
          opacity: 0.85;
          position: relative;
          vertical-align: baseline;
        }
      }
    `;

type StyledTypewriterProps = WithTheme<{
    $isAnimatingText?: boolean;
    $shouldHideCursor?: boolean;
}>;

export const StyledTypewriter = styled.div<StyledTypewriterProps>`
    align-items: inherit;
    display: flex;
    position: relative;
    width: 100%;
    ${typewriterCursorElement}
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
    width: 100%;
`;

type StyledTypewriterTextProps = WithTheme<{
    $isAnimatingText?: boolean;
}>;

export const StyledTypewriterText = styled.span<StyledTypewriterTextProps>`
    color: inherit;
    position: ${({ $isAnimatingText }) => ($isAnimatingText ? 'absolute' : 'relative')};
    width: 100%;

    ${({ $isAnimatingText }) =>
        $isAnimatingText &&
        css`
            pointer-events: none;
        `}
`;
