import styled, { css } from 'styled-components';
import type { EmojiInputProps } from './EmojiInput';
import { EmojiInputMode } from './EmojiInput';

type StyledEmojiInputProps = Pick<EmojiInputProps, 'mode' | 'value'>;

// ${({ }: StyledEmojiInputProps) => null};
export const StyledEmojiInputWrapper = styled.div<StyledEmojiInputProps>`
    ${({ mode }) => {
        switch (mode) {
            case EmojiInputMode.Pure:
                return css`
                    background: white;
                    color: black;
                `;
            case EmojiInputMode.OnlyInput:
                return css`
                    background: white;
                    color: black;
                `;
            case EmojiInputMode.OnlyButton:
                return css`
                    background: white;
                    color: black;
                `;
            case EmojiInputMode.Normal:
            default:
                return css`
                    background: white;
                    color: black;
                `;
        }
    }}
`;

export const StyledDivInput = styled.div<StyledEmojiInputProps>`
    width: 100%;
`;

export const StyledPlaceholder = styled.div<StyledEmojiInputProps>``;
