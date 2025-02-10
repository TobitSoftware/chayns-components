import { motion } from 'motion/react';
import type { CSSProperties } from 'react';
import styled, { css } from 'styled-components';

type StyledSwipeableActionProps = {
    $position: 'left' | 'right';
    $backgroundColor: CSSProperties['backgroundColor'];
};

export const StyledMotionSwipeableAction = styled(motion.div)<StyledSwipeableActionProps>`
    background-color: ${({ $backgroundColor }) => $backgroundColor};
    display: flex;
    height: 100%;
    position: absolute;
    top: 0;
    width: 200vw;

    ${({ $position }) => {
        if ($position === 'left') {
            return css`
                justify-content: flex-end;
                right: 100%;
            `;
        }
        return css`
            justify-content: flex-start;
            left: 100%;
        `;
    }}
`;

type StyledSwipeableActionButtonsProps = {
    $width: CSSProperties['width'];
    $color: CSSProperties['color'];
};

export const StyledSwipeableActionButton = styled.button<StyledSwipeableActionButtonsProps>`
    align-items: center;
    appearance: none;
    background: none;
    box-shadow: none;
    color: ${({ $color }) => $color};
    display: flex;
    flex-direction: column;
    font-size: 88%;
    gap: 4px;
    height: 100%;
    justify-content: center;
    margin: 0;
    padding: 0;
    width: ${({ $width }) => $width};
`;
