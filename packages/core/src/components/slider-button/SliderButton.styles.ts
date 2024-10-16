import { motion } from 'framer-motion';
import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

type StyledSliderButtonProps = WithTheme<{ $isDisabled?: boolean }>;

export const StyledSliderButton = styled.div<StyledSliderButtonProps>`
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
    width: 100%;
    touch-action: none;
`;

type StyledSliderButtonWrapperProps = WithTheme<{ $width: number; $isDisabled?: boolean }>;

export const StyledSliderButtonWrapper = styled.div<StyledSliderButtonWrapperProps>`
    align-items: center;
    background-color: ${({ theme }: StyledSliderButtonProps) => theme['404']};
    border-radius: 3px;
    border: none;
    color: white;
    cursor: pointer;
    display: inline-flex;
    line-height: 1.15;
    height: 32px;
    position: relative;
    user-select: none;
    transition: opacity 0.3s ease;
    z-index: 1;

    width: ${({ $width }) => $width}px;

    max-width: 100%;
    overflow-x: ${({ $isDisabled }) => ($isDisabled ? 'hidden' : 'scroll')};

    // Chrome
    &::-webkit-scrollbar {
        display: none;
    }

    // IE and Edge
    -ms-overflow-style: none;

    // Firefox
    scrollbar-width: none;
`;

type StyledSliderButtonItemProps = WithTheme<{ $isSelected: boolean; $width: number }>;

export const StyledSliderButtonItem = styled.div<StyledSliderButtonItemProps>`
    font-size: 110%;
    font-family: 'Roboto Medium', serif;
    padding: 7px 12px;
    min-width: ${({ $width }) => $width}px;
    max-width: ${({ $width }) => $width}px;
    display: flex;
    white-space: nowrap;
    justify-content: center;
    color: white;
`;

export const StyledSliderButtonButtonsWrapper = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
`;

type StyledMotionSliderButtonThumbProps = WithTheme<{ $width: number }>;

export const StyledMotionSliderButtonThumb = styled(motion.div)<StyledMotionSliderButtonThumbProps>`
    font-size: 110%;
    font-family: 'Roboto Medium', serif;
    background-color: ${({ theme }: StyledMotionSliderButtonThumbProps) => theme['408']};
    width: ${({ $width }) => $width}px;
    position: absolute;
    border-radius: 3px;
    box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.2);
    white-space: nowrap;
    z-index: 3;
    height: 32px;
    padding: 7px 12px;
    display: flex;
    color: white;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;
