import React, { FC, useEffect, useMemo, useState } from 'react';
import { animate, useMotionValue } from 'motion/react';
import { Easing, MotionValue, ObjectTarget } from 'motion';

type Ease = [number, number, number, number] | ((t: number) => number) | string;

export interface AnimatedNumberProps {
    /**
     * Start delay of the animation in seconds.
     */
    delay?: number;
    /**
     * Total duration of the animation in seconds.
     */
    duration?: number;
    /**
     * Easing curve of the animation (e.g., cubic-bezier like [0.16, 1, 0.3, 1] or predefined easings).
     * Controls how the animation accelerates/decelerates.
     */
    ease?: Ease;
    /**
     * Custom formatter for the displayed value.
     * If provided, it overrides locale/toLocaleString and round.
     * Example: (n) => `${Math.round(n)} points`
     */
    format?: (n: number) => string;
    /**
     * Locale used by toLocaleString when no custom formatter is provided.
     */
    locale?: string;
    /**
     * Callback invoked when the animation completes.
     */
    onComplete?: () => void;
    /**
     * Custom rounding function when no custom formatter is provided.
     * Default: Math.round
     */
    round?: (n: number) => number;
    /**
     * Starting value for the animation.
     * Default: 0
     */
    startFrom?: number;
    /**
     * Target value to animate to.
     */
    value: number;
}

const DEFAULT_ROUND = Math.round;
const DEFAULT_EASE: Ease = [0.16, 1, 0.3, 1];

export const AnimatedNumber: FC<AnimatedNumberProps> = ({
    value,
    duration = 2,
    delay = 0,
    locale = 'de',
    format,
    round = DEFAULT_ROUND,
    startFrom = 0,
    onComplete,
    ease = DEFAULT_EASE,
}) => {
    const motionValue = useMotionValue(startFrom);

    const [display, setDisplay] = useState<number>(startFrom);

    const formatter = useMemo(() => {
        if (format) return format;

        return (n: number) => round(n).toLocaleString(locale);
    }, [format, locale, round]);

    useEffect(() => {
        motionValue.set(startFrom);

        const controls = animate(motionValue, value as ObjectTarget<MotionValue<number>>, {
            duration,
            delay,
            ease: ease as Easing,
            onComplete,
        });

        return () => controls.stop();
    }, [value, duration, delay, startFrom, onComplete, ease, motionValue]);

    useEffect(() => {
        const unsub = motionValue.on('change', (v) => setDisplay(v));

        return () => unsub();
    }, [motionValue]);

    return <>{formatter(display)}</>;
};

AnimatedNumber.displayName = 'AnimatedNumber';

export default AnimatedNumber;
