import type { WithTheme } from '@chayns-components/core';
import { motion } from 'framer-motion';
import styled from 'styled-components';

type StyledMonthWrapperProps = WithTheme<{ $height: number; $width: number }>;

export const StyledMonthWrapper = styled.div<StyledMonthWrapperProps>`
    width: ${({ $width }) => $width}px;
    overflow-x: clip;
    height: ${({ $height }) => $height}px;
`;

export const StyledMotionWrapper = styled(motion.div)`
    display: flex;
    height: 100%;
`;
