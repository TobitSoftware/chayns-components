import { ColorSchemeProvider, useColorScheme } from '@chayns-components/core';
import { ChaynsProvider, useFunctions, useValues } from 'chayns-api';
import React, {
    FC,
    ReactElement,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { CSSPropertiesWithVars } from 'styled-components/dist/types';
import { CursorType } from '../../types/cursor';
import { TypewriterDelay, TypewriterSpeed } from '../../types/speed';
import AnimatedTypewriterText from './AnimatedTypewriterText';
import {
    StyledTypewriter,
    StyledTypewriterPseudoText,
    StyledTypewriterText,
} from './Typewriter.styles';
import {
    ChunkStreamingSpeedState,
    getCharactersCount,
    getSafeAutoSpeed,
    getSubTextFromHTML,
    shuffleArray,
    updateChunkStreamingSpeedEMA,
} from './utils';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export type TypewriterProps = {
    /**
     * The number of characters that will be animated per animation cycle.
     */
    animationSteps?: number;
    /**
     * The text to type
     */
    children: ReactElement | ReactElement[] | string | string[];
    /**
     * The type of the cursor. Use the CursorType enum for this prop.
     */
    cursorType?: CursorType;
    /**
     * The delay in milliseconds before the next text is shown.
     * This prop is only used if multiple texts are given.
     */
    nextTextDelay?: TypewriterDelay;
    /**
     * Function that is executed when the typewriter animation has finished. This function will not
     * be executed if multiple texts are used.
     */
    onFinish?: VoidFunction;
    /**
     * Function that is executed when the reset animation has finished. This function will not be
     * executed if `shouldUseResetAnimation` is not set to `true`.
     */
    onResetAnimationEnd?: VoidFunction;
    /**
     * Function that is executed when the reset animation has started. This function will not be
     * executed if `shouldUseResetAnimation` is not set to `true`.
     */
    onResetAnimationStart?: VoidFunction;
    /**
     * Function that is executed when the typing animation has finished. If multiple texts are given,
     * this function will be executed for each text.
     */
    onTypingAnimationEnd?: VoidFunction;
    /**
     * Function that is executed when the typing animation has started. If multiple texts are given,
     * this function will be executed for each text.
     */
    onTypingAnimationStart?: VoidFunction;
    /**
     * Pseudo-element to be rendered invisible during animation to define the size of the element
     * for the typewriter effect. By default, the "children" is used for this purpose.
     */
    pseudoChildren?: ReactElement | string;
    /**
     * Waiting time in milliseconds before the typewriter resets the text.
     * This prop is only used if multiple texts are given.
     */
    resetDelay?: TypewriterDelay;
    /**
     * The reset speed of the animation. Use the TypewriterSpeed enum for this prop.
     */
    resetSpeed?: TypewriterSpeed | number;
    /**
     * Specifies whether the cursor should be forced to animate even if no text is currently animated.
     */
    shouldForceCursorAnimation?: boolean;
    /**
     * Specifies whether the cursor should be hidden
     */
    shouldHideCursor?: boolean;
    /**
     * Whether the content should remain a single line.
     */
    shouldRemainSingleLine?: boolean;
    /**
     * Specifies whether the children should be sorted randomly if there are multiple texts.
     * This makes the typewriter start with a different text each time and also changes them
     * in a random order.
     */
    shouldSortChildrenRandomly?: boolean;
    /**
     * Specifies whether the animation should use its full height or the height of the current
     * chunk.
     */
    shouldUseAnimationHeight?: boolean;
    /**
     * Whether the animation speed should be calculated with the chunk interval.
     */
    shouldCalcAutoSpeed?: boolean;
    /**
     * Sets how long the animation should last when `shouldCalcAutoSpeed` is enabled in milliseconds.
     * When chunks are streamed, this value will only be used for the initial speed and then change to the speed characters are added at
     */
    autoSpeedBaseFactor?: number;
    /**
     * Specifies whether the reset of the text should be animated with a backspace animation for
     * multiple texts.
     */
    shouldUseResetAnimation?: boolean;
    /**
     * Whether the typewriter should wait for new content
     */
    shouldWaitForContent?: boolean;
    /**
     * The speed of the animation. Use the TypewriterSpeed enum for this prop.
     */
    speed?: TypewriterSpeed | number;
    /**
     * The delay in milliseconds before the typewriter starts typing.
     */
    startDelay?: TypewriterDelay;
    /**
     * The style of the typewriter text element
     */
    textStyle?: CSSPropertiesWithVars;
};

const Typewriter: FC<TypewriterProps> = ({
    children,
    cursorType = CursorType.Default,
    nextTextDelay = TypewriterDelay.Medium,
    onFinish,
    onResetAnimationEnd,
    animationSteps = 1,
    onResetAnimationStart,
    onTypingAnimationEnd,
    onTypingAnimationStart,
    pseudoChildren,
    resetDelay = TypewriterDelay.Medium,
    shouldForceCursorAnimation = false,
    shouldHideCursor = false,
    shouldRemainSingleLine = false,
    shouldSortChildrenRandomly = false,
    shouldUseAnimationHeight = false,
    shouldUseResetAnimation = false,
    shouldWaitForContent,
    speed = TypewriterSpeed.Medium,
    resetSpeed = speed,
    startDelay = TypewriterDelay.None,
    textStyle,
    shouldCalcAutoSpeed = false,
    autoSpeedBaseFactor = 2000,
}) => {
    const [currentChildrenIndex, setCurrentChildrenIndex] = useState(0);
    const [hasRenderedChildrenOnce, setHasRenderedChildrenOnce] = useState(false);
    const [shouldPreventBlinkingCursor, setShouldPreventBlinkingCursor] = useState(false);
    const [isResetAnimationActive, setIsResetAnimationActive] = useState(false);
    const [shouldStopAnimation, setShouldStopAnimation] = useState(false);
    const autoSpeed = useRef<number>();
    const autoSteps = useRef<number>(animationSteps);

    const functions = useFunctions();
    const values = useValues();

    const colorScheme = useColorScheme();

    useIsomorphicLayoutEffect(() => {
        if (children) {
            setHasRenderedChildrenOnce(false);
        }
    }, [children]);

    if (!hasRenderedChildrenOnce) setHasRenderedChildrenOnce(true);

    const sortedChildren = useMemo(
        () =>
            Array.isArray(children) && shouldSortChildrenRandomly
                ? shuffleArray<ReactElement | string>(children)
                : children,
        [children, shouldSortChildrenRandomly],
    );

    const areMultipleChildrenGiven = Array.isArray(sortedChildren);
    const childrenCount = areMultipleChildrenGiven ? sortedChildren.length : 1;

    const renderChildToString = useCallback(
        (child: ReactElement | ReactElement[] | string | string[]) =>
            React.isValidElement(child)
                ? renderToString(
                      <ChaynsProvider data={values} functions={functions} isModule>
                          <ColorSchemeProvider
                              color={colorScheme?.designSettings?.color}
                              colorMode={colorScheme?.designSettings?.colorMode}
                              style={{ display: 'inline' }}
                          >
                              <span className="notranslate">{child}</span>
                          </ColorSchemeProvider>
                      </ChaynsProvider>,
                  )
                : (child as string),
        [
            colorScheme?.designSettings?.color,
            colorScheme?.designSettings?.colorMode,
            functions,
            values,
        ],
    );

    const textContent = useMemo(() => {
        if (areMultipleChildrenGiven) {
            const currentChildren = sortedChildren[currentChildrenIndex];

            if (currentChildren) {
                return renderChildToString(currentChildren);
            }

            return '';
        }

        return renderChildToString(sortedChildren);
    }, [areMultipleChildrenGiven, currentChildrenIndex, renderChildToString, sortedChildren]);

    const charactersCount = useMemo(() => getCharactersCount(textContent), [textContent]);

    const chunkIntervalExponentialMovingAverage = useRef<ChunkStreamingSpeedState>({
        lastTimestamp: undefined,
        lastLength: charactersCount,
        ema: charactersCount / (autoSpeedBaseFactor / 1000),
    });

    const [shownCharCount, setShownCharCount] = useState(
        charactersCount > 0 ? 0 : textContent.length,
    );

    const currentPosition = useRef(0);

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
            autoSteps.current = animationSteps;
            return;
        }

        autoSpeed.current = getSafeAutoSpeed(chunkIntervalExponentialMovingAverage.current.ema);
    }, [animationSteps, charactersCount, shouldCalcAutoSpeed]);

    const shouldShowFullTextImmediately = shouldStopAnimation || charactersCount === 0;
    const effectiveShownCharCount = shouldShowFullTextImmediately
        ? textContent.length
        : shownCharCount;

    const isTypingAnimationActive =
        !shouldShowFullTextImmediately &&
        (effectiveShownCharCount < textContent.length || areMultipleChildrenGiven);

    const isAnimatingText = isTypingAnimationActive || shouldForceCursorAnimation;

    const handleClick = useCallback((event: React.MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();

        setShouldStopAnimation(true);
    }, []);

    const handleSetNextChildrenIndex = useCallback(
        () =>
            setCurrentChildrenIndex(() => {
                let newIndex = currentChildrenIndex + 1;

                if (newIndex > childrenCount - 1) {
                    newIndex = 0;
                }

                return newIndex;
            }),
        [childrenCount, currentChildrenIndex],
    );

    useEffect(() => {
        // frame and timeout ids used for cleanup
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
            currentPosition.current = textContent.length;
            return () => {
                safeCancelFrame();
                safeClearTimeout();
            };
        }
        if (isResetAnimationActive) {
            // reset animation
            if (typeof onResetAnimationStart === 'function') {
                onResetAnimationStart();
            }

            startAnimationFrameLoop((charactersToRemove) => {
                setShownCharCount((prev) => {
                    const nextShownCharCount = Math.max(0, prev - charactersToRemove);
                    currentPosition.current = nextShownCharCount;

                    if (nextShownCharCount <= 0) {
                        safeCancelFrame();

                        if (typeof onResetAnimationEnd === 'function') {
                            onResetAnimationEnd();
                        }

                        if (areMultipleChildrenGiven) {
                            timeoutId = window.setTimeout(() => {
                                setIsResetAnimationActive(false);
                                handleSetNextChildrenIndex();
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

                            /**
                             * At this point, the next value for "shownCharCount" is deliberately set to
                             * the length of the textContent to correctly display HTML elements
                             * after the last letter.
                             */
                            nextState = textContent.length;

                            safeCancelFrame();

                            if (areMultipleChildrenGiven) {
                                timeoutId = window.setTimeout(() => {
                                    if (shouldUseResetAnimation) {
                                        setIsResetAnimationActive(true);
                                    } else {
                                        setShownCharCount(0);
                                        timeoutId = window.setTimeout(
                                            handleSetNextChildrenIndex,
                                            nextTextDelay,
                                        );
                                    }
                                }, resetDelay);
                            }
                        }

                        currentPosition.current = nextState;
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
        areMultipleChildrenGiven,
        charactersCount,
        cursorType,
        handleSetNextChildrenIndex,
        isResetAnimationActive,
        nextTextDelay,
        onResetAnimationEnd,
        onResetAnimationStart,
        onTypingAnimationEnd,
        onTypingAnimationStart,
        resetDelay,
        resetSpeed,
        shouldShowFullTextImmediately,
        shouldStopAnimation,
        shouldUseResetAnimation,
        shouldWaitForContent,
        speed,
        startDelay,
        textContent.length,
    ]);

    useEffect(() => {
        if (!isTypingAnimationActive && typeof onFinish === 'function') {
            onFinish();
        }
    }, [isTypingAnimationActive, onFinish]);

    const shownText = useMemo(
        () => getSubTextFromHTML(textContent, effectiveShownCharCount),
        [effectiveShownCharCount, textContent],
    );

    const pseudoTextHTML = useMemo(() => {
        if (pseudoChildren) {
            const pseudoText = renderChildToString(pseudoChildren);

            if (shouldUseAnimationHeight) {
                return getSubTextFromHTML(pseudoText, effectiveShownCharCount);
            }

            return pseudoText;
        }

        if (shouldUseAnimationHeight && textContent) {
            return getSubTextFromHTML(textContent, effectiveShownCharCount);
        }

        return textContent || '&#8203;';
    }, [
        effectiveShownCharCount,
        pseudoChildren,
        renderChildToString,
        shouldUseAnimationHeight,
        textContent,
    ]);

    return useMemo(
        () => (
            <StyledTypewriter
                $cursorType={cursorType}
                onClick={isTypingAnimationActive ? handleClick : undefined}
                $isAnimatingText={isAnimatingText}
                $shouldHideCursor={shouldHideCursor}
                $shouldPreventBlinkAnimation={shouldPreventBlinkingCursor}
            >
                {isAnimatingText ? (
                    <AnimatedTypewriterText
                        shouldHideCursor={shouldHideCursor}
                        shouldRemainSingleLine={shouldRemainSingleLine}
                        shownText={shownText}
                        textStyle={textStyle}
                    />
                ) : (
                    <StyledTypewriterText
                        className="notranslate"
                        $shouldRemainSingleLine={shouldRemainSingleLine}
                        dangerouslySetInnerHTML={
                            typeof sortedChildren === 'string' ? { __html: shownText } : undefined
                        }
                        style={textStyle}
                    >
                        {typeof sortedChildren !== 'string' ? sortedChildren : undefined}
                    </StyledTypewriterText>
                )}
                {isAnimatingText && (
                    <StyledTypewriterPseudoText
                        $isAnimatingText={isAnimatingText}
                        $shouldHideCursor={shouldHideCursor}
                        dangerouslySetInnerHTML={{ __html: pseudoTextHTML }}
                    />
                )}
                {/*
                    The following is needed because some components like the CodeHighlighter will not render correct
                    if the element is not rendered on a client before...
                */}
                {!hasRenderedChildrenOnce &&
                    createPortal(
                        <div style={{ position: 'absolute', visibility: 'hidden' }}>
                            {children}
                        </div>,
                        document.body,
                    )}
            </StyledTypewriter>
        ),
        [
            children,
            cursorType,
            handleClick,
            hasRenderedChildrenOnce,
            isAnimatingText,
            isTypingAnimationActive,
            pseudoTextHTML,
            shouldHideCursor,
            shouldPreventBlinkingCursor,
            shouldRemainSingleLine,
            shownText,
            sortedChildren,
            textStyle,
        ],
    );
};

Typewriter.displayName = 'Typewriter';

export default Typewriter;
