import { motion } from 'motion/react';
import styled, { css, keyframes } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';
import { MultiActionButtonStatusType } from '../MultiActionButton.types';

type StyledActionButtonProps = WithTheme<{
    $backgroundColor?: string;
    $isCollapsed?: boolean;
    $isExpanded?: boolean;
    $isHidden?: boolean;
    $isPrimary?: boolean;
    $isSecondary?: boolean;
    $isShrunk?: boolean;
    $isSolo?: boolean;
    $pulseColors?: [string, string];
    $isInteractionDisabled?: boolean;
    $height: number;
    $statusType?: MultiActionButtonStatusType;
    $shouldUseContentWidth?: boolean;
}>;

const pulse = (color1: string, color2: string) => keyframes`
    0% {
        background: ${color1};
    }
    50% {
        background: ${color2};
    }
    100% {
        background: ${color1};
    }
`;

export const StyledActionButton = styled.button<StyledActionButtonProps>`
    align-items: center;
    border: none;
    border-radius: ${({ $height }) => $height / 2}px;
    cursor: pointer;
    display: inline-flex;
    flex: 1 1 auto;
    height: ${({ $height }) => $height}px;
    line-height: 22px;
    min-height: ${({ $height }) => $height}px;
    overflow: hidden;
    padding: 0;
    position: relative;
    transition:
        background-color 0.2s ease,
        border-radius 0.2s ease,
        color 0.2s ease,
        flex-grow 0.2s ease,
        opacity 0.2s ease,
        padding 0.2s ease,
        width 0.2s ease;
    user-select: none;
    white-space: nowrap;

    background-color: ${({ $backgroundColor, theme }) =>
        $backgroundColor || theme?.primary || '#000'};
    color: #fff;

    /* When width is content-driven, avoid flex stretching. */
    ${({ $shouldUseContentWidth }) =>
        $shouldUseContentWidth &&
        css`
            flex: 0 1 auto;
        `}

    /* Expanded secondary button when width is not content-driven. */
    ${({ $isExpanded, $shouldUseContentWidth }) =>
        $isExpanded &&
        !$shouldUseContentWidth &&
        css`
            flex: 1 1 auto;
            min-width: 0;
        `}

    /* Collapsed state clamps to a fixed icon size. */
    ${(props) =>
        props.$isCollapsed &&
        css`
            flex: 0 0 auto;
            padding: 0;
            width: ${props.$height}px;
        `}

    /* Primary action stretches unless content-driven. */
    ${({ $isPrimary, $isCollapsed, $shouldUseContentWidth }) =>
        $isPrimary &&
        !$isCollapsed &&
        !$shouldUseContentWidth &&
        css`
            flex: 1 1 auto;
            min-width: 0;
        `}

    /* Shrink the primary action to icon size when secondary is expanded. */
    ${(props) =>
        props.$isShrunk &&
        !props.$shouldUseContentWidth &&
        css`
            flex: 0 0 auto;
            padding: 0;
            width: ${props.$height}px;
        `}

    /* Keep secondary icon-only when collapsed and not expanded. */
    ${(props) =>
        props.$isSecondary &&
        !props.$isExpanded &&
        !props.$shouldUseContentWidth &&
        css`
            flex: 0 0 auto;
            padding: 0;
            width: ${props.$height}px;
        `}

    /* Fully hide the secondary action when the whole control is collapsed. */
    ${({ $isHidden }) =>
        $isHidden &&
        css`
            opacity: 0;
            pointer-events: none;
            width: 0;
        `}

    /* Joining both buttons into a pill shape. */
    ${({ $isPrimary }) =>
        $isPrimary &&
        css`
            border-bottom-right-radius: 0;
            border-top-right-radius: 0;
        `}

    ${(props) =>
        props.$isPrimary &&
        props.$isCollapsed &&
        css`
            border-bottom-right-radius: ${props.$height / 2}px;
            border-top-right-radius: ${props.$height / 2}px;
        `}

    ${({ $isSecondary }) =>
        $isSecondary &&
        css`
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
        `}

    ${(props) =>
        props.$isSolo &&
        css`
            border-radius: ${props.$height / 2}px;
        `}

    ${(props) =>
        props.$isCollapsed &&
        css`
            border-radius: ${props.$height / 2}px;
        `}

    ${({ $isInteractionDisabled }) =>
        $isInteractionDisabled &&
        css`
            cursor: default;
        `}

    /* Optional pulse overlay used by status. */
    ${({ $statusType, $pulseColors }) =>
        $statusType === MultiActionButtonStatusType.Pulse &&
        css`
            overflow: hidden;

            &::before {
                animation: ${pulse($pulseColors?.[0] || '#A50000', $pulseColors?.[1] || '#630000')}
                    1.6s ease-in-out infinite;
                border-radius: 3px;
                content: '';
                inset: 0;
                pointer-events: none;
                position: absolute;
            }
        `}

    &:disabled {
        cursor: default;
    }

    ${({ $isInteractionDisabled, $backgroundColor, theme }) =>
        !$isInteractionDisabled &&
        css`
            &:hover:not(:disabled) {
                background-color: ${`color-mix(in srgb, ${$backgroundColor || theme?.primary || '#000'} 85%, black)`};
            }
        `}
`;

export const StyledActionContent = styled.span`
    align-items: center;
    display: inline-flex;
    flex: 1 1 auto;
    gap: 0;
    min-width: 0;
    position: relative;
    z-index: 1;
`;

export const StyledIconSlot = styled.span<{ $height: number; $isDisabled?: boolean }>`
    align-items: center;
    display: inline-flex;
    flex: 0 0 auto;
    height: ${({ $height }) => $height}px;
    justify-content: center;
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
    transition: opacity 0.2s ease;
    width: ${({ $height }) => $height}px;
`;

export const StyledLabelWrapper = styled(motion.span)`
    /* The wrapper animates width/margin to avoid layout jumps. */
    display: inline-flex;
    flex: 1 1 auto;
    min-width: 0;
    overflow: hidden;
    text-align: left;
`;

export const StyledSecondaryLabel = styled.span`
    display: block;
    flex: 1 1 auto;
    min-width: 0;
    max-width: 100%;
    overflow: hidden;
    padding-right: 18px;
    text-overflow: ellipsis;
    white-space: nowrap;
`;
