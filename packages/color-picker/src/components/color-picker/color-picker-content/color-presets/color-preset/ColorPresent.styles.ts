import type { WithTheme } from '@chayns-components/core';
import type { CSSProperties } from 'react';
import styled from 'styled-components';

type StyledColorPresetProps = WithTheme<{ color: CSSProperties['color'] }>;

export const StyledColorPreset = styled.div<StyledColorPresetProps>`
    box-shadow: 0 0 0 1px rgba(${({ theme }: StyledColorPresetProps) => theme['009-rgb']}, 0.08)
        inset;
    background-color: ${({ color }) => color};
    border-radius: 50%;
    height: 20px;
    width: 20px;
    cursor: pointer;
`;
