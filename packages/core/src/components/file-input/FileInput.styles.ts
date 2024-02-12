import { motion } from 'framer-motion';
import styled from 'styled-components';
import type { FramerMotionBugFix, WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledFileInput = styled.div``;

type StyledFileInputContainerProps = WithTheme<{
    isDisabled: boolean;
}>;

export const StyledFileInputContainer = styled.div<StyledFileInputContainerProps>`
    border: ${({ theme }: StyledFileInputContainerProps) => theme.text} 1px dotted;
    cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
    opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
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
