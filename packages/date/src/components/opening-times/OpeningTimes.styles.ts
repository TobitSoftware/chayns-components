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
    min-width: 300px;
`;

export const StyledOpeningTimesTooltipContent = styled.div`
    padding: 8px;
`;

type StyledOpeningTimesWeekDayProps = WithTheme<unknown>;

export const StyledOpeningTimesWeekDay = styled.div<StyledOpeningTimesWeekDayProps>`
    color: ${({ theme }: StyledOpeningTimesWeekDayProps) => theme.text};
`;

type StyledHintTextProp = WithTheme<unknown>;
export const StyledOpeningTimesHintText = styled.div<StyledHintTextProp>`
    border-width: 1px;
    border-style: solid;
    border-color: #9f5f00;
    background-color: #fff3e0;
    color: #222;
    padding: 8px 12px;

    border-radius: ${({ theme }: StyledHintTextProp) => theme.cardBorderRadius}px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, ${({ theme }: StyledHintTextProp) => theme.cardShadow});
`;
