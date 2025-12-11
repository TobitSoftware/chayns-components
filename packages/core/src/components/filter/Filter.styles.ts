import styled, { css } from 'styled-components';
import { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import { motion } from 'motion/react';

export const StyledFilter = styled.div``;

export const StyledFilterHead = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    position: relative;
`;

type StyledFilterHeadlineProps = WithTheme<{ $isSearchActive: boolean }>;

export const StyledFilterHeadline = styled.h1<StyledFilterHeadlineProps>`
    margin: 0;

    opacity: ${({ $isSearchActive }) => ($isSearchActive ? 0 : 1)};

    transition: opacity 0.3s;
`;

export const StyledFilterHeadlineElement = styled.div<StyledFilterHeadlineProps>`
    opacity: ${({ $isSearchActive }) => ($isSearchActive ? 0 : 1)};

    transition: opacity 0.3s;
`;

export const StyledFilterIconWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const StyledFilterSearch = styled.div`
    position: absolute;
    width: 100%;
`;

type StyledFilterIconProps = WithTheme<{
    $isOpen: boolean;
    $shouldShowRoundedHoverEffect: boolean;
}>;

export const StyledFilterIcon = styled.div<StyledFilterIconProps>`
    cursor: pointer;

    aspect-ratio: 1;

    height: ${({ $shouldShowRoundedHoverEffect }) => ($shouldShowRoundedHoverEffect ? 42 : 30)}px;
    border-radius: ${({ $shouldShowRoundedHoverEffect }) =>
        $shouldShowRoundedHoverEffect ? 3 : 0}px;

    display: flex;
    align-items: center;
    justify-content: center;

    ${({ $shouldShowRoundedHoverEffect, $isOpen }) =>
        $shouldShowRoundedHoverEffect &&
        $isOpen &&
        css`
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        `}

    ${({ $isOpen, theme }) =>
        $isOpen &&
        css`
            background-color: ${theme['100']};
        `}

    &:hover {
        background-color: ${({ theme }) => theme['100']};
    }
`;

type StyledMotionFilterBackgroundProps = WithTheme<{ $top: number; $left: number }>;

export const StyledMotionFilterBackground = styled(motion.div)<StyledMotionFilterBackgroundProps>`
    width: 30px;

    position: absolute;

    top: ${({ $top }) => $top}px;
    left: ${({ $left }) => $left}px;

    background-color: ${({ theme }) => theme['100']};
`;

export const StyledFilterContentWrapper = styled.div``;
