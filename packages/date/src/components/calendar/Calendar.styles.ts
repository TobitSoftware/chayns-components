import styled from 'styled-components';

type StyledCalendarProps = { $isDisabled?: boolean };

export const StyledCalendar = styled.div<StyledCalendarProps>`
    display: flex;
    width: 100%;
    opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
    pointer-events: ${({ $isDisabled }) => ($isDisabled ? 'none' : undefined)};
`;

export const StyledCalendarIconWrapper = styled.div`
    cursor: pointer;
    z-index: 2;
`;

export const StyledCalendarIconWrapperPseudo = styled.div`
    width: 15px;
`;
