import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledLineWrapper = styled.div`
    display:flex;
    min-height:70px;
`

interface StyledLineProps {
    color: string;
}

export const StyledLine = styled(motion.div)<StyledLineProps>`
    width:3px;
    border-radius: 3px;
    background-color: ${({ color }) => color};
    margin-left: 16px;
`
