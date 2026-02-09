import { motion } from 'motion/react';
import styled from 'styled-components';

export const StyledMultiActionButton = styled(motion.div)`
    align-items: stretch;
    background: transparent;
    display: inline-flex;
    max-width: 100%;
    position: relative;
    transition: width 0.2s ease;
    width: fit-content;
`;
