import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';
import { motion } from 'motion/react';

export const StyledMotionSideContent = styled(motion.div)<WithTheme<unknown>>`
    min-width: 0;
    position: relative;

    border-right: ${({ theme }) => `1px solid rgba(${theme['text-rgb'] ?? ''}, 0.1)`};
`;

export const StyledSideContentHandle = styled.div`
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    transform: translateX(50%);
    cursor: col-resize;
`;
