import { motion } from 'motion/react';
import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledProgressBar = styled.div`
    position: relative;
`;

type StyledProgressBarBackgroundProps = WithTheme<unknown>;
export const StyledProgressBarBackground = styled.div<StyledProgressBarBackgroundProps>`
    height: 10px;
    width: 100%;
    border-radius: 2px;
    background-color: ${({ theme }: StyledProgressBarBackgroundProps) => theme['104']};
`;

export const StyledProgressBarProgressWrapper = styled.div`
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 10px;
    border-radius: 2px;
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

type StyledProgressBarLabelProps = WithTheme<unknown>;

export const StyledProgressBarLabel = styled.div<StyledProgressBarLabelProps>`
    font-size: 85%;
    color: ${({ theme }: StyledProgressBarLabelProps) => theme.headline};
`;
