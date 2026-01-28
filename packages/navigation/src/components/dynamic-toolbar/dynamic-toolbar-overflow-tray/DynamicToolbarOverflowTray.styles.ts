import { motion } from 'motion/react';
import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';

type StyledMotionDynamicToolbarOverflowTrayProps = WithTheme<{}>;

export const StyledMotionDynamicToolbarOverflowTray = styled(
    motion.div,
)<StyledMotionDynamicToolbarOverflowTrayProps>`
    background-color: ${({ theme }) => theme['100']};
    border-radius: 8px;
`;

export const StyledDynamicToolbarOverflowTrayItems = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    padding: 6px;
`;

export const StyledMotionDynamicToolbarOverflowTrayWrapper = styled.div`
    position: fixed;
    bottom: 33px;
    width: 80vw;
    overflow: hidden;
`;

export const StyledMotionDynamicToolbarOverflowTraySpacer = styled.div`
    height: 52px;
`;
