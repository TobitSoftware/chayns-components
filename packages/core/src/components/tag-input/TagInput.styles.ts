import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledTagInputProps = WithTheme<unknown>;

export const StyledTagInput = styled.div<StyledTagInputProps>`
    display: flex;
    flex-wrap: wrap;
    min-height: 42px;
    padding: 5px;
    align-items: center;
    gap: 6px;
    background-color: ${({ theme }: StyledTagInputProps) => theme['100']};
    border: 1px solid rgba(160, 160, 160, 0.3);
`;

export const StyledTagInputTagWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const StyledTagInputTagWrapperText = styled.p`
    margin: 0;
    flex-grow: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

type StyledTagInputTagInputProps = WithTheme<unknown>;

export const StyledTagInputTagInput = styled.input<StyledTagInputTagInputProps>`
    border: none;
    height: 24px;
    flex-grow: 1;
    background-color: transparent;
    color: ${({ theme }: StyledTagInputTagInputProps) => theme.text};
`;
