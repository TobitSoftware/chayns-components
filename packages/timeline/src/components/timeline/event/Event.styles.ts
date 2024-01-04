import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledEvent = styled.div`
`;


export const EventContent = styled.div`
    position: relative;
    display: flex;
`;

export const StyledChildEventsWrapper = styled.div`
    margin: 12px 0 12px 35px;
`

interface StyledDurationProps {
    isSubEvent?: boolean;
}

export const StyledDuration = styled(motion.div)<StyledDurationProps>`
    position: absolute;
    top: 40%;
    left: 25px;
    ${({isSubEvent}) => !isSubEvent && 'transform: translateX(calc(-100% - 15px))'};

    font-size: 13px;
`;
