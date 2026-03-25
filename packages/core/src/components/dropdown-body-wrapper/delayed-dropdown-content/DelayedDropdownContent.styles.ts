import { motion } from 'motion/react';
import styled from 'styled-components';
import { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';
import { DropdownCoordinates, DropdownTransform } from '../../../types/dropdown';

type StyledMotionDelayedDropdownContentProps = WithTheme<{
    $coordinates: DropdownCoordinates;
    $transform: DropdownTransform;
}>;

export const StyledMotionDelayedDropdownContent = styled(
    motion.div,
)<StyledMotionDelayedDropdownContentProps>`
    position: absolute;

    height: fit-content;
    width: fit-content;

    top: ${({ $coordinates }) => $coordinates.y}px;
    left: ${({ $coordinates }) => $coordinates.x}px;

    transform: ${({ $transform }) => `translate(${$transform.x}, ${$transform.y})`};

    z-index: 15;
`;
