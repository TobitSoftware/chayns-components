import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledSearchInput = styled.div`
    align-items: center;
    display: flex;
    gap: 8px;
    height: 42px;
`;

export const StyledMotionSearchInputContentWrapper = styled(motion.div)`
    overflow: hidden;
`;

export const StyledMotionSearchInputIconWrapper = styled.div`
    height: 18px;
    width: 18px;
`;

export const StyledMotionSearchInputIconWrapperContent = styled(motion.div)``;
