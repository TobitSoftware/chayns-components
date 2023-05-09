import type { WithTheme } from '@chayns-components/core';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledMotionPreviewItem = styled(motion.div)`
    display: flex;
    width: 100%;
`;

export const StyledPreviewItemImageWrapper = styled.div`
    display: flex;
    width: 100%;
    aspect-ratio: 1;
`;

type StyledPreviewItemImageProps = WithTheme<unknown>;

export const StyledPreviewItemImage = styled.img<StyledPreviewItemImageProps>`
    background-color: ${({ theme }: StyledPreviewItemImageProps) => theme['101']};
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledPreviewItemImageProps) => theme['009-rgb']}, 0.08) inset;
    z-index: 1;
    width: 100%;
    object-fit: cover;
`;

export const StyledPreviewItemLoadingIcon = styled.div`
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
