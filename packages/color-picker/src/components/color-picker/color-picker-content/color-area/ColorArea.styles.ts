import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledColorArea = styled.div`
    height: 150px;
    width: 300px;
    position: relative;
    user-select: none;
    overflow: hidden;
    cursor: crosshair;
    margin: 11px 11px 5px 11px;
`;

export const StyledColorAreaCanvas = styled.canvas`
    user-select: none;
`;

export const StyledMotionColorAreaPointer = styled(motion.div)`
    position: absolute;
    border-radius: 100%;
    border: 2px solid white;
    width: 20px;
    height: 20px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5), 0 0 3px 0 rgba(0, 0, 0, 0.5) inset;
    pointer-events: none;
    user-select: none;
    top: 0;
    left: 0;
`;
