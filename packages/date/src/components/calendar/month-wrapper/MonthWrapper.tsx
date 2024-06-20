import { useElementSize } from '@chayns-components/core';
import type { Locale } from 'date-fns';
import type { MotionProps } from 'framer-motion';
import React, { FC, useEffect, useMemo, useRef, useState, type ReactElement } from 'react';
import type { Categories, HighlightedDates } from '../../../types/calendar';
import { getMonthAndYear, getNewDate } from '../../../utils/calendar';
import Month from './month/Month';
import { StyledMonthWrapper, StyledMotionWrapper } from './MonthWrapper.styles';

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
    const [prevSelectedDate, setPrevSelectedDate] = useState<Date>();

    const monthWrapperRef = useRef<HTMLDivElement>(null);

    const monthWrapperSize = useElementSize(monthWrapperRef);

    const monthHeight = useMemo(
        () => (monthWrapperSize ? monthWrapperSize.width / (shouldRenderTwo ? 2 : 1) : 0),
        [monthWrapperSize, shouldRenderTwo],
    );

    useEffect(() => {
        setContent(undefined);
    }, [monthHeight]);

    useEffect(() => {
        if (prevSelectedDate !== selectedDate) {
            setPrevSelectedDate(selectedDate);
        }
    }, [prevSelectedDate, selectedDate]);

    useEffect(() => {
        setContent((prevState) => {
            // Initial render of months
            if (!prevState) {
                const items: ReactElement[] = [];

                for (let i = -1; i < 3; i++) {
                    const date = getNewDate(i, currentDate);

                    const { month, year } = getMonthAndYear(date);

                    items.push(
                        <Month
                            height={monthHeight}
                            key={`${month}-${year}`}
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
                        height={monthHeight}
                        key={`${month}-${year}`}
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
                        height={monthHeight}
                        key={`${month}-${year}`}
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
    }, [
        categories,
        currentDate,
        direction,
        highlightedDates,
        locale,
        monthHeight,
        onSelect,
        prevSelectedDate,
        selectedDate,
    ]);

    useEffect(() => {
        if (selectedDate) {
            setContent((prevState) =>
                (prevState ?? []).map((element) => ({
                    ...element,
                    props: { ...element.props, selectedDate } as ReactElement,
                })),
            );
        }
    }, [selectedDate]);

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
        <StyledMonthWrapper $height={shouldRenderTwo ? width / 2 : width} ref={monthWrapperRef}>
            <StyledMotionWrapper
                animate={animate}
                transition={{
                    type: 'tween',
                    duration: !direction ? 0 : 0.2,
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
