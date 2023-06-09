export enum DateFormat {
    // 05. Dezember 1998
    SimpleDate,
    // 16:25 Uhr
    SimpleTime,
    /*
     * Gestern   Gestern, 16:25 Uhr
     * Heute		Heute, 16:25 Uhr
     * Morgen	Morgen, 16:25 Uhr
     * Sonstige  05. Dez., 16:25 Uhr
     */
    DateWithTime,
    // Samstag, 05. Dezember 1998
    DayWithDate,
    // Samstag, 16:25 Uhr
    DayWithTime,
    // 05. Dezember 1998 - 07. Dezember 1998
    SimpleDatePeriod,
    // 16:25 Uhr - 19:54 Uhr
    SimpleTimePeriod,
    // 05. Dez., 16:25 Uhr - 17. Dez., 16:25 Uhr
    DateWithTimePeriod,
    // Samstag, 05. Dezember 1998 - Sonntag, 06. Dezember 1998
    DayWithDatePeriod,
    // Samstag, 16:25 Uhr - Sonntag, 13:00 Uhr
    DayWithTimePeriod,
    /*
     * vor/noch 6 Stunden
     * NOTE: the secondDate should be the current date. To update the displayed text, update the secondDate
     */
    TimeTillNow,
}

export interface FormatOptions {
    /*
     * Whether the component should say "today" if the date matches today.
     */
    useToday?: boolean;
    /*
     * Whether the component should use "tomorrow" and "yesterday".
     */
    useTomorrowOrYesterday?: boolean;
    /*
     * Whether the year should be hidden.
     */
    hideYear?: boolean;
    /*
     * Whether this year should be hidden
     */
    hideThisYear?: boolean;
    /*
     * Shortens the year to two digits. 2023 -> 23
     */
    useShortYear?: boolean;
    /*
     * Show month as a number.
     */
    useMonthAsNumber?: boolean;
    /*
     * Shortens the date to three characters. January -> Jan.
     */
    useShortMonth?: boolean;
    /*
     * Shortens the weekday to three characters. Friday -> Fri.
     */
    useShortWeekDay?: boolean;
    /*
     * Removes the leading text "noch" of timeTillNow format. So you can decide yourself, what text you want to use.
     */
    removeTimeTillNowText?: boolean;
}

type EditProps =
    | {
          /*
           * This function is called, when the user clicks on the date.
           * It also renders the text with the correct implication, that the date is clickable.
           * NOTE: The date selection is too complex to do it in this component, so you have tim implement it yourself.
           */
          onDateClick: () => void;
          /*
           * A placeholder that is shown, if no date is given.
           */
          placeholder: string;
          /*
           * The date that should be formatted.
           * If the secondDate is set, this should be the earlier date.
           * If the date is undefined, the placeholder is shown
           */
          date: Date | null;
          /*
           * If set, the date is not clickable and the onChange function is not called.
           */
          isDisabled?: boolean;
      }
    | {
          /*
           * The props onChange, placeholder and isDisabled are only used, if you want to make the date clickable.
           * If the date is not clickable, the date has to be set,
           */
          onDateClick?: never;
          placeholder?: never;
          isDisabled?: never;
          date: Date;
      };

export type DateInfoProps = EditProps & {
    /*
     * The general format in which the date should be displayed.
     */
    format: DateFormat;
    /*
     * ToDo Convert to type that requires secondDate if specific formats are set
     * The second date for date ranges and time differences.
     */
    secondDate?: Date;
    /*
     * Expands on the format
     */
    formatOptions?: FormatOptions;
};
