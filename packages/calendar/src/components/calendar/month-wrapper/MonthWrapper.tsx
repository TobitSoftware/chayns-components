import React, {
    FC,
    type ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import type { Locale } from 'date-fns';
import { StyledMonthWrapper } from './MonthWrapper.styles';
import { AnimatePresence } from 'framer-motion';
import type { Categories, HighlightedDates } from '../../../types/calendar';
import { getMonthAndYear } from '../../../utils/calendar';
import Month from './month/Month';

export type MonthWrapperProps = {
    locale: Locale;
    highlightedDates?: HighlightedDates[];
    onSelect: (date: Date) => void;
    selectedDate?: Date;
    categories?: Categories[];
    shouldRenderTwoMonth: boolean;
    currentDates: Date[];
};

const MonthWrapper: FC<MonthWrapperProps> = ({
    locale,
    shouldRenderTwoMonth,
    currentDates,
    highlightedDates,
    selectedDate,
    onSelect,
    categories,
}) => {
    const content = useMemo(() => {
        const items: ReactElement[] = [];

        currentDates.forEach((date) => {
            const { month, year } = getMonthAndYear(date);

            items.push(<Month />);
        });

        return items;
    }, []);

    const [currentDate, setCurrentDate] = useState<Date>();

    return (
        <StyledMonthWrapper ref={calendarRef}>
            <StyledMonthWrapperIconWrapper onClick={handleLeftArrowClick}>
                <Icon icons={['fa fa-angle-left']} />
            </StyledMonthWrapperIconWrapper>
            <AnimatePresence initial={false}>
                <StyledMotionMonthWrapper
                    key={page}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                        duration: 0.2,
                    }}
                >
                    {content[imageIndex]}
                </StyledMotionMonthWrapper>
            </AnimatePresence>
            <StyledMonthWrapperIconWrapper onClick={handleRightArrowClick}>
                <Icon icons={['fa fa-angle-right']} />
            </StyledMonthWrapperIconWrapper>
        </StyledMonthWrapper>
    );
};

MonthWrapper.displayName = 'MonthWrapper';

export default MonthWrapper;
