import styled, { css } from 'styled-components';
import type { WithTheme } from '@chayns-components/core';
import type { CSSProperties } from 'react';

type StyledDayProps = WithTheme<{
    isSameMonth: boolean;
    backgroundColor?: CSSProperties['backgroundColor'];
    textColor?: CSSProperties['color'];
}>;

export const StyledDay = styled.div<StyledDayProps>`
    cursor: ${({ isSameMonth }) => (isSameMonth ? 'pointer' : 'default')};
    color: ${({ isSameMonth, theme }: StyledDayProps) =>
        isSameMonth ? theme.text : `rgba(${theme['text-rgb'] ?? ''}, 0.5)`};
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;

    ${({ backgroundColor, textColor }) =>
        backgroundColor &&
        textColor &&
        css`
            color: ${textColor};
            background-color: ${backgroundColor};
        `}
`;
