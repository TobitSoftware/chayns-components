import type { WithTheme } from '@chayns-components/core';
import type { CSSProperties } from 'react';
import styled from 'styled-components';

export const StyledTransparencySlider = styled.div`
    width: 100%;
    height: 30px;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
`;

export const StyledTransparencySliderBackground = styled.div`
    height: 10px;
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
    border-radius: 100px;
    background-size: 8px 8px;
    content: '';
    position: absolute;
    width: 100%;
`;

type StyledTransparencySliderInputProps = WithTheme<{ $color?: string }>;

export const StyledTransparencySliderInput = styled.input.attrs<StyledTransparencySliderInputProps>(
    ({ $color }) => ({
        style: {
            background: `linear-gradient(90deg, ${$color ?? ''}, transparent)`,
        },
    }),
)`
    width: 100%;
    border-radius: 100px;
    -webkit-appearance: none;
    height: 10px;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    z-index: 4;

    // Slider thumb for chrome
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        cursor: pointer;
        border-radius: 50%;
    }

    // slider thumb for firefox
    &::-moz-range-thumb {
        width: 20px;
        height: 20px;
        cursor: pointer;
        border-radius: 50%;
    }
`;

type StyledTransparencySliderThumbWrapperProps = WithTheme<{
    $position: number;
}>;

export const StyledTransparencySliderThumbWrapper = styled.div.attrs<StyledTransparencySliderThumbWrapperProps>(
    ({ $position }) => ({
        style: {
            left: $position,
        },
    }),
)`
    position: absolute;
    min-width: 20px;
    height: 20px;
    cursor: pointer;
    border-radius: 100px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    pointer-events: none;
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    padding: 0 8px;
    white-space: nowrap;
`;

export const StyledTransparencySliderThumbBackground = styled.div`
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

type StyledTransparencySliderThumbProps = WithTheme<{
    $color: CSSProperties['color'];
}>;

export const StyledTransparencySliderThumb = styled.div.attrs<StyledTransparencySliderThumbProps>(
    ({ $color }) => ({
        style: {
            backgroundColor: $color,
        },
    }),
)`
    height: 100%;
    width: 100%;
    position: absolute;
`;
