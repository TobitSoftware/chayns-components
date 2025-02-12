import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import type { FramerMotionBugFix, WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import type { InputSize } from '../input/Input';

type StyledSearchInputProps = WithTheme<{
    $size: InputSize;
    $shouldUseAbsolutePositioning: boolean;
}>;

export const StyledSearchInput = styled.div<StyledSearchInputProps>`
    display: flex;
    align-items: center;

    height: ${({ $size }: StyledSearchInputProps) => ($size === 'medium' ? '42px' : '32px')};

    ${({ $shouldUseAbsolutePositioning, theme }: StyledSearchInputProps) =>
        $shouldUseAbsolutePositioning
            ? css`
                  justify-content: center;
                  aspect-ratio: 1;
                  border-radius: 3px;
                  position: relative;

                  &:hover {
                      background-color: ${theme[103]};
                  }
              `
            : css`
                  gap: 8px;
                  justify-content: flex-end;
                  width: 100%;
              `}
`;

export const StyledSearchInputPseudoElement = styled.div`
    position: absolute;
    right: 0;
    left: 0;
`;

type StyledMotionSearchInputContentWrapperProps = {
    $shouldUseAbsolutePositioning: boolean;
};

export const StyledMotionSearchInputContentWrapper = styled(
    motion.div,
)<StyledMotionSearchInputContentWrapperProps>`
    ${({ $shouldUseAbsolutePositioning }) =>
        $shouldUseAbsolutePositioning &&
        css`
            position: absolute;
            top: 0;
            right: 0;
        `}

    overflow: hidden;
`;

export const StyledMotionSearchInputIconWrapperContent = styled(motion.div)<FramerMotionBugFix>`
    display: flex;
`;

export const StyledMotionSearchInputIconWrapper = styled.div`
    width: 18px;
`;
