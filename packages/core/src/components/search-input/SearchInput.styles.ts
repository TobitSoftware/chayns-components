import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import type { InputSize } from '../input/Input';
import { keyboardFocusHighlightingRingCss } from '../../utils/keyboardFocusHighlighting.styles';

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
                  cursor: pointer;

                  @media (pointer: fine) {
                      &:hover {
                          background-color: ${theme[201]};
                      }
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
    $shouldShowKeyboardHighlighting: boolean;
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

    overflow: ${({ $shouldShowKeyboardHighlighting }) =>
        $shouldShowKeyboardHighlighting ? 'visible' : 'hidden'};
`;

type StyledMotionSearchInputIconWrapperContentProps = {
    $shouldShowKeyboardHighlighting: boolean;
};

export const StyledMotionSearchInputIconWrapperContent = styled(
    motion.div,
)<StyledMotionSearchInputIconWrapperContentProps>`
    display: flex;
    cursor: pointer;
`;

type StyledSearchInputIconTriggerProps = {
    $shouldShowKeyboardHighlighting: boolean;
};

export const StyledSearchInputIconTrigger = styled.div<StyledSearchInputIconTriggerProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 6px;
    cursor: pointer;

    ${({ $shouldShowKeyboardHighlighting }) =>
        $shouldShowKeyboardHighlighting &&
        css`
            &:focus-visible {
                transition: none;
                ${keyboardFocusHighlightingRingCss}
                box-shadow: 0 0 0 4px rgba(0, 102, 204, 0.35);
                outline-offset: 2px;
            }
        `}
`;

export const StyledMotionSearchInputIconWrapper = styled.div`
    width: 18px;
`;
