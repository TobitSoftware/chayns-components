import styled, { css } from 'styled-components';
import { WithTheme } from '@chayns-components/core';
import { motion } from 'motion/react';

type StyledCommunicationButtonProps = WithTheme<{
    $shouldFillBackground: boolean;
    $isDisabled?: boolean;
}>;

export const StyledCommunicationButton = styled.div<StyledCommunicationButtonProps>`
    height: 44px;
    width: 44px;

    border-radius: 50%;

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    overflow: hidden;

    ${({ $isDisabled }) =>
        $isDisabled &&
        css`
            cursor: default;
            opacity: 0.5;
        `}

    ${({ $shouldFillBackground, theme }) =>
        $shouldFillBackground &&
        css`
            background-color: ${theme.primary};
        `}

    .beta-chayns-icon {
        aspect-ratio: 1;
    }
`;

export const StyledMotionCommunicationButtonImage = styled(motion.img)<WithTheme<unknown>>`
    height: 100%;
    width: 100%;

    position: absolute;

    z-index: 1;

    box-shadow: inset 0 0 0 0.5px ${({ theme }) => theme['100']};
`;
