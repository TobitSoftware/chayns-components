import { motion } from 'motion/react';
import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';
import {
    DYNAMIC_TOOLBAR_CONTENT_HEIGHT_PX,
    DYNAMIC_TOOLBAR_CONTENT_PADDING_PX,
    DYNAMIC_TOOLBAR_CONTENT_WIDTH_VW,
} from '../DynamicToolbar.constants';

type StyledMotionDynamicToolbarOverflowTrayProps = WithTheme<{}>;

export const StyledMotionDynamicToolbarOverflowTray = styled(
    motion.div,
)<StyledMotionDynamicToolbarOverflowTrayProps>`
    background-color: ${({ theme }) => theme['100']};
    border-radius: 8px;
`;

export const StyledDynamicToolbarOverflowTrayItems = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${DYNAMIC_TOOLBAR_CONTENT_PADDING_PX}px;
    padding: ${DYNAMIC_TOOLBAR_CONTENT_PADDING_PX}px;
`;

export const StyledMotionDynamicToolbarOverflowTrayWrapper = styled.div`
    position: fixed;
    bottom: 33px;
    width: ${DYNAMIC_TOOLBAR_CONTENT_WIDTH_VW}vw;
    overflow: hidden;
`;

export const StyledMotionDynamicToolbarOverflowTraySpacer = styled.div`
    height: ${DYNAMIC_TOOLBAR_CONTENT_HEIGHT_PX}px;
`;
