import { TextStringProviderSSR, Translation } from '@chayns/textstrings';
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
import textStrings from '../../constants/textStrings';
import { useFocusRingPortal } from '../../hooks/useFocusRingPortal';
import { useKeyboardFocusHighlighting } from '../../hooks/useKeyboardFocusHighlighting';
import { ClampPosition } from '../../types/truncation';
import {
    StyledMotionTruncationContent,
    StyledTruncation,
    StyledTruncationClamp,
    StyledTruncationClampFocusWrapper,
    StyledTruncationClampWrapper,
    StyledTruncationContent,
} from './Truncation.styles';

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

const getHeightAtLineBoundary = (element: HTMLElement, height: number, contentHeight: number) => {
    const elementTop = element.getBoundingClientRect().top;
    const targetBottom = elementTop + height;
    const range = element.ownerDocument.createRange();

    range.selectNodeContents(element);

    const lineRects =
        typeof range.getClientRects === 'function' ? Array.from(range.getClientRects()) : [];
    const lineBottom = lineRects
        .map((rect) => rect.bottom)
        .filter((bottom) => bottom >= targetBottom)
        .sort((first, second) => first - second)[0];

    range.detach();

    return lineBottom === undefined
        ? Math.min(contentHeight, height)
        : Math.min(contentHeight, lineBottom - elementTop);
};

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
    const clampRef = useRef<HTMLAnchorElement>(null);
    const pendingObservedHeight = useRef(0);
    const [internalIsOpen, setInternalIsOpen] = useState(Boolean(isOpen));
    const [contentHeight, setContentHeight] = useState(0);
    const [collapsedContentHeight, setCollapsedContentHeight] = useState(collapsedHeight);

    useEffect(() => {
        if (typeof isOpen === 'boolean') {
            setInternalIsOpen(isOpen);
        }
    }, [isOpen]);

    const hasOverflow = contentHeight > collapsedHeight;

    useFocusRingPortal(clampRef, {
        isEnabled: shouldShowKeyboardHighlighting && hasOverflow,
    });

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

                const measuredContentHeight = Math.max(
                    pendingObservedHeight.current,
                    contentRef.current.scrollHeight,
                    contentRef.current.getBoundingClientRect().height,
                );

                setContentHeight(measuredContentHeight);
                setCollapsedContentHeight(
                    getHeightAtLineBoundary(
                        contentRef.current,
                        collapsedHeight,
                        measuredContentHeight,
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
    }, [children, collapsedHeight]);

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
        <Translation textString={textStrings.components.truncation.more} />
    );
    const internalLessLabel = lessLabel ?? (
        <Translation textString={textStrings.components.truncation.less} />
    );
    const targetHeight = internalIsOpen
        ? contentHeight || collapsedHeight
        : Math.min(contentHeight || collapsedHeight, collapsedContentHeight);

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
                    <TextStringProviderSSR libraries="chayns-components-v5-core" id="truncation">
                        <StyledTruncationClampFocusWrapper>
                            <StyledTruncationClamp
                                ref={clampRef}
                                onClick={handleClampClick}
                                onKeyDown={handleClampKeyDown}
                                role="button"
                                tabIndex={0}
                            >
                                {internalIsOpen ? internalLessLabel : internalMoreLabel}
                            </StyledTruncationClamp>
                        </StyledTruncationClampFocusWrapper>
                    </TextStringProviderSSR>
                </StyledTruncationClampWrapper>
            )}
        </StyledTruncation>
    );
};

export default Truncation;
