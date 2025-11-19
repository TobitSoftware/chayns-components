import styled, { css } from 'styled-components';
import { CSSProperties } from 'react';
import { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledGroupedImageProps = WithTheme<{
    $height: CSSProperties['height'];
}>;

export const StyledGroupedImage = styled.div<StyledGroupedImageProps>`
    flex: 0 0 auto;
    height: ${({ $height }) => $height}px;
    position: relative;
    width: ${({ $height }) => $height}px;
`;

export enum ImageSize {
    Full = '100%',
    Small = '100%',
    Grouped = '80%',
    GroupedSmall = '80%',
}

type StyledImageProps = WithTheme<{
    $background?: CSSProperties['background'];
    $imageSize: ImageSize;
    $isSecondImage?: boolean;
    $shouldPreventBackground?: boolean;
    $shouldShowRoundImage?: boolean;
    $hasCornerImage: boolean;
    $hasMultipleImages: boolean;
    $uuid: string;
}>;

export const StyledGroupImageElement = styled.div<StyledImageProps>`
    aspect-ratio: 1;
    border-radius: ${({ $shouldShowRoundImage }) => ($shouldShowRoundImage ? '50%' : '0')};
    height: ${({ $imageSize }) => $imageSize};
    position: absolute;
    overflow: hidden;

    ${({ $isSecondImage }) =>
        $isSecondImage
            ? css`
                  bottom: 0;
                  right: 0;
              `
            : css`
                  top: 0;
                  left: 0;
              `}

    ${({ $isSecondImage, $hasMultipleImages, $hasCornerImage, $uuid }) => {
        if (
            ($isSecondImage && $hasCornerImage) ||
            (!$isSecondImage && !$hasMultipleImages && $hasCornerImage)
        ) {
            return css`
                clip-path: url(${`#care-of-mask--${$uuid}`});
            `;
        }

        if (!$isSecondImage && $hasMultipleImages) {
            return css`
                clip-path: url(${`#second-image-mask--${$uuid}`});
            `;
        }

        return '';
    }}

    ${({ $background, $shouldPreventBackground, theme }) =>
        !$shouldPreventBackground &&
        css`
            background: ${$background || `rgba(${theme['text-rgb'] ?? '0,0,0'}, 0.1)`};
            box-shadow: 0 0 0 1px rgba(${theme['009-rgb']}, 0.08) inset;
        `}
`;

type StyledCornerImageProps = WithTheme<{
    $background?: CSSProperties['background'];
    $shouldPreventBackground?: boolean;
}>;

export const StyledCornerImage = styled.img<StyledCornerImageProps>`
    aspect-ratio: 1;
    bottom: 0;
    height: 35%;
    position: absolute;
    right: 0;

    ${({ $background, $shouldPreventBackground, theme }) =>
        !$shouldPreventBackground &&
        css`
            background: ${$background || `rgba(${theme['text-rgb'] ?? '0,0,0'}, 0.1)`};
            box-shadow: 0 0 0 1px rgba(${theme['009-rgb']}, 0.08) inset;
        `}
`;

export const StyledCornerElement = styled.span`
    height: 18px;
    width: 18px;
    position: absolute;
    bottom: 0;
    right: -5px;

    display: flex;
    align-items: center;
    justify-content: center;

    & > * {
        max-height: 100%;
        max-width: 100%;
        display: block;
    }
`;
