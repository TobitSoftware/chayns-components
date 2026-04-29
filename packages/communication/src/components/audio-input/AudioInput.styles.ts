import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';
import { motion } from 'motion/react';
import { AudioInputPosition } from './AudioInput.types';

type StyledMotionAudioInputProps = WithTheme<{
    $backgroundColor: string;
    $position: AudioInputPosition;
}>;

export const StyledMotionAudioInput = styled(motion.div)<StyledMotionAudioInputProps>`
    height: 52px;
    min-width: 52px;

    border-radius: 26px;

    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: space-between;
    justify-self: ${({ $position }) => $position};

    background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

export const StyledMotionAudioInputIconWrapper = styled(motion.div)`
    height: 52px;
    width: 52px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
