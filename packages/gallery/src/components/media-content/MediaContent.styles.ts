import type { WithTheme } from '@chayns-components/core';
import styled from 'styled-components';

export const StyledMediaContentVideoWrapper = styled.div<{ $ratio: number }>`
    display: flex;
    width: 100%;
    height: 100%;
    aspect-ratio: ${({ $ratio }) => $ratio};
`;

export const StyledMediaContentImageWrapper = styled.div<{ $ratio: number }>`
    display: flex;
    width: 100%;
    height: 100%;
    aspect-ratio: ${({ $ratio }) => $ratio};
`;

type StyledMediaContentVideoProps = WithTheme<unknown>;

type StyledMediaContentImageProps = WithTheme<unknown>;

export const StyledMediaContentImage = styled.img<StyledMediaContentImageProps>`
    background-color: ${({ theme }: StyledMediaContentImageProps) => theme['101']};
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledMediaContentImageProps) => theme['009-rgb']}, 0.08) inset;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const StyledMediaContentVideo = styled.video<StyledMediaContentVideoProps>`
    background-color: ${({ theme }: StyledMediaContentVideoProps) => theme['101']};
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledMediaContentVideoProps) => theme['009-rgb']}, 0.08) inset;
    width: 100%;
    object-fit: cover;
`;

export const StyledMediaContentPlayIcon = styled.div`
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
