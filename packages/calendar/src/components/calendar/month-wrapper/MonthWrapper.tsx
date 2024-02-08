import React, { FC, type ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import type { Locale } from 'date-fns';
import { StyledMonthWrapper } from './MonthWrapper.styles';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import type { Categories, HighlightedDates } from '../../../types/calendar';
import Month, { MonthPosition } from './month/Month';
import { getMonthAndYear, getNewDate } from '../../../utils/calendar';

export type MonthWrapperProps = {
    locale: Locale;
    highlightedDates?: HighlightedDates[];
    onSelect: (date: Date) => void;
    selectedDate?: Date;
    categories?: Categories[];
    currentDates?: Date[];
    direction?: 'left' | 'right';
};

const MonthWrapper: FC<MonthWrapperProps> = ({
    locale,
    currentDates,
    highlightedDates,
    selectedDate,
    onSelect,
    categories,
    direction,
}) => {
    const shouldShowTwoMonths = useMemo(
        () => !(currentDates?.length ?? 1 >= 2),
        [currentDates?.length],
    );

    const content = useMemo(() => {
        const items: ReactElement[] = [];

        if (shouldShowTwoMonths) {
            return items;
        }

        const firstDate = currentDates ? currentDates[0] : undefined;

        if (!firstDate) {
            return items;
        }

        for (let i = -1; i < 2; i++) {
            const date = getNewDate(i, firstDate);

            const { month, year } = getMonthAndYear(date);

            let position;

            switch (i) {
                case -1:
                    position = MonthPosition.Prev;
                    break;
                case 0:
                    position = MonthPosition.Current;
                    break;
                default:
                    position = MonthPosition.Next;
                    break;
            }

            items.push(
                <Month
                    month={month}
                    year={year}
                    locale={locale}
                    onSelect={onSelect}
                    highlightedDates={highlightedDates}
                    categories={categories}
                    selectedDate={selectedDate}
                    position={position}
                />,
            );
        }

        return items;
    }, [
        categories,
        currentDates,
        highlightedDates,
        locale,
        onSelect,
        selectedDate,
        shouldShowTwoMonths,
    ]);

    return (
        <StyledMonthWrapper>
            <AnimatePresence initial={false}>{content}</AnimatePresence>
        </StyledMonthWrapper>
    );
};

MonthWrapper.displayName = 'MonthWrapper';

export default MonthWrapper;
