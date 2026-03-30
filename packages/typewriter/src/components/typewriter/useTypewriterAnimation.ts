import type { MouseEvent, MutableRefObject } from 'react';
import { useCallback, useEffect, useState } from 'react';
import { CursorType } from '../../types/cursor';

export type UseTypewriterAnimationOptions = {
    areMultipleChildrenGiven: boolean;
    charactersCount: number;
    cursorType: CursorType;
    onAdvanceText?: VoidFunction;
    nextTextDelay: number;
    onResetAnimationEnd?: VoidFunction;
    onResetAnimationStart?: VoidFunction;
    onTypingAnimationEnd?: VoidFunction;
    onTypingAnimationStart?: VoidFunction;
    resetDelay: number;
    resetSpeed: number;
    shouldUseResetAnimation: boolean;
    shouldWaitForContent?: boolean;
    speed: number;
    startDelay: number;
    textContentLength: number;
    autoSpeedRef: MutableRefObject<number | undefined>;
    autoStepsRef: MutableRefObject<number>;
};

export type UseTypewriterAnimationResult = {
    handleClick: (event: MouseEvent) => void;
    isResetAnimationActive: boolean;
    shownCharCount: number;
    shouldPreventBlinkingCursor: boolean;
};

const useTypewriterAnimation = ({
    areMultipleChildrenGiven,
    charactersCount,
    cursorType,
    onAdvanceText,
    nextTextDelay,
    onResetAnimationEnd,
    onResetAnimationStart,
    onTypingAnimationEnd,
    onTypingAnimationStart,
    resetDelay,
    resetSpeed,
    shouldUseResetAnimation,
    shouldWaitForContent,
    speed,
    startDelay,
    textContentLength,
    autoSpeedRef,
    autoStepsRef,
}: UseTypewriterAnimationOptions): UseTypewriterAnimationResult => {
    const [shouldPreventBlinkingCursor, setShouldPreventBlinkingCursor] = useState(false);
    const [isResetAnimationActive, setIsResetAnimationActive] = useState(false);
    const [shouldStopAnimation, setShouldStopAnimation] = useState(false);
    const [shownCharCount, setShownCharCount] = useState(
        charactersCount > 0 ? 0 : textContentLength,
    );

    const handleClick = useCallback((event: MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();

        setShouldStopAnimation(true);
    }, []);

    useEffect(() => {
        let animationFrameId: number | undefined;
        let phaseStartTime = performance.now();
        let lastFrameTime = phaseStartTime;
        let currentShownCharCount = shownCharCount;
        let typingAccumulator = 0;
        let resetAccumulator = 0;
        let hasStartedTyping = false;
        let hasStartedReset = false;
        let hasEndedTyping = false;
        let hasEndedReset = false;

        type AnimationPhase =
            | 'typingDelay'
            | 'typing'
            | 'resetDelay'
            | 'resetting'
            | 'nextTextDelay';
        let phase: AnimationPhase = isResetAnimationActive ? 'resetting' : 'typing';

        if (startDelay) {
            phase = 'typingDelay';
        }

        const cancelFrame = () => {
            if (typeof animationFrameId === 'number') {
                window.cancelAnimationFrame(animationFrameId);
                animationFrameId = undefined;
            }
        };

        const updateShownCharCount = (nextValue: number): void => {
            currentShownCharCount = nextValue;
            setShownCharCount(nextValue);
        };

        const startTyping = (): void => {
            if (hasStartedTyping) {
                return;
            }

            hasStartedTyping = true;

            if (cursorType === CursorType.Thin) {
                setShouldPreventBlinkingCursor(true);
            }

            if (typeof onTypingAnimationStart === 'function') {
                onTypingAnimationStart();
            }
        };

        const finishTyping = (): void => {
            if (hasEndedTyping) {
                return;
            }

            hasEndedTyping = true;

            if (cursorType === CursorType.Thin) {
                setShouldPreventBlinkingCursor(false);
            }

            if (typeof onTypingAnimationEnd === 'function') {
                onTypingAnimationEnd();
            }
        };

        const startReset = (): void => {
            if (hasStartedReset) {
                return;
            }

            hasStartedReset = true;

            if (typeof onResetAnimationStart === 'function') {
                onResetAnimationStart();
            }
        };

        const finishReset = (): void => {
            if (hasEndedReset) {
                return;
            }

            hasEndedReset = true;

            if (typeof onResetAnimationEnd === 'function') {
                onResetAnimationEnd();
            }
        };

        if (shouldStopAnimation || charactersCount === 0) {
            updateShownCharCount(textContentLength);
            return undefined;
        }

        if (phase === 'typing') {
            startTyping();
        } else if (phase === 'resetting') {
            startReset();
        }

        const tick = (now: number): void => {
            if (shouldStopAnimation || charactersCount === 0) {
                updateShownCharCount(textContentLength);
                cancelFrame();
                return;
            }

            const delta = now - lastFrameTime;
            lastFrameTime = now;

            switch (phase) {
                case 'typingDelay': {
                    if (now - phaseStartTime < startDelay) {
                        break;
                    }

                    phase = 'typing';
                    phaseStartTime = now;
                    typingAccumulator = 0;
                    startTyping();
                    break;
                }
                case 'typing': {
                    startTyping();
                    typingAccumulator += delta;

                    const typingInterval = autoSpeedRef.current ?? speed;

                    while (typingAccumulator >= typingInterval) {
                        typingAccumulator -= typingInterval;

                        const nextValue = Math.min(
                            currentShownCharCount + autoStepsRef.current,
                            charactersCount,
                        );

                        if (nextValue >= charactersCount) {
                            updateShownCharCount(textContentLength);

                            if (shouldWaitForContent) {
                                typingAccumulator = 0;
                                break;
                            }

                            finishTyping();

                            if (areMultipleChildrenGiven) {
                                phase = 'resetDelay';
                                phaseStartTime = now;
                                typingAccumulator = 0;
                            } else {
                                cancelFrame();
                                return;
                            }

                            break;
                        }

                        updateShownCharCount(nextValue);
                    }

                    break;
                }
                case 'resetDelay': {
                    if (now - phaseStartTime < resetDelay) {
                        break;
                    }

                    if (areMultipleChildrenGiven) {
                        if (shouldUseResetAnimation) {
                            setIsResetAnimationActive(true);
                            cancelFrame();
                            return;
                        }

                        updateShownCharCount(0);
                        phase = 'nextTextDelay';
                        phaseStartTime = now;
                    } else {
                        cancelFrame();
                        return;
                    }

                    break;
                }
                case 'resetting': {
                    startReset();
                    resetAccumulator += delta;

                    const resetInterval = resetSpeed;

                    while (resetAccumulator >= resetInterval) {
                        resetAccumulator -= resetInterval;

                        const nextValue = Math.max(currentShownCharCount - autoStepsRef.current, 0);

                        updateShownCharCount(nextValue);

                        if (nextValue === 0) {
                            finishReset();

                            if (areMultipleChildrenGiven) {
                                phase = 'nextTextDelay';
                                phaseStartTime = now;
                                resetAccumulator = 0;
                            } else {
                                cancelFrame();
                                return;
                            }

                            break;
                        }
                    }

                    break;
                }
                case 'nextTextDelay': {
                    if (now - phaseStartTime < nextTextDelay) {
                        break;
                    }

                    if (shouldUseResetAnimation) {
                        setIsResetAnimationActive(false);
                    }

                    onAdvanceText?.();
                    cancelFrame();
                    return;
                }
                default:
                    break;
            }

            animationFrameId = window.requestAnimationFrame(tick);
        };

        animationFrameId = window.requestAnimationFrame(tick);

        return () => {
            cancelFrame();
        };
    }, [
        areMultipleChildrenGiven,
        charactersCount,
        cursorType,
        isResetAnimationActive,
        nextTextDelay,
        onResetAnimationEnd,
        onResetAnimationStart,
        onTypingAnimationEnd,
        onTypingAnimationStart,
        resetDelay,
        resetSpeed,
        shouldStopAnimation,
        shouldUseResetAnimation,
        shouldWaitForContent,
        speed,
        startDelay,
        textContentLength,
        autoSpeedRef,
        autoStepsRef,
        onAdvanceText,
    ]);

    return {
        handleClick,
        isResetAnimationActive,
        shownCharCount,
        shouldPreventBlinkingCursor,
    };
};

export default useTypewriterAnimation;
