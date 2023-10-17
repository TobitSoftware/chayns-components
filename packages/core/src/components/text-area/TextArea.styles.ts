import type { CSSProperties } from 'react';
import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import { motion } from 'framer-motion';

export const StyledTextArea = styled.div`
    display: flex;
    flex: 1 1 auto;
    min-width: 0;
    margin: 8px 10px;
    position: relative;
`;

type StyledTextAreaInputProps = WithTheme<{
    maxHeight: CSSProperties['maxHeight'];
    isOverflowing: boolean;
}>;

export const StyledTextAreaInput = styled.textarea<StyledTextAreaInputProps>`
    border-radius: 3px;
    border: 1px solid rgba(160, 160, 160, 0.3);
    background-color: ${({ theme }: StyledTextAreaInputProps) => theme['100']};
    color: ${({ theme }: StyledTextAreaInputProps) => theme.text};
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

type StyledTextAreaLabelProps = WithTheme<unknown>;

export const StyledTextAreaLabel = styled.label<StyledTextAreaLabelProps>`
    color: ${({ theme }: StyledTextAreaLabelProps) => theme['006']};
    left: 10px;
    top: 11px;
    align-items: baseline;
    display: flex;
    flex: 0 0 auto;
    gap: 4px;
    line-height: 1.3;
    pointer-events: none;
    position: absolute;
    user-select: none;
`;
