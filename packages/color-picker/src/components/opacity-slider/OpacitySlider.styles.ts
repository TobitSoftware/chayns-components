import type { WithTheme } from '@chayns-components/core';
import type { CSSProperties } from 'react';
import styled from 'styled-components';

export const StyledOpacitySlider = styled.div`
    position: relative;
    width: 100%;
    cursor: pointer;
`;

export const StyledOpacitySliderBackground = styled.div`
    width: 100%;
    height: 10px;
    border-radius: 100px;
    object-fit: cover;

    background: url('https://t3.ftcdn.net/jpg/03/76/74/78/360_F_376747823_L8il80K6c2CM1lnPYJhhJZQNl6ynX1yj.jpg')
        repeat-x;
`;

type StyledOpacitySliderInputProps = WithTheme<{
    color: CSSProperties['color'];
    opacity: number;
    value: number;
}>;

export const StyledOpacitySliderInput = styled.input<StyledOpacitySliderInputProps>`
    position: absolute;
    width: 100%;
    border-radius: 100px;
    -webkit-appearance: none;
    height: 10px;
    background: ${({ color, value }) =>
        `linear-gradient(
            to right,
            ${color ?? ''} 1%,
            ${color ?? ''}
            ${value * 100}%,
            transparent
            ${value * 100}%,
            transparent
        )`};
    outline: none;
    opacity: 1;
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
