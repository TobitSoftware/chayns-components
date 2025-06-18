import { motion } from 'motion/react';
import styled, { css } from 'styled-components';
import { WithTheme } from '../../color-scheme-provider/ColorSchemeProvider';
import { DropdownCoordinates } from '../../../types/dropdown';

type StyledMotionDelayedDropdownContentProps = WithTheme<{
    $shouldHideContent: boolean;
    $coordinates: DropdownCoordinates;
}>;

export const StyledMotionDelayedDropdownContent = styled(
    motion.div,
)<StyledMotionDelayedDropdownContentProps>`
    position: absolute;

    top: ${({ $coordinates }) => $coordinates.y}px;
    left: ${({ $coordinates }) => $coordinates.x}px;

    ${({ $shouldHideContent }) =>
        $shouldHideContent
            ? css`
                  visibility: hidden;
                  pointer-events: none;
                  z-index: -1;
              `
            : css`
                  z-index: 4;
              `}
`;
