import { css, styled } from 'styled-components';
import { motion } from 'motion/react';
import { WithTheme } from '@chayns-components/core';

export const StyledSidebarItem = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

type StyledSidebarItemHeadProps = WithTheme<{ $shouldHighlight: boolean }>;

export const StyledSidebarItemHead = styled.div<StyledSidebarItemHeadProps>`
    height: 42px;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    ${({ $shouldHighlight }) =>
        $shouldHighlight &&
        css`
            background-color: rgba(30, 30, 30, 0.3);
        `}
`;

export const StyledSidebarItemHeadContent = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
`;

export const StyledSidebarItemIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    height: 100%;
`;

export const StyledMotionSidebarOpenIcon = styled(motion.div)`
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const StyledSidebarItemIconImage = styled.img`
    width: 28px;
`;

export const StyledSidebarItemLabel = styled.div`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
`;

export const StyledSidebarItemChildren = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding-top: 2px;

    padding-left: 8px;
`;
