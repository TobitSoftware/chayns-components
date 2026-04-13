import styled, { css } from 'styled-components';
import { WithTheme } from '@chayns-components/core';
import { motion } from 'motion/react';

const SCROLLABLE_GROUPS_MIN_HEIGHT = 120;

type StyledNavigationSidebarProps = WithTheme<{ $color: string }>;

export const StyledMotionNavigationSidebar = styled(motion.div)<StyledNavigationSidebarProps>`
    height: 100%;
    color: ${({ $color }) => $color};

    position: relative;
    display: flex;
    flex-shrink: 0;
    min-height: 0;
    overflow: visible;
    z-index: 1;
    padding: 10px;
`;

export const StyledMotionNavigationSidebarContent = styled(motion.div)`
    width: 100%;
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 2px;
    min-height: 0;
    overflow: hidden;
`;

export const StyledMotionNavigationSidebarContentWrapper = styled(motion.div)`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
`;

export const StyledMotionNavigationSidebarExternalContent = styled(motion.div)`
    flex-shrink: 0;
    margin: 4px 0;
`;

type StyledMotionNavigationSidebarContentListProps = WithTheme<{ $isPinned?: boolean }>;

export const StyledMotionNavigationSidebarContentList = styled(
    motion.div,
)<StyledMotionNavigationSidebarContentListProps>`
    display: flex;
    flex-direction: column;
    min-height: 0;
    overflow-x: hidden;

    ${({ $isPinned }) =>
        $isPinned
            ? css`
                  flex: 0 0 auto;
                  overflow-y: auto;
              `
            : css`
                  flex: 1 1 auto;
                  min-height: min(${SCROLLABLE_GROUPS_MIN_HEIGHT}px, 100%);
                  overflow-y: auto;
              `}

    &::-webkit-scrollbar {
        width: 0;
        height: 0;
    }
`;

export const StyledNavigationSidebarResizeHandle = styled(motion.div)`
    position: absolute;
    right: -10px;
    top: 0;
    width: 20px;
    height: 100%;
    cursor: col-resize;
    opacity: 0;
    z-index: 20;
    pointer-events: auto;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
`;
