// Components
export { default as Calendar } from './components/calendar/Calendar';
export { default as OpeningInputs } from './components/opening-times/opening-inputs/OpeningInputs';
export { default as OpeningTimes } from './components/opening-times/OpeningTimes';
export { default as DateInfo } from './components/date-info/DateInfo';

// Types
export {
    HintTextPosition,
    type OpeningTime,
    type Time,
    type Weekday,
} from './components/opening-times/OpeningTimes.types';
export {
    CalendarType,
    type Categories,
    type HighlightedDates,
    type HighlightedDateStyles,
    type DateInterval,
    type CustomThumbColors,
} from './components/calendar/Calendar.types';

// Hooks
export { useDateInfo } from './components/date-info/DateInfo.hooks';

// Utils
export {
    getDateInfo,
    getTimeTillNow,
    getFormattedTime,
} from './components/date-info/DateInfo.utils';
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
