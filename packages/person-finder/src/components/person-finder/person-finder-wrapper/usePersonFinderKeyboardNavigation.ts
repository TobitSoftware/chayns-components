import { type KeyboardEvent, type RefObject, useCallback } from 'react';

type UsePersonFinderKeyboardNavigationOptions = {
    isEnabled: boolean;
    isOpen: boolean;
    inputWrapperRef: RefObject<HTMLDivElement>;
    resultsRef: RefObject<HTMLDivElement>;
    onClose: VoidFunction;
};

export const usePersonFinderKeyboardNavigation = ({
    isEnabled,
    isOpen,
    inputWrapperRef,
    resultsRef,
    onClose,
}: UsePersonFinderKeyboardNavigationOptions) =>
    useCallback(
        (event: KeyboardEvent<HTMLDivElement>) => {
            if (!isEnabled) {
                return;
            }

            if (event.key === 'Escape' && isOpen) {
                event.preventDefault();
                onClose();
                inputWrapperRef.current?.querySelector<HTMLInputElement>('input')?.focus();
                return;
            }

            const results = Array.from(
                resultsRef.current?.querySelectorAll<HTMLElement>('[data-person-finder-result]') ??
                    [],
            );

            if (event.target instanceof HTMLInputElement && event.key === 'ArrowDown') {
                const firstResult = results[0];

                if (firstResult) {
                    event.preventDefault();
                    firstResult.focus();
                }

                return;
            }

            const currentResult =
                event.target instanceof HTMLElement
                    ? event.target.closest<HTMLElement>('[data-person-finder-result]')
                    : null;

            if (!currentResult || (event.key !== 'ArrowUp' && event.key !== 'ArrowDown')) {
                return;
            }

            // Keep arrow keys within the result list instead of scrolling the dropdown or page.
            event.preventDefault();

            const currentIndex = results.indexOf(currentResult);

            if (event.key === 'ArrowUp' && currentIndex <= 0) {
                inputWrapperRef.current?.querySelector<HTMLInputElement>('input')?.focus();
                return;
            }

            results[currentIndex + (event.key === 'ArrowDown' ? 1 : -1)]?.focus();
        },
        [inputWrapperRef, isEnabled, isOpen, onClose, resultsRef],
    );
