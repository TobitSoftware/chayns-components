import styled from 'styled-components';
import { WithTheme } from '@chayns-components/core';

export const StyledChips = styled.div`
    position: relative;
    width: 100%;
    min-width: 0;

    margin: 0 4px;
`;

export const StyledChipsScroll = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;

    overflow-x: auto;
    overflow-y: hidden;

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
        display: none;
    }

    > * {
        flex-shrink: 0;
    }
`;

type StyledChipsFadeProps = WithTheme<{ $side: 'left' | 'right' }>;

export const StyledChipsFade = styled.div<StyledChipsFadeProps>`
    position: absolute;
    top: 0;
    bottom: 0;
    ${({ $side }) => $side}: 0;

    width: 32px;
    pointer-events: none;
    z-index: 1;

    background: ${({ $side, theme }) =>
        $side === 'left'
            ? `linear-gradient(to right, ${theme['000'] ?? ''}, transparent)`
            : `linear-gradient(to left, ${theme['000'] ?? ''}, transparent)`};
`;

type StyledChipsArrowProps = WithTheme<{ $side: 'left' | 'right' }>;

export const StyledChipsArrow = styled.div<StyledChipsArrowProps>`
    position: absolute;
    top: 50%;

    ${({ $side }) => $side}: 2px;

    transform: translateY(-50%);
    z-index: 2;

    width: 24px;
    height: 24px;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    color: inherit;
`;
