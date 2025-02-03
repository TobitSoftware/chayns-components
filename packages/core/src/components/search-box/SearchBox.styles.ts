import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import { BrowserName } from '../../types/chayns';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledSearchBox = styled.div``;

type StyledMotionSearchBoxBodyProps = WithTheme<{
    $height: number;
    $width: number;
    $browser: BrowserName;
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
    cursor: pointer;
    width: ${({ $width }) => $width}px;
    max-height: 300px;
    overflow-y: ${({ $height }) => ($height <= 300 ? 'hidden' : 'auto')};
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledMotionSearchBoxBodyProps) => theme['009-rgb']}, 0.08) inset;

    // Styles for custom scrollbar
    ${({ $browser, theme }: StyledMotionSearchBoxBodyProps) =>
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

export const StyledSearchBoxIcon = styled.div`
    cursor: pointer;
    padding: 0 10px;
`;

export const StyledSearchBoxLeftWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;
