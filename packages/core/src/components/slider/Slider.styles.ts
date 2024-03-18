import styled from 'styled-components';
import type { Theme, WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledSlider = styled.div`
    width: 100%;
    height: 30px;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
`;

type StyledSliderInputProps = WithTheme<{
    $min: number;
    $max: number;
    $value: number;
    $isInterval: boolean;
}>;

export const StyledSliderInput = styled.input.attrs<StyledSliderInputProps>(
    ({ $isInterval, $value, $min, $max, theme }) => ({
        style: {
            pointerEvents: $isInterval ? 'none' : 'all',
            background: !$isInterval
                ? `linear-gradient(
            to right,
            ${(theme as Theme)['409'] ?? ''} 0%,
            ${(theme as Theme)['409'] ?? ''}
            ${(($value - $min) / ($max - $min)) * 100}%,
            ${(theme as Theme)['403'] ?? ''}
            ${(($value - $min) / ($max - $min)) * 100}%,
            ${(theme as Theme)['403'] ?? ''}
        )`
                : undefined,
        },
    }),
)`
    position: absolute;
    width: 100%;
    border-radius: 100px;
    -webkit-appearance: none;
    height: 10px;
    outline: none;
    cursor: pointer !important;
    z-index: 2;
    appearance: none;

    // Slider thumb for chrome
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 20px;
        height: 20px;
        cursor: pointer;
        opacity: 0;
        pointer-events: all;
        position: relative;
    }

    // slider thumb for firefox

    &::-moz-range-thumb {
        width: 20px;
        height: 20px;
        cursor: pointer;
        opacity: 0;
        pointer-events: all;
        position: relative;
    }
`;

type StyledSliderThumbProps = WithTheme<{ $position: number }>;

export const StyledSliderThumb = styled.div.attrs<StyledSliderThumbProps>(
    ({ $position, theme }) => ({
        style: {
            left: `${$position}px`,
            backgroundColor: (theme as Theme)['100'],
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

export const StyledSliderThumbLabel = styled.span`
    pointer-events: none;
`;
