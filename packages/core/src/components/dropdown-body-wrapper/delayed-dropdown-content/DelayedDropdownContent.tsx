import React, { FC, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { StyledMotionDelayedDropdownContent } from './DelayedDropdownContent.styles';
import {
    DropdownCoordinates,
    DropdownMeasurements,
    DropdownTransform,
} from '../../../types/dropdown';

const ANIMATION_DELAY_MS = 200;

enum AnimationType {
    None,
    Hidden,
    Visible,
    FadeIn,
    FadeOut,
}

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
    const [animationState, setAnimationState] = useState<AnimationType>(AnimationType.None);

    const ref = useRef<HTMLDivElement>(null);

    const measureElement = useCallback(() => {
        if (ref.current) {
            const { height, width, x, y } = ref.current.getBoundingClientRect();
            const { scrollHeight } = ref.current;

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

            setAnimationState(AnimationType.FadeIn);

            window.setTimeout(() => {
                setAnimationState(AnimationType.Visible);
            }, ANIMATION_DELAY_MS);
        }
    }, [onMeasure]);

    useEffect(() => {
        if (!shouldShowContent) return () => {};

        const observer = new ResizeObserver(() => {
            measureElement();
        });

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [measureElement, shouldShowContent]);

    useEffect(() => {
        if (shouldShowContent) {
            setAnimationState(AnimationType.Hidden);

            window.setTimeout(() => {
                measureElement();
            }, 1);
        } else {
            setAnimationState((prevState) => {
                if (prevState === AnimationType.None) {
                    return prevState;
                }

                return AnimationType.FadeOut;
            });

            window.setTimeout(() => {
                setAnimationState(AnimationType.None);
            }, ANIMATION_DELAY_MS);
        }
    }, [measureElement, shouldShowContent]);

    if (animationState === AnimationType.None) {
        return null;
    }

    // ToDo improve fade-in animation
    return (
        <StyledMotionDelayedDropdownContent
            ref={ref}
            $coordinates={coordinates}
            $transform={transform}
            $shouldHideContent={animationState === AnimationType.Hidden}
            animate={{
                opacity: [AnimationType.FadeIn, AnimationType.Visible].includes(animationState)
                    ? 1
                    : 0,
            }}
            transition={{ duration: ANIMATION_DELAY_MS / 1000, type: 'tween' }}
        >
            {children}
        </StyledMotionDelayedDropdownContent>
    );
};

DelayedDropdownContent.displayName = 'DelayedDropdownContent';

export default DelayedDropdownContent;
