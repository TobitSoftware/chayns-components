import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledCalendar = styled.div`
    display: flex;
`;

export const StyledCalendarIconWrapper = styled.div`
    cursor: pointer;
`;

export const StyledMotionMonthWrapper = styled(motion.div)`
    width: 100%;
`;
