import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import { WithTheme } from '@chayns-components/core';
import { DynamicToolbarLayout } from './DynamicToolbar.types';

export const StyledMotionDynamicToolbar = styled(motion.div)`
    align-items: flex-start;
    bottom: 0;
    display: flex;
    height: 85px;
    justify-content: center;
    left: 0;
    position: fixed;
    width: 100%;
`;

export const StyledDynamicToolbarContent = styled.div`
    display: flex;
    gap: 6px;
    height: 52px;
    justify-content: center;
    padding: 6px;
    width: 80vw;
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
                  height: 52px;
                  width: 80vw;
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
    height: 52px;
    justify-content: center;
    padding: 0;
    position: absolute;
    right: calc(10vw - 36px); // I dont know why 36px is needed here instead of 30px
    width: 30px;
`;
