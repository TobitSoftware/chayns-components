import { motion } from 'framer-motion';
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
import TruncationClamp from './truncation-clamp/TruncationClamp';

export type TruncationOnChangeHandler = (e: MouseEvent<HTMLAnchorElement>, isOpen: boolean) => void;

export type TruncationProps = {
    className?: string;
    collapsedHeight?: number;
    moreLabel?: string;
    lessLabel?: string;
    animationDuration?: number;
    onChange?: TruncationOnChangeHandler;
    children: ReactElement;
};

const Truncation: FC<TruncationProps> = ({
    className,
    collapsedHeight = 150,
    moreLabel = 'Mehr',
    lessLabel = 'Weniger',
    animationDuration = 0.5,
    onChange,
    children,
}) => {
    const childrenContainerRef = useRef<HTMLDivElement | null>(null);
    const truncatedContentRef = useRef<HTMLElement | null>(null);
    const contentRef = useRef<HTMLElement | null>(null);

    const [childrenContainerHeight, setChildrenContainerHeight] = useState<number>();
    const maxOpenedHeight = useMemo(
        () => (childrenContainerHeight ? `${childrenContainerHeight}px` : 'auto'),
        [childrenContainerHeight]
    );

    const [isOpen, setIsOpen] = useState(false);

    const clampLabel = useMemo(
        () => (isOpen ? lessLabel : moreLabel),
        [isOpen, lessLabel, moreLabel]
    );
    const [showClamp, setShowClamp] = useState(true);

    // initialization logic
    // set the height of the children container to the collapsed height
    useEffect(() => {
        if (isOpen || !!truncatedContentRef.current || !childrenContainerRef.current) return;
        setChildrenContainerHeight(childrenContainerRef.current.scrollHeight);
        contentRef.current = childrenContainerRef.current.cloneNode(true) as HTMLElement;
        truncateElement(childrenContainerRef.current, collapsedHeight);
        truncatedContentRef.current = childrenContainerRef.current.cloneNode(true) as HTMLElement;
    }, [collapsedHeight, isOpen]);

    // if truncated content is the same as the content, don't show the clamp because its not truncated
    useEffect(() => {
        setShowClamp(contentRef.current?.innerHTML !== truncatedContentRef.current?.innerHTML);
    }, []);

    // updates the content of the children container on animation completion
    const handleAnimationCompletion = useCallback(() => {
        if (isOpen) {
            if (!childrenContainerRef?.current) return;
            childrenContainerRef.current.innerHTML = contentRef.current?.innerHTML ?? '';
        } else {
            if (!childrenContainerRef?.current) return;
            childrenContainerRef.current.innerHTML = truncatedContentRef.current?.innerHTML ?? '';
        }
    }, [isOpen]);

    // changes the state of the truncation
    const handleClampClick = useCallback<MouseEventHandler<HTMLAnchorElement>>(
        (e) => {
            setIsOpen((o) => {
                onChange?.(e, !o);
                return !o;
            });
        },
        [onChange]
    );

    return (
        <div className={className}>
            <motion.div
                ref={childrenContainerRef}
                initial={false}
                animate={{ height: isOpen ? maxOpenedHeight : `${collapsedHeight}px` }}
                transition={{ duration: animationDuration }}
                onAnimationComplete={handleAnimationCompletion}
            >
                {children}
            </motion.div>
            {showClamp && (
                <TruncationClamp onClick={handleClampClick}>{clampLabel}</TruncationClamp>
            )}
        </div>
    );
};

export default Truncation;
