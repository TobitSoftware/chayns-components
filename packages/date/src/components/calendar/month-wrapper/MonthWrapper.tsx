import type { MotionProps } from 'framer-motion';
import React, { FC, useEffect, useMemo, useState, type ReactElement } from 'react';
import type {
    CalendarType,
    Categories,
    DateInterval,
    HighlightedDates,
} from '../../../types/calendar';
import { getMonthAndYear, getNewDate } from '../../../utils/calendar';
import Month from './month/Month';
import { StyledMonthWrapper, StyledMotionWrapper } from './MonthWrapper.styles';
import {Language} from "chayns-api";

export type MonthWrapperProps = {
    locale: Language;
    highlightedDates?: HighlightedDates[];
    onSelect: (date: Date) => void;
    selectedDate?: Date | Date[] | DateInterval;
    categories?: Categories[];
    currentDate: Date;
    direction?: 'left' | 'right';
    onAnimationFinished: () => void;
    shouldRenderTwo: boolean;
    width: number;
    isDisabled?: boolean;
    maxDate: Date;
    minDate: Date;
    type: CalendarType;
    disabledDates: Date[];
    setCurrentDate: (date: Date) => void;
    shouldShowHighlightsInMonthOverlay: boolean;
    showMonthYearPickers: boolean;
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
    isDisabled,
    minDate,
    maxDate,
    shouldShowHighlightsInMonthOverlay,
    type,
    disabledDates,
    setCurrentDate,
    showMonthYearPickers,
}) => {
    const [content, setContent] = useState<ReactElement[]>();

    const [hoveringDay, setHoveringDay] = useState<Date | null>(null);

    const monthHeight = useMemo(() => width / (shouldRenderTwo ? 2 : 1), [width, shouldRenderTwo]);

    useEffect(() => {
        setContent(() => {
            // Initial render of months
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
                        shouldShowHighlightsInMonthOverlay={shouldShowHighlightsInMonthOverlay}
                        categories={categories}
                        selectedDate={selectedDate}
                        minDate={minDate}
                        maxDate={maxDate}
                        type={type}
                        hoveringDay={hoveringDay}
                        setHoveringDay={setHoveringDay}
                        disabledDates={disabledDates}
                        setCurrentDate={setCurrentDate}
                        displayIndex={i}
                        showMonthYearPickers={showMonthYearPickers}
                    />,
                );
            }

            return items;
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [monthHeight]);

    useEffect(() => {
        // Doesn't update props until animation is completed
        if (direction) return;

        setContent((prevState) =>
            (prevState ?? []).map((element, index) => {
                const date = getNewDate(index - 1, currentDate);

                const { month, year } = getMonthAndYear(date);

                return {
                    ...element,
                    props: {
                        ...element.props,
                        categories,
                        disabledDates,
                        displayIndex: index - 1,
                        highlightedDates,
                        hoveringDay,
                        locale,
                        onSelect,
                        shouldShowHighlightsInMonthOverlay,
                        maxDate,
                        minDate,
                        month,
                        selectedDate,
                        setCurrentDate,
                        setHoveringDay,
                        showMonthYearPickers,
                        type,
                        year,
                    } as ReactElement,
                };
            }),
        );
    }, [
        categories,
        currentDate,
        direction,
        disabledDates,
        highlightedDates,
        hoveringDay,
        locale,
        onAnimationFinished,
        onSelect,
        maxDate,
        minDate,
        selectedDate,
        setCurrentDate,
        setHoveringDay,
        showMonthYearPickers,
        type,
        shouldShowHighlightsInMonthOverlay,
    ]);

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
        <StyledMonthWrapper $height={monthHeight} $width={width}>
            <StyledMotionWrapper
                animate={animate}
                $isDisabled={isDisabled}
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
