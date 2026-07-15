import { AnimatePresence, Variants } from 'motion/react';
import React, { FC, ReactNode, useMemo } from 'react';
import { StyledMotionExpandableContent } from './ExpandableContent.styles';

export type ExpandableContentProps = {
    /**
     * The children that should be animated.
     */
    children: ReactNode;
    /**
     * An optional start delay.
     */
    startDelay?: number;
    /**
     * Whether the content is expanded.
     */
    isOpen: boolean;
};

const ExpandableContent: FC<ExpandableContentProps> = ({ children, isOpen, startDelay }) =>
    useMemo(() => {
        const variants: Variants = {
            open: {
                height: 'auto',
                overflow: 'hidden',
                transition: { duration: 0.2, type: 'tween', delay: startDelay },
                transitionEnd: { overflow: 'visible' },
            },
            closed: {
                height: '0px',
                overflow: 'hidden',
                transition: { duration: 0.2, type: 'tween' },
            },
        };

        return (
            <AnimatePresence initial={false}>
                <StyledMotionExpandableContent
                    animate={isOpen ? 'open' : 'closed'}
                    variants={variants}
                >
                    {children}
                </StyledMotionExpandableContent>
            </AnimatePresence>
        );
    }, [children, isOpen, startDelay]);

ExpandableContent.displayName = 'ExpandableContent';

export default ExpandableContent;
