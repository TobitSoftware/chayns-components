import type { CSSProperties } from 'react';
import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledTextArea = styled.div``;

type StyledTextAreaInputProps = WithTheme<{
    maxHeight: CSSProperties['maxHeight'];
    isOverflowing: boolean;
}>;

export const StyledTextAreaInput = styled.textarea<StyledTextAreaInputProps>`
    border-radius: 3px;
    border: 1px solid rgba(160, 160, 160, 0.3);
    color: ${({ theme }: StyledTextAreaInputProps) => theme['006']};
    resize: none;
    overflow-y: ${({ isOverflowing }) => (isOverflowing ? 'scroll' : 'hidden')};
    max-height: ${({ maxHeight }: StyledTextAreaInputProps) => maxHeight};
    width: 100%;
    padding: 8px 10px;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(160, 160, 160, 1);
        border-radius: 3px;
    }
`;
