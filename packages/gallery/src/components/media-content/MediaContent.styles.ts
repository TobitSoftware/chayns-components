import type { WithTheme } from '@chayns-components/core';
import styled from 'styled-components';
import {
    MEDIA_CONTENT_IMAGE_FADE_DURATION_MS,
    MEDIA_CONTENT_PREVIEW_BLUR,
    MEDIA_CONTENT_PREVIEW_BLUR_REMOVE_DELAY_MS,
    MEDIA_CONTENT_PREVIEW_BLUR_REMOVE_DURATION_MS,
} from './MediaContent.constants';

export const StyledMediaContentVideoWrapper = styled.div<{ $ratio: number }>`
    display: flex;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    aspect-ratio: ${({ $ratio }) => $ratio};
`;

export const StyledMediaContentImageWrapper = styled.div<{ $ratio: number }>`
    display: flex;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    aspect-ratio: ${({ $ratio }) => $ratio};
`;

type StyledMediaContentVideoProps = WithTheme<unknown>;

type StyledMediaContentImageProps = WithTheme<unknown>;

const StyledMediaContentLayer = styled.img<StyledMediaContentImageProps>`
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
`;

export const StyledMediaContentPreviewImage = styled(StyledMediaContentLayer)`
    background-color: ${({ theme }: StyledMediaContentImageProps) => theme['101']};
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledMediaContentImageProps) => theme['009-rgb']}, 0.08) inset;
    z-index: 2;
    filter: ${MEDIA_CONTENT_PREVIEW_BLUR};
    transition:
        opacity ${MEDIA_CONTENT_IMAGE_FADE_DURATION_MS}ms ease,
        filter ${MEDIA_CONTENT_PREVIEW_BLUR_REMOVE_DURATION_MS}ms ease
            ${MEDIA_CONTENT_PREVIEW_BLUR_REMOVE_DELAY_MS}ms;
`;

export const StyledMediaContentImage = styled(StyledMediaContentLayer)`
    background-color: ${({ theme }: StyledMediaContentImageProps) => theme['101']};
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledMediaContentImageProps) => theme['009-rgb']}, 0.08) inset;
    z-index: 1;
    transition: opacity ${MEDIA_CONTENT_IMAGE_FADE_DURATION_MS}ms ease;
`;

export const StyledMediaContentVideo = styled.video<StyledMediaContentVideoProps>`
    background-color: ${({ theme }: StyledMediaContentVideoProps) => theme['101']};
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledMediaContentVideoProps) => theme['009-rgb']}, 0.08) inset;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    z-index: 1;
`;

export const StyledMediaContentPlayIcon = styled.div`
    position: absolute;
    z-index: 3;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
