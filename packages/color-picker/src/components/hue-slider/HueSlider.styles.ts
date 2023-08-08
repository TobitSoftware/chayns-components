import type { WithTheme } from '@chayns-components/core';
import type { CSSProperties } from 'react';
import styled from 'styled-components';

export const StyledHueSlider = styled.div`
    width: 100%;
    cursor: pointer;
`;

type StyledHueSliderInputProps = WithTheme<{
    color: CSSProperties['color'];
}>;

export const StyledHueSliderInput = styled.input<StyledHueSliderInputProps>`
    width: 100%;
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
        background-color: ${({ color }) => color};
        cursor: pointer;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    }

    // slider thumb for firefox
    &::-moz-range-thumb {
        width: 20px;
        height: 20px;
        background-color: ${({ color }) => color};
        cursor: pointer;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    }
`;
