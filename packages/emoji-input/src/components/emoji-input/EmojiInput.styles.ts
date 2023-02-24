import type { WithTheme } from '@chayns-components/core';
import styled, { css } from 'styled-components';
import { getIsMobile } from '../../utils/environment';
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
        `}
`;

type StyledEmojiInputEditorProps = WithTheme<Pick<EmojiInputProps, 'placeholder'>>;

export const StyledEmojiInputEditor = styled.div<StyledEmojiInputEditorProps>`
    color: ${({ theme }: StyledEmojiInputEditorProps) => theme.text};
    flex: 1 1 auto;
    word-break: break-word;

    ${() => {
        if (getIsMobile()) {
            return css`
                font-family: 'Roboto Regular', 'Tahoma', serif;
            `;
        }

        return css`
            font-family: 'Noto Color Emoji', 'Roboto Regular', 'Tahoma', serif;
        `;
    }}

    &:empty:not(:focus):before {
        content: '${({ placeholder }) => placeholder}';
        color: ${({ theme }: StyledEmojiInputEditorProps) => theme['006']};
    }
`;

export const StyledEmojiInputRightWrapper = styled.div`
    align-self: stretch;
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
    flex: 0 0 auto;
    overflow: hidden;
`;
