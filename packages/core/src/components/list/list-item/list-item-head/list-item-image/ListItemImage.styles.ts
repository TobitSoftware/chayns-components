import styled from 'styled-components';
import type { WithTheme } from '../../../../color-scheme-provider/ColorSchemeProvider';

type StyledListItemHeadImageWrapperProps = WithTheme<{
    shouldShowRoundImage?: boolean;
}>;

export const StyledListItemHeadImageWrapper = styled.div<StyledListItemHeadImageWrapperProps>`
    background-color: rgba(
        ${({ theme }: StyledListItemHeadImageWrapperProps) => theme['text-rgb']},
        0.1
    );
    border-radius: ${({ shouldShowRoundImage }) => (shouldShowRoundImage ? '50%' : undefined)};
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledListItemHeadImageWrapperProps) => theme['009-rgb']}, 0.08) inset;
    flex: 0 0 auto;
    height: 40px;
    overflow: hidden;
    transition: border-radius 0.3s ease;
    width: 40px;
`;

type StyledListItemHeadImageProps = {
    isHidden: boolean;
};

export const StyledListItemHeadImage = styled.img<StyledListItemHeadImageProps>`
    height: 100%;
    object-fit: cover;
    opacity: ${({ isHidden }) => (isHidden ? 0 : 1)};
    transition: opacity 0.4s ease;
    width: 100%;
`;
