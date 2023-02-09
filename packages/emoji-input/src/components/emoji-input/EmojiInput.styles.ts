import type { WithTheme } from '@chayns-components/core';
import styled from 'styled-components';
import type { EmojiInputProps } from './EmojiInput';

type StyledEmojiInputProps = WithTheme<Pick<EmojiInputProps, 'isDisabled'>>;

export const StyledEmojiInput = styled.div<StyledEmojiInputProps>`
    align-items: center;
    background-color: ${({ theme }: StyledEmojiInputProps) => theme['100']};
    border: 1px solid rgba(160, 160, 160, 0.3);
    border-radius: 3px;
    display: flex;
    gap: 10px;
    justify-content: space-between;
    min-height: 42px;
    opacity: ${({ isDisabled }) => (isDisabled ? 0.5 : 1)};
    padding: 8px 10px;
    position: relative;
    transition: opacity 0.3s ease;
`;

type StyledEmojiInputEditorProps = WithTheme<Pick<EmojiInputProps, 'placeholder'>>;

export const StyledEmojiInputEditor = styled.div<StyledEmojiInputEditorProps>`
    color: ${({ theme }: StyledEmojiInputEditorProps) => theme.text};
    flex: 1 1 auto;
    font-family: 'Noto Color Emoji', 'Roboto Regular', 'Tahoma', serif;

    &:empty:not(:focus):before {
        content: '${({ placeholder }) => placeholder}';
        color: ${({ theme }: StyledEmojiInputEditorProps) => theme['006']};
    }
`;
