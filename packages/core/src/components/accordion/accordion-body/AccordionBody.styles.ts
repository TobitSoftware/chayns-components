import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import { BrowserName } from '../../../types/chayns';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledMotionAccordionBodyProps = WithTheme<{
    $maxHeight?: number;
    $browser: BrowserName;
}>;

export const StyledMotionAccordionBody = styled(motion.div)<StyledMotionAccordionBodyProps>`
    overflow: hidden;
    transition: none !important;

    ${({ $maxHeight }) =>
        typeof $maxHeight === 'number' &&
        css`
            max-height: ${$maxHeight}px;
            overflow-y: scroll;
        `}

    // Styles for custom scrollbar
    ${({ $browser, theme }: StyledMotionAccordionBodyProps) =>
        $browser === 'firefox'
            ? css`
                  scrollbar-color: rgba(${theme['text-rgb']}, 0.15) transparent;
                  scrollbar-width: thin;
              `
            : css`
                  &::-webkit-scrollbar {
                      width: 5px;
                  }

                  &::-webkit-scrollbar-track {
                      background-color: transparent;
                  }

                  &::-webkit-scrollbar-button {
                      background-color: transparent;
                      height: 5px;
                  }

                  &::-webkit-scrollbar-thumb {
                      background-color: rgba(${theme['text-rgb']}, 0.15);
                      border-radius: 20px;
                  }
              `}
`;
