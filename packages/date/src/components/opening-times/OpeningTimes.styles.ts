import type { WithTheme } from '@chayns-components/core';
import styled from 'styled-components';

type StyledSliderButtonProps = WithTheme<{ $isDisabled?: boolean }>;

export const StyledOpeningTimes = styled.div<StyledSliderButtonProps>`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const StyledOpeningTimesWrapper = styled.div`
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 16px;
`;

export const StyledOpeningTimesTooltipContent = styled.div`
    padding: 8px;
`;

type StyledOpeningTimesWeekDayProps = WithTheme<unknown>;

export const StyledOpeningTimesWeekDay = styled.div<StyledOpeningTimesWeekDayProps>`
    color: ${({ theme }: StyledOpeningTimesWeekDayProps) => theme.text};
`;
