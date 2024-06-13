import type { Browser } from 'detect-browser';
import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import type { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';

type StyledMotionSearchBoxBodyProps = WithTheme<{
    $width: number;
}>;

export const StyledMotionSearchBoxBody = styled(motion.div)<StyledMotionSearchBoxBodyProps>`
    background: ${({ theme }: StyledMotionSearchBoxBodyProps) => theme['101']};
    position: absolute;
    z-index: 4;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(160, 160, 160, 0.3);
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    border-top: none;
    width: ${({ $width }) => $width}px;
    max-height: 300px;
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledMotionSearchBoxBodyProps) => theme['009-rgb']}, 0.08) inset;
`;

export const StyledSearchBoxBodyHead = styled.div`
    padding: 10px 10px 5px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const StyledSearchBoxBodyHeadGroupName = styled.div``;

type StyledMotionSearchBoxBodyContentProps = WithTheme<{
    $height: number;
    $headHeight: number;
    $browser: Browser | 'bot' | null | undefined;
}>;

export const StyledMotionSearchBoxBodyContent = styled.div<StyledMotionSearchBoxBodyContentProps>`
    display: flex;
    flex-direction: column;
    cursor: pointer;
    width: 100%;
    max-height: ${({ $headHeight }) => 300 - $headHeight}px;
    overflow-y: ${({ $height, $headHeight }) => ($height + $headHeight <= 300 ? 'hidden' : 'auto')};

    // Styles for custom scrollbar
    ${({ $browser, theme }: StyledMotionSearchBoxBodyContentProps) =>
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
