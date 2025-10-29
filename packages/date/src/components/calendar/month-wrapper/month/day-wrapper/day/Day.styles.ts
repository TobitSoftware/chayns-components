import type { WithTheme } from '@chayns-components/core';
import type { CSSProperties } from 'react';
import styled, { css } from 'styled-components';
import { CustomThumbColors } from '../../../../Calendar.types';

type StyledDayProps = WithTheme<{
    $isSameMonth: boolean;
    $backgroundColor?: CSSProperties['backgroundColor'];
    $textColor?: CSSProperties['color'];
    $isDisabled: boolean;
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    pointer-events: ${({ $isSameMonth, $isDisabled }) =>
        $isSameMonth && !$isDisabled ? 'auto' : 'none'};

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
    $isIntervalEnd: boolean;
    $isIntervalStart: boolean;
    $isWithinIntervalSelection: boolean;
    $customThumbColors?: CustomThumbColors;
}>;

export const StyledDayNumber = styled.div<StyledDayNumberProps>`
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 80%;
    font-size: 90%;
    z-index: 2;

    ${({
        $isSelected,
        $isIntervalEnd,
        $isIntervalStart,
        $isWithinIntervalSelection,
        $customThumbColors,
        theme,
    }) =>
        !!($isSelected || $isIntervalStart || $isIntervalEnd || $isWithinIntervalSelection) &&
        css`
            background-color: ${$customThumbColors?.mainBackgroundColor ?? theme['404']};
            color: ${$customThumbColors?.mainTextColor ?? theme['409']};
        `}

    ${({
        $isIntervalStart,
        $isIntervalEnd,
        $isWithinIntervalSelection,
        $customThumbColors,
        theme,
    }) => {
        if ($isIntervalStart && $isIntervalEnd) {
            return css`
                border-radius: 5px;
                width: 100%;
            `;
        }
        if ($isIntervalStart) {
            return css`
                border-radius: 5px 0 0 5px;
                width: 100%;
            `;
        }
        if ($isIntervalEnd) {
            return css`
                border-radius: 0 5px 5px 0;
                width: 100%;
            `;
        }
        if ($isWithinIntervalSelection) {
            return css`
                border-radius: 0;
                width: 100%;
                background-color: ${$customThumbColors?.secondaryBackgroundColor ?? theme['403']};
            `;
        }

        return '';
    }}
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

type StyledCurrentDayProps = {
    $backgroundColor: CSSProperties['backgroundColor'];
};

export const StyledCurrentDay = styled.div<StyledCurrentDayProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6%;
    width: 90%;
    height: 90%;
    position: absolute;
    z-index: 1;
    border-radius: 50%;
    background-color: ${({ $backgroundColor }) => $backgroundColor};
`;
