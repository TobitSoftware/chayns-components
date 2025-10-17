import { AnimatePresence } from 'motion/react';
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
    useMemo(
        () => (
            <AnimatePresence initial={false}>
                <StyledMotionExpandableContent
                    animate={{ height: isOpen ? 'auto' : '0px' }}
                    transition={{ duration: 0.2, type: 'tween', delay: isOpen ? startDelay : 0 }}
                >
                    {children}
                </StyledMotionExpandableContent>
            </AnimatePresence>
        ),
        [children, isOpen, startDelay],
    );

ExpandableContent.displayName = 'ExpandableContent';

export default ExpandableContent;
