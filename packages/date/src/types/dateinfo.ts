import type { Language } from 'chayns-api';

export interface UseDateInfoOptions {
    /**
     * The date that should be displayed
     */
    date: Date;
    /**
     * The language that should be used for the date. Defaults to the active language given by chayns api.
     */
    language?: Language;
    /**
     * Additional text for the "shouldShowDateToNowDifference" prop. Writes a text before the calculated time.
     */
    preText?: string;
    /**
     * Adds the current year to the display
     */
    shouldShowYear?: boolean;
    /**
     * Adds the time to the display.
     */
    shouldShowTime?: boolean;
    /**
     * Whether the relative day of the week to today should be shown (today, yesterday or tomorrow).
     */
    shouldShowRelativeDayOfWeek?: boolean;
    /**
     * Shortens the day and month text to the maximum three digits
     */
    shouldUseShortText?: boolean;
    /**
     * Adds the day of the week to the display
     */
    shouldShowDayOfWeek?: boolean;
    /**
     * Shows the difference from the date to now. The component handles updates itself.
     */
    shouldShowDateToNowDifference?: boolean;
    /**
     * Whether only the time should be displayed.
     */
    shouldShowOnlyTime?: boolean;
}
