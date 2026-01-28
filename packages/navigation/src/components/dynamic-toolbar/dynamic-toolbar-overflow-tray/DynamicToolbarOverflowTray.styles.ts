import { motion } from 'motion/react';
import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';

type StyledMotionDynamicToolbarOverflowTrayProps = WithTheme<{}>;

export const StyledMotionDynamicToolbarOverflowTray = styled(
    motion.div,
)<StyledMotionDynamicToolbarOverflowTrayProps>`
    background-color: ${({ theme }) => theme['100']};
    border-radius: 8px;
    bottom: 33px;
    overflow: hidden;
    padding-bottom: 52px;
    position: fixed;
    width: 80vw;
`;

export const StyledDynamicToolbarOverflowTrayItems = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 6px;
`;
