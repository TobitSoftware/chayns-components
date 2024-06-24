import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import type { Theme, WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledSlider = styled.div`
    width: 100%;
    height: 30px;
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    touch-action: none;
    user-select: none;
`;

type StyledSliderInputProps = WithTheme<{
    $min: number;
    $max: number;
    $value: number;
    $isInterval: boolean;
    $thumbWidth: number;
}>;

export const StyledSliderInput = styled(motion.input).attrs<StyledSliderInputProps>(
    ({ $isInterval, $value, $thumbWidth, $min, $max, theme }) => ({
        style: {
            pointerEvents: $isInterval ? 'none' : 'all',
            width: `calc(100% - ${$thumbWidth / 2}px)`,
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

type StyledSliderThumbProps = WithTheme<{ $position: number; $isBigSlider: boolean }>;

export const StyledSliderThumb = styled.div.attrs<StyledSliderThumbProps>(({ $position }) => ({
    style: {
        left: `${$position}px`,
    },
}))`
    min-width: 20px;
    height: 20px;
    cursor: pointer;
    border-radius: 100px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    pointer-events: none;
    z-index: 3;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 8px;
    white-space: nowrap;
    top: 5px;

    transition: top 0.2s ease 0s;

    ${({ $isBigSlider }) =>
        $isBigSlider &&
        css`
            top: -30px;

            &::after {
                background-color: inherit;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                border-right: 1px solid rgba(0, 0, 0, 0.1);
                box-shadow: 2px 2px 8px rgb(4 3 4 / 10%);
                content: '';
                height: 14px;
                position: absolute;
                width: 14px;
                z-index: -2;

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
        `}
`;

type StyledSliderThumbLabelProps = WithTheme<unknown>;

export const StyledSliderThumbLabel = styled.span<StyledSliderThumbLabelProps>`
    pointer-events: none;
    color: #222;
`;
