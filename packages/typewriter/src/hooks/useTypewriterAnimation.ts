import type { MouseEvent } from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CursorType } from '../types/cursor';
import {
    ChunkStreamingSpeedState,
    getSafeAutoSpeed,
    updateChunkStreamingSpeedEMA,
} from '../utils/utils';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type UseTypewriterAnimationProps = {
    animationSteps: number;
    autoSpeedBaseFactor: number;
    charactersCount: number;
    childrenKey: unknown;
    childrenCount: number;
    currentTextLength: number;
    cursorType: CursorType;
    nextTextDelay: number;
    onAdvanceChild: VoidFunction;
    onFinish?: VoidFunction;
    onResetAnimationEnd?: VoidFunction;
    onResetAnimationStart?: VoidFunction;
    onTypingAnimationEnd?: VoidFunction;
    onTypingAnimationStart?: VoidFunction;
    resetDelay: number;
    resetSpeed: number;
    shouldCalcAutoSpeed: boolean;
    shouldForceCursorAnimation: boolean;
    shouldUseResetAnimation: boolean;
    shouldWaitForContent?: boolean;
    speed: number;
    startDelay: number;
};

export type UseTypewriterAnimationResult = {
    effectiveShownCharCount: number;
    handleClick: (event: MouseEvent) => void;
    hasRenderedChildrenOnce: boolean;
    isAnimatingText: boolean;
    isTypingAnimationActive: boolean;
    shouldPreventBlinkingCursor: boolean;
};

