import type { WithTheme } from '@chayns-components/core';
import styled from 'styled-components';

type StyledPresetColorProps = WithTheme<{ $color: string; $isSelected?: boolean }>;

export const StyledPresetColor = styled.div<StyledPresetColorProps>`
    background-color: ${({ $color }) => $color};
    width: 22px;
    aspect-ratio: 1;
    cursor: pointer;

    border-radius: 50px;
    border: ${({ $isSelected }) =>
        $isSelected ? '2px solid rgba(255, 255, 255, 1)' : '1px solid rgba(160, 160, 160, 0.3)'};
`;
