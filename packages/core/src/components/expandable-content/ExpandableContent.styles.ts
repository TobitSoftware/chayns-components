import { motion } from 'motion/react';
import styled from 'styled-components';

type StyledMotionExpandableContentProps = {
    $isOpen: boolean;
};

export const StyledMotionExpandableContent = styled(motion.div)<StyledMotionExpandableContentProps>`
    overflow: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
`;
