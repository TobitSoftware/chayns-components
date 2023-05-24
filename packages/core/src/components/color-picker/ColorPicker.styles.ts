import type { CSSProperties } from 'react';
import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledColorPicker = styled.div``;

export const StyledColorPickerLabelWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

type StyledColorPickerDotProps = WithTheme<{ color: CSSProperties['color'] }>;

export const StyledColorPickerDot = styled.div<StyledColorPickerDotProps>`
    color: ${({ color }) => color};
    border-radius: 50%;
    height: 15px;
    width: 15px;
`;

type StyledColorPickerLabelProps = WithTheme<unknown>;

export const StyledColorPickerLabel = styled.label<StyledColorPickerLabelProps>`
    color: ${({ theme }: StyledColorPickerLabelProps) => theme.text};
`;

export const StyledColorPickerContent = styled.div``;
