import styled, { css } from 'styled-components';
import { motion } from 'motion/react';
import { WithTheme } from '@chayns-components/core';

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
    bottom: 0;
    min-height: 52px;
    width: 100%;

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

    height: 36px;
    width: 36px;

    display: flex;
    align-items: center;
    justify-content: center;
`;
