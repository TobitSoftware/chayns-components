import { useEffect, useState } from 'react';

/**
 * Tracks whether focus highlighting should be visible for keyboard navigation.
 * Keyboard mode is enabled via Tab and reset by mouse interaction.
 */
export const useKeyboardFocusHighlighting = (isEnabled: boolean): boolean => {
    const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);

    useEffect(() => {
        const canListen = isEnabled && typeof window !== 'undefined';

        const enableKeyboardNavigation = () => {
            setIsKeyboardNavigation((current) => (current ? current : true));
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Tab') {
                enableKeyboardNavigation();
            }
        };

        const handleFocusIn = (event: FocusEvent) => {
            const target = event.target;

            // Fallback for first tab-focus when the keydown was not observed.
            if (
                target instanceof HTMLElement &&
                typeof target.matches === 'function' &&
                target.matches(':focus-visible')
            ) {
                enableKeyboardNavigation();
            }
        };

        const disableKeyboardNavigation = () => {
            setIsKeyboardNavigation((current) => (current ? false : current));
        };

        if (canListen) {
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('focusin', handleFocusIn);
            window.addEventListener('mousedown', disableKeyboardNavigation);
            window.addEventListener('mousemove', disableKeyboardNavigation);
            window.addEventListener('click', disableKeyboardNavigation);
        } else {
            setIsKeyboardNavigation(false);
        }

        return () => {
            if (canListen) {
                window.removeEventListener('keydown', handleKeyDown);
                window.removeEventListener('focusin', handleFocusIn);
                window.removeEventListener('mousedown', disableKeyboardNavigation);
                window.removeEventListener('mousemove', disableKeyboardNavigation);
                window.removeEventListener('click', disableKeyboardNavigation);
            }
        };
    }, [isEnabled]);

    return isEnabled && isKeyboardNavigation;
};
