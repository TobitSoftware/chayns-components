import React, { FC, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyledMotionDelayedDropdownContent } from './DelayedDropdownContent.styles';
import {
    DropdownCoordinates,
    DropdownMeasurements,
    DropdownTransform,
} from '../../../types/dropdown';
import { AnimatePresence } from 'motion/react';

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
    const [hasMeasured, setHasMeasured] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    const initialRender = useRef(true);

    const shouldHideContent = useMemo(() => initialRender.current && !hasMeasured, [hasMeasured]);

    const measureElement = useCallback(() => {
        if (ref.current) {
            const { height, width, x, y } = ref.current.getBoundingClientRect();
            const { scrollHeight } = ref.current;

            setHasMeasured(true);

            if (typeof onMeasure === 'function') {
                onMeasure({
                    x,
                    y,
                    height,
                    scrollHeight,
                    width,
                    element: ref.current,
                });
            }
        }
    }, [onMeasure]);

    useEffect(() => {
        if (!shouldShowContent) return () => {};

        const observer = new ResizeObserver(() => {
            setHasMeasured(false);
            initialRender.current = false;

            measureElement();
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [measureElement, shouldShowContent]);

    return (
        <AnimatePresence initial={false}>
            {shouldShowContent && (
                <StyledMotionDelayedDropdownContent
                    ref={ref}
                    $coordinates={coordinates}
                    $transform={transform}
                    $shouldHideContent={shouldHideContent}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: shouldHideContent ? 0 : 1,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, type: 'tween' }}
                >
                    {children}
                </StyledMotionDelayedDropdownContent>
            )}
        </AnimatePresence>
    );
};

DelayedDropdownContent.displayName = 'DelayedDropdownContent';

export default DelayedDropdownContent;
