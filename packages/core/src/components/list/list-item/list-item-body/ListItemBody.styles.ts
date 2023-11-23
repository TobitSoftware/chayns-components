import { motion } from 'framer-motion';
import styled from 'styled-components';
import type { FramerMotionBugFix } from '../../../color-scheme-provider/ColorSchemeProvider';

export const StyledMotionListItemBody = styled(motion.div)<FramerMotionBugFix>`
    overflow: hidden;
`;
