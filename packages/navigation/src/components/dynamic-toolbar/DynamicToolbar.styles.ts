import { WithTheme } from '@chayns-components/core';
import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import { DynamicToolbarLayout } from './DynamicToolbar.types';
import {
    DYNAMIC_TOOLBAR_CONTENT_HEIGHT_PX,
    DYNAMIC_TOOLBAR_CONTENT_PADDING_PX,
    DYNAMIC_TOOLBAR_CONTENT_WIDTH_VW,
    DYNAMIC_TOOLBAR_HEIGHT_PX,
    DYNAMIC_TOOLBAR_OVERFLOW_TRIGGER_OFFSET_PX,
    DYNAMIC_TOOLBAR_OVERFLOW_TRIGGER_WIDTH_PX,
} from './DynamicToolbar.constants';

export const StyledMotionDynamicToolbar = styled(motion.div)`
    align-items: flex-start;
    bottom: 0;
    display: flex;
    height: ${DYNAMIC_TOOLBAR_HEIGHT_PX}px;
    justify-content: center;
    left: 0;
    position: fixed;
    width: 100%;
    z-index: 100;
`;

export const StyledDynamicToolbarContent = styled.div`
    display: flex;
    gap: 6px;
    height: ${DYNAMIC_TOOLBAR_CONTENT_HEIGHT_PX}px;
    justify-content: center;
    padding: ${DYNAMIC_TOOLBAR_CONTENT_PADDING_PX}px;
    width: ${DYNAMIC_TOOLBAR_CONTENT_WIDTH_VW}vw;
`;

type StyledDynamicToolbarBackgroundProps = WithTheme<{
    $layout: DynamicToolbarLayout;
}>;

export const StyledDynamicToolbarBackground = styled.div<StyledDynamicToolbarBackgroundProps>`
    background-color: ${({ theme }) => theme.primary};
    position: absolute;
    transition:
        border-radius 0.3s ease,
        box-shadow 0.3s ease,
        height 0.3s ease,
        width 0.3s ease;

    ${({ $layout }) =>
        $layout === DynamicToolbarLayout.Floating
            ? css`
                  border-radius: 8px;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                  height: ${DYNAMIC_TOOLBAR_CONTENT_HEIGHT_PX}px;
                  width: ${DYNAMIC_TOOLBAR_CONTENT_WIDTH_VW}vw;
              `
            : css`
                  border-radius: 0;
                  box-shadow: none;
                  height: 100%;
                  width: 100vw;
              `}
`;

export const StyledDynamicToolbarOverflowTrigger = styled.button`
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    height: ${DYNAMIC_TOOLBAR_CONTENT_HEIGHT_PX}px;
    justify-content: center;
    padding: 0;
    position: absolute;
    right: calc(
        ((100vw - ${DYNAMIC_TOOLBAR_CONTENT_WIDTH_VW}vw) / 2) -
            ${DYNAMIC_TOOLBAR_OVERFLOW_TRIGGER_OFFSET_PX}px
    );
    width: ${DYNAMIC_TOOLBAR_OVERFLOW_TRIGGER_WIDTH_PX}px;
    z-index: 100;
`;
