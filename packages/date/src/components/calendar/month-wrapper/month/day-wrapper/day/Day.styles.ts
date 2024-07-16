import type { WithTheme } from '@chayns-components/core';
import type { CSSProperties } from 'react';
import styled, { css } from 'styled-components';

type StyledDayProps = WithTheme<{
    $isSameMonth: boolean;
    $backgroundColor?: CSSProperties['backgroundColor'];
    $textColor?: CSSProperties['color'];
}>;

export const StyledDay = styled.div<StyledDayProps>`
    position: relative;
    cursor: ${({ $isSameMonth }) => ($isSameMonth ? 'pointer' : 'default')};
    color: ${({ $isSameMonth, theme }: StyledDayProps) =>
        $isSameMonth ? theme.text : `rgba(${theme['text-rgb'] ?? ''}, 0.5)`};
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;

    ${({ $backgroundColor, $textColor }) =>
        $backgroundColor &&
        $textColor &&
        css`
            color: ${$textColor};
            background-color: ${$backgroundColor};
        `}
`;

type StyledDayNumberProps = WithTheme<{
    $isSelected: boolean;
}>;

export const StyledDayNumber = styled.div<StyledDayNumberProps>`
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 80%;
    font-size: 90%;

    ${({ $isSelected, theme }) =>
        $isSelected &&
        css`
            background-color: ${theme['404']};
            color: ${theme['409']};
        `}
`;

export const StyledDayCategoryWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6%;
    width: 100%;
    position: absolute;
    bottom: 2px;
`;
