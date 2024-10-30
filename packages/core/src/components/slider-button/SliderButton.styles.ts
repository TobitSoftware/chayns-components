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
    background-color: ${({ theme }: StyledMotionSliderButtonThumbProps) => theme['408']};
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

    width: ${({ $width }) => $width}px;

    max-width: 100%;
    overflow-x: ${({ $isDisabled }) => ($isDisabled ? 'hidden' : 'scroll')};
    overflow-y: hidden;

    // Chrome
    &::-webkit-scrollbar {
        display: none;
    }

    // IE and Edge
    -ms-overflow-style: none;

    // Firefox
    scrollbar-width: none;
`;

type StyledSliderButtonItemProps = WithTheme<{ $width: number }>;

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

export const StyledSliderButtonPopupContent = styled.div`
    display: flex;
    flex-direction: column;
`;

type StyledSliderButtonPopupContentItemProps = WithTheme<{ $isSelected?: boolean }>;

export const StyledSliderButtonPopupContentItem = styled.div<StyledSliderButtonPopupContentItemProps>`
    font-size: 110%;
    font-family: 'Roboto Medium', serif;
    cursor: pointer;
    background-color: ${({ $isSelected, theme }: StyledSliderButtonPopupContentItemProps) =>
        $isSelected ? theme['secondary-102'] : undefined};
    padding: 4px 12px;
`;

type StyledSliderButtonButtonsWrapperProps = WithTheme<{ $isInvisible?: boolean }>;

export const StyledSliderButtonButtonsWrapper = styled.div<StyledSliderButtonButtonsWrapperProps>`
    position: absolute;
    z-index: ${({ $isInvisible }) => ($isInvisible ? '2' : '4')};
    opacity: ${({ $isInvisible }) => ($isInvisible ? 0 : 1)};
    display: flex;
    cursor: pointer;
    align-items: center;
    pointer-events: ${({ $isInvisible }) => ($isInvisible ? 'auto' : 'none')};
`;

type StyledMotionSliderButtonThumbProps = WithTheme<{ $width: number }>;

export const StyledMotionSliderButtonThumb = styled(motion.div)<StyledMotionSliderButtonThumbProps>`
    font-size: 110%;
    font-family: 'Roboto Medium', serif;
    background-color: ${({ theme }: StyledSliderButtonProps) => theme['405']};
    opacity: 1;
    width: ${({ $width }) => $width - 8}px;
    position: absolute;
    border-radius: 2px;
    top: 4px;
    left: 4px;
    white-space: nowrap;
    z-index: 3;
    height: 24px;
    padding: 7px 12px;
    display: flex;
    color: white;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;
