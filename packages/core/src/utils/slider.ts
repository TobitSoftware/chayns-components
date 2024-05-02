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

interface GetThumbMaxWidthOptions {
    maxNumber: number;
    thumbLabelFormatter?: (value: number) => string;
}

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
