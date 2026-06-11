import { motion } from 'motion/react';
import styled from 'styled-components';

export const StyledMasonryItem = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    will-change: transform, width;
`;
