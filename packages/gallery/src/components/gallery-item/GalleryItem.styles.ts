import type { WithTheme } from '@chayns-components/core';
import styled from 'styled-components';

export const StyledGalleryItem = styled.div`
    display: flex;
    position: relative;
`;

type StyledGalleryItemDeleteButtonProps = WithTheme<unknown>;

export const StyledGalleryItemDeleteButton = styled.button<StyledGalleryItemDeleteButtonProps>`
    background-color: rgba(
        ${({ theme }: StyledGalleryItemDeleteButtonProps) => theme['000-rgb']},
        0.75
    );
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledGalleryItemDeleteButtonProps) => theme['009-rgb']}, 0.08) inset;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledGalleryItemVideoWrapper = styled.div``;

type StyledGalleryItemVideoProps = WithTheme<{
    ratio: number;
}>;

type StyledGalleryItemImageProps = WithTheme<{
    ratio: number;
}>;

export const StyledGalleryItemImage = styled.img<StyledGalleryItemImageProps>`
    background-color: ${({ theme }: StyledGalleryItemImageProps) => theme['101']};
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledGalleryItemImageProps) => theme['009-rgb']}, 0.08) inset;
    z-index: 1;
    width: 100%;
    aspect-ratio: ${(props) => props.ratio};
    object-fit: cover;
`;

export const StyledGalleryItemVideo = styled.video<StyledGalleryItemVideoProps>`
    background-color: ${({ theme }: StyledGalleryItemVideoProps) => theme['101']};
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledGalleryItemVideoProps) => theme['009-rgb']}, 0.08) inset;
    width: 100%;
    aspect-ratio: ${(props) => props.ratio};
    object-fit: cover;
`;

export const StyledGalleryItemPlayIcon = styled.div`
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const StyledGalleryItemMoreItemsIndicator = styled.div`
    position: absolute;
    z-index: 2;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: brightness(40%);

    p {
        font-size: 40px;
        color: white;
    }
`;
