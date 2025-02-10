import type { WithTheme } from '@chayns-components/core';
import { motion } from 'motion/react';
import styled, { css } from 'styled-components';

type StyledOpeningInputsProps = WithTheme<{ $editMode: boolean }>;

export const StyledOpeningInputs = styled(motion.div)<StyledOpeningInputsProps>`
    display: flex;
    ${({ $editMode }) =>
        $editMode &&
        css`
            flex-direction: column;
        `}
`;

type StyledOpeningInputPreviewProps = WithTheme<unknown>;

export const StyledOpeningInputPreview = styled.div<StyledOpeningInputPreviewProps>`
    color: ${({ theme }: StyledOpeningInputPreviewProps) => theme.text};
`;
