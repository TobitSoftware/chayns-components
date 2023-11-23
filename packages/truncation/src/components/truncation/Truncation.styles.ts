import type { FramerMotionBugFix } from '@chayns-components/core';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledTruncation = styled.div``;

export const StyledMotionTruncationContent = styled(motion.div)<FramerMotionBugFix>``;

export const StyledTruncationClamp = styled.a`
    cursor: pointer;
    float: right;
`;
