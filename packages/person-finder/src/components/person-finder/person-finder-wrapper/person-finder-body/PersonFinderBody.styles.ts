import styled, { css } from 'styled-components';
import { motion } from 'motion/react';
import { BrowserName, WithTheme } from '@chayns-components/core';

type StyledMotionPersonFinderBodyProps = WithTheme<{
    $width: number;
}>;

export const StyledMotionPersonFinderBody = styled(motion.div)<StyledMotionPersonFinderBodyProps>`
    background: ${({ theme }: StyledMotionPersonFinderBodyProps) => theme['000']};
    position: absolute;
    z-index: 4;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(160, 160, 160, 0.3);
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    overflow: hidden;
    border-top: none;
    width: ${({ $width }) => $width}px;
    max-height: 300px;
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledMotionPersonFinderBodyProps) => theme['009-rgb']}, 0.08) inset;
`;

type StyledPersonFinderBodyHeaderProps = WithTheme<{ $isScrollTop: boolean }>;

export const StyledPersonFinderBodyHeader = styled.div<StyledPersonFinderBodyHeaderProps>`
    transition: box-shadow 0.2s;

    ${({ $isScrollTop }: StyledPersonFinderBodyHeaderProps) =>
        !$isScrollTop &&
        css`
            box-shadow: 0 1px 4px #0000001a;
        `}
`;

export const StyledPersonFinderBodyHeaderFilter = styled.div`
    padding: 10px;
`;

export const StyledPersonFinderBodyWaitCursor = styled.div`
    display: flex;
    justify-content: center;
`;

export const StyledPersonFinderBodyErrorMessage = styled.div`
    text-align: center;
`;

export const StyledPersonFinderBodyHeaderGroupName = styled.div`
    padding: 5px 10px;
    font-weight: bold;
`;

type StyledPersonFinderBodyContentProps = WithTheme<{ $browser: BrowserName }>;

export const StyledPersonFinderBodyContent = styled.div<StyledPersonFinderBodyContentProps>`
    height: 100%;
    overflow-y: auto;
    padding-bottom: 10px;

    // Styles for custom scrollbar
    ${({ $browser, theme }: StyledPersonFinderBodyContentProps) =>
        $browser === 'firefox'
            ? css`
                  scrollbar-color: rgba(${theme['text-rgb']}, 0.15) transparent;
                  scrollbar-width: thin;
              `
            : css`
                  &::-webkit-scrollbar {
                      width: 10px;
                      height: 10px;
                  }

                  &::-webkit-scrollbar-track {
                      background-color: transparent;
                  }

                  &::-webkit-scrollbar-button {
                      background-color: transparent;
                      height: 5px;
                      width: 5px;
                  }

                  &::-webkit-scrollbar-thumb {
                      background-color: rgba(${theme['text-rgb']}, 0.15);
                      border-radius: 20px;
                      background-clip: padding-box;
                      border: solid 3px transparent;
                  }

                  &::-webkit-scrollbar-corner {
                      background-color: transparent;
                  }
              `}
`;

export const StyledPersonFinderBodyContentGroupName = styled.div`
    padding: 5px 10px;
    font-weight: bold;
`;

export const StyledPersonFinderBodyContentButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;
