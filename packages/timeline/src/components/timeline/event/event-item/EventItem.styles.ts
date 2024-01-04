import styled from 'styled-components';
import { motion } from 'framer-motion';
import type { FramerMotionBugFix } from '@chayns-components/core';

export const StyledEventItem = styled.div`
    display: flex;
    align-items: center;
    margin-top: 5px;
`

interface StyledEventItemContentProps {
    color: string;
}

export const StyledIconWrapper = styled(motion.div)<StyledEventItemContentProps>`
    background-color: ${({ color }) => color};
    width: 35px;
    height: 35px;
    border-radius: 100px;
    margin-bottom: 5px;
    transition: opacity 0.3s;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.08);
`

export const StyledEventItemContent = styled(motion.div)<FramerMotionBugFix>`
    margin-left: 8px;
    transition: opacity 0.3s;
`
