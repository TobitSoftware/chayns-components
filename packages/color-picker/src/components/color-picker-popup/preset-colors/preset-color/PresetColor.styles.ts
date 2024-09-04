import type { WithTheme } from '@chayns-components/core';
import styled from 'styled-components';

type StyledPresetColorProps = WithTheme<{ $isSelected?: boolean }>;

export const StyledPresetColor = styled.div<StyledPresetColorProps>`
    width: 22px;
    aspect-ratio: 1;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border-radius: 50px;
    border: ${({ $isSelected }) =>
        $isSelected ? '2px solid rgba(255, 255, 255, 1)' : '1px solid rgba(160, 160, 160, 0.3)'};
`;

type StyledPresetColorColorProps = WithTheme<{ $color: string; $isSelected?: boolean }>;

export const StyledPresetColorColor = styled.div<StyledPresetColorColorProps>`
    background-color: ${({ $color }) => $color};
    height: 100%;
    width: 100%;
    position: absolute;
`;

export const StyledPresetColorBackground = styled.div`
    position: absolute;
    background-color: #fff;
    background-image: linear-gradient(45deg, #a0a0a0 25%, #0000 0),
        linear-gradient(-45deg, #a0a0a0 25%, #0000 0), linear-gradient(45deg, #0000 75%, #a0a0a0 0),
        linear-gradient(-45deg, #0000 75%, #a0a0a0 0);
    background-position:
        0 0,
        0 4px,
        4px -4px,
        -4px 0;
    background-repeat: repeat;
    background-size: 8px 8px;
    height: 100%;
    width: 100%;
`;
