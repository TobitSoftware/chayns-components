import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import type {
    FramerMotionBugFix,
    WithTheme,
} from '../../../color-scheme-provider/ColorSchemeProvider';

type StyledListItemHeadProps = WithTheme<{
    $isClickable: boolean;
    $isAnyItemExpandable: boolean;
}>;

export const StyledListItemHead = styled.div<StyledListItemHeadProps>`
    align-items: center;
    color: ${({ theme }: StyledListItemHeadProps) => theme.text};
    display: flex;
    min-height: 64px;
    padding: 12px 9px;

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
};

export const StyledListItemHeadContent = styled.div<StyledListItemHeadContentProps>`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    font-weight: ${({ $isOpen }) => ($isOpen ? 'bold' : 'normal')};
    justify-content: center;
    line-height: normal;
    margin-left: ${({ $isIconOrImageGiven }) => ($isIconOrImageGiven ? '10px' : undefined)};
    min-width: 0;
`;

export const StyledListItemHeadTitle = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
`;

type StyledListItemHeadTitleTextProps = WithTheme<{ $isOpen: boolean }>;

export const StyledListItemHeadTitleText = styled.span<StyledListItemHeadTitleTextProps>`
    font-weight: ${({ $isOpen }) => ($isOpen ? 'bold' : 'normal')};
    white-space: ${({ $isOpen }) => ($isOpen ? 'normal' : 'nowrap')};
    overflow: hidden;
    text-overflow: ellipsis;

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

type StyledListItemHeadSubtitleTextProps = WithTheme<{ $isOpen: boolean }>;

export const StyledListItemHeadSubtitleText = styled.span<StyledListItemHeadSubtitleTextProps>`
    font-weight: ${({ $isOpen }) => ($isOpen ? 'bold' : 'normal')};
    white-space: ${({ $isOpen }) => ($isOpen ? 'normal' : 'nowrap')};
    overflow: hidden;
    text-overflow: ellipsis;

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

export const StyledMotionListItemHeadHoverItem = styled(motion.div)<FramerMotionBugFix>`
    overflow: hidden;
`;
