import type { WithTheme } from '@chayns-components/core';
import styled from 'styled-components';

export const StyledGallery = styled.div``;

export const StyledGalleryView = styled.div``;

export const StyledGalleryViewGrid = styled.div<{ columns: string }>`
    display: grid;
    grid-template-columns: ${(props) => props.columns};
    grid-gap: 5px;
`;

export const StyledGalleryViewItem = styled.div`
    position: relative;
`;

export const StyledGalleryViewMoreItem = styled.div`
    filter: brightness(30%);
`;

export const StyledGalleryViewMoreItemNumber = styled.div`
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    p {
        font-size: 40px;
        color: white;
    }
`;

export const StyledGalleryItemWrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
    padding: 15px;

    & > * {
        flex-basis: calc(25% - 7.5px);
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
        rgba(${({ theme }: StyledGalleryItemDeleteButtonProps) => theme['009-rgb']}, 0.08) inset;
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
    box-shadow: 0 0 0 1px rgba(${({ theme }: StyledGalleryItemAddProps) => theme['009-rgb']}, 0.08)
        inset;
    width: 100%;
    aspect-ratio: 1 / 1;
`;

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

type StyledGalleryItemVideoProps = WithTheme<{
    ratio: number;
}>;

export const StyledGalleryItemVideo = styled.video<StyledGalleryItemVideoProps>`
    background-color: ${({ theme }: StyledGalleryItemVideoProps) => theme['101']};
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledGalleryItemImageProps) => theme['009-rgb']}, 0.08) inset;
    width: 100%;
    aspect-ratio: ${(props) => props.ratio};
    object-fit: cover;
`;

export const StyledGalleryItemVideoWrapper = styled.div``;
