import { useCallback, useRef, useState } from 'react';
import { useDevice } from 'chayns-api';

interface UseMessageInteractionOptions {
    isEnabled?: boolean;
    longPressDuration?: number;
    onLongPress?: () => void;
}

export const useMessageInteraction = ({
    isEnabled = true,
    longPressDuration = 500,
    onLongPress,
}: UseMessageInteractionOptions) => {
    const longPressTimeoutRef = useRef<number | undefined>(undefined);

    const { isTouch } = useDevice();

    const [isHovered, setIsHovered] = useState(false);

    const clearLongPressTimeout = useCallback(() => {
        if (longPressTimeoutRef.current === undefined) {
            return;
        }

        window.clearTimeout(longPressTimeoutRef.current);
        longPressTimeoutRef.current = undefined;
    }, []);

    const handleMouseEnter = useCallback(() => {
        if (!isEnabled || isTouch) {
            return;
        }

        setIsHovered(true);
    }, [isEnabled, isTouch]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
    }, []);

    const handleTouchStart = useCallback(() => {
        if (!isEnabled || !isTouch || !onLongPress) {
            return;
        }

        clearLongPressTimeout();

        longPressTimeoutRef.current = window.setTimeout(() => {
            onLongPress();
        }, longPressDuration);
    }, [clearLongPressTimeout, isEnabled, isTouch, longPressDuration, onLongPress]);

    return {
        isHovered,
        shouldShowContextMenu: isEnabled && (isHovered || isTouch),
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onTouchStart: handleTouchStart,
        onTouchEnd: clearLongPressTimeout,
        onTouchCancel: clearLongPressTimeout,
        onTouchMove: clearLongPressTimeout,
    };
};
