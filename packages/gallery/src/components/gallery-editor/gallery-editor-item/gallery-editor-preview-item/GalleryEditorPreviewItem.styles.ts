import type { WithTheme } from '@chayns-components/core';
import { motion } from 'motion/react';
import styled from 'styled-components';

export const StyledMotionGalleryEditorPreviewItem = styled(motion.div)`
    display: flex;
    width: 100%;
    height: 100%;
`;

export const StyledGalleryEditorPreviewItemImageWrapper = styled.div<{ $ratio: number }>`
    display: flex;
    width: 100%;
    height: 100%;
    aspect-ratio: ${({ $ratio }) => $ratio};
`;

type StyledGalleryEditorPreviewItemImageProps = WithTheme<unknown>;

export const StyledGalleryEditorPreviewItemImage = styled.img<StyledGalleryEditorPreviewItemImageProps>`
    background-color: ${({ theme }: StyledGalleryEditorPreviewItemImageProps) => theme['101']};
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledGalleryEditorPreviewItemImageProps) => theme['009-rgb']}, 0.08)
        inset;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

export const StyledGalleryEditorPreviewItemLoadingIcon = styled.div`
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
