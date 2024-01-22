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
    toSlider.style.background = gradient;
    fromSlider.style.background = gradient;
};
