import React, {
    FC,
    MouseEvent,
    MouseEventHandler,
    ReactElement,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { ClampPosition } from '../../types/truncation';
import { debounce } from '../../utils/debounce';
import { truncateElement } from '../../utils/truncation';
import {
    StyledMotionTruncationContent,
    StyledTruncation,
    StyledTruncationClamp,
    StyledTruncationClampWrapper,
    StyledTruncationPseudoContent,
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
     * The height of the children Element in it`s collapsed state.
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
};

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const Truncation: FC<TruncationProps> = ({
    collapsedHeight = 150,
    clampPosition = ClampPosition.Right,
    isOpen,
    moreLabel = 'Mehr',
    lessLabel = 'Weniger',
    onChange,
    children,
}) => {
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [showClamp, setShowClamp] = useState(true);
    const [newCollapsedHeight, setNewCollapsedHeight] = useState(collapsedHeight);
    const [originalHeight, setOriginalHeight] = useState(0);
    const [shouldShowCollapsedElement, setShouldShowCollapsedElement] = useState(true);
    const [hasSizeChanged, setHasSizeChanged] = useState(false);
    const [initialRender, setInitialRender] = useState(true);
    const [shouldSkipChangeCheck, setShouldSkipChangeCheck] = useState(false);

    const [originalSmallHeight, setOriginalSmallHeight] = useState(0);
    const [originalBigHeight, setOriginalBigHeight] = useState(0);

    useEffect(() => {
        setInitialRender(false);
    }, []);

    const parentRef = useRef<HTMLDivElement>(null);
    const pseudoChildrenRef = useRef<HTMLDivElement>(null);
    const childrenRef = useRef<HTMLDivElement>(null);
    const originalChildrenRef = useRef<HTMLDivElement>(null);
    const hasCollapsed = useRef(false);
    const isAnimating = useRef(false);
    const hasSizeRecentlyChanged = useRef(false);
    const canResetSizeChanged = useRef(true);

    useEffect(() => {
        if (typeof isOpen === 'boolean') {
            setInternalIsOpen(isOpen);
            setShowClamp(!isOpen);
        }
    }, [isOpen]);

    // Changes the state of the truncation
    const handleClampClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
        (event) => {
            setInternalIsOpen((current) => {
                if (typeof onChange === 'function') {
                    onChange(event, !current);
                }

                return !current;
            });
        },
        [onChange],
    );

    useEffect(() => {
        if (children) {
            setShouldSkipChangeCheck(true);

            window.setTimeout(() => {
                setShouldSkipChangeCheck(false);
            }, 200);
        }
    }, [children]);

    const handleAnimationEnd = useCallback(() => {
        hasCollapsed.current = true;
        isAnimating.current = false;

        if (canResetSizeChanged.current) {
            setHasSizeChanged(false);
            canResetSizeChanged.current = false;
        }

        window.setTimeout(() => {
            hasSizeRecentlyChanged.current = false;
        }, 10);

        setShouldShowCollapsedElement(!internalIsOpen);

        window.setTimeout(() => {
            hasCollapsed.current = false;
        }, 30);
    }, [internalIsOpen]);

    useEffect(() => {
        if (!pseudoChildrenRef.current) {
            return;
        }

        setOriginalHeight(pseudoChildrenRef.current.offsetHeight);
        setOriginalBigHeight(pseudoChildrenRef.current.offsetHeight);

        truncateElement(pseudoChildrenRef.current, collapsedHeight);

        setNewCollapsedHeight(pseudoChildrenRef.current.offsetHeight);
        setOriginalSmallHeight(pseudoChildrenRef.current.offsetHeight);
    }, [collapsedHeight, pseudoChildrenRef, children]);

    // Checks if the clamp should be shown
    useEffect(() => {
        if (
            pseudoChildrenRef.current &&
            (!hasSizeChanged || shouldSkipChangeCheck) &&
            !initialRender
        ) {
            setShowClamp(originalHeight > newCollapsedHeight);
        }
    }, [
        shouldSkipChangeCheck,
        collapsedHeight,
        hasSizeChanged,
        initialRender,
        newCollapsedHeight,
        originalHeight,
        children,
    ]);

    useEffect(() => {
        if (childrenRef.current && pseudoChildrenRef.current && originalChildrenRef.current) {
            while (childrenRef.current.firstChild) {
                childrenRef.current.removeChild(childrenRef.current.firstChild);
            }

            childrenRef.current.appendChild(
                shouldShowCollapsedElement && !internalIsOpen
                    ? pseudoChildrenRef.current
                    : originalChildrenRef.current,
            );

            parentRef.current?.appendChild(
                shouldShowCollapsedElement && !internalIsOpen
                    ? originalChildrenRef.current
                    : pseudoChildrenRef.current,
            );

            (childrenRef.current.children[0] as HTMLDivElement).style.visibility = 'visible';
        }
    }, [children, internalIsOpen, shouldShowCollapsedElement]);

    useIsomorphicLayoutEffect(() => {
        if (originalChildrenRef.current) {
            const resizeObserver = new ResizeObserver((entries) => {
                if (entries && entries[0]) {
                    const observedHeight = entries[0].contentRect.height;

                    setOriginalHeight(
                        observedHeight < originalBigHeight ? originalBigHeight : observedHeight,
                    );

                    if (
                        !hasCollapsed.current &&
                        !isAnimating.current &&
                        !hasSizeRecentlyChanged.current
                    ) {
                        void debounce(() => {
                            canResetSizeChanged.current = true;
                        }, 250)();

                        setHasSizeChanged(true);
                        hasSizeRecentlyChanged.current = true;
                    }
                }
            });

            resizeObserver.observe(originalChildrenRef.current);

            return () => {
                resizeObserver.disconnect();
            };
        }

        return () => {};
    }, [originalBigHeight, children]);

    useIsomorphicLayoutEffect(() => {
        if (pseudoChildrenRef.current) {
            const resizeObserver = new ResizeObserver((entries) => {
                if (entries && entries[0]) {
                    const observedHeight = entries[0].contentRect.height;

                    setNewCollapsedHeight(
                        observedHeight < originalSmallHeight ? originalSmallHeight : observedHeight,
                    );

                    if (
                        !hasCollapsed.current &&
                        !isAnimating.current &&
                        !hasSizeRecentlyChanged.current
                    ) {
                        void debounce(() => {
                            canResetSizeChanged.current = true;
                        }, 250)();

                        setHasSizeChanged(true);
                        hasSizeRecentlyChanged.current = true;
                    }
                }
            });

            resizeObserver.observe(pseudoChildrenRef.current);

            return () => {
                resizeObserver.disconnect();
            };
        }

        return () => {};
    }, [originalSmallHeight, children]);

    return useMemo(
        () => (
            <StyledTruncation className="beta-chayns-truncation" ref={parentRef}>
                <StyledTruncationPseudoContent ref={pseudoChildrenRef}>
                    {children}
                </StyledTruncationPseudoContent>
                <StyledTruncationPseudoContent ref={originalChildrenRef}>
                    {children}
                </StyledTruncationPseudoContent>
                <StyledMotionTruncationContent
                    animate={{ height: internalIsOpen ? originalHeight : newCollapsedHeight }}
                    initial={false}
                    transition={{ type: 'tween', duration: hasSizeChanged ? 0 : 0.2 }}
                    onAnimationComplete={handleAnimationEnd}
                    onAnimationStart={() => {
                        isAnimating.current = true;
                    }}
                    ref={childrenRef}
                />
                {showClamp && (
                    <StyledTruncationClampWrapper $position={clampPosition}>
                        <StyledTruncationClamp onClick={handleClampClick}>
                            {internalIsOpen ? lessLabel : moreLabel}
                        </StyledTruncationClamp>
                    </StyledTruncationClampWrapper>
                )}
            </StyledTruncation>
        ),
        [
            children,
            clampPosition,
            handleAnimationEnd,
            handleClampClick,
            hasSizeChanged,
            internalIsOpen,
            lessLabel,
            moreLabel,
            newCollapsedHeight,
            originalHeight,
            showClamp,
        ],
    );
};

export default Truncation;
