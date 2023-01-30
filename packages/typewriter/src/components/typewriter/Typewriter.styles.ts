import styled from 'styled-components';

export const StyledTypewriter = styled.div`
    position: relative;
`;

export const StyledTypewriterCursor = styled.span`
    height: 1em;
    width: 1em;
`;

export const StyledTypewriterPseudoText = styled.div`
    opacity: 0;
    pointer-events: none;
    user-select: none;
`;

type StyledTypewriterTextProps = {
    shouldUseAbsolutePosition: boolean;
};

export const StyledTypewriterText = styled.div<StyledTypewriterTextProps>`
    position: ${({ shouldUseAbsolutePosition }) =>
        shouldUseAbsolutePosition ? 'absolute' : 'relative'};
`;
