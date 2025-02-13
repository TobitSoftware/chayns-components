import { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../../../../color-scheme-provider/ColorSchemeProvider';

export const StyledListItemHeadImageWrapper = styled.div`
    flex: 0 0 auto;
    height: 40px;
    overflow: hidden;
    position: relative;
    width: 40px;
`;

type StyledListItemHeadImageProps = WithTheme<{
    $isHidden: boolean;
    $shouldShowRoundImage?: boolean;
    $background?: CSSProperties['background'];
    $shouldHideBackground?: boolean;
    $isSmall: boolean;
}>;

export const StyledListItemHeadImage = styled.img<StyledListItemHeadImageProps>`
    height: ${({ $isSmall }) => ($isSmall ? '34px' : '40px')};
    object-fit: cover;
    opacity: ${({ $isHidden }) => ($isHidden ? 0 : 1)};
    aspect-ratio: 1;

    border-radius: ${({ $shouldShowRoundImage }) => ($shouldShowRoundImage ? '50%' : undefined)};

    transition:
        opacity 0.4s ease,
        background-color 0.3s ease,
        border-radius 0.3s ease,
        box-shadow 0.3s ease;

    ${({ $shouldHideBackground, $background, theme }: StyledListItemHeadImageProps) =>
        !$shouldHideBackground &&
        css`
            background: ${$background || `rgba(${theme['text-rgb'] ?? '0,0,0'}, 0.1)`};
            box-shadow: 0 0 0 1px rgba(${theme['009-rgb']}, 0.08) inset;
        `}
`;

export const StyledListImageWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 40px;
    height: 40px;
`;

export type StyledListImageWrapperImageProps = {
    $isSecondImage?: boolean;
    $isSmall: boolean;
    $shouldHideBackground?: boolean;
    $background?: CSSProperties['background'];
};

export const StyledListImageWrapperImage = styled.img<StyledListImageWrapperImageProps>`
    border-radius: 100px;
    height: ${({ $isSmall }) => ($isSmall ? '65%' : '80%')};
    aspect-ratio: 1;
    position: absolute;

    ${({ $isSecondImage, $isSmall }) =>
        $isSecondImage
            ? css`
                  bottom: ${$isSmall ? '6px' : 0};
                  right: ${$isSmall ? '6px' : 0};
              `
            : css`
                  top: 0;
                  left: 0;
              `}

    transition:
    opacity 0.4s ease,
    background-color 0.3s ease,
    border-radius 0.3s ease,
    box-shadow 0.3s ease;

    ${({ $shouldHideBackground, $background, theme }: StyledListImageWrapperImageProps) =>
        !$shouldHideBackground &&
        css`
            background: ${$background || `rgba(${theme['text-rgb'] ?? '0,0,0'}, 0.1)`};
            box-shadow: 0 0 0 1px rgba(${theme['009-rgb']}, 0.08) inset;
        `}
`;

type StyledCareOfImageProps = WithTheme<{
    $shouldHideBackground?: boolean;
    $background?: CSSProperties['background'];
}>;

export const StyledCareOfImage = styled.img<StyledCareOfImageProps>`
    position: absolute;
    bottom: 0;
    right: 0;
    aspect-ratio: 1;
    height: 20px;

    transition:
        opacity 0.4s ease,
        background-color 0.3s ease,
        border-radius 0.3s ease,
        box-shadow 0.3s ease;

    ${({ $shouldHideBackground, $background, theme }: StyledCareOfImageProps) =>
        !$shouldHideBackground &&
        css`
            background: ${$background || `rgba(${theme['text-rgb'] ?? '0,0,0'}, 0.1)`};
            box-shadow: 0 0 0 1px rgba(${theme['009-rgb']}, 0.08) inset;
        `}
`;
