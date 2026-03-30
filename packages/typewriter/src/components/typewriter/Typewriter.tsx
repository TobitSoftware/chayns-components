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
    calculateAutoSpeed,
    ChunkStreamingSpeedState,
    getCharactersCount,
    getSubTextFromHTML,
    shuffleArray,
    updateChunkStreamingSpeedEMA,
} from './utils';
import useTypewriterAnimation from './useTypewriterAnimation';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export type TypewriterProps = {
    /**
     * The number of characters that will be animated per animation step.
     *
     * The step is advanced by the requestAnimationFrame-driven scheduler. When
     * `shouldCalcAutoSpeed` is enabled, the component may override this value dynamically.
     */
    animationSteps?: number;
    /**
     * The content to type.
     *
     * Strings are animated directly. React elements and arrays are rendered to HTML first so the
     * typewriter can preserve nested markup and inline components.
     */
    children: ReactElement | ReactElement[] | string | string[];
    /**
     * The type of the cursor. Use the `CursorType` enum for this prop.
     */
    cursorType?: CursorType;
    /**
     * The delay in milliseconds before the next text is shown.
     *
     * This prop is only used when `children` is an array.
     */
    nextTextDelay?: TypewriterDelay;
    /**
     * Function that is executed when the entire typewriter animation has finished.
     *
     * This callback is not used while more texts are still queued.
     */
    onFinish?: VoidFunction;
    /**
     * Function that is executed when the reset animation has finished.
     *
     * This callback only runs when `shouldUseResetAnimation` is enabled.
     */
    onResetAnimationEnd?: VoidFunction;
    /**
     * Function that is executed when the reset animation has started.
     *
     * This callback only runs when `shouldUseResetAnimation` is enabled.
     */
    onResetAnimationStart?: VoidFunction;
    /**
     * Function that is executed when the typing animation has finished.
     *
     * If multiple texts are given, this function will be executed for each text.
     */
    onTypingAnimationEnd?: VoidFunction;
    /**
     * Function that is executed when the typing animation has started.
     *
     * If multiple texts are given, this function will be executed for each text.
     */
    onTypingAnimationStart?: VoidFunction;
    /**
     * Invisible content that defines the reserved layout size while the animation is running.
     *
     * When omitted, the visible `children` are used as the layout template.
     */
    pseudoChildren?: ReactElement | string;
    /**
     * Waiting time in milliseconds before the typewriter resets the text.
     *
     * This prop is only used when `children` is an array.
     */
    resetDelay?: TypewriterDelay;
    /**
     * The reset speed of the animation. Use the `TypewriterSpeed` enum for this prop.
     */
    resetSpeed?: TypewriterSpeed | number;
    /**
     * Keeps the cursor animated even if the current text is not actively changing.
     */
    shouldForceCursorAnimation?: boolean;
    /**
     * Hides the cursor entirely.
     */
    shouldHideCursor?: boolean;
    /**
     * Keeps the content on a single line and applies ellipsis overflow handling.
     */
    shouldRemainSingleLine?: boolean;
    /**
     * Randomizes the order of `children` when multiple texts are provided.
     */
    shouldSortChildrenRandomly?: boolean;
    /**
     * Makes the hidden sizing text follow the currently revealed chunk instead of the full content.
     */
    shouldUseAnimationHeight?: boolean;
    /**
     * Derives the typing cadence from the observed streaming rate.
     */
    shouldCalcAutoSpeed?: boolean;
    /**
     * Base factor used to initialize the auto-speed EMA.
     */
    autoSpeedBaseFactor?: number;
    /**
     * Animates the reset between multiple texts with a backspace-like effect.
     */
    shouldUseResetAnimation?: boolean;
    /**
     * Keeps the typewriter active while waiting for new content to arrive.
     */
    shouldWaitForContent?: boolean;
    /**
     * The speed of the animation. Use the `TypewriterSpeed` enum for this prop.
     */
    speed?: TypewriterSpeed | number;
    /**
     * The delay in milliseconds before the typewriter starts typing.
     */
    startDelay?: TypewriterDelay;
    /**
     * Inline styles for the visible text element.
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

    useEffect(() => {
        if (!hasRenderedChildrenOnce) {
            setHasRenderedChildrenOnce(true);
        }
    }, [hasRenderedChildrenOnce]);

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
                                  color={colorScheme?.designSettings?.color}
                                  colorMode={colorScheme?.designSettings?.colorMode}
                                  style={{ display: 'inline' }}
                              >
                                  <span className="notranslate">{currentChildren}</span>
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
                          color={colorScheme?.designSettings?.color}
                          colorMode={colorScheme?.designSettings?.colorMode}
                          style={{ display: 'inline' }}
                      >
                          <span className="notranslate">{sortedChildren}</span>
                      </ColorSchemeProvider>
                  </ChaynsProvider>,
              )
            : (sortedChildren as string);
    }, [
        areMultipleChildrenGiven,
        colorScheme?.designSettings?.color,
        colorScheme?.designSettings?.colorMode,
        currentChildrenIndex,
        functions,
        sortedChildren,
        values,
    ]);

    const charactersCount = useMemo(() => getCharactersCount(textContent), [textContent]);
    const chunkIntervalExponentialMovingAverage = useRef<ChunkStreamingSpeedState>({
        lastLength: charactersCount,
        ema: charactersCount / (autoSpeedBaseFactor / 1000),
    });

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
        const { speed: calculatedAutoSpeed, steps } = calculateAutoSpeed(
            chunkIntervalExponentialMovingAverage.current.ema,
        );

        autoSpeed.current = calculatedAutoSpeed;
        autoSteps.current = steps;
    }, [animationSteps, charactersCount, shouldCalcAutoSpeed]);

    const handleSetNextChildrenIndex = useCallback(() => {
        setCurrentChildrenIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;

            return nextIndex > childrenCount - 1 ? 0 : nextIndex;
        });
    }, [childrenCount]);

    const { handleClick, isResetAnimationActive, shownCharCount, shouldPreventBlinkingCursor } =
        useTypewriterAnimation({
            areMultipleChildrenGiven,
            autoSpeedRef: autoSpeed,
            autoStepsRef: autoSteps,
            charactersCount,
            cursorType,
            nextTextDelay,
            onAdvanceText: handleSetNextChildrenIndex,
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
            textContentLength: textContent.length,
        });

    const isAnimatingText =
        shownCharCount < textContent.length ||
        shouldForceCursorAnimation ||
        areMultipleChildrenGiven ||
        textContent.length === 0;

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
                              color={colorScheme?.designSettings?.color}
                              colorMode={colorScheme?.designSettings?.colorMode}
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
    }, [
        colorScheme?.designSettings?.color,
        colorScheme?.designSettings?.colorMode,
        functions,
        pseudoChildren,
        shouldUseAnimationHeight,
        shownCharCount,
        textContent,
        values,
    ]);

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
