import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';
import { DropdownCoordinates, DropdownTransform } from '../Dropdown.types';

type StyledMotionDelayedDropdownContentProps = WithTheme<{
    $shouldHideContent: boolean;
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

    ${({ $shouldHideContent }) =>
        $shouldHideContent
            ? css`
                  visibility: hidden;
                  pointer-events: none;
                  z-index: -1;
              `
            : css`
                  z-index: 5;
              `}
`;
