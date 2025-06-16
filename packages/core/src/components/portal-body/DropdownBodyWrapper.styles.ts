import styled from 'styled-components';
import { WithTheme } from '../color-scheme-provider/ColorSchemeProvider';
import { DropdownCoordinates } from '../../types/dropdown';
import { motion } from 'motion/react';

export const StyledDropdownBodyWrapper = styled.div``;

type StyledDropdownBodyWrapperContentProps = WithTheme<{
    $width: number;
    $coordinates: DropdownCoordinates;
    $maxHeight: number;
}>;

export const StyledMotionDropdownBodyWrapperContent = styled(
    motion.div,
)<StyledDropdownBodyWrapperContentProps>`
    width: ${({ $width }) => $width}px;
    max-height: ${({ $maxHeight }) => $maxHeight}px;
    top: ${({ $coordinates }) => $coordinates.y}px;
    left: ${({ $coordinates }) => $coordinates.x}px;

    // Basic styles
    background: ${({ theme }: StyledDropdownBodyWrapperContentProps) => theme['000']};
    position: absolute;
    z-index: 4;
    border: 1px solid rgba(160, 160, 160, 0.3);
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    overflow: hidden;
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledDropdownBodyWrapperContentProps) => theme['009-rgb']}, 0.08) inset;
`;
