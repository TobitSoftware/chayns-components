import { useCallback } from 'react';
import type { KeyboardEventHandler } from 'react';
import type { SliderButtonItem } from '../../types/slider-button';

type UseSliderButtonThumbKeyboardProps = {
    currentId: string;
    currentIndex: number;
    shownItemsCount: number;
    items: SliderButtonItem[];
    onSelectThumbItem: (id: string, index: number) => void;
};

export const useSliderButtonThumbKeyboard = ({
    currentId,
    currentIndex,
    shownItemsCount,
    items,
    onSelectThumbItem,
}: UseSliderButtonThumbKeyboardProps) => {
    const handleThumbKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
        (event) => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault();

                const direction = event.key === 'ArrowRight' ? 1 : -1;
                const maxVisibleIndex = Math.max(0, shownItemsCount - 1);
                const nextIndex = Math.min(maxVisibleIndex, Math.max(0, currentIndex + direction));

                if (nextIndex === currentIndex) {
                    return;
                }

                const hasMoreItems = items.length > shownItemsCount;
                const nextId =
                    hasMoreItems && nextIndex === shownItemsCount - 1
                        ? 'more'
                        : items[nextIndex]?.id;

                if (nextId) {
                    onSelectThumbItem(nextId, nextIndex);
                }

                return;
            }

            if (event.key !== 'Enter' && event.key !== ' ') {
                return;
            }

            event.preventDefault();

            const fallbackId = currentId || items[currentIndex]?.id || items[0]?.id;

            if (fallbackId) {
                onSelectThumbItem(fallbackId, currentIndex);
            }
        },
        [currentId, currentIndex, items, onSelectThumbItem, shownItemsCount],
    );

    return { handleThumbKeyDown };
};
