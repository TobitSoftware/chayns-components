import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledProgressBar = styled.div`
    position: relative;
`;

type StyledProgressBarBackgroundProps = WithTheme<{ $color?: string }>;

export const StyledProgressBarBackground = styled.div<StyledProgressBarBackgroundProps>`
    height: 100%;
    width: 100%;
    background-color: ${({ theme, $color }: StyledProgressBarBackgroundProps) =>
        $color ?? theme['104']};
`;

type StyledProgressBarProgressWrapperProps = WithTheme<{
    $isBig?: boolean;
}>;

export const StyledProgressBarProgressWrapper = styled.div<StyledProgressBarProgressWrapperProps>`
    overflow: hidden;
    position: relative;
    width: 100%;
    height: ${({ $isBig }) => ($isBig ? 20 : 10)}px;
    border-radius: ${({ $isBig }) => ($isBig ? 20 : 2)}px;
`;

type StyledProgressBarProgressProps = WithTheme<{ $color?: string }>;

export const StyledMotionProgressBarProgress = styled(motion.div)<StyledProgressBarProgressProps>`
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    padding-left: 12px;
    background-color: ${({ theme, $color }: StyledProgressBarProgressProps) =>
        $color ?? theme.headline};
`;

type StyledProgressBarLabelProps = WithTheme<{
    $shouldShowLabelInline?: boolean;
    $primaryColor?: string;
    $secondaryColor?: string;
    $colorSplitPosition?: number;
}>;

export const StyledProgressBarLabel = styled.div<StyledProgressBarLabelProps>`
    font-size: 85%;
    color: ${({ theme, $shouldShowLabelInline }: StyledProgressBarLabelProps) =>
        $shouldShowLabelInline ? theme['100'] : theme.headline};
    white-space: nowrap;

    ${({ $colorSplitPosition, $primaryColor, $secondaryColor, theme }) =>
        $colorSplitPosition &&
        css`
            position: absolute;
            z-index: 2;
            width: 100%;
            height: 100%;

            display: flex;
            align-items: center;

            padding-left: 8px;

            font-weight: bold;

            -webkit-background-clip: text;

            color: transparent;
            background-image: linear-gradient(
                90deg,
                ${$primaryColor ?? theme['100']} ${$colorSplitPosition}%,
                ${$secondaryColor ?? theme['300']} ${$colorSplitPosition}%
            );
        `}
`;

export const StyledProgressBarStepWrapper = styled.div`
    height: 100%;
    width: 100%;
    position: absolute;
`;

type StyledProgressBarStepProps = WithTheme<{
    $position: number;
    $color?: string;
}>;

export const StyledProgressBarStep = styled.div<StyledProgressBarStepProps>`
    background-color: ${({ theme, $color }: StyledProgressBarStepProps) => $color ?? theme['102']};
    height: 100%;
    width: 2px;
    position: absolute;
    top: 0;
    left: ${({ $position }: StyledProgressBarStepProps) => $position}%;
`;
