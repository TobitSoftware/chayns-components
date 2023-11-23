import type { FramerMotionBugFix } from '@chayns-components/core';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledMotionSwipeableWrapper = styled(motion.div)<FramerMotionBugFix>`
    position: relative;
    touch-action: pan-y;
    user-select: none;
`;

export const StyledSwipeableWrapperContent = styled.div`
    overflow: hidden;
    width: 100%;
`;
