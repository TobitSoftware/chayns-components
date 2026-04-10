import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';
import { motion } from 'motion/react';

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
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

export const StyledMotionNavigationSidebarContentList = styled(motion.div)`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2px;
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
