import React, { FC, type ReactElement, useMemo } from 'react';
import {
    StyledMonth,
    StyledMonthHead,
    StyledMonthIconWrapper,
    StyledMonthName,
} from './Month.styles';
import { Icon } from '@chayns-components/core';
import WeekdayWrapper from './weekday-wrapper/WeekdayWrapper';
import DayWrapper from './day-wrapper/DayWrapper';
import type { Locale } from 'date-fns';

export type MonthProps = {
    month: string;
    shouldShowLeftArrow: boolean;
    shouldShowRightArrow: boolean;
    locale?: Locale;
};

const Month: FC<MonthProps> = ({ month, shouldShowRightArrow, shouldShowLeftArrow, locale }) => {
    const test = '';

    return (
        <StyledMonth>
            <StyledMonthHead>
                {shouldShowLeftArrow && (
                    <StyledMonthIconWrapper>
                        <Icon icons={['fa fa-angle-left']} />
                    </StyledMonthIconWrapper>
                )}
                <StyledMonthName>{month}</StyledMonthName>
                {shouldShowRightArrow && (
                    <StyledMonthIconWrapper>
                        <Icon icons={['fa fa-angle-right']} />
                    </StyledMonthIconWrapper>
                )}
            </StyledMonthHead>
            <WeekdayWrapper locale={locale} />
            <DayWrapper month={month} />
        </StyledMonth>
    );
};

Month.displayName = 'Month';

export default Month;
