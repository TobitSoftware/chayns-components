import styled from 'styled-components';

type StyledCalendarProps = { $isDisabled?: boolean };

export const StyledCalendar = styled.div<StyledCalendarProps>`
    display: flex;
    width: 100%;
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
    pointer-events: ${({ $isDisabled }) => ($isDisabled ? 'none' : undefined)};
    user-select: none;
`;

export const StyledCalendarIconWrapper = styled.div`
    cursor: pointer;
    z-index: 2;
`;

export const StyledCalendarIconWrapperPseudo = styled.div`
    width: 15px;
`;

export const StyledPseudoMonthYearPicker = styled.div`
    height: fit-content;
    width: 0;
    overflow: hidden;
    pointer-events: none;
    user-select: none;
`;
