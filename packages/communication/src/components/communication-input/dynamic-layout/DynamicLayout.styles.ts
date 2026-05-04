import styled from 'styled-components';
import { motion } from 'motion/react';

type StyledDynamicLayoutProps = { $inputInBottomRow: boolean };

export const StyledDynamicLayout = styled.div<StyledDynamicLayoutProps>`
    width: 100%;

    display: grid;
    align-items: center;

    grid-template-columns: auto minmax(0, 1fr) auto;
    grid-template-areas: ${({ $inputInBottomRow }) =>
        $inputInBottomRow
            ? `
            "left input right"
          `
            : `
            "input input input"
            "left chips right"
          `};
`;

export const StyledDynamicLayoutInput = styled(motion.div)`
    grid-area: input;
    min-width: 0;
`;

export const StyledDynamicLayoutLeft = styled.div`
    grid-area: left;
    align-self: end;
`;

export const StyledDynamicLayoutChips = styled.div`
    grid-area: chips;
    min-width: 0;
`;

export const StyledDynamicLayoutRight = styled.div`
    grid-area: right;
    align-self: end;
`;
