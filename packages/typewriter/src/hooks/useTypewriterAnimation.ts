import type { MouseEvent } from 'react';
import { useEffect, useLayoutEffect, useState } from 'react';
import { CursorType } from '../types/cursor';
import useChunkStreamingSpeed from './useChunkStreamingSpeed';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

type UseTypewriterAnimationProps = {
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
    const autoSpeed = useChunkStreamingSpeed({
        autoSpeedBaseFactor,
        charactersCount,
        shouldCalcAutoSpeed,
    });

    useIsomorphicLayoutEffect(() => {
        setHasRenderedChildrenOnce(false);
    }, [childrenKey]);

    if (!hasRenderedChildrenOnce) setHasRenderedChildrenOnce(true);

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
        let accumulatedTime = 0;
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
            accumulatedTime = 0;
            const loop = (timestamp: number) => {
                if (lastTimeRendered === undefined) lastTimeRendered = timestamp;
                const deltaTime = timestamp - lastTimeRendered;
                accumulatedTime += deltaTime;
                const rate = autoSpeed.current ?? speedParam;
                const charactersToChange = Math.floor(accumulatedTime / rate);

                if (charactersToChange === 0) {
                    lastTimeRendered = timestamp;
                    frameId = requestAnimationFrame(loop);
                    return;
                }

                onTick(charactersToChange);
                accumulatedTime -= charactersToChange * rate;

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
