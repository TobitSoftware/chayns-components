import React, { FC, type ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import type { Locale } from 'date-fns';
import {
    StyledMonthWrapper,
    StyledMotionMonthWrapper,
    StyledMotionWrapper,
} from './MonthWrapper.styles';
import { AnimatePresence, motion, type MotionProps, useAnimation } from 'framer-motion';
import type { Categories, HighlightedDates } from '../../../types/calendar';
import Month, { MonthPosition } from './month/Month';
import { getMonthAndYear, getNewDate } from '../../../utils/calendar';

export type MonthWrapperProps = {
    locale: Locale;
    highlightedDates?: HighlightedDates[];
    onSelect: (date: Date) => void;
    selectedDate?: Date;
    categories?: Categories[];
    currentDate?: Date;
    direction?: 'left' | 'right';
};

const MonthWrapper: FC<MonthWrapperProps> = ({
    locale,
    currentDate,
    highlightedDates,
    selectedDate,
    onSelect,
    categories,
    direction,
}) => {
    const [content, setContent] = useState<ReactElement[]>([]);

    useEffect(() => {
        setContent((prevState) => {
            if (!prevState) {
                return;
            }

            // ToDo per direction elemente vorne oder hinten hinzufügen oder entfernen

            prevState.map();
        });
    }, []);

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
    }, [categories, highlightedDates, locale, onSelect, selectedDate]);

    // ToDo je x nach direction um 25% nach links oder rechts verschieben
    const animate: MotionProps['animate'] = useMemo(
        () => undefined,
        // switch (position) {
        //     case MonthPosition.Prev:
        //         return { opacity: 1, x: '-100%' };
        //     case MonthPosition.Current:
        //         return { opacity: 1, x: 0 };
        //     case MonthPosition.Next:
        //         return { x: '100%' };
        //     default:
        //         return undefined;
        // }
        [],
    );

    return (
        <StyledMonthWrapper>
            <StyledMotionWrapper animate={animate}>{content}</StyledMotionWrapper>
        </StyledMonthWrapper>
    );
};

MonthWrapper.displayName = 'MonthWrapper';

export default MonthWrapper;
