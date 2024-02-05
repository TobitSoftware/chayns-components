import React, { FC, useEffect, useState } from 'react';
import {
    StyledDayAnimationWrapper,
    StyledMonth,
    StyledMonthHead,
    StyledMonthIconWrapper,
    StyledMonthName,
    StyledMotionDayWrapper,
} from './Month.styles';
import { Icon } from '@chayns-components/core';
import WeekdayWrapper from './weekday-wrapper/WeekdayWrapper';
import DayWrapper from './day-wrapper/DayWrapper';
import type { Locale } from 'date-fns';
import type { Categories, EMonth, HighlightedDates } from '../../../types/calendar';
import { formatMonth } from '../../../utils/calendar';
import { AnimatePresence, motion } from 'framer-motion';

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
    categories?: Categories[];
    direction?: 'left' | 'right';
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
    categories,
    direction = 'left',
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
            <StyledDayAnimationWrapper>
                <AnimatePresence>
                    <StyledMotionDayWrapper
                        key={month}
                        initial={{ x: direction === 'left' ? '-100%' : '100%' }}
                        animate={{ x: '0%' }}
                        exit={{ x: direction === 'left' ? '100%' : '-100%' }}
                        transition={{ duration: 1.5 }}
                    >
                        <DayWrapper
                            categories={categories}
                            selectedDate={selectedDate}
                            month={month}
                            year={year}
                            onSelect={onSelect}
                            highlightedDates={highlightedDates}
                        />
                    </StyledMotionDayWrapper>
                </AnimatePresence>
            </StyledDayAnimationWrapper>
        </StyledMonth>
    );
};

Month.displayName = 'Month';

export default Month;
