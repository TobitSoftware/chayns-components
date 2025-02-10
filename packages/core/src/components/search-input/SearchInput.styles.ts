import { motion } from 'motion/react';
import styled from 'styled-components';
import type { FramerMotionBugFix } from '../color-scheme-provider/ColorSchemeProvider';
import type { InputSize } from '../input/Input';

type StyledSearchInputProps = {
    $size: InputSize;
};

export const StyledSearchInput = styled.div<StyledSearchInputProps>`
    align-items: center;
    display: flex;
    gap: 8px;
    height: ${({ $size }) => ($size === 'medium' ? '42px' : '32px')};
    justify-content: flex-end;
    width: 100%;
`;

export const StyledMotionSearchInputContentWrapper = styled(motion.div)<FramerMotionBugFix>`
    overflow: hidden;
`;

export const StyledMotionSearchInputIconWrapper = styled.div`
    width: 18px;
`;

export const StyledMotionSearchInputIconWrapperContent = styled(motion.div)<FramerMotionBugFix>`
    display: flex;
`;
