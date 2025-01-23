import { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../../../../color-scheme-provider/ColorSchemeProvider';

type StyledListItemHeadImageWrapperProps = WithTheme<{
    $background?: CSSProperties['background'];
    $shouldHideBackground?: boolean;
    $shouldShowRoundImage?: boolean;
}>;

export const StyledListItemHeadImageWrapper = styled.div<StyledListItemHeadImageWrapperProps>`
    flex: 0 0 auto;
    height: 40px;
    overflow: hidden;
    transition:
        background-color 0.3s ease,
        border-radius 0.3s ease,
        box-shadow 0.3s ease;
    width: 40px;

    border-radius: ${({ $shouldShowRoundImage }) => ($shouldShowRoundImage ? '50%' : undefined)};

    ${({ $shouldHideBackground }) =>
        !$shouldHideBackground &&
        css`
            background: ${({ $background, theme }: StyledListItemHeadImageWrapperProps) =>
                $background || `rgba(${theme['text-rgb'] ?? '0,0,0'}, 0.1)`};
            box-shadow: 0 0 0 1px
                rgba(${({ theme }: StyledListItemHeadImageWrapperProps) => theme['009-rgb']}, 0.08)
                inset;
        `}
`;

type StyledListItemHeadImageProps = WithTheme<{
    $isHidden: boolean;
}>;

export const StyledListItemHeadImage = styled.img<StyledListItemHeadImageProps>`
    height: 100%;
    object-fit: cover;
    opacity: ${({ $isHidden }) => ($isHidden ? 0 : 1)};
    transition: opacity 0.4s ease;
    width: 100%;
`;
