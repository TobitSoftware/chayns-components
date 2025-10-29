import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import { ClampPosition } from './Truncation.types';
import type { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';

export const StyledTruncation = styled.div`
    position: relative;
    overflow: hidden;
`;

// Fix framer-motion bug
export const StyledMotionTruncationContent = styled(motion.div)`
    overflow: hidden;
    position: relative;
`;

export const StyledTruncationPseudoContent = styled.div`
    visibility: hidden;
    position: absolute;
    width: 100%;
`;

type StyledTruncationClampWrapperProps = WithTheme<{ $position: ClampPosition }>;

export const StyledTruncationClampWrapper = styled.div<StyledTruncationClampWrapperProps>`
    display: flex;

    ${({ $position }) => {
        switch ($position) {
            case ClampPosition.Left:
                return css`
                    justify-content: left;
                `;
            case ClampPosition.Middle:
                return css`
                    justify-content: center;
                `;
            default:
                return css`
                    justify-content: right;
                `;
        }
    }}
`;

export const StyledTruncationClamp = styled.a`
    cursor: pointer;
    z-index: 2;
`;
