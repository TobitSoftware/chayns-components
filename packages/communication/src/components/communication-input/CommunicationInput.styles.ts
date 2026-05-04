import styled, { css } from 'styled-components';
import { motion } from 'motion/react';
import { WithTheme } from '@chayns-components/core';
import { Size } from './CommunicationInput.types';

export const StyledCommunicationInput = styled.div`
    width: 100%;
    position: relative;
`;

export const StyledCommunicationInputSpacer = styled.div`
    width: 100%;
    height: 52px;
`;

type StyledMotionCommunicationInputWrapperProps = WithTheme<{
    $isFocused: boolean;
}>;

export const StyledMotionCommunicationInputWrapper = styled(
    motion.div,
)<StyledMotionCommunicationInputWrapperProps>`
    position: absolute;
    left: 0;
    bottom: 0;

    min-height: 48px;
    width: 100%;

    overflow: hidden;

    align-content: space-between;

    border: 2px solid hsla(0, 0%, 45%, 0.4);
    background-color: ${({ theme }) => theme['000']};

    ${({ $isFocused, theme }) =>
        $isFocused &&
        css`
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.14);
            border-color: rgba(${theme['primary-rgb']}, 0.6);
        `}
`;

export const StyledMotionIconWrapper = styled(motion.div)`
    cursor: pointer;

    height: 48px;
    width: 48px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

type StyledEmojiInputWrapperProps = WithTheme<{
    $isFullHeight: boolean;
    $size: Size;
}>;

export const StyledEmojiInputWrapper = styled.div<StyledEmojiInputWrapperProps>`
    width: 100%;
    min-height: 48px;

    align-content: end;

    ${({ $size }) =>
        $size === Size.MEDIUM &&
        css`
            font-size: 18px;
        `}

    ${({ $isFullHeight }) =>
        $isFullHeight &&
        css`
            height: 513px;
        `}

    > div {
        background-color: transparent;
        border: none;
        min-height: 48px;

        > div {
            padding: 6px 14px 6px 6px;

            > label {
                left: 8px;
                top: 14px;
            }

            div:nth-of-type(2n) {
                height: ${({ $size }) => ($size === Size.MEDIUM ? 29 : 26)}px;
            }
        }
    }
`;

export const StyledCommunicationInputRightWrapper = styled.div`
    margin: 2px 2px 2px 0;
`;

export const StyledInitialRightElementWrapper = styled.div`
    width: 44px;
    height: 44px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin: 2px;
`;
