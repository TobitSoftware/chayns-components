import type { WithTheme } from '@chayns-components/core';
import styled, { css, keyframes } from 'styled-components';
import { CursorType } from '../../types/cursor';
import type { TypewriterProps } from './Typewriter';

type StyledTypewriterProps = WithTheme<{
    $cursorType: TypewriterProps['cursorType'];
    $isAnimatingText: boolean;
    $shouldHideCursor: TypewriterProps['shouldHideCursor'];
    $shouldPreventBlinkAnimation: boolean;
}>;

const typewriterCursorElement = ({
    $cursorType,
    $isAnimatingText,
    $shouldHideCursor,
    $shouldPreventBlinkAnimation,
}: StyledTypewriterProps) => {
    if (!$isAnimatingText || $shouldHideCursor) {
        return '';
    }

    if ($cursorType === CursorType.Thin) {
        return css`
            .typewriter-lastWithContent {
                &:after {
                    animation: ${$shouldPreventBlinkAnimation ? 'none' : blinkAnimation} 1s steps(2, start) infinite;
                    color: inherit;
                    content: '|';
                    font-size: 25px;
                    position: relative;
                    line-height: 0;
                    vertical-align: baseline;
                }
        `;
    }

    return css`
        .typewriter-lastWithContent {
            &:after {
                animation: ${blinkAnimation} 1s steps(2, start) infinite;
                color: ${({ theme }: StyledTypewriterTextProps) => theme.text};
                content: '▋';
                margin-left: 0.25rem;
                opacity: 0.85;
                position: relative;
                vertical-align: baseline;
            }
        }
    `;
};

export const StyledTypewriter = styled.div<StyledTypewriterProps>`
    align-items: inherit;
    display: flex;
    position: relative;
    width: 100%;
    ${typewriterCursorElement}
`;

const blinkAnimation = keyframes`
    100% {
        visibility: hidden;
    }
`;

type StyledTypewriterPseudoTextProps = WithTheme<{
    $isAnimatingText?: boolean;
    $shouldHideCursor: TypewriterProps['shouldHideCursor'];
}>;

export const StyledTypewriterPseudoText = styled.span<StyledTypewriterPseudoTextProps>`
    opacity: 0;
    pointer-events: none;
    user-select: none;
    width: fit-content;

    ${({ $isAnimatingText, $shouldHideCursor }) =>
        $isAnimatingText &&
        !$shouldHideCursor &&
        css`
            &:after {
                animation: ${blinkAnimation} 1s steps(2, start) infinite;
                color: inherit;
                content: '|';
                font-size: 25px;
                position: relative;
                line-height: 0;
                vertical-align: baseline;
            }
        `}
`;

type StyledTypewriterTextProps = WithTheme<{
    $isAnimatingText?: boolean;
    $shouldRemainSingleLine: boolean;
}>;

export const StyledTypewriterText = styled.span<StyledTypewriterTextProps>`
    color: inherit;
    position: ${({ $isAnimatingText }) => ($isAnimatingText ? 'absolute' : 'relative')};
    width: fit-content;

    ${({ $isAnimatingText }) =>
        $isAnimatingText &&
        css`
            pointer-events: none;
        `}

    ${({ $shouldRemainSingleLine }) =>
        $shouldRemainSingleLine &&
        css`
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
        `}
`;
