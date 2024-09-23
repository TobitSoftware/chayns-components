import type { Theme } from '../components/color-scheme-provider/ColorSchemeProvider';

export interface FillSlider {
    fromSlider: HTMLInputElement;
    toSlider: HTMLInputElement;
    theme: Theme;
}

export const fillSlider = ({ fromSlider, toSlider, theme }: FillSlider) => {
    const rangeDistance = Number(toSlider.max) - Number(toSlider.min);
    const fromPosition = Number(fromSlider.value) - Number(toSlider.min);
    const toPosition = Number(toSlider.value) - Number(toSlider.min);

    const backgroundColor = theme['403'];
    const trackColor = theme['409'];

    if (!backgroundColor || !trackColor) {
        return;
    }

    const gradient = `linear-gradient(
      to right,
      ${backgroundColor} 0%,
      ${backgroundColor} ${(fromPosition / rangeDistance) * 100}%,
      ${trackColor} ${(fromPosition / rangeDistance) * 100}%,
      ${trackColor} ${(toPosition / rangeDistance) * 100}%,
      ${backgroundColor} ${(toPosition / rangeDistance) * 100}%,
      ${backgroundColor} 100%)`;

    // Apply the gradient to the appropriate slider
    // eslint-disable-next-line no-param-reassign
    toSlider.style.background = gradient;
    // eslint-disable-next-line no-param-reassign
    fromSlider.style.background = gradient;
};

interface CalculateGradientOffset {
    value: number;
    min: number;
    max: number;
    thumbWidth: number;
    containerWidth: number;
}

export const calculateGradientOffset = ({
    value,
    min,
    max,
    thumbWidth,
    containerWidth,
}: CalculateGradientOffset): number => {
    const percentage = (value - min) / (max - min);

    const adjustedWidth = containerWidth - thumbWidth * 0.25;

    return percentage * adjustedWidth + thumbWidth / 2;
};

interface GetThumbMaxWidthOptions {
    maxNumber: number;
    thumbLabelFormatter?: (value: number) => string;
}

interface CalculatePopupPositionOptions {
    sliderValue: number;
    min: number;
    max: number;
    popupWidth: number;
}

export const calculatePopupPosition = ({
    sliderValue,
    min,
    max,
    popupWidth,
}: CalculatePopupPositionOptions) => {
    // Berechnung des Prozentwerts des Sliders zwischen min und max
    const percentage = (sliderValue - min) / (max - min);

    // Berechnung des linken Versatzes bei 0% (-10px) und bei 100% (-popupWidth + 20px)
    const leftAtMin = -10;
    const leftAtMax = -popupWidth + 25;

    // Berechnung des dynamischen Left-Werts basierend auf dem Slider-Prozentwert
    return leftAtMin + percentage * (leftAtMax - leftAtMin);
};

export const getThumbMaxWidth = ({ maxNumber, thumbLabelFormatter }: GetThumbMaxWidthOptions) => {
    const element = document.createElement('span');

    element.style.height = '20px';
    element.style.display = 'flex';
    element.style.padding = '0 8px';
    element.style.whiteSpace = 'nowrap';
    element.style.minWidth = '20px';
    element.style.opacity = '0';
    element.style.position = 'absolute';

    element.textContent =
        typeof thumbLabelFormatter === 'function'
            ? thumbLabelFormatter(maxNumber)
            : String(maxNumber);

    document.body.appendChild(element);

    const width = element.offsetWidth;

    document.body.removeChild(element);

    return width;
};
