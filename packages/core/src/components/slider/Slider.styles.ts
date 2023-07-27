import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledSlider = styled.div`
    width: 100%;
    cursor: pointer;
`;

type StyledSliderInputProps = WithTheme<{ min: number; max: number; value: number }>;

export const StyledSliderInput = styled.input<StyledSliderInputProps>`
    width: 100%;
    border-radius: 100px;
    -webkit-appearance: none;
    height: 10px;
    background: ${({ theme, min, max, value }: StyledSliderInputProps) =>
        `linear-gradient(
            to right,
            ${theme['409'] ?? ''} 0%,
            ${theme['409'] ?? ''}
            ${((value - min) / (max - min)) * 100}%,
            ${theme['403'] ?? ''}
            ${((value - min) / (max - min)) * 100}%,
            ${theme['403'] ?? ''}
        )`};

    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    cursor: pointer !important;

    // Slider thumb for chrome
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        background-color: ${({ theme }: StyledSliderInputProps) => theme['100']};
        cursor: pointer;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    }

    // slider thumb for firefox
    &::-moz-range-thumb {
        width: 20px;
        height: 20px;
        background-color: ${({ theme }: StyledSliderInputProps) => theme['100']};
        cursor: pointer;
        border-radius: 50%;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    }
`;
