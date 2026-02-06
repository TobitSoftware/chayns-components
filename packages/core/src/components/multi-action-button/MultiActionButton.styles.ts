import styled, { css, keyframes } from 'styled-components';
import { motion } from 'motion/react';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import { MultiActionButtonStatusType } from './MultiActionButton.types';

type StyledActionButtonProps = WithTheme<{
    $isExpanded?: boolean;
    $isCollapsed?: boolean;
    $isShrunk?: boolean;
    $isPrimary?: boolean;
    $isSecondary?: boolean;
    $isSolo?: boolean;
    $isHidden?: boolean;
    $statusType?: MultiActionButtonStatusType;
    $pulseColor?: string;
}>;

const pulse = keyframes`
    0% {
        opacity: 0.25;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 0.25;
    }
`;

export const StyledMultiActionButton = styled(motion.div)`
    align-items: stretch;
    background: transparent;
    display: inline-flex;
    position: relative;
    transition: width 0.2s ease;
    width: 100%;
`;

export const StyledActionButton = styled.button<StyledActionButtonProps>`
    align-items: center;
    border: none;
    border-radius: 21px;
    cursor: pointer;
    display: inline-flex;
    flex: 1 1 auto;
    height: 42px;
    line-height: 22px;
    min-height: 42px;
    padding: 0;
    position: relative;
    overflow: hidden;
    transition:
        background-color 0.2s ease,
        border-radius 0.2s ease,
        color 0.2s ease,
        flex-grow 0.2s ease,
        opacity 0.2s ease,
        width 0.2s ease,
        margin-left 0.2s ease,
        padding 0.2s ease;
    user-select: none;
    white-space: nowrap;

    background-color: rgba(0, 0, 0, 0.25);
    color: #fff;

    ${({ $isExpanded }) =>
        $isExpanded &&
        css`
            flex: 1 1 auto;
            min-width: 0;
        `}

    ${({ $isCollapsed }) =>
        $isCollapsed &&
        css`
            flex: 0 0 auto;
            padding: 0;
            width: 42px;
        `}

    ${({ $isPrimary, $isCollapsed }) =>
        $isPrimary &&
        !$isCollapsed &&
        css`
            flex: 1 1 auto;
            min-width: 0;
        `}

    ${({ $isShrunk }) =>
        $isShrunk &&
        css`
            flex: 0 0 auto;
            padding: 0;
            width: 42px;
        `}

    ${({ $isSecondary, $isExpanded }) =>
        $isSecondary &&
        !$isExpanded &&
        css`
            flex: 0 0 auto;
            padding: 0;
            width: 42px;
        `}

    ${({ $isSecondary }) =>
        $isSecondary &&
        css`
            margin-left: 2px;
        `}

    ${({ $isHidden }) =>
        $isHidden &&
        css`
            margin-left: 0;
            opacity: 0;
            pointer-events: none;
            width: 0;
        `}

    ${({ $isPrimary }) =>
        $isPrimary &&
        css`
            border-bottom-right-radius: 0;
            border-top-right-radius: 0;
        `}

    ${({ $isPrimary, $isCollapsed }) =>
        $isPrimary &&
        $isCollapsed &&
        css`
            border-bottom-right-radius: 21px;
            border-top-right-radius: 21px;
        `}

    ${({ $isSecondary }) =>
        $isSecondary &&
        css`
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
        `}

    ${({ $isSolo }) =>
        $isSolo &&
        css`
            border-radius: 21px;
        `}

    ${({ $isCollapsed }) =>
        $isCollapsed &&
        css`
            border-radius: 21px;
        `}

    ${({ $statusType, $pulseColor }) =>
        $statusType === MultiActionButtonStatusType.Pulse &&
        css`
            overflow: hidden;

            &::before {
                animation: ${pulse} 1.6s ease-in-out infinite;
                background: ${$pulseColor || 'rgba(255, 0, 0, 0.85)'};
                border-radius: 3px;
                content: '';
                inset: 0;
                opacity: 0.1;
                pointer-events: none;
                position: absolute;
            }
        `}

    &:disabled {
        cursor: default;
        opacity: 0.5;
    }

    &:hover:not(:disabled) {
        background-color: rgba(0, 0, 0, 0.35);
    }
`;

export const StyledActionContent = styled.span`
    align-items: center;
    display: inline-flex;
    flex: 1 1 auto;
    gap: 6px;
    min-width: 0;
    position: relative;
    z-index: 1;
`;

export const StyledIconSlot = styled.span`
    align-items: center;
    display: inline-flex;
    flex: 0 0 auto;
    height: 42px;
    justify-content: center;
    width: 42px;
`;

export const StyledSecondaryLabel = styled.span`
    display: block;
    flex: 1 1 auto;
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
    padding-right: 12px;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export const StyledPrimaryLabel = styled(StyledSecondaryLabel)``;
