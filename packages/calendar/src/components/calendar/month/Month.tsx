import React, { FC, type ReactElement, useMemo, useState } from 'react';
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
import type { EMonth } from '../../../types/calendar';
import { formatMonth } from '../../../utils/calendar';

export type MonthProps = {
    month: EMonth;
    year: string;
    shouldShowLeftArrow: boolean;
    shouldShowRightArrow: boolean;
    locale: Locale;
    onLeftArrowClick: () => void;
    onRightArrowClick: () => void;
};

const Month: FC<MonthProps> = ({
    month,
    year,
    shouldShowRightArrow,
    shouldShowLeftArrow,
    locale,
    onLeftArrowClick,
    onRightArrowClick,
}) => {
    const [currentYear] = useState(new Date().getFullYear());

    return (
        <StyledMonth>
            <StyledMonthHead>
                {shouldShowLeftArrow && (
                    <StyledMonthIconWrapper onClick={onLeftArrowClick}>
                        <Icon icons={['fa fa-angle-left']} />
                    </StyledMonthIconWrapper>
                )}
                <StyledMonthName>{`${formatMonth({ locale, month })} ${String(currentYear) !== year ? year : ''}`}</StyledMonthName>
                {shouldShowRightArrow && (
                    <StyledMonthIconWrapper onClick={onRightArrowClick}>
                        <Icon icons={['fa fa-angle-right']} />
                    </StyledMonthIconWrapper>
                )}
            </StyledMonthHead>
            <WeekdayWrapper locale={locale} />
            <DayWrapper month={month} year={year} />
        </StyledMonth>
    );
};

Month.displayName = 'Month';

export default Month;
