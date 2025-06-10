import styled, { css } from 'styled-components';
import { CSSProperties } from 'react';
import { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledGroupedImageProps = WithTheme<{
    $height: CSSProperties['height'];
}>;

export const StyledGroupedImage = styled.div<StyledGroupedImageProps>`
    height: ${({ $height }) => $height};
    position: relative;
    width: ${({ $height }) => $height};
`;

export enum ImageSize {
    Full = '100%',
    Small = '75%',
    Grouped = '80%',
    GroupedSmall = '65%',
}

type StyledImageProps = WithTheme<{
    $background?: CSSProperties['background'];
    $imageSize: ImageSize;
    $isSecondImage?: boolean;
    $shouldPreventBackground?: boolean;
    $shouldShowRoundImage?: boolean;
}>;

export const StyledImage = styled.img<StyledImageProps>`
    aspect-ratio: 1;
    border-radius: ${({ $shouldShowRoundImage }) => ($shouldShowRoundImage ? '50%' : '0')};
    height: ${({ $imageSize }) => $imageSize};
    position: absolute;

    ${({ $imageSize, $isSecondImage }) =>
        $isSecondImage
            ? css`
                  bottom: ${$imageSize === ImageSize.GroupedSmall ? '15%' : 0};
                  right: ${$imageSize === ImageSize.GroupedSmall ? '15%' : 0};
              `
            : css`
                  top: 0;
                  left: 0;
              `}

    ${({ $background, $shouldPreventBackground, theme }) =>
        !$shouldPreventBackground &&
        css`
            background: ${$background || `rgba(${theme['text-rgb'] ?? '0,0,0'}, 0.1)`};
            box-shadow: 0 0 0 1px rgba(${theme['009-rgb']}, 0.08) inset;
        `}
`;

type StyledCornerImageProps = WithTheme<unknown>;

export const StyledCornerImage = styled.img<StyledCornerImageProps>`
    aspect-ratio: 1;
    background: ${({ theme }: StyledCornerImageProps) =>
        `rgba(${theme['text-rgb'] ?? '0,0,0'}, 0.1)`};
    box-shadow: ${({ theme }: StyledCornerImageProps) =>
        `0 0 0 1px rgba(${theme['009-rgb'] ?? '0,0,0'}, 0.08) inset`};
    bottom: 0;
    height: 50%;
    position: absolute;
    right: 0;
`;
