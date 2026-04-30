import styled from 'styled-components';
import { motion } from 'motion/react';

export const StyledInputContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
`;

export const StyledInputBottomRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
`;

export const StyledInputLayoutWrapper = styled(motion.div)`
    flex: 1;
    min-width: 0;
`;
