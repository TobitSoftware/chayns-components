import React, {
    FC,
    type ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { isSameMonth, type Locale } from 'date-fns';
import { de } from 'date-fns/locale';
import {
    StyledCalendar,
    StyledCalendarIconWrapper,
    StyledMotionMonthWrapper,
} from './Calendar.styles';
import Month from './month/Month';
import { getMonthAndYear, isDateInRange } from '../../utils/calendar';
import type { Categories, HighlightedDates } from '../../types/calendar';
import { AnimatePresence, motion, wrap } from 'framer-motion';
import { Icon } from '@chayns-components/core';

const END_DATE = new Date(new Date().setFullYear(new Date().getFullYear() + 100));

export type CalendarProps = {
    /**
     * An array to group dates into a category.
     */
    categories?: Categories[];
    /**
     * The last Month that can be displayed.
     */
    endDate?: Date;
    /**
     * An array with dates and corresponding styles to highlight.
     */
    highlightedDates?: HighlightedDates[];
    /**
     * The locale language to format the dates.
     */
    locale?: Locale;
    /**
     * Function to be executed when a date is selected.
     * @param date
     */
    onSelect?: (date: Date) => void;
    /**
     * A date that should be preselected.
     */
    selectedDate?: Date;
    /**
     * The first Month that can be displayed.
     */
    startDate: Date;
};

const Calendar: FC<CalendarProps> = ({
    locale = de,
    endDate = END_DATE,
    startDate,
    highlightedDates,
    onSelect,
    selectedDate,
    categories,
}) => {
    const [currentDate, setCurrentDate] = useState<Date>();
    const [shouldRenderTwoMonths, setShouldRenderTwoMonths] = useState(true);
    const [internalSelectedDate, setInternalSelectedDate] = useState<Date>();

    const calendarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (selectedDate) {
            setInternalSelectedDate(selectedDate);
        }
    }, [selectedDate]);

    useEffect(() => {
        if (calendarRef.current) {
            const resizeObserver = new ResizeObserver((entries) => {
                if (entries && entries[0]) {
                    const observedWidth = entries[0].contentRect.width;

                    if (observedWidth < 430) {
                        setShouldRenderTwoMonths(false);
                    } else {
                        setShouldRenderTwoMonths(true);
                    }
                }
            });

            resizeObserver.observe(calendarRef.current);

            return () => {
                resizeObserver.disconnect();
            };
        }

        return () => {};
    }, []);

    useEffect(() => {
        const date = new Date();

        setCurrentDate(isDateInRange({ startDate, endDate, currentDate: date }));
    }, [endDate, startDate]);

    const [[page, direction], setPage] = useState([0, 0]);

    const paginate = useCallback(
        (newDirection: number) => {
            setPage([page + newDirection, newDirection]);
        },
        [page],
    );

    const handleLeftArrowClick = useCallback(() => {
        paginate(-1);
        setCurrentIndex((prevState) => prevState - 1);
        setCurrentDate((prevDate) => {
            if (!prevDate) {
                return prevDate;
            }

            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() - 1);

            if (prevDate.getMonth() === 0 && newDate.getMonth() === 11) {
                newDate.setFullYear(prevDate.getFullYear() - 1);
            }

            return isDateInRange({ startDate, endDate, currentDate: newDate });
        });
    }, [endDate, paginate, startDate]);

    const handleRightArrowClick = useCallback(() => {
        paginate(1);
        setCurrentIndex((prevState) => prevState + 1);
        setCurrentDate((prevDate) => {
            if (!prevDate) {
                return prevDate;
            }

            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() + 1);

            if (prevDate.getMonth() === 11 && newDate.getMonth() === 0) {
                newDate.setFullYear(prevDate.getFullYear() + 1);
            }

            return isDateInRange({ startDate, endDate, currentDate: newDate });
        });
    }, [endDate, paginate, startDate]);

    const handleSelect = useCallback(
        (date: Date) => {
            setInternalSelectedDate(date);

            if (typeof onSelect === 'function') {
                onSelect(date);
            }
        },
        [onSelect],
    );

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    const images = [
        'https://d33wubrfki0l68.cloudfront.net/dd23708ebc4053551bb33e18b7174e73b6e1710b/dea24/static/images/wallpapers/shared-colors@2x.png',
        'https://d33wubrfki0l68.cloudfront.net/49de349d12db851952c5556f3c637ca772745316/cfc56/static/images/wallpapers/bridge-02@2x.png',
        'https://d33wubrfki0l68.cloudfront.net/594de66469079c21fc54c14db0591305a1198dd6/3f4b1/static/images/wallpapers/bridge-01@2x.png',
    ];

    // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
    // then wrap that within 0-2 to find our image ID in the array below. By passing an
    // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
    // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.

    const [currentIndex, setCurrentIndex] = useState(0);

    const content = useMemo(() => {
        const items: ReactElement[] = [];

        console.log(currentDate);

        if (!currentDate) {
            console.log('hallo');
            return items;
        }

        const { month, year } = getMonthAndYear(currentDate);

        for (let i = -1; i <= 1; i++) {
            console.log(i);
            items.push(
                <Month month={month + i} year={year} locale={locale} onSelect={handleSelect} />,
            );
        }

        return items;
    }, [currentDate, handleSelect, locale]);

    const imageIndex = wrap(0, content.length, page);

    console.log(content);

    return (
        <StyledCalendar ref={calendarRef}>
            <StyledCalendarIconWrapper onClick={handleLeftArrowClick}>
                <Icon icons={['fa fa-angle-left']} />
            </StyledCalendarIconWrapper>
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
            <StyledCalendarIconWrapper onClick={handleRightArrowClick}>
                <Icon icons={['fa fa-angle-right']} />
            </StyledCalendarIconWrapper>
        </StyledCalendar>
    );
};

Calendar.displayName = 'Calendar';

export default Calendar;
