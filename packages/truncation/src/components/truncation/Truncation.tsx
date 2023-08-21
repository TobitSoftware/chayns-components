import React, {
    FC,
    MouseEvent,
    MouseEventHandler,
    ReactElement,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { truncateElement } from '../../utils/truncation';
import {
    StyledMotionTruncationContent,
    StyledTruncation,
    StyledTruncationClamp,
} from './Truncation.styles';

export type TruncationProps = {
    collapsedHeight?: number;
    moreLabel?: string;
    lessLabel?: string;
    onChange?: (event: MouseEvent<HTMLAnchorElement>, isOpen: boolean) => void;
    children: ReactElement;
};

const Truncation: FC<TruncationProps> = ({
    collapsedHeight = 150,
    moreLabel = 'Mehr',
    lessLabel = 'Weniger',
    onChange,
    children,
}) => {
    const childrenContainerRef = useRef<HTMLDivElement | null>(null);
    const truncatedContentRef = useRef<HTMLElement | null>(null);
    const contentRef = useRef<HTMLElement | null>(null);

    const [childrenContainerHeight, setChildrenContainerHeight] = useState<number>();
    const [isOpen, setIsOpen] = useState(false);
    const [showClamp, setShowClamp] = useState(true);

    // updates the content of the children container on animation completion
    const handleAnimationComplete = useCallback(() => {
        if (childrenContainerRef.current) {
            childrenContainerRef.current.innerHTML = isOpen
                ? contentRef.current?.innerHTML ?? ''
                : truncatedContentRef.current?.innerHTML ?? '';
        }
    }, [isOpen]);

    // changes the state of the truncation
    const handleClampClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
        (event) => {
            setIsOpen((current) => {
                onChange?.(event, !current);

                return !current;
            });
        },
        [onChange]
    );

    // initialization logic
    // set the height of the children container to the collapsed height
    useEffect(() => {
        if (isOpen || !!truncatedContentRef.current || !childrenContainerRef.current) {
            return;
        }

        setChildrenContainerHeight(childrenContainerRef.current.scrollHeight);

        contentRef.current = childrenContainerRef.current.cloneNode(true) as HTMLElement;

        truncateElement(childrenContainerRef.current, collapsedHeight);

        truncatedContentRef.current = childrenContainerRef.current.cloneNode(true) as HTMLElement;
    }, [collapsedHeight, isOpen]);

    // If truncated content is the same as the content, don't show the clamp because it's not needed
    useEffect(() => {
        setShowClamp(contentRef.current?.innerHTML !== truncatedContentRef.current?.innerHTML);
    }, []);

    const height = isOpen ? childrenContainerHeight ?? 'auto' : `${collapsedHeight}px`;

    return (
        <StyledTruncation className="beta-chayns-truncation">
            <StyledMotionTruncationContent
                animate={{ height }}
                initial={false}
                onAnimationComplete={handleAnimationComplete}
                ref={childrenContainerRef}
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
    );
};

export default Truncation;
