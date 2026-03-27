import { ColorSchemeProvider, useColorScheme } from '@chayns-components/core';
import { ChaynsProvider, useFunctions, useValues } from 'chayns-api';
import React, { FC, ReactElement, useCallback, useMemo, useState } from 'react';
import { renderToString } from 'react-dom/server';
import { CSSPropertiesWithVars } from 'styled-components/dist/types';
import { CursorType } from '../../types/cursor';
import { TypewriterDelay, TypewriterSpeed } from '../../types/speed';
import TypewriterView from './typewrite-view/TypewriterView';
import useTypewriterAnimation from '../../hooks/useTypewriterAnimation';
import { getCharactersCount, getSubTextFromHTML, shuffleArray } from '../../utils/utils';

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

    const functions = useFunctions();
    const values = useValues();

    const colorScheme = useColorScheme();

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

    const handleSetNextChildrenIndex = useCallback(
        () =>
            setCurrentChildrenIndex((prevIndex) => {
                let newIndex = prevIndex + 1;

                if (newIndex > childrenCount - 1) {
                    newIndex = 0;
                }

                return newIndex;
            }),
        [childrenCount],
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

    const {
        effectiveShownCharCount,
        hasRenderedChildrenOnce,
        handleClick,
        isAnimatingText,
        isTypingAnimationActive,
        shouldPreventBlinkingCursor,
    } = useTypewriterAnimation({
        autoSpeedBaseFactor,
        animationSteps,
        charactersCount,
        childrenKey: children,
        childrenCount,
        currentTextLength: textContent.length,
        cursorType,
        nextTextDelay,
        onAdvanceChild: handleSetNextChildrenIndex,
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
    });

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

    return (
        <TypewriterView
            children={sortedChildren}
            cursorType={cursorType}
            handleClick={isTypingAnimationActive ? handleClick : undefined}
            hasRenderedChildrenOnce={hasRenderedChildrenOnce}
            isAnimatingText={isAnimatingText}
            pseudoTextHTML={pseudoTextHTML}
            shouldHideCursor={shouldHideCursor}
            shouldPreventBlinkingCursor={shouldPreventBlinkingCursor}
            shouldRemainSingleLine={shouldRemainSingleLine}
            shownText={shownText}
            textStyle={textStyle}
        />
    );
};

Typewriter.displayName = 'Typewriter';

export default Typewriter;