const useTypewriterAnimation = ({
    animationSteps,
    autoSpeedBaseFactor,
    charactersCount,
    childrenKey,
    childrenCount,
    currentTextLength,
    cursorType,
    nextTextDelay,
    onAdvanceChild,
    onFinish,
    onResetAnimationEnd,
    onResetAnimationStart,
    onTypingAnimationEnd,
    onTypingAnimationStart,
    resetDelay,
    resetSpeed,
    shouldCalcAutoSpeed,
    shouldForceCursorAnimation,
    shouldUseResetAnimation,
    shouldWaitForContent,
    speed,
    startDelay,
}: UseTypewriterAnimationProps): UseTypewriterAnimationResult => {
    const [hasRenderedChildrenOnce, setHasRenderedChildrenOnce] = useState(false);
    const [shouldPreventBlinkingCursor, setShouldPreventBlinkingCursor] = useState(false);
    const [isResetAnimationActive, setIsResetAnimationActive] = useState(false);
    const [shouldStopAnimation, setShouldStopAnimation] = useState(false);
    const [shownCharCount, setShownCharCount] = useState(
        charactersCount > 0 ? 0 : currentTextLength,
    );
    const autoSpeed = useRef<number>();
    const chunkIntervalExponentialMovingAverage = useRef<ChunkStreamingSpeedState>({
        lastLength: charactersCount,
        ema: charactersCount / (autoSpeedBaseFactor / 1000),
    });

    useIsomorphicLayoutEffect(() => {
        setHasRenderedChildrenOnce(false);
    }, [childrenKey]);

    if (!hasRenderedChildrenOnce) setHasRenderedChildrenOnce(true);

    useEffect(() => {
        if (shouldUseResetAnimation) {
            chunkIntervalExponentialMovingAverage.current = {
                ema: charactersCount / (autoSpeedBaseFactor / 1000),
                lastLength: charactersCount,
            };
        }

        chunkIntervalExponentialMovingAverage.current = updateChunkStreamingSpeedEMA({
            currentLength: charactersCount,
            state: chunkIntervalExponentialMovingAverage.current,
        });
    }, [autoSpeedBaseFactor, charactersCount, shouldUseResetAnimation]);

    useEffect(() => {
        if (!shouldCalcAutoSpeed) {
            autoSpeed.current = undefined;
            return;
        }

        autoSpeed.current = getSafeAutoSpeed(chunkIntervalExponentialMovingAverage.current.ema);
    }, [animationSteps, autoSpeedBaseFactor, charactersCount, shouldCalcAutoSpeed]);

    const shouldShowFullTextImmediately = shouldStopAnimation || charactersCount === 0;
    const effectiveShownCharCount = shouldShowFullTextImmediately
        ? currentTextLength
        : shownCharCount;

    const isTypingAnimationActive =
        !shouldShowFullTextImmediately &&
        (effectiveShownCharCount < currentTextLength || childrenCount > 1);

    const isAnimatingText = isTypingAnimationActive || shouldForceCursorAnimation;

    const handleClick = (event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();

        setShouldStopAnimation(true);
    };

    useEffect(() => {
        let frameId: number | undefined;
        let lastTimeRendered: number | undefined;
        let timeoutId: number | undefined;

        const safeCancelFrame = () => {
            if (typeof frameId === 'number') {
                cancelAnimationFrame(frameId);
                frameId = undefined;
            }
        };

        const safeClearTimeout = () => {
            if (typeof timeoutId === 'number') {
                clearTimeout(timeoutId);
                timeoutId = undefined;
            }
        };

        const startAnimationFrameLoop = (
            onTick: (charactersToChange: number) => void,
            speedParam: number,
        ) => {
            lastTimeRendered = undefined;
            const loop = (timestamp: number) => {
                if (lastTimeRendered === undefined) lastTimeRendered = timestamp;
                const timeSinceLastFrame = timestamp - lastTimeRendered;
                const rate = autoSpeed.current ?? speedParam;
                const charactersToChange = Math.round(timeSinceLastFrame / rate);

                if (charactersToChange === 0) {
                    frameId = requestAnimationFrame(loop);
                    return;
                }

                onTick(charactersToChange);

                lastTimeRendered = timestamp;
                frameId = requestAnimationFrame(loop);
            };

            frameId = requestAnimationFrame(loop);
        };

        if (shouldShowFullTextImmediately) {
            return () => {
                safeCancelFrame();
                safeClearTimeout();
            };
        }

        if (isResetAnimationActive) {
            if (typeof onResetAnimationStart === 'function') {
                onResetAnimationStart();
            }

            startAnimationFrameLoop((charactersToRemove) => {
                setShownCharCount((prev) => {
                    const nextShownCharCount = Math.max(0, prev - charactersToRemove);

                    if (nextShownCharCount <= 0) {
                        safeCancelFrame();

                        if (typeof onResetAnimationEnd === 'function') {
                            onResetAnimationEnd();
                        }

                        if (childrenCount > 1) {
                            timeoutId = window.setTimeout(() => {
                                setIsResetAnimationActive(false);
                                onAdvanceChild();
                            }, nextTextDelay);
                        }
                    }

                    return nextShownCharCount;
                });
            }, resetSpeed);
        } else {
            const startTypingAnimation = () => {
                if (cursorType === CursorType.Thin) {
                    setShouldPreventBlinkingCursor(true);
                }

                if (typeof onTypingAnimationStart === 'function') {
                    onTypingAnimationStart();
                }

                startAnimationFrameLoop((charactersToAdd) => {
                    setShownCharCount((prevState) => {
                        let nextState = prevState + charactersToAdd;

                        if (nextState >= charactersCount && !shouldWaitForContent) {
                            if (cursorType === CursorType.Thin) {
                                setShouldPreventBlinkingCursor(false);
                            }

                            if (typeof onTypingAnimationEnd === 'function') {
                                onTypingAnimationEnd();
                            }

                            nextState = currentTextLength;

                            safeCancelFrame();

                            if (childrenCount > 1) {
                                timeoutId = window.setTimeout(() => {
                                    if (shouldUseResetAnimation) {
                                        setIsResetAnimationActive(true);
                                    } else {
                                        setShownCharCount(0);
                                        timeoutId = window.setTimeout(
                                            onAdvanceChild,
                                            nextTextDelay,
                                        );
                                    }
                                }, resetDelay);
                            }
                        }

                        return nextState;
                    });
                }, speed);
            };

            if (startDelay) {
                timeoutId = window.setTimeout(startTypingAnimation, startDelay);
            } else {
                startTypingAnimation();
            }
        }

        return () => {
            safeCancelFrame();
            safeClearTimeout();
        };
    }, [
        childrenCount,
        charactersCount,
        currentTextLength,
        cursorType,
        isResetAnimationActive,
        nextTextDelay,
        onAdvanceChild,
        onResetAnimationEnd,
        onResetAnimationStart,
        onTypingAnimationEnd,
        onTypingAnimationStart,
        resetDelay,
        resetSpeed,
        shouldShowFullTextImmediately,
        shouldUseResetAnimation,
        shouldWaitForContent,
        speed,
        startDelay,
    ]);

    useEffect(() => {
        if (!isTypingAnimationActive && typeof onFinish === 'function') {
            onFinish();
        }
    }, [isTypingAnimationActive, onFinish]);

    return {
        effectiveShownCharCount,
        handleClick,
        hasRenderedChildrenOnce,
        isAnimatingText,
        isTypingAnimationActive,
        shouldPreventBlinkingCursor,
    };
};

export default useTypewriterAnimation;
