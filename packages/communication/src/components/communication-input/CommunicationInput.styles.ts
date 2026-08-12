import styled, { css } from 'styled-components';
import { WithTheme } from '@chayns-components/core';
import { motion } from 'motion/react';
import { CommunicationInputSize, CommunicationInputDirection } from './CommunicationInput.types';

type StyledCommunicationInputProps = {
    $height: number;
    $hasTopContent?: boolean;
};

export const StyledCommunicationInput = styled.div<StyledCommunicationInputProps>`
    position: relative;
    width: 100%;
    ${({ $height, $hasTopContent }) =>
        $hasTopContent
            ? css`
                  min-height: ${$height}px;
              `
            : css`
                  height: ${$height}px;
              `}

    display: flex;
`;

export const StyledCommunicationInputWrapper = styled.div`
    position: relative;
    flex: 1 1 auto;
`;

type StyledMotionCommunicationInputInnerProps = WithTheme<{
    $borderRadius: number;
    $isFocused: boolean;
    $direction: CommunicationInputDirection;
    $hasTopContent?: boolean;
}>;

export const StyledMotionCommunicationInputInner = styled(
    motion.div,
)<StyledMotionCommunicationInputInnerProps>`
    ${({ $hasTopContent }) => ($hasTopContent ? 'position: relative;' : 'position: absolute;')}
    width: 100%;

    overflow: hidden;

    left: 0;

    ${({ $direction, $hasTopContent }) =>
        !$hasTopContent &&
        ($direction === CommunicationInputDirection.TOP
            ? css`
                  bottom: 0;
              `
            : css`
                  top: 0;
              `)}

    border: 2px solid hsla(0, 0%, 45%, 0.4);
    border-radius: ${({ $borderRadius }) => $borderRadius}px;
    background-color: ${({ theme }) => theme['000']};

    ${({ $isFocused, theme }) =>
        $isFocused &&
        css`
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.14);
            border-color: rgba(${theme['primary-rgb']}, 0.6);
        `}
`;

type StyledCommunicationInputSideElementProps = {
    $height: number;
};

export const StyledCommunicationInputSideElement = styled.div<StyledCommunicationInputSideElementProps>`
    height: ${({ $height }) => $height}px;

    aspect-ratio: 1;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
`;

type StyledCommunicationInputEmojiInputWrapperProps = {
    $height: number;
    $fontSize: number;
    $size: CommunicationInputSize;
};

export const StyledMotionCommunicationInputEmojiInputWrapper = styled(
    motion.div,
)<StyledCommunicationInputEmojiInputWrapperProps>`
    width: 100%;
    min-height: ${({ $height }) => $height}px;

    align-content: end;

    font-size: ${({ $fontSize }) => $fontSize}px;

    > div {
        background-color: transparent;
        border: none;
        min-height: ${({ $height }) => $height}px;

        > div {
            padding: ${({ $size }) =>
                `6px ${$size === CommunicationInputSize.MEDIUM ? 14 : 10}px 6px 6px`};

            ${({ $size }) =>
                $size === CommunicationInputSize.MEDIUM
                    ? css`
                          > label {
                              left: 6px;
                              top: 14px;
                          }
                      `
                    : css`
                          > label {
                              left: 6px;
                              top: 10px;
                          }
                      `}

            div:nth-of-type(2n) {
                height: ${({ $size }) => ($size === CommunicationInputSize.MEDIUM ? 29 : 26)}px;
            }
        }
    }
`;

export const StyledMotionIconWrapper = styled(motion.button)`
    background: none;
    border: 0;
    color: inherit;
    cursor: pointer;
    padding: 0;

    &:focus-visible {
        border-radius: 50%;
        outline: 2px solid color-mix(in srgb, white 70%, transparent);
        outline-offset: 3px;
    }
`;

export const StyledMotionCommunicationInputSpacer = styled(motion.div)`
    height: 100%;
`;
