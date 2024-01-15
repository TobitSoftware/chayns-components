import styled from 'styled-components';
import { motion } from 'framer-motion';

interface StyledLineWrapperProps {
    minHeight: number;
}

export const StyledLineWrapper = styled.div<StyledLineWrapperProps>`
    display: flex;
    min-height: ${({ minHeight }) => minHeight}px;
`;

interface StyledLineProps {
    color: string;
    isDashed?: boolean;
}

export const StyledLine = styled(motion.div)<StyledLineProps>`
    width: 3px;
    border-radius: 3px;
    background-color: ${({ color }) => color};
    margin-left: 16px;

    ${({ isDashed, color }) => isDashed && `
        border-right: 3px dashed ${color};
        border-radius: 0!important;
        margin-left: 16px;
        background-color: var(--chayns-color--cw-background)!important;
    `}
`;
