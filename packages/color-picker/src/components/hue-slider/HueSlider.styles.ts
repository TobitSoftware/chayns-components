import type { WithTheme } from '@chayns-components/core';
import type { CSSProperties } from 'react';
import styled from 'styled-components';

export const StyledHueSlider = styled.div`
    width: 100%;
    height: 30px;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

type StyledHueSliderInputProps = WithTheme<{
    $color: CSSProperties['color'];
}>;

export const StyledHueSliderInput = styled.input<StyledHueSliderInputProps>`
    width: calc(100% - 10px);
    border-radius: 100px;
    -webkit-appearance: none;
    height: 10px;
    background: linear-gradient(
        to right,
        hsl(0, 100%, 50%),
        hsl(30, 100%, 50%),
        hsl(60, 100%, 50%),
        hsl(90, 100%, 50%),
        hsl(120, 100%, 50%),
        hsl(150, 100%, 50%),
        hsl(180, 100%, 50%),
        hsl(210, 100%, 50%),
        hsl(240, 100%, 50%),
        hsl(270, 100%, 50%),
        hsl(300, 100%, 50%),
        hsl(330, 100%, 50%),
        hsl(360, 100%, 50%)
    );
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;

    // Slider thumb for chrome
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        opacity: 0;
        cursor: pointer;
        border-radius: 50%;
    }

    // slider thumb for firefox
    &::-moz-range-thumb {
        width: 20px;
        opacity: 0;
        height: 20px;
        cursor: pointer;
        border-radius: 50%;
    }
`;

type StyledHueSliderThumbProps = WithTheme<{ $position: number; $color: CSSProperties['color'] }>;

export const StyledHueSliderThumb = styled.div.attrs<StyledHueSliderThumbProps>(
    ({ $position, $color }) => ({
        style: {
            left: `${$position}px`,
            backgroundColor: $color,
        },
    }),
)`
    min-width: 20px;
    height: 20px;
    cursor: pointer;
    border-radius: 100px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    pointer-events: none;
    z-index: 3;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    white-space: nowrap;
`;
