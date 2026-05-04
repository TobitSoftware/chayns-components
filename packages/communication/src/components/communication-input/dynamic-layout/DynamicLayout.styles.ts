import styled, { css } from 'styled-components';
import { motion } from 'motion/react';

type StyledDynamicLayoutProps = { $inputInBottomRow: boolean; $isFullHeight: boolean };

export const StyledDynamicLayout = styled.div<StyledDynamicLayoutProps>`
    width: 100%;

    display: grid;
    align-items: center;

    position: relative;

    ${({ $isFullHeight }) =>
        $isFullHeight &&
        css`
            height: 561px;
        `}

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
    grid-template-rows: ${({ $inputInBottomRow }) => ($inputInBottomRow ? `auto` : `auto 48px`)};
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

export const StyledDynamicLayoutFullHeightToggle = styled.div`
    position: absolute;

    z-index: 10;

    top: 6px;
    right: 14px;

    cursor: pointer;
`;
