import { AnimatePresence } from 'motion/react';
import React, { FC, ReactNode, useMemo } from 'react';
import { StyledMotionExpandableContent } from './ExpandableContent.styles';

export type ExpandableContentProps = {
    /**
     * The children that should be animated.
     */
    children: ReactNode;
    /**
     * Whether the content is expanded.
     */
    isOpen: boolean;
};

const ExpandableContent: FC<ExpandableContentProps> = ({ children, isOpen }) =>
    useMemo(
        () => (
            <AnimatePresence initial={false}>
                <StyledMotionExpandableContent
                    animate={{ height: isOpen ? 'auto' : '0px' }}
                    transition={{ duration: 0.2, type: 'tween' }}
                >
                    {children}
                </StyledMotionExpandableContent>
            </AnimatePresence>
        ),
        [children, isOpen],
    );

ExpandableContent.displayName = 'ExpandableContent';

export default ExpandableContent;
