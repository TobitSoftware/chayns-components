import type { Theme } from '../components/color-scheme-provider/ColorSchemeProvider';

export interface FillSlider {
    fromSlider: HTMLInputElement;
    toSlider: HTMLInputElement;
    fromValue?: number;
    toValue?: number;
    theme: Theme;
}

export const fillSlider = ({ fromSlider, toSlider, theme, fromValue, toValue }: FillSlider) => {
    const rangeDistance = Number(toSlider.max) - Number(toSlider.min);
    const fromPosition = Number(fromValue ?? fromSlider.value) - Number(toSlider.min);
    const toPosition = Number(toValue ?? toSlider.value) - Number(toSlider.min);

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
    maxValue: number;
    minValue: number;
    sliderWidth: number;
    thumbWidth: number;
    value: number;
    wrapperWidth: number;
}

export const calculateGradientOffset = ({
    maxValue,
    minValue,
    sliderWidth,
    thumbWidth,
    value,
    wrapperWidth,
}: CalculateGradientOffset): number => {
    const offset = (wrapperWidth - sliderWidth) / 2;
    const percentage = (value - minValue) / (maxValue - minValue);

    return offset - thumbWidth / 2 + percentage * sliderWidth;
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
    const percentage = (sliderValue - min) / (max - min);

    const leftAtMin = -10;
    const leftAtMax = -popupWidth + 25;

    return leftAtMin + percentage * (leftAtMax - leftAtMin);
};

export const getThumbMaxWidth = ({ maxNumber, thumbLabelFormatter }: GetThumbMaxWidthOptions) => {
    const element = document.createElement('span');

    element.style.height = '20px';
    element.style.display = 'flex';
    element.style.padding = '16px';
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
