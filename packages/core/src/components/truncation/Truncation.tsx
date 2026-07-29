import { Textstring, TextstringProvider, ttsToITextString } from '@chayns-components/textstring';
import React, {
    FC,
    KeyboardEventHandler,
    MouseEvent,
    MouseEventHandler,
    ReactElement,
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import { useKeyboardFocusHighlighting } from '../../hooks/useKeyboardFocusHighlighting';
import textStrings from '../../constants/textStrings';
import { ClampPosition } from '../../types/truncation';
import {
    StyledMotionTruncationContent,
    StyledTruncation,
    StyledTruncationClamp,
    StyledTruncationClampFocusWrapper,
    StyledTruncationClampWrapper,
    StyledTruncationContent,
} from './Truncation.styles';
import { Textstring, TextstringProvider, ttsToITextString } from '@chayns-components/textstring';
import textStrings from '../../constants/textStrings';
import { useKeyboardFocusHighlighting } from '../../hooks/useKeyboardFocusHighlighting';

export type TruncationProps = {
    /**
     * The elements that should be expanding or collapsing.
     */
    children: ReactElement;
    /**
     * The position of the clamp.
     */
    clampPosition?: ClampPosition;
    /**
     * The height of the children element in its collapsed state.
     */
    collapsedHeight?: number;
    /**
     * If set to true, the content is exposed.
     */
    isOpen?: boolean;
    /**
     * A text that should be displayed if the content is expanded.
     */
    lessLabel?: string;
    /**
     * A text that should be displayed if the content is collapsed.
     */
    moreLabel?: string;
    /**
     * Function to be executed when the component is expanding or collapsing.
     */
    onChange?: (event: MouseEvent<HTMLAnchorElement>, isOpen: boolean) => void;
    /**
     * Enables keyboard-only focus highlighting.
     */
    shouldEnableKeyboardHighlighting?: boolean;
};

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const Truncation: FC<TruncationProps> = ({
    collapsedHeight = 150,
    clampPosition = ClampPosition.Right,
    isOpen,
    lessLabel,
    moreLabel,
    onChange,
    children,
    shouldEnableKeyboardHighlighting,
}) => {
    const shouldShowKeyboardHighlighting = useKeyboardFocusHighlighting(
        shouldEnableKeyboardHighlighting,
    );
    const contentRef = useRef<HTMLDivElement>(null);
    const pendingObservedHeight = useRef(0);
    const [internalIsOpen, setInternalIsOpen] = useState(Boolean(isOpen));
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        setInitialRender(false);
    }, []);

    const contentRef = useRef<HTMLDivElement>(null);
    const hasCollapsed = useRef(false);
    const isAnimating = useRef(false);
    const hasSizeRecentlyChanged = useRef(false);
    const canResetSizeChanged = useRef(true);

    useEffect(() => {
        if (typeof isOpen === 'boolean') {
            setInternalIsOpen(isOpen);
        }
    }, [isOpen]);

    useIsomorphicLayoutEffect(() => {
        if (!contentRef.current) {
            return () => {};
        }

        let frame: number | undefined;
        const updateContentHeight = (entries?: ResizeObserverEntry[]) => {
            pendingObservedHeight.current = Math.max(
                pendingObservedHeight.current,
                entries?.[0]?.contentRect.height ?? 0,
            );

            if (frame !== undefined) {
                return;
            }

            frame = window.requestAnimationFrame(() => {
                frame = undefined;

                if (!contentRef.current) {
                    return;
                }

                setContentHeight(
                    Math.max(
                        pendingObservedHeight.current,
                        contentRef.current.scrollHeight,
                        contentRef.current.getBoundingClientRect().height,
                    ),
                );
                pendingObservedHeight.current = 0;
            });
        };

        const resizeObserver = new ResizeObserver((entries) => updateContentHeight(entries));
        const mutationObserver = new MutationObserver(() => updateContentHeight());

        resizeObserver.observe(contentRef.current);
        mutationObserver.observe(contentRef.current, {
            characterData: true,
            childList: true,
            subtree: true,
        });
        updateContentHeight();

        return () => {
            resizeObserver.disconnect();
            mutationObserver.disconnect();

            if (frame !== undefined) {
                window.cancelAnimationFrame(frame);
            }
        };
    }, [children]);

    const handleClampClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
        (event) => {
            setInternalIsOpen((current) => {
                onChange?.(event, !current);
                return !current;
            });
        },
        [onChange],
    );

    const handleClampKeyDown = useCallback<KeyboardEventHandler<HTMLAnchorElement>>((event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            event.currentTarget.click();
        }
    }, []);

    const internalMoreLabel = moreLabel ?? (
        <Textstring textstring={ttsToITextString(textStrings.components.truncation.more)} />
    );
    const internalLessLabel = lessLabel ?? (
        <Textstring textstring={ttsToITextString(textStrings.components.truncation.less)} />
    );
    const hasOverflow = contentHeight > collapsedHeight;
    const collapsedContentHeight = Math.min(contentHeight || collapsedHeight, collapsedHeight);
    const targetHeight = internalIsOpen ? contentHeight || collapsedHeight : collapsedContentHeight;

    const internalMoreLabel = moreLabel ?? (
        <Textstring textstring={ttsToITextString(textStrings.components.truncation.more)} />
    );
    const internalLessLabel = lessLabel ?? (
        <Textstring textstring={ttsToITextString(textStrings.components.truncation.less)} />
    );
    const hasOverflow = contentHeight > collapsedHeight;
    const collapsedContentHeight = Math.min(contentHeight || collapsedHeight, collapsedHeight);
    const targetHeight = internalIsOpen ? contentHeight || collapsedHeight : collapsedContentHeight;

    return (
        <StyledTruncation className="beta-chayns-truncation">
            <StyledMotionTruncationContent
                animate={{ height: targetHeight }}
                initial={false}
                transition={{ type: 'tween', duration: 0.2 }}
            >
                <StyledTruncationContent ref={contentRef}>{children}</StyledTruncationContent>
            </StyledMotionTruncationContent>
            {hasOverflow && (
                <StyledTruncationClampWrapper $position={clampPosition}>
                    <TextstringProvider libraryName="@chayns-components-core">
                        <StyledTruncationClampFocusWrapper
                            $shouldShowKeyboardHighlighting={shouldShowKeyboardHighlighting}
                        >
                            <StyledTruncationClamp
                                onClick={handleClampClick}
                                onKeyDown={handleClampKeyDown}
                                role="button"
                                tabIndex={0}
                            >
                                {internalIsOpen ? internalLessLabel : internalMoreLabel}
                            </StyledTruncationClamp>
                        </StyledTruncationClampFocusWrapper>
                    </TextstringProvider>
                </StyledTruncationClampWrapper>
            )}
        </StyledTruncation>
    );
    );
};

export default Truncation;
