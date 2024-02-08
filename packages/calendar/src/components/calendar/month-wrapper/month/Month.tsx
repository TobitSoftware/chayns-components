import React, { FC, useMemo, useState } from 'react';
import { StyledMonth, StyledMonthHead, StyledMonthName } from './Month.styles';
import WeekdayWrapper from './weekday-wrapper/WeekdayWrapper';
import DayWrapper from './day-wrapper/DayWrapper';
import type { Locale } from 'date-fns';
import type { Categories, EMonth, HighlightedDates } from '../../../../types/calendar';
import { formatMonth } from '../../../../utils/calendar';
import { motion, type MotionProps } from 'framer-motion';

export enum MonthPosition {
    Prev,
    Current,
    Next,
}

export type MonthProps = {
    month: EMonth;
    year: string;
    locale: Locale;
    highlightedDates?: HighlightedDates[];
    onSelect: (date: Date) => void;
    selectedDate?: Date;
    categories?: Categories[];
    position: MonthPosition;
};

const Month: FC<MonthProps> = ({
    month,
    year,
    locale,
    highlightedDates,
    selectedDate,
    onSelect,
    categories,
    position,
}) => {
    const [currentYear] = useState(new Date().getFullYear());

    const animate: MotionProps['animate'] = useMemo(() => {
        switch (position) {
            case MonthPosition.Prev:
                return { opacity: 1, x: 'calc(100% * -1)' };
            case MonthPosition.Current:
                return { opacity: 1, x: 0 };
            case MonthPosition.Next:
                return { x: '100%' };
            default:
                return undefined;
        }
    }, [position]);

    const exit: MotionProps['exit'] = useMemo(() => {
        switch (position) {
            case MonthPosition.Prev:
                return { x: 'calc(100% * -2)' };
            case MonthPosition.Current:
                return { x: 0 };
            case MonthPosition.Next:
                return { x: '100%' };
            default:
                return undefined;
        }
    }, [position]);

    const initial: MotionProps['initial'] = useMemo(() => {
        switch (position) {
            case MonthPosition.Prev:
                return { opacity: 0, x: 'calc(100% * -1)' };
            case MonthPosition.Current:
                return { opacity: 0, x: 0 };
            case MonthPosition.Next:
                return { x: 'calc(100% * 2)' };
            default:
                return undefined;
        }
    }, [position]);

    return (
        <StyledMonth>
            <motion.div
                animate={animate}
                exit={exit}
                initial={initial}
                key={`${month}-${year}`}
                transition={{ duration: 2.5, transition: 'tween' }}
            >
                <StyledMonthHead>
                    <StyledMonthName>{`${formatMonth({ locale, month })} ${String(currentYear) !== year ? year : ''}`}</StyledMonthName>
                </StyledMonthHead>
                <WeekdayWrapper locale={locale} />
                <DayWrapper
                    key={`day-wrapper-${month}`}
                    categories={categories}
                    selectedDate={selectedDate}
                    month={month}
                    year={year}
                    onSelect={onSelect}
                    highlightedDates={highlightedDates}
                />
            </motion.div>
        </StyledMonth>
    );
};

Month.displayName = 'Month';

export default Month;
