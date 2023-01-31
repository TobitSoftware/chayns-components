import styled, { css, keyframes } from 'styled-components';

export const StyledTypewriter = styled.div`
    position: relative;
`;

const blinkAnimation = keyframes`
  100% {
    visibility: hidden;
  }
`;

export const StyledTypewriterPseudoText = styled.div`
    opacity: 0;
    pointer-events: none;
    user-select: none;
`;

type StyledTypewriterTextProps = {
    isAnimatingText: boolean;
};

export const StyledTypewriterText = styled.div<StyledTypewriterTextProps>`
    position: ${({ isAnimatingText }) => (isAnimatingText ? 'absolute' : 'relative')};

    ${({ isAnimatingText }) =>
        isAnimatingText &&
        css`
            &:after {
                animation: ${blinkAnimation} 1s steps(5, start) infinite;
                content: '▋';
                margin-left: 0.25rem;
                opacity: 0.85;
                vertical-align: baseline;
            }
        `}
`;
