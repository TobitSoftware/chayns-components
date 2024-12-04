export interface UseDateInfoOptions {
    /**
     * The date, that should be displayed
     */
    date: Date;
    /**
     * Additional text for "shouldShowDateToNowDifference" prop. Writes a text before the calculated time
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
     * Whether the relative day of week to today should be shown (today, yesterday or tomorrow).
     */
    shouldShowRelativeDayOfWeek?: boolean;
    /**
     * Shortens the day and month text to maximum three digits
     */
    shouldUseShortText?: boolean;
    /**
     * Adds the day of week to the display
     */
    shouldShowDayOfWeek?: boolean;
    /**
     * Shows the difference from the date to now. The component handles updates itself.
     */
    shouldShowDateToNowDifference?: boolean;
}
