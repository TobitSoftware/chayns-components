import type { WithTheme } from '@chayns-components/core';
import type { CSSProperties } from 'react';
import styled from 'styled-components';

export const StyledColorPicker = styled.span``;

export const StyledColorPickerLabelWrapper = styled.span`
    display: flex;
    align-items: center;
    gap: 5px;
    width: fit-content;
`;

type StyledColorPickerDotProps = WithTheme<{ color: CSSProperties['color'] }>;

export const StyledColorPickerDot = styled.div<StyledColorPickerDotProps>`
    background-color: ${({ color }) => color};
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(${({ theme }: StyledColorPickerDotProps) => theme['009-rgb']}, 0.08)
        inset;
    height: 15px;
    width: 15px;
`;

type StyledColorPickerLabelProps = WithTheme<unknown>;

export const StyledColorPickerLabel = styled.label<StyledColorPickerLabelProps>`
    color: ${({ theme }: StyledColorPickerLabelProps) => theme.text};
`;
