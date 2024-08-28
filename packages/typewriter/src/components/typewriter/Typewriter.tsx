import { ColorSchemeProvider } from '@chayns-components/core';
import { ChaynsProvider, useFunctions, useValues } from 'chayns-api';
import React, {
    FC,
    ReactElement,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import { renderToString } from 'react-dom/server';
import {
    StyledTypewriter,
    StyledTypewriterPseudoText,
    StyledTypewriterText,
} from './Typewriter.styles';
import { getCharactersCount, getSubTextFromHTML, shuffleArray } from './utils';

// noinspection JSUnusedGlobalSymbols
export enum TypewriterDelay {
    ExtraSlow = 4000,
    Slow = 2000,
    Medium = 1000,
    Fast = 500,
    ExtraFast = 250,
}

// noinspection JSUnusedGlobalSymbols
export enum TypewriterSpeed {
    ExtraSlow = 40,
    Slow = 20,
    Medium = 10,
    Fast = 5,
    ExtraFast = 2.5,
}

export type TypewriterProps = {
    /**
     * The text to type
     */
    children: ReactElement | ReactElement[] | string | string[];
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
     * Specifies whether the cursor should be forced to animate even if no text is currently animated.
     */
    shouldForceCursorAnimation?: boolean;
    /**
     * Specifies whether the cursor should be hidden
     */
    shouldHideCursor?: boolean;
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
     * The style of the typewriter text element
     */
    textStyle?: React.CSSProperties;
};

const Typewriter: FC<TypewriterProps> = ({
    children,
    nextTextDelay = TypewriterDelay.Medium,
    onFinish,
    pseudoChildren,
    resetDelay = TypewriterDelay.Medium,
    shouldForceCursorAnimation = false,
    shouldHideCursor = false,
    shouldSortChildrenRandomly = false,
    shouldUseAnimationHeight = false,
    shouldUseResetAnimation = false,
    shouldWaitForContent,
    speed = TypewriterSpeed.Medium,
    textStyle,
}) => {
    const [currentChildrenIndex, setCurrentChildrenIndex] = useState(0);
    const [shouldCount, setShouldCount] = useState(true);
    const [hasRenderedChildrenOnce, setHasRenderedChildrenOnce] = useState(false);

    const functions = useFunctions();
    const values = useValues();

    useLayoutEffect(() => {
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
    }, [areMultipleChildrenGiven, currentChildrenIndex, sortedChildren]);

    const charactersCount = useMemo(() => getCharactersCount(textContent), [textContent]);

    const [isResetAnimationActive, setIsResetAnimationActive] = useState(false);
    const [shownCharCount, setShownCharCount] = useState(
        charactersCount > 0 ? 0 : textContent.length,
    );
    const [shouldStopAnimation, setShouldStopAnimation] = useState(false);
    const [prevChildren, setPrevChildren] = useState<TypewriterProps['children']>(children);

    useEffect(() => {
        if (children !== prevChildren) {
            setShouldCount(true);
            setPrevChildren(children);
        }
    }, [children, prevChildren]);

    const isAnimatingText =
        shownCharCount < textContent.length ||
        shouldForceCursorAnimation ||
        areMultipleChildrenGiven ||
        textContent.length === 0;

    const handleClick = useCallback(() => {
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
        } else if (isResetAnimationActive) {
            interval = window.setInterval(() => {
                setShownCharCount((prevState) => {
                    const nextState = prevState - 1;

                    if (nextState === 0) {
                        window.clearInterval(interval);

                        if (areMultipleChildrenGiven) {
                            setTimeout(() => {
                                setIsResetAnimationActive(false);
                                handleSetNextChildrenIndex();
                            }, nextTextDelay);
                        }
                    }

                    return nextState;
                });
            }, speed);
        } else {
            interval = window.setInterval(() => {
                setShownCharCount((prevState) => {
                    let nextState = prevState;

                    if (shouldCount) {
                        nextState = prevState + 1;
                    }

                    if (nextState >= charactersCount) {
                        if (shouldWaitForContent) {
                            setShouldCount(false);
                        } else {
                            window.clearInterval(interval);

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
                    }

                    return nextState;
                });
            }, speed);
        }

        return () => {
            window.clearInterval(interval);
        };
    }, [
        shouldStopAnimation,
        speed,
        textContent.length,
        charactersCount,
        isResetAnimationActive,
        areMultipleChildrenGiven,
        resetDelay,
        childrenCount,
        handleSetNextChildrenIndex,
        shouldUseResetAnimation,
        shouldCount,
        shouldWaitForContent,
        nextTextDelay,
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
    }, [pseudoChildren, shouldUseAnimationHeight, shownCharCount, textContent]);

    return useMemo(
        () => (
            <StyledTypewriter onClick={handleClick}>
                {isAnimatingText ? (
                    <StyledTypewriterText
                        dangerouslySetInnerHTML={{ __html: shownText }}
                        $isAnimatingText
                        $shouldHideCursor={shouldHideCursor}
                        style={textStyle}
                    />
                ) : (
                    <StyledTypewriterText style={textStyle}>{sortedChildren}</StyledTypewriterText>
                )}
                {isAnimatingText && (
                    <StyledTypewriterPseudoText
                        dangerouslySetInnerHTML={{ __html: pseudoTextHTML }}
                        $isAnimatingText
                        $shouldHideCursor={shouldHideCursor}
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
            handleClick,
            hasRenderedChildrenOnce,
            isAnimatingText,
            pseudoTextHTML,
            shouldHideCursor,
            shownText,
            sortedChildren,
            textStyle,
        ],
    );
};

Typewriter.displayName = 'Typewriter';

export default Typewriter;
