import styled from 'styled-components';
import { motion } from 'motion/react';
import { WithTheme } from '@chayns-components/core';

export const StyledMotionOverlayContent = styled(motion.div)<WithTheme<unknown>>`
    position: absolute;
    bottom: 0;

    width: 100%;

    display: flex;
    flex-direction: column;

    box-shadow: 0 -5px 15px -5px #0006;

    z-index: 10;

    background-color: ${({ theme }) => (theme.colorMode === 'dark' ? '#1e1e1e' : '#f7f7f7')};
`;

export const StyledMotionOverlayContentHandleWrapper = styled(motion.div)`
    width: 100%;
    height: 26px;

    display: flex;
    justify-content: center;
    align-items: center;

    flex-shrink: 0;

    cursor: n-resize;
`;

export const StyledOverlayContentHandle = styled.div<WithTheme<unknown>>`
    border-radius: 10px;
    flex: none;
    height: 4px;
    opacity: 0.5;
    width: 10%;
    background-color: ${({ theme }) => theme.text};
`;
