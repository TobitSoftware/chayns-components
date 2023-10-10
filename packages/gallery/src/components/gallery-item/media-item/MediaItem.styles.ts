import type { WithTheme } from '@chayns-components/core';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledMotionMediaItem = styled(motion.div)`
    display: flex;
    width: 100%;
    height: 100%;
`;

export const StyledMediaItemVideoWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
`;

export const StyledMediaItemImageWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
`;

type StyledMediaItemVideoProps = WithTheme<unknown>;

type StyledMediaItemImageProps = WithTheme<unknown>;

export const StyledMediaItemImage = styled.img<StyledMediaItemImageProps>`
    background-color: ${({ theme }: StyledMediaItemImageProps) => theme['101']};
    box-shadow: 0 0 0 1px rgba(${({ theme }: StyledMediaItemImageProps) => theme['009-rgb']}, 0.08)
        inset;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const StyledMediaItemVideo = styled.video<StyledMediaItemVideoProps>`
    background-color: ${({ theme }: StyledMediaItemVideoProps) => theme['101']};
    box-shadow: 0 0 0 1px rgba(${({ theme }: StyledMediaItemVideoProps) => theme['009-rgb']}, 0.08)
        inset;
    width: 100%;
    object-fit: cover;
`;

export const StyledMediaItemPlayIcon = styled.div`
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
