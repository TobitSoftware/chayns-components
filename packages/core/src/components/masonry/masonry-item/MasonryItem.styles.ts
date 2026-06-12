import styled from 'styled-components';
import { motion } from 'motion/react';

export const StyledMasonryItem = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    will-change: transform, width;
`;
