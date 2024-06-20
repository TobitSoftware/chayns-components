import type { WithTheme } from '@chayns-components/core';
import styled from 'styled-components';

type StyledMonthProps = WithTheme<{ $height: number }>;

export const StyledMonth = styled.div<StyledMonthProps>`
    height: ${({ $height }) => $height}px;
    aspect-ratio: 1;
`;

export const StyledMonthHead = styled.div`
    display: flex;
    align-items: center;
`;

export const StyledMonthName = styled.div`
    font-weight: bold;
    width: 100%;
    text-align: center;
    user-select: none;
`;
