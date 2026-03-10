import { motion } from 'motion/react';
import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledSearchBox = styled.div``;

type StyledMotionSearchBoxBodyProps = WithTheme<{
    $height: number;
    $width: number;
}>;

export const StyledMotionSearchBoxBody = styled(motion.div)<StyledMotionSearchBoxBodyProps>`
    background: ${({ theme }: StyledMotionSearchBoxBodyProps) => theme['000']};
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

export const StyledSearchBoxHintText = styled.div`
    text-align: center;
    opacity: 0.8;
    padding: 6px;
`;
