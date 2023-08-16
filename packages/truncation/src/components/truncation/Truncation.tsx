import { motion } from 'framer-motion';
import React, { FC, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import TruncationClamp from './truncation-clamp/TruncationClamp';

export type TruncationProps = {
    isDefaultOpen?: boolean;
    collapsedHeight?: number;
    moreLabel?: string;
    lessLabel?: string;
    children: ReactElement;
};

const doesOverflow = (element: HTMLElement, referenceHeight: number): boolean =>
    element.scrollHeight > referenceHeight;

function hasOnlyText(element: HTMLElement): boolean {
    // Check if element has no child elements.
    if (element.children.length === 0) {
        // If element has text (not empty), it is only text.
        return element.textContent !== '';
    }
    // Element has child elements or no text, so it's not only text.
    return false;
}

const removeLastLeafElement = (element: HTMLElement) => {
    // remove last element of html element where the last element is a leaf element and its content is a string
    const lastChild: Element | null = element.lastElementChild;
    if (lastChild && !hasOnlyText(lastChild as HTMLElement) && lastChild.hasChildNodes()) {
        removeLastLeafElement(lastChild as HTMLElement);
    } else if (lastChild) {
        element.removeChild(lastChild);
    }
};
const truncatedElement = (element: HTMLElement, referenceHeight: number) => {
    while (doesOverflow(element, referenceHeight)) {
        removeLastLeafElement(element);
    }
};

const ChildrenContainer = styled(motion.div)`
    overflow: hidden;
`;

const Truncation: FC<TruncationProps> = ({
    isDefaultOpen,
    collapsedHeight = 150,
    moreLabel = 'Mehr',
    lessLabel = 'Weniger',
    children,
}) => {
    const childrenContainerRef = useRef<HTMLDivElement | null>(null);
    const truncatedContentRef = useRef<HTMLElement | null>(null);
    const contentRef = useRef<HTMLElement | null>(null);

    const [isOpen, setIsOpen] = useState(isDefaultOpen ?? false);

    const clampLabel = useMemo(
        () => (isOpen ? lessLabel : moreLabel),
        [isOpen, lessLabel, moreLabel]
    );
    const [showClamp, setShowClamp] = useState(true);

    useEffect(() => {
        if (isOpen || !!truncatedContentRef.current || !childrenContainerRef.current) return;
        contentRef.current = childrenContainerRef.current.cloneNode(true) as HTMLElement;
        truncatedElement(childrenContainerRef.current, collapsedHeight);
        truncatedContentRef.current = childrenContainerRef.current.cloneNode(true) as HTMLElement;
    }, [collapsedHeight, isOpen]);

    useEffect(() => {
        setShowClamp(contentRef.current?.innerHTML !== truncatedContentRef.current?.innerHTML);
    }, []);

    useEffect(() => {
        if (isOpen) {
            if (!childrenContainerRef?.current) return;
            childrenContainerRef.current.innerHTML = contentRef.current?.innerHTML ?? '';
        } else {
            if (!childrenContainerRef?.current) return;
            childrenContainerRef.current.innerHTML = truncatedContentRef.current?.innerHTML ?? '';
        }
    }, [isOpen]);

    const handleClampClick = useCallback(() => {
        setIsOpen((o) => !o);
    }, []);

    return (
        <div>
            <ChildrenContainer
                ref={childrenContainerRef}
                initial={false}
                animate={{ maxHeight: isOpen ? '10000px' : `${collapsedHeight}px` }}
                transition={{ duration: 5 }}
            >
                {children}
            </ChildrenContainer>
            {showClamp && (
                <TruncationClamp onClick={handleClampClick}>{clampLabel}</TruncationClamp>
            )}
        </div>
    );
};

export default Truncation;
