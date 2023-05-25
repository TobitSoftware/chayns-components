import type { CSSProperties } from 'react';
import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledColorPicker = styled.div``;

export const StyledColorPickerLabelWrapper = styled.span`
    display: flex;
    align-items: center;
    gap: 5px;
    width: fit-content;
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
