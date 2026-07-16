/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return */
import { useContext, useEffect, useState } from 'react';
import {
    ColorSchemeContext,
    type ColorSchemeContextProps,
} from '../components/color-scheme-provider/ColorSchemeProvider';

const KEYBOARD_NAVIGATION_KEYS = new Set([
    'Tab',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'Enter',
    ' ',
    'Spacebar',
    'Escape',
    'Home',
    'End',
    'PageUp',
    'PageDown',
]);

let isKeyboardFocusHighlightingActive = false;

export const getIsKeyboardFocusHighlightingActive = (): boolean =>
    isKeyboardFocusHighlightingActive;

/**
 * Tracks whether focus highlighting should be visible for keyboard navigation.
 * Keyboard mode is enabled via Tab and reset by mouse interaction.
 */
export const useKeyboardFocusHighlighting = (isEnabledProp?: boolean): boolean => {
    const colorScheme = useContext<ColorSchemeContextProps | undefined>(ColorSchemeContext);
    const contextIsEnabled: boolean = colorScheme?.shouldEnableKeyboardHighlighting === true;
    const isEnabled: boolean = isEnabledProp ?? contextIsEnabled;

    const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);

    useEffect(() => {
        const canListen = isEnabled && typeof window !== 'undefined';

        const enableKeyboardNavigation = () => {
            isKeyboardFocusHighlightingActive = true;
            setIsKeyboardNavigation(true);
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey || event.altKey || event.metaKey) {
                return;
            }

            if (!KEYBOARD_NAVIGATION_KEYS.has(event.key)) {
                return;
            }

            enableKeyboardNavigation();
        };

        const handleFocusIn = (event: FocusEvent) => {
            if (event.target instanceof HTMLElement && event.target.matches(':focus-visible')) {
                enableKeyboardNavigation();
            }
        };

        const disableKeyboardNavigation = () => {
            isKeyboardFocusHighlightingActive = false;
            setIsKeyboardNavigation((current) => (current ? false : current));
        };

        if (canListen) {
            window.addEventListener('keydown', handleKeyDown);
            document.addEventListener('focusin', handleFocusIn, true);
            window.addEventListener('mousedown', disableKeyboardNavigation);
            window.addEventListener('mousemove', disableKeyboardNavigation);
        } else {
            isKeyboardFocusHighlightingActive = false;
            setIsKeyboardNavigation(false);
        }

        return () => {
            if (canListen) {
                window.removeEventListener('keydown', handleKeyDown);
                document.removeEventListener('focusin', handleFocusIn, true);
                window.removeEventListener('mousedown', disableKeyboardNavigation);
                window.removeEventListener('mousemove', disableKeyboardNavigation);
            }
        };
    }, [isEnabled]);

    return Boolean(isEnabled && isKeyboardNavigation);
};
