import styled from 'styled-components';
import type { WithTheme } from '@chayns-components/core';

type StyledWeekdayProps = WithTheme<unknown>;

export const StyledWeekday = styled.div<StyledWeekdayProps>`
    text-align: center;
    color: ${({ theme }: StyledWeekdayProps) => theme.headline};
    cursor: default;
`;