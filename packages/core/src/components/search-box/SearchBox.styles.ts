import { motion } from 'framer-motion';
import styled from 'styled-components';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledSearchBox = styled.div``;

type StyledMotionSearchBoxBodyProps = WithTheme<{
    height: number;
    width: number;
}>;

export const StyledMotionSearchBoxBody = styled(motion.div)<StyledMotionSearchBoxBodyProps>`
    background: ${({ theme }: StyledMotionSearchBoxBodyProps) => theme['001']};
    position: absolute;
    z-index: 4;
    display: flex;
    flex-direction: column;
    border: 1px solid rgba(160, 160, 160, 0.3);
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    border-top: none;
    cursor: pointer;
    width: ${({ width }) => width}px;
    max-height: 300px;
    overflow-y: ${({ height }) => (height <= 300 ? 'hidden' : 'auto')};
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledMotionSearchBoxBodyProps) => theme['009-rgb']}, 0.08) inset;

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(160, 160, 160, 1);
    }
`;
