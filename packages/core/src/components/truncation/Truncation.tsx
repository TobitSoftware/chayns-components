import React, {
    FC,
    MouseEvent,
    MouseEventHandler,
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { ClampPosition } from '../../types/truncation';
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

    const [originalSmallHeight, setOriginalSmallHeight] = useState(0);
    const [originalBigHeight, setOriginalBigHeight] = useState(0);

    useEffect(() => {
        setInitialRender(false);
    }, []);

    const pseudoChildrenRef = useRef<HTMLDivElement>(null);
    const childrenRef = useRef<HTMLDivElement>(null);
    const originalChildrenRef = useRef<HTMLDivElement>(null);

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

    const handleAnimationEnd = useCallback(() => {
        setHasSizeChanged(false);
        setShouldShowCollapsedElement(!internalIsOpen);
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
    }, [collapsedHeight, pseudoChildrenRef]);

    // Checks if the clamp should be shown
    useEffect(() => {
        if (pseudoChildrenRef.current && !hasSizeChanged && !initialRender) {
            setShowClamp(originalHeight > newCollapsedHeight);
        }
    }, [collapsedHeight, hasSizeChanged, initialRender, newCollapsedHeight, originalHeight]);

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

            (childrenRef.current.children[0] as HTMLDivElement).style.visibility = 'visible';
        }
    }, [children, internalIsOpen, shouldShowCollapsedElement]);

    useEffect(() => {
        if (originalChildrenRef.current) {
            const resizeObserver = new ResizeObserver((entries) => {
                if (entries && entries[0]) {
                    const observedHeight = entries[0].contentRect.height;
                    setOriginalHeight(
                        observedHeight < originalBigHeight ? originalBigHeight : observedHeight,
                    );
                    setHasSizeChanged(true);
                }
            });

            resizeObserver.observe(originalChildrenRef.current);

            return () => {
                resizeObserver.disconnect();
            };
        }

        return () => {};
    }, [originalBigHeight]);

    useEffect(() => {
        if (pseudoChildrenRef.current) {
            const resizeObserver = new ResizeObserver((entries) => {
                if (entries && entries[0]) {
                    const observedHeight = entries[0].contentRect.height;
                    setNewCollapsedHeight(
                        observedHeight < originalSmallHeight ? originalSmallHeight : observedHeight,
                    );
                    setHasSizeChanged(true);
                }
            });

            resizeObserver.observe(pseudoChildrenRef.current);

            return () => {
                resizeObserver.disconnect();
            };
        }

        return () => {};
    }, [originalSmallHeight]);

    return useMemo(
        () => (
            <StyledTruncation className="beta-chayns-truncation">
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
