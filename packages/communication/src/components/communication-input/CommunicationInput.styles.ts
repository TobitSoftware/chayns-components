import styled, { css } from 'styled-components';
import { WithTheme } from '@chayns-components/core';
import { motion } from 'motion/react';
import { CommunicationInputSize } from './CommunicationInput.types';

type StyledCommunicationInputProps = {
    $height: number;
};

export const StyledCommunicationInput = styled.div<StyledCommunicationInputProps>`
    position: relative;
    width: 100%;
    height: ${({ $height }) => $height}px;

    display: flex;
`;

export const StyledCommunicationInputWrapper = styled.div`
    position: relative;
    flex: 1 1 auto;
`;

type StyledMotionCommunicationInputInnerProps = WithTheme<{
    $isFocused: boolean;
}>;

export const StyledMotionCommunicationInputInner = styled(
    motion.div,
)<StyledMotionCommunicationInputInnerProps>`
    position: absolute;
    width: 100%;

    overflow: hidden;

    left: 0;
    bottom: 0;

    border: 2px solid hsla(0, 0%, 45%, 0.4);
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
            padding: 6px 14px 6px 6px;

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

export const StyledMotionIconWrapper = styled(motion.div)``;

export const StyledMotionCommunicationInputSpacer = styled(motion.div)`
    height: 100%;
`;
