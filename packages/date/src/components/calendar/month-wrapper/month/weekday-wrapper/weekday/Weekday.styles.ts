import type { WithTheme } from '@chayns-components/core';
import styled from 'styled-components';

type StyledWeekdayProps = WithTheme<unknown>;

export const StyledWeekday = styled.div<StyledWeekdayProps>`
    color: ${({ theme }: StyledWeekdayProps) => theme.headline};
    cursor: default;
    font-size: 90%;
    text-align: center;
`;
