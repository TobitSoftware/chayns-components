import React, { CSSProperties, FC, TouchEvent, useState } from 'react';
import {
    CalendarType,
    Categories,
    CustomThumbColors,
    DateInterval,
    EMonth,
    HighlightedDates,
} from '../../../../types/calendar';
import MonthYearPickers from '../../month-year-pickers/MonthYearPickers';
import DayWrapper from './day-wrapper/DayWrapper';
import { StyledMonth, StyledMonthHead } from './Month.styles';
import WeekdayWrapper from './weekday-wrapper/WeekdayWrapper';
import { Language } from 'chayns-api';

export type MonthProps = {
    month: EMonth;
    year: number;
    locale: Language;
    highlightedDates?: HighlightedDates[];
    onSelect: (date: Date) => void;
    selectedDate?: Date | Date[] | DateInterval;
    categories?: Categories[];
    height: number;
    minDate: Date;
    maxDate: Date;
    type: CalendarType;
    hoveringDay: Date | null;
    setHoveringDay: (date: Date | null) => void;
    disabledDates: Date[];
    setCurrentDate: (date: Date) => void;
    displayIndex?: number;
    shouldShowHighlightsInMonthOverlay: boolean;
    customThumbColors?: CustomThumbColors;
    showMonthYearPickers: boolean;
    handleLeftArrowClick: () => void;
    handleRightArrowClick: () => void;
    currentDateBackgroundColor?: CSSProperties['backgroundColor'];
};

const minSwipeDistance = 50;

const Month: FC<MonthProps> = ({
    month,
    year,
    locale,
    highlightedDates,
    selectedDate,
    onSelect,
    categories,
    height,
    minDate,
    maxDate,
    customThumbColors,
    shouldShowHighlightsInMonthOverlay,
    type,
    hoveringDay,
    setHoveringDay,
    disabledDates,
    setCurrentDate,
    displayIndex,
    showMonthYearPickers,
    handleLeftArrowClick,
    handleRightArrowClick,
    currentDateBackgroundColor,
}) => {
    const [touchStart, setTouchStart] = useState<undefined | number>();
    const [touchEnd, setTouchEnd] = useState<undefined | number>();

    const onTouchStart = (e: TouchEvent<HTMLDivElement>) => {
        setTouchEnd(undefined);
        setTouchStart(e.targetTouches[0]?.clientX);
    };

    const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
        setTouchEnd(e.targetTouches[0]?.clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        if (distance < -minSwipeDistance) {
            handleLeftArrowClick();
        }
        if (distance > minSwipeDistance) {
            handleRightArrowClick();
        }
    };

    return (
        <StyledMonth
            $height={height}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            <StyledMonthHead>
                <MonthYearPickers
                    month={month}
                    year={year}
                    locale={locale}
                    minDate={minDate}
                    maxDate={maxDate}
                    setCurrentDate={setCurrentDate}
                    displayIndex={displayIndex}
                    showMonthYearPickers={showMonthYearPickers}
                />
            </StyledMonthHead>
            <WeekdayWrapper locale={locale} />
            <DayWrapper
                key={`day-wrapper-${month}`}
                categories={categories}
                selectedDate={selectedDate}
                customThumbColors={customThumbColors}
                month={month}
                year={year}
                onSelect={onSelect}
                shouldShowHighlightsInMonthOverlay={shouldShowHighlightsInMonthOverlay}
                highlightedDates={highlightedDates}
                minDate={minDate}
                maxDate={maxDate}
                type={type}
                hoveringDay={hoveringDay}
                setHoveringDay={setHoveringDay}
                disabledDates={disabledDates}
                currentDateBackgroundColor={currentDateBackgroundColor}
            />
        </StyledMonth>
    );
};

Month.displayName = 'Month';

export default Month;
