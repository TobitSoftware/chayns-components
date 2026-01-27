import { WithTheme } from '@chayns-components/core';
import { motion } from 'motion/react';
import styled from 'styled-components';

type StyledDynamicToolbarItemButtonProps = WithTheme<{
    $isDisabled: boolean;
}>;

export const StyledDynamicToolbarItemButton = styled.button<StyledDynamicToolbarItemButtonProps>`
    align-items: center;
    background: transparent;
    border: none;
    border-radius: 4px;
    cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};
    display: flex;
    flex: 1 1 auto;
    justify-content: center;
    min-height: 40px;
    min-width: 0;
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
    padding: 8px;
    position: relative;
    transition: opacity 0.2s ease;
`;

export const StyledMotionDynamicToolbarItemButtonBackground = styled(motion.div)`
    background: rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 0;
`;
