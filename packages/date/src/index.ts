// Calendar
export { default as Calendar } from './components/calendar/Calendar';
export type {
    Categories,
    HighlightedDates,
    HighlightedDateStyles,
    DateInterval,
    CustomThumbColors,
} from './types/calendar';
export { CalendarType } from './types/calendar';

// OpeningTimes
export { default as OpeningInputs } from './components/opening-times/opening-inputs/OpeningInputs';
export { default as OpeningTimes } from './components/opening-times/OpeningTimes';
export type { HintTextPosition, OpeningTime, Time, Weekday } from './types/openingTimes';

// DateInfo
export { default as DateInfo } from './components/date-info/DateInfo';
export { useDateInfo } from './hooks/useDateInfo';
export { getDateInfo, getTimeTillNow } from './utils/dateInfo';

// Utils
export {
    isToday,
    getIsDateNearToday,
    isTomorrow,
    isYesterday,
    isMorning,
    isCurrentYear,
    addYears,
    addDays,
    isSameDay,
    eachDayOfInterval,
    isWithinInterval,
    subYears,
    endOfWeek,
    startOfWeek,
    isSameMonth,
    differenceInCalendarMonths,
    startOfMonth,
    isAfter,
    isBefore,
} from './utils/date';
