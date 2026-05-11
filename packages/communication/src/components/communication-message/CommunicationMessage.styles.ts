import styled, { css } from 'styled-components';
import { WithTheme } from '@chayns-components/core';
import { CommunicationMessageAlignment } from './CommunicationMessage.types';
import { motion } from 'motion/react';

type StyledCommunicationMessageProps = WithTheme<{ $alignment: CommunicationMessageAlignment }>;

export const StyledCommunicationMessage = styled.div<StyledCommunicationMessageProps>`
    position: relative;
    padding: 10px 22px;
    min-height: 48px;

    display: flex;
    flex-direction: column;
    gap: 8px;

    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 3px;

    ${({ $alignment, theme }) => {
        switch ($alignment) {
            case CommunicationMessageAlignment.LEFT:
                return css`
                    background-color: ${theme['000']};
                    margin: 0 44px 0 22px;
                `;
            case CommunicationMessageAlignment.RIGHT:
                return css`
                    background-color: ${theme['102']};
                    margin: 0 22px 0 44px;
                `;
            case CommunicationMessageAlignment.CENTER:
                return css`
                    background-color: ${theme['101']};
                    margin: 0 44px;
                `;
            default:
                return css``;
        }
    }}
`;

export const StyledMotionCommunicationMessageContextMenu = styled(motion.div)`
    position: absolute;
`;

export const StyledCommunicationMessageAuthorName = styled.b``;

type StyledCommunicationMessageAuthorImageProps = WithTheme<{
    $alignment: CommunicationMessageAlignment;
}>;

export const StyledCommunicationMessageAuthorImage = styled.img<StyledCommunicationMessageAuthorImageProps>`
    position: absolute;

    background-color: ${({ theme }) => theme['100']};
    box-shadow: ${({ theme }) => `0 0 0 1px rgba(${theme['text-rgb'] ?? ''}, .3)`};
    border-radius: 50%;

    height: 32px;
    width: 32px;

    top: 6px;

    object-fit: cover;

    ${({ $alignment }) => {
        if ($alignment === CommunicationMessageAlignment.LEFT) {
            return css`
                left: -16px;
            `;
        }

        if ($alignment === CommunicationMessageAlignment.RIGHT) {
            return css`
                right: -16px;
            `;
        }

        return css``;
    }}
`;

export const StyledCommunicationMessageDeletionHint = styled.i`
    text-align: center;
`;

export const StyledCommunicationMessageFooter = styled.i`
    align-self: end;

    opacity: 0.75;
    font-size: 75%;
    display: flex;
    align-items: center;

    position: absolute;
    bottom: 6px;
`;

export const StyledCommunicationMessageStatus = styled.i`
    display: flex;
    align-items: center;
`;

type StyledCommunicationMessageStatusIconProps = { $isRight?: boolean };

export const StyledCommunicationMessageStatusIcon = styled.div<StyledCommunicationMessageStatusIconProps>`
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;

    ${({ $isRight }) =>
        $isRight &&
        css`
            margin-left: -9px;
        `}
`;

export const StyledCommunicationMessageTimestamp = styled.i`
    line-height: 1;
`;
