import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { FramerMotionBugFix } from '@chayns-components/core';

export const StyledEvent = styled.div`
    display: flex;
`;


export const EventContent = styled.div`
    position: relative;
    display: flex;
`;

export const StyledChildEventsWrapper = styled.div`
    margin: 12px 0 12px 35px;
`

export const StyledDuration = styled(motion.div)<FramerMotionBugFix>`
    position: absolute;
    top: 40%;
    left: 25px;

    font-size: 13px;
`;
