import { motion } from 'motion/react';
import styled from 'styled-components';
import type { FramerMotionBugFix, WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import type { InputSize } from '../input/Input';

type StyledSearchInputProps = WithTheme<{
    $size: InputSize;
}>;

export const StyledSearchInput = styled.div<StyledSearchInputProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    border-radius: 3px;

    height: ${({ $size }: StyledSearchInputProps) => ($size === 'medium' ? '42px' : '32px')};

    &:hover {
        background-color: ${({ theme }: StyledSearchInputProps) => theme[103]};
    }
`;

export const StyledMotionSearchInputContentWrapper = styled(motion.div)<FramerMotionBugFix>`
    position: absolute;
    top: 0;
    right: 0;
    overflow: hidden;
`;

export const StyledMotionSearchInputIconWrapperContent = styled(motion.div)<FramerMotionBugFix>`
    display: flex;
`;
