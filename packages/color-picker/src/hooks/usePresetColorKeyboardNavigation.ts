import { type KeyboardEvent, useCallback } from 'react';

type UsePresetColorKeyboardNavigationOptions = {
    onFocusChange: (index: number) => void;
};

export const usePresetColorKeyboardNavigation = ({
    onFocusChange,
}: UsePresetColorKeyboardNavigationOptions) =>
    useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            const currentPreset =
                event.target instanceof HTMLElement
                    ? event.target.closest<HTMLElement>('[data-preset-color-index]')
                    : null;

            if (
                !currentPreset ||
                !['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)
            ) {
                return;
            }

            event.preventDefault();

            const currentIndex = Number(currentPreset.dataset.presetColorIndex);
            const presets = Array.from(
                currentPreset.parentElement?.querySelectorAll<HTMLElement>(
                    '[data-preset-color-index]',
                ) ?? [],
            );
            const currentRect = currentPreset.getBoundingClientRect();
            let nextPreset: HTMLElement | undefined;

            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                nextPreset = presets[currentIndex + (event.key === 'ArrowLeft' ? -1 : 1)];
            } else {
                const rowDirection = event.key === 'ArrowUp' ? -1 : 1;
                const targetTop = currentRect.top + rowDirection * currentRect.height;

                nextPreset = presets
                    .filter((preset) => {
                        const { top } = preset.getBoundingClientRect();
                        return rowDirection < 0 ? top < currentRect.top : top > currentRect.top;
                    })
                    .sort((left, right) => {
                        const leftRect = left.getBoundingClientRect();
                        const rightRect = right.getBoundingClientRect();
                        const leftDistance =
                            Math.abs(leftRect.top - targetTop) * 1000 +
                            Math.abs(leftRect.left - currentRect.left);
                        const rightDistance =
                            Math.abs(rightRect.top - targetTop) * 1000 +
                            Math.abs(rightRect.left - currentRect.left);
                        return leftDistance - rightDistance;
                    })[0];
            }

            const nextIndex = Number(nextPreset?.dataset.presetColorIndex);

            if (!Number.isFinite(nextIndex) || nextIndex === currentIndex) {
                return;
            }

            onFocusChange(nextIndex);
            nextPreset?.focus();
        },
        [onFocusChange],
    );
