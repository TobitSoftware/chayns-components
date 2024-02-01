import React, { FC, useState } from 'react';
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
import type { EMonth, HighlightedDates } from '../../../types/calendar';
import { formatMonth } from '../../../utils/calendar';

export type MonthProps = {
    month: EMonth;
    year: string;
    shouldShowLeftArrow: boolean;
    shouldShowRightArrow: boolean;
    locale: Locale;
    highlightedDates?: HighlightedDates[];
    onLeftArrowClick: () => void;
    onRightArrowClick: () => void;
    onSelect: (date: Date) => void;
    selectedDate?: Date;
};

const Month: FC<MonthProps> = ({
    month,
    year,
    shouldShowRightArrow,
    shouldShowLeftArrow,
    locale,
    highlightedDates,
    onLeftArrowClick,
    onRightArrowClick,
    selectedDate,
    onSelect,
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
                <StyledMonthName
                    shouldShowLeftArrow={shouldShowLeftArrow}
                    shouldShowRightArrow={shouldShowRightArrow}
                >{`${formatMonth({ locale, month })} ${String(currentYear) !== year ? year : ''}`}</StyledMonthName>
                {shouldShowRightArrow && (
                    <StyledMonthIconWrapper onClick={onRightArrowClick}>
                        <Icon icons={['fa fa-angle-right']} />
                    </StyledMonthIconWrapper>
                )}
            </StyledMonthHead>
            <WeekdayWrapper locale={locale} />
            <DayWrapper
                selectedDate={selectedDate}
                month={month}
                year={year}
                onSelect={onSelect}
                highlightedDates={highlightedDates}
            />
        </StyledMonth>
    );
};

Month.displayName = 'Month';

export default Month;
