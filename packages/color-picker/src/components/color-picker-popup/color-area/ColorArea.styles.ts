import { motion } from 'motion/react';
import styled from 'styled-components';

export const StyledColorArea = styled.div`
    height: 150px;
    width: 300px;
    position: relative;
    user-select: none;
    overflow: hidden;
    cursor: crosshair;
`;

export const StyledColorAreaCanvas = styled.canvas`
    user-select: none;
`;

export const StyledColorAreaPseudo = styled.div`
    position: absolute;
    top: -10px;
    left: -10px;
    touch-action: none;
    user-select: none;

    height: 170px;
    width: 320px;
`;

export const StyledMotionColorAreaPointer = styled(motion.div)`
    position: absolute;
    border-radius: 100%;
    border: 2px solid white;
    width: 20px;
    height: 20px;
    box-shadow:
        0 0 5px 0 rgba(0, 0, 0, 0.5),
        0 0 3px 0 rgba(0, 0, 0, 0.5) inset;
    pointer-events: none;
    user-select: none;
    top: 0;
    left: 0;
`;
