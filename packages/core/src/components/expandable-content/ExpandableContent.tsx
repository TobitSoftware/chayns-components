import {
    AnimatePresence,
    type AnimationControls,
    type TargetAndTransition,
    type VariantLabels,
} from 'framer-motion';
import React, { CSSProperties, FC, ReactNode, useMemo } from 'react';
import { StyledMotionExpandableContent } from './ExpandableContent.styles';

export type ExpandableContentProps = {
    /**
     * The styles that should be animated.
     */
    animate?: boolean | AnimationControls | TargetAndTransition | VariantLabels;
    /**
     * The children that should be animated.
     */
    children: ReactNode;
    /**
     * How long the animation last.
     */
    duration?: number;
    /**
     * the exit animation.
     */
    exit?: TargetAndTransition | VariantLabels;
    /**
     * the id of the element.
     */
    id: string;
    /**
     * the initial animation.
     */
    initial?: boolean | VariantLabels;
    /**
     * The style of the wrapper.
     */
    style?: CSSProperties;
    /**
     * The type of the animation.
     */
    type?: 'just' | 'inertia' | 'tween' | 'spring' | 'keyframes';
};

const ExpandableContent: FC<ExpandableContentProps> = ({
    children,
    id,
    exit,
    type = 'tween',
    initial,
    animate,
    style,
    duration = 0.2,
}) =>
    useMemo(
        () => (
            <AnimatePresence initial={false}>
                <StyledMotionExpandableContent
                    animate={animate}
                    initial={initial}
                    exit={exit}
                    transition={{ duration, type }}
                    key={id}
                    style={{ ...style }}
                >
                    {children}
                </StyledMotionExpandableContent>
            </AnimatePresence>
        ),
        [animate, children, duration, exit, id, initial, style, type],
    );

ExpandableContent.displayName = 'ExpandableContent';

export default ExpandableContent;
