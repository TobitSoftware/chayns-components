import {
    AnimatePresence,
    type AnimationControls,
    type TargetAndTransition,
    type VariantLabels,
} from 'framer-motion';
import React, { CSSProperties, FC, ReactNode, useMemo } from 'react';
import { StyledMotionExpandableContent } from './ExpandableContent.styles';

export type ExpandableContentProps = {
    children: ReactNode;
    style?: CSSProperties;
    duration?: number;
    animate?: boolean | AnimationControls | TargetAndTransition | VariantLabels;
    exit?: TargetAndTransition | VariantLabels;
    initial?: boolean | VariantLabels;
    id: string;
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
