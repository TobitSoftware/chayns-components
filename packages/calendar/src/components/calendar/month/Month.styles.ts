import styled from 'styled-components';
import type { WithTheme } from '@chayns-components/core';

export const StyledMonth = styled.div`
    width: 100%;
`;

export const StyledMonthHead = styled.div`
    display: flex;
    align-items: center;
`;

export const StyledMonthIconWrapper = styled.div`
    cursor: pointer;
`;

type StyledMonthNameProps = WithTheme<{
    shouldShowLeftArrow: boolean;
    shouldShowRightArrow: boolean;
}>;

export const StyledMonthName = styled.div<StyledMonthNameProps>`
    font-weight: bold;
    width: 100%;
    text-align: center;
    user-select: none;

    margin: 0 ${({ shouldShowRightArrow }) => (shouldShowRightArrow ? '0' : '15px')} 0
        ${({ shouldShowLeftArrow }) => (shouldShowLeftArrow ? '0' : '15px')};
`;
