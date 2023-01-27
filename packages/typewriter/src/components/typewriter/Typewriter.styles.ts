import styled from 'styled-components';

export const StyledTypewriter = styled.div`
    position: relative;
`;

type StyledTypewriterTextProps = {
    shouldUseAbsolutePosition: boolean;
};

export const StyledTypewriterText = styled.div<StyledTypewriterTextProps>`
    position: ${({ shouldUseAbsolutePosition }) =>
        shouldUseAbsolutePosition ? 'absolute' : 'relative'};
`;

export const StyledTypewriterPseudoText = styled.div`
    opacity: 0;
    pointer-events: none;
    user-select: none;
`;
