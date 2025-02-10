import type { FramerMotionBugFix, WithTheme } from '@chayns-components/core';
import { motion } from 'motion/react';
import styled from 'styled-components';

export const StyledMotionPreviewItem = styled(motion.div)<FramerMotionBugFix>`
    display: flex;
    width: 100%;
    height: 100%;
`;

export const StyledPreviewItemImageWrapper = styled.div<{ $ratio: number }>`
    display: flex;
    width: 100%;
    height: 100%;
    aspect-ratio: ${({ $ratio }) => $ratio};
`;

type StyledPreviewItemImageProps = WithTheme<unknown>;

export const StyledPreviewItemImage = styled.img<StyledPreviewItemImageProps>`
    background-color: ${({ theme }: StyledPreviewItemImageProps) => theme['101']};
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledPreviewItemImageProps) => theme['009-rgb']}, 0.08) inset;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const StyledPreviewItemLoadingIcon = styled.div`
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
