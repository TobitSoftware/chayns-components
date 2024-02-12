import type { WithTheme } from '@chayns-components/core';
import type { Browser } from 'detect-browser';
import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { getFontFamily } from '../../utils/font';
import type { EmojiInputProps } from './EmojiInput';

type StyledEmojiInputProps = WithTheme<Pick<EmojiInputProps, 'isDisabled'>>;

export const StyledEmojiInput = styled.div<StyledEmojiInputProps>`
    align-items: center;
    background-color: ${({ theme }: StyledEmojiInputProps) => theme['100']};
    border-radius: 3px;
    display: flex;
    min-height: 42px;
    opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
    pointer-events: ${({ isDisabled }) => (isDisabled ? 'none' : 'initial')};
    position: relative;
    transition: opacity 0.3s ease;
`;

type StyledMotionEmojiInputProgressProps = WithTheme<unknown>;

export const StyledMotionEmojiInputProgress = styled(
    motion.div,
)<StyledMotionEmojiInputProgressProps>`
    background-color: ${({ theme }: StyledMotionEmojiInputProgressProps) => theme['402']};
    height: 100%;
    position: absolute;
    z-index: 2;
    border-radius: 3px;
`;

type StyledEmojiInputContentProps = {
    isRightElementGiven: boolean;
};

export const StyledEmojiInputContent = styled.div<StyledEmojiInputContentProps>`
    align-items: end;
    border: 1px solid rgba(160, 160, 160, 0.3);
    border-radius: 3px;
    display: flex;
    flex: 1 1 auto;
    gap: 10px;
    padding: 8px 10px;
    z-index: 3;

    ${({ isRightElementGiven }) =>
        isRightElementGiven &&
        css`
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            border-right-width: 0;
            padding-right: 0;
        `}
`;

type StyledEmojiInputEditorProps = WithTheme<{
    shouldShowContent: boolean;
    browser: Browser | 'bot' | null | undefined;
}>;

export const StyledMotionEmojiInputEditor = styled(motion.div)<StyledEmojiInputEditorProps>`
    color: ${({ theme, shouldShowContent }: StyledEmojiInputEditorProps) =>
        shouldShowContent ? theme.text : theme['100']};
    flex: 1 1 auto;
    font-family: ${getFontFamily};
    overflow-y: scroll;
    word-break: break-word;

    // This fixes a bug where the field is not editable in certain browsers.
    // This is for example the case on iOS 15 or older.
    -webkit-user-modify: read-write;
    -webkit-user-select: text;

    lc_mention,
    nerIgnore,
    nerReplace {
        font-weight: bold;

        span {
            opacity: 0.5;
        }
    }

    // Styles for custom scrollbar
    ${({ browser, theme }: StyledEmojiInputEditorProps) =>
        browser === 'firefox'
            ? css`
                  scrollbar-color: rgba(${theme['text-rgb']}, 0.15) transparent;
                  scrollbar-width: thin;
              `
            : css`
                  &::-webkit-scrollbar {
                      width: 5px;
                  }

                  &::-webkit-scrollbar-track {
                      background-color: transparent;
                  }

                  &::-webkit-scrollbar-button {
                      background-color: transparent;
                      height: 5px;
                  }

                  &::-webkit-scrollbar-thumb {
                      background-color: rgba(${theme['text-rgb']}, 0.15);
                      border-radius: 20px;
                  }
              `}
`;

export const StyledEmojiInputRightWrapper = styled.div`
    align-self: stretch;
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
    flex: 0 0 auto;
    overflow: hidden;
`;

type StyledEmojiInputLabelProps = WithTheme<{
    maxWidth: number;
    offsetWidth?: number;
}>;

export const StyledEmojiInputLabel = styled.label<StyledEmojiInputLabelProps>`
    color: rgba(${({ theme }: StyledEmojiInputLabelProps) => theme['text-rgb']}, 0.45);
    left: ${({ offsetWidth }) => (offsetWidth ? `${offsetWidth + 10}px` : '10px')};
    top: 12px;
    align-items: baseline;
    display: flex;
    flex: 0 0 auto;
    gap: 4px;
    line-height: 1.3;
    pointer-events: none;
    position: absolute;
    user-select: none;
    white-space: nowrap;
    max-width: ${({ maxWidth, offsetWidth }) => `${maxWidth - (offsetWidth ?? 0)}px`};
    overflow: hidden;
`;
