/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-return */
import { useContext, useEffect, useState } from 'react';
import {
    ColorSchemeContext,
    type ColorSchemeContextProps,
} from '../components/color-scheme-provider/ColorSchemeProvider';

/**
 * Tracks whether focus highlighting should be visible for keyboard navigation.
 * Keyboard mode is enabled via Tab and reset by mouse interaction.
 */
export const useKeyboardFocusHighlighting = (isEnabledProp?: boolean): boolean => {
    const colorScheme = useContext<ColorSchemeContextProps | undefined>(ColorSchemeContext);
    const contextIsEnabled: boolean = colorScheme?.shouldEnableKeyboardHighlighting === true;
    const isEnabled: boolean = isEnabledProp === true || contextIsEnabled;

    const [isKeyboardNavigation, setIsKeyboardNavigation] = useState(false);

    useEffect(() => {
        const canListen = isEnabled && typeof window !== 'undefined';

        const enableKeyboardNavigation = () => {
            setIsKeyboardNavigation(true);
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Tab') {
                enableKeyboardNavigation();
            }
        };

        const handleFocusIn = (event: FocusEvent) => {
            const { target } = event;

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
        } else {
            setIsKeyboardNavigation(false);
        }

        return () => {
            if (canListen) {
                window.removeEventListener('keydown', handleKeyDown);
                window.removeEventListener('focusin', handleFocusIn);
                window.removeEventListener('mousedown', disableKeyboardNavigation);
                window.removeEventListener('mousemove', disableKeyboardNavigation);
            }
        };
    }, [isEnabled]);

    return Boolean(isEnabled && isKeyboardNavigation);
};
