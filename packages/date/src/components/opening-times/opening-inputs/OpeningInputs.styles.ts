import type { WithTheme } from '@chayns-components/core';
import { motion } from 'framer-motion';
import styled from 'styled-components';

export const StyledOpeningInputs = styled(motion.div)`
    display: flex;
    flex-direction: column;
    //gap: 8px;
`;

type StyledOpeningInputPreviewProps = WithTheme<unknown>;

export const StyledOpeningInputPreview = styled.div<StyledOpeningInputPreviewProps>`
    color: ${({ theme }: StyledOpeningInputPreviewProps) => theme.text};
`;
