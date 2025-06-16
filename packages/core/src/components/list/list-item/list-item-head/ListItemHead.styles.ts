import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import type {
    FramerMotionBugFix,
    WithTheme,
} from '../../../color-scheme-provider/ColorSchemeProvider';

type StyledListItemHeadProps = WithTheme<{
    $isClickable: boolean;
    $isAnyItemExpandable: boolean;
}>;

export const StyledListItemHead = styled(motion.div)<StyledListItemHeadProps>`
    //align-items: center;
    overflow: hidden;
    color: ${({ theme }: StyledListItemHeadProps) => theme.text};
    display: flex;
    min-height: 64px;
    padding: 12px 9px;
    position: relative;

    ${({ $isAnyItemExpandable }) =>
        !$isAnyItemExpandable &&
        css`
            padding-left: 12px;
        `}

    ${({ $isClickable }) =>
        $isClickable &&
        css`
            cursor: pointer;
        `}
`;

export const StyledListItemHeadLeftWrapper = styled.div`
    display: flex;
    align-items: center;
    margin: auto 0;
`;

export const StyledMotionListItemHeadIndicator = styled(motion.div)<FramerMotionBugFix>`
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    height: 26px;
    justify-content: center;
    width: 26px;
`;

type StyledListItemHeadContentProps = {
    $isIconOrImageGiven: boolean;
    $isOpen: boolean;
    $marginTop: number;
};

export const StyledListItemHeadContent = styled.div<StyledListItemHeadContentProps>`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    font-weight: ${({ $isOpen }) => ($isOpen ? 'bold' : 'normal')};
    justify-content: start;
    line-height: normal;
    margin-left: ${({ $isIconOrImageGiven }) => ($isIconOrImageGiven ? '10px' : undefined)};
    margin-top: ${({ $marginTop }) => $marginTop}px;
    min-width: 0;
`;

export const StyledListItemHeadTitle = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

export const StyledListItemHeadTitleContent = styled.div`
    align-items: center;
    display: flex;
    flex: 1 1 auto;
    max-width: 100%;
    min-width: 0;
    position: relative;
`;

export const StyledListItemHeadTitleElement = styled.div`
    align-items: center;
    display: flex;
    flex: 0 0 auto;
    margin-left: 8px;
`;

type StyledListItemHeadTitleTextProps = WithTheme<{
    $isOpen: boolean;
    $width: number;
    $shouldShowMultilineTitle: boolean;
}>;

export const StyledListItemHeadTitleText = styled(motion.span)<StyledListItemHeadTitleTextProps>`
    font-weight: ${({ $isOpen }) => ($isOpen ? 'bold' : 'normal')};
    white-space: ${({ $isOpen }) => ($isOpen ? 'normal' : 'nowrap')};
    min-width: ${({ $isOpen, $width }) => ($isOpen ? `${$width}px` : undefined)};
    overflow: hidden;
    text-overflow: ellipsis;

    ${({ $shouldShowMultilineTitle, $isOpen }) =>
        $shouldShowMultilineTitle &&
        !$isOpen &&
        css`
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
            white-space: normal;
        `}
`;

type StyledListItemHeadTitleTextPseudoProps = WithTheme<{
    $isOpen: boolean;
    $shouldShowMultilineTitle: boolean;
}>;

export const StyledListItemHeadTitleTextPseudo = styled.span<StyledListItemHeadTitleTextPseudoProps>`
    font-weight: ${({ $isOpen }) => ($isOpen ? 'bold' : 'normal')};
    white-space: ${({ $isOpen }) => ($isOpen ? 'normal' : 'nowrap')};
    overflow: hidden;
    text-overflow: ellipsis;

    opacity: 0;
    pointer-events: none;
    user-select: none;
    position: absolute;

    ${({ $shouldShowMultilineTitle, $isOpen }) =>
        $shouldShowMultilineTitle &&
        !$isOpen &&
        css`
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            text-overflow: ellipsis;
            white-space: normal;
        `}
`;

export const StyledListItemHeadSubtitle = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-top: 2px;
`;

type StyledListItemHeadSubtitleTextProps = WithTheme<{ $isOpen: boolean }>;

export const StyledListItemHeadSubtitleText = styled.span<StyledListItemHeadSubtitleTextProps>`
    font-weight: ${({ $isOpen }) => ($isOpen ? 'bold' : 'normal')};
    white-space: ${({ $isOpen }) => ($isOpen ? 'normal' : 'nowrap')};
    overflow: hidden;
    text-overflow: ellipsis;

    flex: 1 1 auto;
    font-size: 85%;
    min-width: 0;
    opacity: 0.75;
`;

type StyledListItemHeadSubtitleTextPseudoProps = WithTheme<{ $isOpen: boolean }>;

export const StyledListItemHeadSubtitleTextPseudo = styled.span<StyledListItemHeadSubtitleTextPseudoProps>`
    font-weight: ${({ $isOpen }) => ($isOpen ? 'bold' : 'normal')};
    white-space: ${({ $isOpen }) => ($isOpen ? 'normal' : 'nowrap')};
    overflow: hidden;
    text-overflow: ellipsis;

    flex: 1 1 auto;
    font-size: 85%;
    min-width: 0;

    opacity: 0;
    pointer-events: none;
    user-select: none;

    position: absolute;
`;

type StyledMotionListItemHeadHoverItemWrapperProps = WithTheme<unknown>;

export const StyledMotionListItemHeadHoverItemWrapper = styled(
    motion.div,
)<StyledMotionListItemHeadHoverItemWrapperProps>`
    overflow: hidden;
    flex-shrink: 0;
    margin: auto 0;
    position: absolute;
    right: 0;

    background: ${({ theme }: StyledMotionListItemHeadHoverItemWrapperProps) =>
        `linear-gradient(to right, transparent 0px, rgb(${theme['000-rgb'] ?? ''}) 40px)`};
`;

export const StyledMotionListItemHeadHoverItem = styled.div`
    padding-left: 40px;
`;
