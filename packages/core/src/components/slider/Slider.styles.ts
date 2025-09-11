import { motion } from 'motion/react';
import styled from 'styled-components';
import type { Theme, WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledSliderProps = WithTheme<{ $isDisabled?: boolean }>;

export const StyledSlider = styled.div<StyledSliderProps>`
    width: 100%;
    height: 30px;
    cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')} !important;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    touch-action: none;
    user-select: none;
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
`;

type StyledSliderInputProps = WithTheme<{
    $background?: string;
    $isInterval: boolean;
    $thumbWidth: number;
}>;

export const StyledSliderInput = styled(motion.input).attrs<StyledSliderInputProps>(
    ({ $background, $isInterval, $thumbWidth }) => ({
        style: {
            pointerEvents: $isInterval ? 'none' : 'all',
            width: `calc(100% - ${$thumbWidth}px)`,
            background: $background,
        },
    }),
)`
    position: absolute;
    border-radius: 100px;
    -webkit-appearance: none;

    outline: none;
    cursor: pointer !important;
    z-index: 2;
    appearance: none;

    // Slider thumb for chrome
    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 50px;
        height: 20px;
        cursor: pointer;
        opacity: 0;
        pointer-events: all;
        position: relative;
    }

    // slider thumb for firefox

    &::-moz-range-thumb {
        width: 50px;
        height: 20px;
        cursor: pointer;
        opacity: 0;
        pointer-events: all;
        position: relative;
    }
`;

type StyledSliderThumbProps = WithTheme<{
    $position: number;
    $isBigSlider: boolean;
}>;

export const StyledSliderThumb = styled.div.attrs<StyledSliderThumbProps>(
    ({ $position, $isBigSlider }) => ({
        style: {
            left: `${$position}px`,
            height: `${$isBigSlider ? 0 : 20}px`,
        },
    }),
)`
    width: 20px;
    height: 20px;
    cursor: pointer;
    border-radius: 100px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    pointer-events: none;
    z-index: 5;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    white-space: nowrap;
    top: 5px;

    transition: top 0.2s ease 0s;
`;

type StyledSliderThumbLabelProps = WithTheme<{
    $position: number;
    $width: number;
    $isBigSlider: boolean;
}>;

export const StyledSliderThumbLabel = styled.span.attrs<StyledSliderThumbLabelProps>(
    ({ $position, $isBigSlider, $width }) => ({
        style: {
            minWidth: `${$width}px`,
            top: `-${$isBigSlider ? 56 : 48}px`,
            left: `${$position}px`,
        },
    }),
)`
    pointer-events: none;
    color: #222;

    height: 20px;
    cursor: pointer;
    border-radius: 3px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    z-index: 3;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    white-space: nowrap;

    transition: top 0.2s ease 0s;

    &::after {
        background-color: inherit;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        border-right: 1px solid rgba(0, 0, 0, 0.1);
        box-shadow: 0 0 6px 2px rgba(0, 0, 0, 0.4);
        content: '';
        height: 14px;
        position: absolute;
        width: 14px;
        z-index: -2;
        left: ${({ $position }) => $position * -1}px;
        transform: rotate(225deg);
        bottom: -7px;
    }

    &::before {
        background-color: inherit;
        bottom: 0;
        content: '';
        left: 0;
        position: absolute;
        right: 0;
        border-radius: 3px;
        top: 0;
        z-index: -1;
    }
`;

type StyledHighlightedStepProps = WithTheme<{
    $isDisabled: boolean;
    $isFilled: boolean;
    $leftPosition: number;
}>;

export const StyledHighlightedStep = styled.div<StyledHighlightedStepProps>`
    background-color: ${({ $isDisabled, $isFilled, theme }) => {
        if ($isDisabled) return 'rgb(215, 215, 215)';
        if ($isFilled) return theme['409'];
        return theme['403'];
    }};
    border-radius: 50%;
    height: 18px;
    left: ${({ $leftPosition }) => $leftPosition}px;
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 18px;
    z-index: 3;
`;
