import styled, { css } from 'styled-components';
import { CSSProperties } from 'react';
import { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledGroupedImageProps = WithTheme<{
    $height: CSSProperties['height'];
}>;

export const StyledGroupedImage = styled.div<StyledGroupedImageProps>`
    flex: 0 0 auto;
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

export const StyledGroupImageElement = styled.img<StyledImageProps>`
    aspect-ratio: 1;
    border-radius: ${({ $shouldShowRoundImage }) => ($shouldShowRoundImage ? '50%' : '0')};
    height: ${({ $imageSize }) => $imageSize};
    object-fit: cover;
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

type StyledCornerImageProps = WithTheme<{
    $background?: CSSProperties['background'];
    $shouldPreventBackground?: boolean;
}>;

export const StyledCornerImage = styled.img<StyledCornerImageProps>`
    aspect-ratio: 1;
    bottom: 0;
    height: 50%;
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
