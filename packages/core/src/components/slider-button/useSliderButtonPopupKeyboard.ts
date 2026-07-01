import { useCallback, useEffect, useState } from 'react';
import type { KeyboardEventHandler, MutableRefObject } from 'react';
import type { PopupRef } from '../../types/popup';
import type { SliderButtonItem } from '../../types/slider-button';

type UseSliderButtonPopupKeyboardProps = {
    isPopupOpen: boolean;
    popupItems: SliderButtonItem[];
    currentPopupId: string;
    shownItemsCount: number;
    popupItemRefs: MutableRefObject<Array<HTMLDivElement | null>>;
    popupRef: MutableRefObject<PopupRef | null>;
    focusThumb: VoidFunction;
    onSelectPopupItem: (id: string, index: number) => void;
};

export const useSliderButtonPopupKeyboard = ({
    isPopupOpen,
    popupItems,
    currentPopupId,
    shownItemsCount,
    popupItemRefs,
    popupRef,
    focusThumb,
    onSelectPopupItem,
}: UseSliderButtonPopupKeyboardProps) => {
    const [focusedPopupIndex, setFocusedPopupIndex] = useState(0);

    useEffect(() => {
        if (!isPopupOpen) {
            return;
        }

        const selectedIndex = popupItems.findIndex(({ id }) => id === currentPopupId);
        const initialIndex = selectedIndex >= 0 ? selectedIndex : 0;

        setFocusedPopupIndex(initialIndex);

        window.requestAnimationFrame(() => {
            popupItemRefs.current[initialIndex]?.focus();
        });
    }, [currentPopupId, isPopupOpen, popupItems, popupItemRefs]);

    const handlePopupKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
        (event) => {
            if (!isPopupOpen || popupItems.length === 0) {
                return;
            }

            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
                event.preventDefault();

                const direction = event.key === 'ArrowDown' ? 1 : -1;
                const nextIndex =
                    (focusedPopupIndex + direction + popupItems.length) % popupItems.length;

                setFocusedPopupIndex(nextIndex);
                popupItemRefs.current[nextIndex]?.focus();
                return;
            }

            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();

                const nextItem = popupItems[focusedPopupIndex];

                if (nextItem) {
                    onSelectPopupItem(nextItem.id, Math.max(0, shownItemsCount - 1));
                }

                return;
            }

            if (event.key === 'Escape' || event.key === 'ArrowLeft' || event.key === 'Tab') {
                event.preventDefault();
                popupRef.current?.hide();
                focusThumb();
            }
        },
        [
            focusThumb,
            focusedPopupIndex,
            isPopupOpen,
            onSelectPopupItem,
            popupItemRefs,
            popupItems,
            popupRef,
            shownItemsCount,
        ],
    );

    return { handlePopupKeyDown };
};
