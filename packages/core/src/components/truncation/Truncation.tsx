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

    const pseudoChildrenRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        if (!pseudoChildrenRef.current) {
            return;
        }

        let summedHeight = 0;

        const elementChildren = pseudoChildrenRef.current.children;

        if (!elementChildren[0]) {
            return;
        }

        const element = Array.from(elementChildren[0].children);

        const heights = element.map((child, index) => {
            const computedStyle = window.getComputedStyle(child);
            const marginTop = parseFloat(computedStyle.marginTop);
            const marginBottom = parseFloat(computedStyle.marginBottom);

            // Höhe des Elements inklusive Margin berechnen
            const totalHeight = child.clientHeight + marginTop + marginBottom;

            return {
                index,
                height: totalHeight,
            };
        });

        let isSummedHeightCalculated = false;

        heights.forEach(({ height }) => {
            if (summedHeight + height <= collapsedHeight && !isSummedHeightCalculated) {
                summedHeight += height;

                return;
            }

            isSummedHeightCalculated = true;
        });

        setNewCollapsedHeight(summedHeight > 0 ? summedHeight : collapsedHeight);
    }, [collapsedHeight, pseudoChildrenRef]);

    // Checks if the clamp should be shown
    useEffect(() => {
        if (pseudoChildrenRef.current) {
            setShowClamp(pseudoChildrenRef.current.offsetHeight > newCollapsedHeight);
        }
    }, [collapsedHeight, newCollapsedHeight]);

    return useMemo(
        () => (
            <StyledTruncation className="beta-chayns-truncation">
                <StyledTruncationPseudoContent ref={pseudoChildrenRef}>
                    {children}
                </StyledTruncationPseudoContent>
                <StyledMotionTruncationContent
                    animate={{ height: isOpen ? 'auto' : newCollapsedHeight }}
                    initial={false}
                    transition={{ type: 'tween' }}
                >
                    {children}
                </StyledMotionTruncationContent>
                {showClamp && (
                    <StyledTruncationClamp onClick={handleClampClick}>
                        {isOpen ? lessLabel : moreLabel}
                    </StyledTruncationClamp>
                )}
            </StyledTruncation>
        ),
        [children, handleClampClick, isOpen, lessLabel, moreLabel, newCollapsedHeight, showClamp],
    );
};

export default Truncation;
