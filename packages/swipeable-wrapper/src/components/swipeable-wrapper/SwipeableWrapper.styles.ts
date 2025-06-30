import { motion } from 'motion/react';
import styled from 'styled-components';

export const StyledMotionSwipeableWrapper = styled(motion.div)`
    position: relative;
    touch-action: pan-y;
    user-select: none;
`;

export const StyledSwipeableWrapperContent = styled.div`
    width: 100%;
`;
