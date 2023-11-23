import { motion } from 'framer-motion';
import styled from 'styled-components';
import type { FramerMotionBugFix } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledSearchInput = styled.div`
    align-items: center;
    display: flex;
    gap: 8px;
    height: 42px;
    justify-content: flex-end;
    width: 100%;
`;

export const StyledMotionSearchInputContentWrapper = styled(motion.div)<FramerMotionBugFix>`
    overflow: hidden;
`;

export const StyledMotionSearchInputIconWrapper = styled.div`
    height: 18px;
    width: 18px;
`;

export const StyledMotionSearchInputIconWrapperContent = styled(motion.div)<FramerMotionBugFix>``;
