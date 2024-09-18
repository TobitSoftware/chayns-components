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
    cursor: ${({ $isSameMonth, $isDisabled }) =>
        $isSameMonth && !$isDisabled ? 'pointer' : 'default'};
    color: ${({ theme }: StyledDayProps) => theme.text};
    opacity: ${({ $isSameMonth, $isDisabled }) => {
        if ($isSameMonth && !$isDisabled) {
            return '1';
        }
        if ($isDisabled) {
            return '0.2';
        }
        return '0.5';
    }};
    display: flex;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    pointer-events: ${({ $isSameMonth, $isDisabled }) =>
        $isSameMonth && !$isDisabled ? 'auto' : 'none'};

    ${({ $isIntervalStart, $isIntervalEnd, $isWithinIntervalSelection, $showHoverEffect }) => {
        if ($isIntervalStart && $isIntervalEnd) {
            return css`
                border-radius: 5px;
                background-color: rgba(0, 0, 0, 0.5);
            `;
        }
        if ($isIntervalStart) {
            return css`
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
                background-color: rgba(0, 0, 0, 0.5);
            `;
        }
        if ($isIntervalEnd) {
            return css`
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
                background-color: rgba(0, 0, 0, 0.5);
            `;
        }
        if ($isWithinIntervalSelection) {
            return css`
                background-color: rgba(0, 0, 0, 0.2);
            `;
        }
        if ($showHoverEffect) {
            return css`
                background-color: rgba(0, 0, 0, 0.2);
            `;
        }
    }}

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
