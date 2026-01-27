import { motion } from 'motion/react';
import styled from 'styled-components';
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

type StyledDynamicToolbarContentProps = WithTheme<{
    $layout: DynamicToolbarLayout;
}>;

export const StyledDynamicToolbarContent = styled.div<StyledDynamicToolbarContentProps>`
    align-items: center;
    background-color: ${({ theme }) => theme.primary};
    border-radius: 8px;
    display: flex;
    height: 52px;
    padding: 6px;
    width: 80vw;
`;

export const StyledDynamicToolbarOverflowTrigger = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
