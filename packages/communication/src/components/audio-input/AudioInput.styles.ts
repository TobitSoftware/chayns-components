import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';
import { motion } from 'motion/react';

export const StyledMotionAudioInput = styled(motion.div)<WithTheme<unknown>>`
    height: 52px;
    min-width: 52px;

    border-radius: 26px;

    cursor: pointer;

    background-color: ${({ theme }) => theme.primary};
`;
