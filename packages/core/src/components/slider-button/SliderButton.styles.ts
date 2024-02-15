import { motion } from 'framer-motion';
import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledSliderButtonProps = WithTheme<{ $isDisabled?: boolean }>;

export const StyledSliderButton = styled.div<StyledSliderButtonProps>`
    align-items: center;
    background-color: ${({ theme }: StyledSliderButtonProps) => theme['404']};
    border-radius: 3px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    border: none;
    color: white;
    cursor: pointer;
    display: inline-flex;
    line-height: 1.15;
    min-height: 32px;
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
    position: relative;
    user-select: none;
    transition: opacity 0.3s ease;
    z-index: 1;
`;

type StyledSliderButtonItemProps = WithTheme<{ $isSelected: boolean; $width: number }>;

export const StyledSliderButtonItem = styled.div<StyledSliderButtonItemProps>`
    padding: 7px 12px;
    width: ${({ $width }) => $width}px;
    display: flex;
    justify-content: center;
`;

type StyledMotionSliderButtonThumbProps = WithTheme<{ $width: number }>;

export const StyledMotionSliderButtonThumb = styled(motion.div)<StyledMotionSliderButtonThumbProps>`
    background-color: ${({ theme }: StyledMotionSliderButtonThumbProps) => theme['408']};
    width: ${({ $width }) => $width}px;
    position: absolute;
    border-radius: 3px;
    z-index: 3;
    height: 100%;
    padding: 7px 12px;
    display: flex;
    justify-content: center;
`;
