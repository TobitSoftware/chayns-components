import { motion } from 'framer-motion';
import styled from 'styled-components';
import type { FramerMotionBugFix, WithTheme } from '../../../lib';

export const StyledFileInput = styled.div``;

type StyledFileInputContainerProps = WithTheme<unknown>;

export const StyledFileInputContainer = styled.div<StyledFileInputContainerProps>`
    border: ${({ theme }: StyledFileInputContainerProps) => theme.text} 1px dotted;
    cursor: pointer;
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 15px;
    justify-content: center;
    width: 100%;
`;

type StyledFileInputTextProps = WithTheme<unknown>;

export const StyledFileInputText = styled.p<StyledFileInputTextProps>`
    color: ${({ theme }: StyledFileInputTextProps) => theme.text};
`;

export const StyledMotionFileInputList = styled(motion.div)<FramerMotionBugFix>``;
