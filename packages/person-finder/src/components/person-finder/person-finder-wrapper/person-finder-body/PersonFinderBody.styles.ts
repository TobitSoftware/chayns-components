import styled from 'styled-components';
import { motion } from 'motion/react';
import { WithTheme } from '@chayns-components/core';

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
    border-top: none;
    width: ${({ $width }) => $width}px;
    max-height: 300px;
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledMotionPersonFinderBodyProps) => theme['009-rgb']}, 0.08) inset;
`;

export const StyledPersonFinderBodyHeader = styled.div`
    padding: 10px;
`;
