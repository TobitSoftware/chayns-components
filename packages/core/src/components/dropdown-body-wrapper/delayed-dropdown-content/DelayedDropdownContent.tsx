import { AnimatePresence } from 'motion/react';
import React, { FC, ReactNode, useCallback, useEffect, useRef } from 'react';
import { StyledMotionDelayedDropdownContent } from './DelayedDropdownContent.styles';
import {
    DropdownCoordinates,
    DropdownMeasurements,
    DropdownTransform,
} from '../../../types/dropdown';

const ANIMATION_DELAY_MS = 200;

export type DelayedDropdownContentProps = {
    /**
     * The content to be rendered inside the dropdown.
     */
    children: ReactNode;
    /**
     * The absolute coordinates used to position the dropdown.
     */
    coordinates: DropdownCoordinates;
    /**
     * Callback that returns the dimensions of the dropdown after measuring.
     */
    onMeasure?: (measurements: DropdownMeasurements) => void;
    /**
     * Whether the dropdown should be rendered and animated in.
     */
    shouldShowContent: boolean;
    /**
     * CSS transform data (e.g. translate offsets) to apply for positioning.
     */
    transform: DropdownTransform;
};

const DelayedDropdownContent: FC<DelayedDropdownContentProps> = ({
    children,
    shouldShowContent,
    onMeasure,
    coordinates,
    transform,
}) => {
    const ref = useRef<HTMLDivElement>();

    const measureElement = useCallback(() => {
        if (!ref.current) return;

        const { height, width, x, y } = ref.current.getBoundingClientRect();
        const { scrollHeight } = ref.current;

        onMeasure?.({
            x,
            y,
            height,
            scrollHeight,
            width,
            element: ref.current,
        });
    }, [onMeasure]);

    useEffect(() => {
        if (!shouldShowContent || !ref.current) {
            return undefined;
        }

        const element = ref.current;
        const observer = new ResizeObserver(() => {
            measureElement();
        });

        measureElement();
        observer.observe(element);

        return () => observer.disconnect();
    }, [measureElement, shouldShowContent]);

    const refCallback = useCallback((reference: HTMLDivElement | null) => {
        ref.current = reference ?? undefined;
    }, []);

    return (
        <AnimatePresence initial={false}>
            {shouldShowContent && (
                <StyledMotionDelayedDropdownContent
                    key="delayed-dropdown-content"
                    ref={refCallback}
                    $coordinates={coordinates}
                    $transform={transform}
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: ANIMATION_DELAY_MS / 1000, type: 'tween' }}
                >
                    {children}
                </StyledMotionDelayedDropdownContent>
            )}
        </AnimatePresence>
    );
};

DelayedDropdownContent.displayName = 'DelayedDropdownContent';

export default DelayedDropdownContent;
