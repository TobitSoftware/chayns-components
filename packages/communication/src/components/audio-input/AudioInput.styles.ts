import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';
import { motion } from 'motion/react';
import { AudioInputPosition } from './AudioInput.types';
import { CommunicationInputSize } from '../communication-input/CommunicationInput.types';

type StyledMotionAudioInputProps = WithTheme<{
    $backgroundColor: string;
    $position: AudioInputPosition;
    $size: CommunicationInputSize;
}>;

export const StyledMotionAudioInput = styled(motion.div)<StyledMotionAudioInputProps>`
    height: ${({ $size }) => ($size === CommunicationInputSize.MEDIUM ? 52 : 42)}px;
    min-width: ${({ $size }) => ($size === CommunicationInputSize.MEDIUM ? 52 : 42)}px;

    border-radius: ${({ $size }) => ($size === CommunicationInputSize.MEDIUM ? 26 : 21)}px;

    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: space-between;
    justify-self: ${({ $position }) => $position};

    background-color: ${({ $backgroundColor }) => $backgroundColor};
`;

export const StyledMotionAudioInputIconWrapper = styled(motion.div)`
    height: 100%;
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`;
