import React, { FC, type ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import type { Locale } from 'date-fns';
import { StyledMonthWrapper, StyledMotionWrapper } from './MonthWrapper.styles';
import type { MotionProps } from 'framer-motion';
import type { Categories, HighlightedDates } from '../../../types/calendar';
import Month from './month/Month';
import { getMonthAndYear, getNewDate } from '../../../utils/calendar';

export type MonthWrapperProps = {
    locale: Locale;
    highlightedDates?: HighlightedDates[];
    onSelect: (date: Date) => void;
    selectedDate?: Date;
    categories?: Categories[];
    currentDate: Date;
    direction?: 'left' | 'right';
    onAnimationFinished: () => void;
    shouldRenderTwo: boolean;
    width: number;
};

const MonthWrapper: FC<MonthWrapperProps> = ({
    locale,
    currentDate,
    highlightedDates,
    selectedDate,
    onSelect,
    categories,
    direction,
    onAnimationFinished,
    shouldRenderTwo,
    width,
}) => {
    const [content, setContent] = useState<ReactElement[]>();

    useEffect(() => {
        setContent((prevState) => {
            if (!prevState) {
                const items: ReactElement[] = [];

                for (let i = -1; i < 3; i++) {
                    const date = getNewDate(i, currentDate);

                    const { month, year } = getMonthAndYear(date);

                    items.push(
                        <Month
                            month={month}
                            year={year}
                            locale={locale}
                            onSelect={onSelect}
                            highlightedDates={highlightedDates}
                            categories={categories}
                            selectedDate={selectedDate}
                        />,
                    );
                }

                return items;
            }

            if (direction === 'left') {
                const date = getNewDate(-1, currentDate);

                const { month, year } = getMonthAndYear(date);

                prevState.unshift(
                    <Month
                        month={month}
                        year={year}
                        locale={locale}
                        onSelect={onSelect}
                        highlightedDates={highlightedDates}
                        categories={categories}
                        selectedDate={selectedDate}
                    />,
                );
                prevState.pop();
            }

            if (direction === 'right') {
                const date = getNewDate(2, currentDate);

                const { month, year } = getMonthAndYear(date);

                prevState.push(
                    <Month
                        month={month}
                        year={year}
                        locale={locale}
                        onSelect={onSelect}
                        highlightedDates={highlightedDates}
                        categories={categories}
                        selectedDate={selectedDate}
                    />,
                );
                prevState.shift();
            }

            return prevState;
        });
    }, [categories, currentDate, direction, highlightedDates, locale, onSelect, selectedDate]);

    const animate: MotionProps['animate'] = useMemo(() => {
        if (shouldRenderTwo) {
            switch (true) {
                case direction === 'left':
                    return { x: '0%' };
                case direction === 'right':
                    return { x: '-100%' };
                default:
                    return { x: '-50%' };
            }
        } else {
            switch (true) {
                case direction === 'left':
                    return { x: '0%' };
                case direction === 'right':
                    return { x: '-200%' };
                default:
                    return { x: '-100%' };
            }
        }
    }, [direction, shouldRenderTwo]);

    return (
        <StyledMonthWrapper height={shouldRenderTwo ? width / 2 : width}>
            <StyledMotionWrapper
                animate={animate}
                transition={{
                    type: 'tween',
                    duration: !direction ? 0 : 0.3,
                    delay: !direction ? 0 : 0.2,
                }}
                onAnimationComplete={onAnimationFinished}
            >
                {content}
            </StyledMotionWrapper>
        </StyledMonthWrapper>
    );
};

MonthWrapper.displayName = 'MonthWrapper';

export default MonthWrapper;
