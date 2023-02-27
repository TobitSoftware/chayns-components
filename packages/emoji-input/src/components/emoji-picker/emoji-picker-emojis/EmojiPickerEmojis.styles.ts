import type { WithTheme } from '@chayns-components/core';
import styled from 'styled-components';

type StyledEmojiPickerEmojisProps = WithTheme<unknown>;

export const StyledEmojiPickerEmojis = styled.div<StyledEmojiPickerEmojisProps>`
    display: grid;
    flex: 1 1 auto;
    grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
    grid-template-rows: min-content;
    overflow-y: scroll;
    padding: 10px 0;
    position: relative;

    // Styles for custom scrollbar
    ::-webkit-scrollbar {
        width: 5px;
    }

    ::-webkit-scrollbar-track {
        background-color: transparent;
    }

    ::-webkit-scrollbar-button {
        background-color: transparent;
        height: 5px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: rgba(
            ${({ theme }: StyledEmojiPickerEmojisProps) => theme['text-rgb']},
            0.15
        );
        border-radius: 20px;
    }

    // Scrollbar styles for Firefox. The above styles are not supported in Firefox, these styles are
    // only supported in Firefox:
    * {
        scrollbar-color: rgba(
                ${({ theme }: StyledEmojiPickerEmojisProps) => theme['text-rgb']},
                0.15
            )
            transparent;
        scrollbar-width: thin;
    }
`;
