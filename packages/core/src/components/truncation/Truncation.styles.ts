import { motion } from 'framer-motion';
import styled from 'styled-components';
import type { FramerMotionBugFix } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledTruncation = styled.div`
    position: relative;
`;

// Fix framer-motion bug
export const StyledMotionTruncationContent = styled(motion.div)<FramerMotionBugFix>`
    overflow: hidden;
`;

export const StyledTruncationPseudoContent = styled.div`
    visibility: hidden;
    position: absolute;
    width: fit-content;
`;

export const StyledTruncationClamp = styled.a`
    cursor: pointer;
    float: right;
`;
