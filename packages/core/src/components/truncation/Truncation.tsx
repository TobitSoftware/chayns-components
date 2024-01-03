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
import { truncateElement } from '../../utils/truncation';
import {
    StyledMotionTruncationContent,
    StyledTruncation,
    StyledTruncationClamp,
    StyledTruncationPseudoContent,
} from './Truncation.styles';

export type TruncationProps = {
    /**
     * The elements that should be expanding or collapsing.
     */
    children: ReactElement;
    /**
     * The height of the children Element in it`s collapsed state.
     */
    collapsedHeight?: number;
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
    moreLabel = 'Mehr',
    lessLabel = 'Weniger',
    onChange,
    children,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showClamp, setShowClamp] = useState(true);
    const [newCollapsedHeight, setNewCollapsedHeight] = useState(collapsedHeight);
    const [originalHeight, setOriginalHeight] = useState(0);
    const [shouldShowCollapsedElement, setShouldShowCollapsedElement] = useState(true);

    const pseudoChildrenRef = useRef<HTMLDivElement>(null);
    const childrenRef = useRef<HTMLDivElement>(null);
    const originalChildrenRef = useRef<HTMLDivElement>(null);

    // Changes the state of the truncation
    const handleClampClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
        (event) => {
            setIsOpen((current) => {
                if (typeof onChange === 'function') {
                    onChange(event, !current);
                }

                return !current;
            });
        },
        [onChange],
    );

    const handleAnimationEnd = useCallback(() => {
        if (!isOpen) {
            setShouldShowCollapsedElement(true);
        } else {
            setShouldShowCollapsedElement(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!pseudoChildrenRef.current) {
            return;
        }

        setOriginalHeight(pseudoChildrenRef.current.offsetHeight);

        truncateElement(pseudoChildrenRef.current, collapsedHeight);

        setNewCollapsedHeight(pseudoChildrenRef.current.offsetHeight);
    }, [collapsedHeight, pseudoChildrenRef]);

    // Checks if the clamp should be shown
    useEffect(() => {
        if (pseudoChildrenRef.current) {
            setShowClamp(originalHeight > newCollapsedHeight);
        }
    }, [collapsedHeight, newCollapsedHeight, originalHeight]);

    useEffect(() => {
        if (childrenRef.current && pseudoChildrenRef.current && originalChildrenRef.current) {
            if (shouldShowCollapsedElement && !isOpen) {
                while (childrenRef.current.firstChild) {
                    childrenRef.current.removeChild(childrenRef.current.firstChild);
                }

                childrenRef.current.appendChild(pseudoChildrenRef.current);

                (childrenRef.current.children[0] as HTMLDivElement).style.visibility = 'visible';
            } else {
                while (childrenRef.current.firstChild) {
                    childrenRef.current.removeChild(childrenRef.current.firstChild);
                }

                childrenRef.current.appendChild(originalChildrenRef.current);

                (childrenRef.current.children[0] as HTMLDivElement).style.visibility = 'visible';
            }
        }
    }, [children, isOpen, shouldShowCollapsedElement]);

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
                    animate={{ height: isOpen ? originalHeight : newCollapsedHeight }}
                    initial={false}
                    transition={{ type: 'tween' }}
                    onAnimationComplete={handleAnimationEnd}
                    ref={childrenRef}
                />
                {showClamp && (
                    <StyledTruncationClamp onClick={handleClampClick}>
                        {isOpen ? lessLabel : moreLabel}
                    </StyledTruncationClamp>
                )}
            </StyledTruncation>
        ),
        [
            children,
            handleAnimationEnd,
            handleClampClick,
            isOpen,
            lessLabel,
            moreLabel,
            newCollapsedHeight,
            originalHeight,
            showClamp,
        ],
    );
};

export default Truncation;
