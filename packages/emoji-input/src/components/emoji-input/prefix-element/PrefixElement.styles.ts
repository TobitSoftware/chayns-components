import type { WithTheme } from '@chayns-components/core';
import styled, { keyframes } from 'styled-components';

type StyledPrefixElementProps = WithTheme<{
    shouldShow: boolean;
}>;

export const StyledPrefixElement = styled.div<StyledPrefixElementProps>`
    position: absolute;
`;

export const StyledPrefixElementPseudo = styled.div`
    visibility: hidden;
`;

export const StyledPrefixElementLetterWrapper = styled.div`
    transform: translateY(-2px);
`;

type StyledPrefixElementLetterProps = WithTheme<{
    index: number;
}>;

const waviy = keyframes`
    0%, 40% {
        background: linear-gradient(to right, rgb(15, 109, 126), rgb(15, 109, 126), rgb(115, 190, 204), rgb(15, 109, 126));
        background-clip: text;
        transform: translateY(0) scale(1);
        opacity: 1;
    }
    20% {
        transform: translateY(-2px) scale(1.2);
        opacity: 1;
    }
    100% {
        -webkit-text-fill-color: ${({ theme }: WithTheme<unknown>) => theme.text};
        transform: translateY(0) scale(1);
        opacity: 1;
    }
`;

const backgroundPan = keyframes`
    0% {
        background-position: 0 center;
    }
    100% {
        background-position: -200% center;
    }
`;

export const StyledPrefixElementLetter = styled.span<StyledPrefixElementLetterProps>`
    background-clip: text;
    -webkit-text-fill-color: transparent;
    background-color: ${({ theme }: StyledPrefixElementLetterProps) => theme.text};
    opacity: 0;

    animation:
        ${waviy} 0.4s forwards,
        ${backgroundPan} 0.1s linear infinite;
    animation-delay: calc(0.03s * ${({ index }) => index});

    font-weight: ${({ index }) => (index > 0 ? 'bold' : 'normal')};
`;
