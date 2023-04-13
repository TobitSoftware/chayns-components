import type { WithTheme } from '@chayns-components/core';
import styled from 'styled-components';

export const StyledGallery = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    padding: 15px;

    & > * {
        flex-basis: calc(25% - 7.5px); /* 25% Breite, abzüglich des Lückenabstands */
    }
`;

export const StyledGalleryItem = styled.div`
    position: relative;
`;

export const StyledGalleryItemPlayIcon = styled.div`
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

type StyledGalleryItemDeleteButtonProps = WithTheme<unknown>;

export const StyledGalleryItemDeleteButton = styled.button<StyledGalleryItemDeleteButtonProps>`
    background-color: rgba(
        ${({ theme }: StyledGalleryItemDeleteButtonProps) => theme['000-rgb']},
        0.75
    );
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledGalleryItemImageProps) => theme['009-rgb']}, 0.08) inset;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    height: 30px;
    width: 30px;
`;

type StyledGalleryItemAddProps = WithTheme<unknown>;

export const StyledGalleryItemAdd = styled.button<StyledGalleryItemAddProps>`
    background-color: ${({ theme }: StyledGalleryItemAddProps) => theme['101']};
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledGalleryItemImageProps) => theme['009-rgb']}, 0.08) inset;
    width: 100%;
    aspect-ratio: 1 / 1;
`;

type StyledGalleryItemImageProps = WithTheme<unknown>;

export const StyledGalleryItemImage = styled.img<StyledGalleryItemImageProps>`
    background-color: ${({ theme }: StyledGalleryItemImageProps) => theme['101']};
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledGalleryItemImageProps) => theme['009-rgb']}, 0.08) inset;
    z-index: 1;
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
`;

type StyledGalleryItemVideoProps = WithTheme<unknown>;

export const StyledGalleryItemVideo = styled.video<StyledGalleryItemVideoProps>`
    background-color: ${({ theme }: StyledGalleryItemVideoProps) => theme['101']};
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledGalleryItemImageProps) => theme['009-rgb']}, 0.08) inset;
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
`;

export const StyledGalleryItemVideoWrapper = styled.div``;
