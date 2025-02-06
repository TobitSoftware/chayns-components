import { ColorSchemeProvider } from '@chayns-components/core';
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
import { CursorType } from '../../types/cursor';
import { TypewriterDelay, TypewriterSpeed } from '../../types/speed';
import AnimatedTypewriterText from './AnimatedTypewriterText';
import {
    StyledTypewriter,
    StyledTypewriterPseudoText,
    StyledTypewriterText,
} from './Typewriter.styles';
import { calculateAutoSpeed, getCharactersCount, getSubTextFromHTML, shuffleArray } from './utils';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export type TypewriterProps = {
    /**
     * The amount of characters that will be animated per animation cycle.
     */
    animationSteps?: number;
    /**
     * The base speed factor to calculate the animation speed.
     */
    autoSpeedBaseFactor?: number;
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
     * Whether the content should remain single line.
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
    textStyle?: React.CSSProperties;
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
    const [autoSpeed, setAutoSpeed] = useState<number>();
    const [autoSteps, setAutoSteps] = useState(animationSteps);

    const functions = useFunctions();
    const values = useValues();

    useIsomorphicLayoutEffect(() => {
        if (children) {
            setHasRenderedChildrenOnce(false);
        }
    }, [children]);

    useEffect(() => {
        if (!hasRenderedChildrenOnce) {
            setHasRenderedChildrenOnce(true);
        }
    }, [hasRenderedChildrenOnce]);

    useEffect(() => {
        if (animationSteps > 0 && !shouldCalcAutoSpeed) {
            setAutoSteps(animationSteps);
        }
    }, [animationSteps, shouldCalcAutoSpeed]);

    const sortedChildren = useMemo(
        () =>
            Array.isArray(children) && shouldSortChildrenRandomly
                ? shuffleArray<ReactElement | string>(children)
                : children,
        [children, shouldSortChildrenRandomly],
    );

    const areMultipleChildrenGiven = Array.isArray(sortedChildren);
    const childrenCount = areMultipleChildrenGiven ? sortedChildren.length : 1;

    const textContent = useMemo(() => {
        if (areMultipleChildrenGiven) {
            const currentChildren = sortedChildren[currentChildrenIndex];

            if (currentChildren) {
                return React.isValidElement(currentChildren)
                    ? renderToString(
                          <ChaynsProvider data={values} functions={functions} isModule>
                              <ColorSchemeProvider
                                  color="#005EB8"
                                  colorMode={0}
                                  style={{ display: 'inline' }}
                              >
                                  {currentChildren}
                              </ColorSchemeProvider>
                          </ChaynsProvider>,
                      )
                    : (currentChildren as string);
            }

            return '';
        }

        return React.isValidElement(sortedChildren)
            ? renderToString(
                  <ChaynsProvider data={values} functions={functions} isModule>
                      <ColorSchemeProvider
                          color="#005EB8"
                          colorMode={0}
                          style={{ display: 'inline' }}
                      >
                          {sortedChildren}
                      </ColorSchemeProvider>
                  </ChaynsProvider>,
              )
            : (sortedChildren as string);
    }, [areMultipleChildrenGiven, currentChildrenIndex, functions, sortedChildren, values]);

    const charactersCount = useMemo(() => getCharactersCount(textContent), [textContent]);

    const [shownCharCount, setShownCharCount] = useState(
        charactersCount > 0 ? 0 : textContent.length,
    );

    const currentPosition = useRef(0);

    useEffect(() => {
        if (!shouldCalcAutoSpeed) {
            setAutoSpeed(undefined);
            setAutoSteps(animationSteps);

            return;
        }

        const { speed: calculatedAutoSpeed, steps } = calculateAutoSpeed({
            fullTextLength: charactersCount,
            currentPosition: currentPosition.current,
            baseSpeedFactor: autoSpeedBaseFactor,
        });

        setAutoSpeed(calculatedAutoSpeed);
        setAutoSteps(steps);
    }, [animationSteps, autoSpeedBaseFactor, charactersCount, shouldCalcAutoSpeed]);

    const isAnimatingText =
        shownCharCount < textContent.length ||
        shouldForceCursorAnimation ||
        areMultipleChildrenGiven ||
        textContent.length === 0;

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
        let interval: number | undefined;

        if (shouldStopAnimation || charactersCount === 0) {
            setShownCharCount(textContent.length);
            currentPosition.current = textContent.length;
        } else if (isResetAnimationActive) {
            if (typeof onResetAnimationStart === 'function') {
                onResetAnimationStart();
            }

            interval = window.setInterval(() => {
                setShownCharCount((prevState) => {
                    const nextState = prevState - autoSteps;
                    currentPosition.current = nextState;

                    if (nextState === 0) {
                        window.clearInterval(interval);

                        if (typeof onResetAnimationEnd === 'function') {
                            onResetAnimationEnd();
                        }

                        if (areMultipleChildrenGiven) {
                            setTimeout(() => {
                                setIsResetAnimationActive(false);
                                handleSetNextChildrenIndex();
                            }, nextTextDelay);
                        }
                    }

                    return nextState;
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

                const runTypingInterval = () => {
                    setShownCharCount((prevState) => {
                        let nextState = Math.min(prevState + autoSteps, charactersCount);

                        if (nextState >= charactersCount && !shouldWaitForContent) {
                            window.clearInterval(interval);

                            if (cursorType === CursorType.Thin) {
                                setShouldPreventBlinkingCursor(false);
                            }

                            if (typeof onTypingAnimationEnd === 'function') {
                                onTypingAnimationEnd();
                            }

                            /**
                             * At this point, the next value for "shownCharCount" is deliberately set to
                             * the length of the textContent in order to correctly display HTML elements
                             * after the last letter.
                             */
                            nextState = textContent.length;

                            if (areMultipleChildrenGiven) {
                                setTimeout(() => {
                                    if (shouldUseResetAnimation) {
                                        setIsResetAnimationActive(true);
                                    } else {
                                        setShownCharCount(0);
                                        setTimeout(handleSetNextChildrenIndex, nextTextDelay);
                                    }
                                }, resetDelay);
                            }
                        }

                        currentPosition.current = nextState;

                        return nextState;
                    });
                };

                interval = window.setInterval(runTypingInterval, autoSpeed ?? speed);
            };

            if (startDelay) {
                setTimeout(startTypingAnimation, startDelay);
            } else {
                startTypingAnimation();
            }
        }

        return () => {
            window.clearInterval(interval);
        };
    }, [
        resetSpeed,
        speed,
        resetDelay,
        childrenCount,
        charactersCount,
        textContent.length,
        shouldStopAnimation,
        shouldWaitForContent,
        isResetAnimationActive,
        shouldUseResetAnimation,
        areMultipleChildrenGiven,
        handleSetNextChildrenIndex,
        nextTextDelay,
        startDelay,
        onResetAnimationStart,
        onResetAnimationEnd,
        onTypingAnimationStart,
        onTypingAnimationEnd,
        cursorType,
        autoSpeed,
        autoSteps,
    ]);

    useEffect(() => {
        if (!isAnimatingText && typeof onFinish === 'function') {
            onFinish();
        }
    }, [isAnimatingText, onFinish]);

    const shownText = useMemo(
        () => getSubTextFromHTML(textContent, shownCharCount),
        [shownCharCount, textContent],
    );

    const pseudoTextHTML = useMemo(() => {
        if (pseudoChildren) {
            const pseudoText = React.isValidElement(pseudoChildren)
                ? renderToString(
                      <ChaynsProvider data={values} functions={functions} isModule>
                          <ColorSchemeProvider
                              color="#005EB8"
                              colorMode={0}
                              style={{ display: 'inline' }}
                          >
                              {pseudoChildren}
                          </ColorSchemeProvider>
                      </ChaynsProvider>,
                  )
                : (pseudoChildren as string);

            if (shouldUseAnimationHeight) {
                return getSubTextFromHTML(pseudoText, shownCharCount);
            }

            return pseudoText;
        }

        if (shouldUseAnimationHeight && textContent) {
            return getSubTextFromHTML(textContent, shownCharCount);
        }

        return textContent || '&#8203;';
    }, [functions, pseudoChildren, shouldUseAnimationHeight, shownCharCount, textContent, values]);

    return useMemo(
        () => (
            <StyledTypewriter
                $cursorType={cursorType}
                onClick={isAnimatingText ? handleClick : undefined}
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
                        $shouldRemainSingleLine={shouldRemainSingleLine}
                        style={textStyle}
                    >
                        {sortedChildren}
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
                    if the element is not rendered on client before...
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
