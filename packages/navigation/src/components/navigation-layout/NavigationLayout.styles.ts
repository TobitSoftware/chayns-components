import styled, { css } from 'styled-components';
import { WithTheme } from '@chayns-components/core';
import { motion } from 'motion/react';

export const StyledNavigationLayout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    min-height: 0;
    position: relative;
    overflow: hidden;
`;

export const StyledMotionNavigationLayoutContentWrapper = styled(motion.div)`
    display: flex;
    flex: 1;
    width: 100%;
    min-height: 0;
`;

type StyledNavigationLayoutContentProps = WithTheme<{
    $isCornerContent: boolean;
    $isMobile: boolean;
}>;

export const StyledNavigationLayoutContent = styled.div<StyledNavigationLayoutContentProps>`
    ${({ $isCornerContent }) =>
        $isCornerContent &&
        css`
            border-top-left-radius: 10px;
            box-shadow: rgba(0, 0, 0, 0.2) 0 0 20px 16px;
        `}

    overflow: hidden;

    flex: 1;
    width: ${({ $isMobile }) => ($isMobile ? '100vw' : '100%')};
    min-width: ${({ $isMobile }) => ($isMobile ? '100vw' : 0)};
    min-height: 0;

    position: relative;
`;

export const StyledMotionNavigationLayoutContentOverlay = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    z-index: 3;

    background-color: rgb(0, 0, 0);
`;

type StyledNavigationLayoutBackgroundProps = WithTheme<{ $backgroundColor: string }>;

export const StyledNavigationLayoutBackground = styled.div<StyledNavigationLayoutBackgroundProps>`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -100;

    background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

export const StyledNavigationLayoutBackgroundImage = styled.img`
    object-fit: cover;
    height: 100%;
    width: 100%;
`;
