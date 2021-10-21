import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../../../color-scheme-provider/ColorSchemeProvider';

type StyledListItemHeadProps = WithTheme<{
    isClickable: boolean;
}>;

export const StyledListItemHead = styled.div<StyledListItemHeadProps>`
    align-items: center;
    color: ${({ theme }: StyledListItemHeadProps) => theme.text};
    display: flex;
    height: 64px;
    padding: 12px 9px;

    ${({ isClickable }) =>
        isClickable &&
        css`
            cursor: pointer;
        `}
`;

export const StyledMotionListItemHeadIndicator = styled(motion.div)`
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    height: 26px;
    justify-content: center;
    width: 26px;
`;

type StyledListItemHeadIconProps = WithTheme<unknown>;

export const StyledListItemHeadIcon = styled.div`
    align-items: center;
    background-color: rgba(${({ theme }: StyledListItemHeadIconProps) => theme['text-rgb']}, 0.1);
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledListItemHeadIconProps) => theme['009-rgb']}, 0.08) inset;
    display: flex;
    flex: 0 0 auto;
    height: 40px;
    justify-content: center;
    margin-right: 10px;
    width: 40px;
`;

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

type StyledListItemHeadContentProps = {
    isIconOrImageGiven: boolean;
    isOpen: boolean;
};

export const StyledListItemHeadContent = styled.div<StyledListItemHeadContentProps>`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    font-weight: ${({ isOpen }) => (isOpen ? 'bold' : 'normal')};
    justify-content: center;
    line-height: normal;
    margin-left: ${({ isIconOrImageGiven }) => (isIconOrImageGiven ? '10px' : undefined)};
    min-width: 0;
`;

export const StyledListItemHeadTitle = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

export const StyledListItemHeadTitleText = styled.span`
    flex: 1 1 auto;
    min-width: 0;
`;

export const StyledListItemHeadSubtitle = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 2px;
    opacity: 0.75;
`;

export const StyledListItemHeadSubtitleText = styled.span`
    flex: 1 1 auto;
    font-size: 85%;
    min-width: 0;
`;

export const StyledListItemHeadTopRightElement = styled.div`
    flex: 0 0 auto;
    font-size: 85%;
    margin-left: 8px;
    opacity: 0.75;
`;

export const StyledListItemHeadBottomRightElement = styled.div`
    flex: 0 0 auto;
    margin-left: 8px;
    font-size: 85%;
`;

export const StyledListItemHeadRightElement = styled.div`
    flex: 0 0 auto;
    margin-left: 8px;
`;

export const StyledMotionListItemHeadHoverItem = styled(motion.div)`
    overflow: hidden;
`;
