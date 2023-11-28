import type { WithTheme } from '@chayns-components/core';
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

    ${({ isRightElementGiven }) =>
        isRightElementGiven &&
        css`
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            border-right-width: 0;
            padding-right: 0;
        `}
`;

type StyledEmojiInputEditorProps = WithTheme<unknown>;

export const StyledMotionEmojiInputEditor = styled(motion.div)<StyledEmojiInputEditorProps>`
    color: ${({ theme }: StyledEmojiInputEditorProps) => theme.text};
    flex: 1 1 auto;
    font-family: ${getFontFamily};
    overflow-y: scroll;
    word-break: break-word;

    // This fixes a bug where the field is not editable in certain browsers.
    // This is for example the case on iOS 15 or older.
    -webkit-user-modify: read-write;
    -webkit-user-select: text;

    lc_mention {
        font-weight: bold;

        span {
            opacity: 0.5;
        }
    }

    // Styles for custom scrollbar
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
        background-color: rgba(
            ${({ theme }: StyledEmojiInputEditorProps) => theme['text-rgb']},
            0.15
        );
        border-radius: 20px;
    }

    // Scrollbar styles for Firefox. The above styles are not supported in Firefox, these styles are
    // only supported in Firefox:
    * {
        scrollbar-color: rgba(
                ${({ theme }: StyledEmojiInputEditorProps) => theme['text-rgb']},
                0.15
            )
            transparent;
        scrollbar-width: thin;
    }
`;

export const StyledEmojiInputRightWrapper = styled.div`
    align-self: stretch;
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
    flex: 0 0 auto;
    overflow: hidden;
`;

type StyledEmojiInputLabelProps = WithTheme<unknown>;

export const StyledEmojiInputLabel = styled.label<StyledEmojiInputLabelProps>`
    color: rgba(${({ theme }: StyledEmojiInputLabelProps) => theme['text-rgb']}, 0.45);
    left: 10px;
    top: 12px;
    align-items: baseline;
    display: flex;
    flex: 0 0 auto;
    gap: 4px;
    line-height: 1.3;
    pointer-events: none;
    position: absolute;
    user-select: none;
`;
