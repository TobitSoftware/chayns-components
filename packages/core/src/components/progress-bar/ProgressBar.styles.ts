import { motion } from 'framer-motion';
import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledProgressBar = styled.div`
    position: relative;
`;

type StyledProgressBarBackgroundProps = WithTheme<unknown>;
export const StyledProgressBarBackground = styled.div<StyledProgressBarBackgroundProps>`
    height: 10px;
    width: 100%;
    background-color: ${({ theme }: StyledProgressBarBackgroundProps) => theme['100']};
`;

type StyledProgressBarProgressProps = WithTheme<unknown>;
export const StyledMotionProgressBarProgress = styled(motion.div)<StyledProgressBarProgressProps>`
    height: 10px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: ${({ theme }: StyledProgressBarProgressProps) => theme.headline};
`;
