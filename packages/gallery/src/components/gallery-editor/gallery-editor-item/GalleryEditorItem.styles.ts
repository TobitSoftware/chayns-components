import type { WithTheme } from '@chayns-components/core';
import { motion } from 'motion/react';
import styled from 'styled-components';

export const StyledMotionGalleryEditorItem = styled(motion.div)`
    display: flex;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
`;

type StyledGalleryEditorItemDeleteButtonProps = WithTheme<unknown>;

export const StyledGalleryEditorItemDeleteButton = styled.button<
    StyledGalleryEditorItemDeleteButtonProps & {
        $zIndex: number;
    }
>`
    background-color: rgba(
        ${({ theme }: StyledGalleryEditorItemDeleteButtonProps) => theme['000-rgb']},
        0.75
    );
    box-shadow: 0 0 0 1px
        rgba(${({ theme }: StyledGalleryEditorItemDeleteButtonProps) => theme['009-rgb']}, 0.08)
        inset;
    position: absolute;
    top: 0;
    right: 0;
    z-index: ${({ $zIndex }) => $zIndex};
    height: 30px;
    width: 30px;
    border: 0;
    padding: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`;
