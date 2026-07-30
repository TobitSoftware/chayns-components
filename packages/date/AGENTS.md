# @chayns-components/date

React component package providing 3 documented components for chayns applications.

Documented components: `Calendar`, `DateInfo`, `OpeningTimes`.

## Import

```ts
import { Calendar, DateInfo, OpeningTimes } from '@chayns-components/date';
```

## Typical Usage

```tsx
<Calendar
    type={CalendarType.Single}
    highlightedDates={[
        {
            dates: [getDayOfCurrentMonth(-3), getDayOfCurrentMonth(1), getDayOfCurrentMonth(22)],
            style: { textColor: 'white', backgroundColor: 'blue' },
        },
        {
            dates: [getDayOfCurrentMonth(21)],
            style: { textColor: 'white', backgroundColor: 'red' },
        },
        {
            dates: [getDayOfCurrentMonth(20), getDayOfCurrentMonth(28)],
            style: { textColor: 'white', backgroundColor: 'green' },
        },
    ]}
    disabledDates={[getDayOfCurrentMonth(10), getDayOfCurrentMonth(15)]}
    categories={[
        {
            dates: [getDayOfCurrentMonth(35), getDayOfCurrentMonth(13)],
            color: 'green',
            id: 'meeting',
        },
        {
            dates: [getDayOfCurrentMonth(3), getDayOfCurrentMonth(14)],
            color: 'black',
            id: 'holiday',
        },
        {
            dates: [getDayOfCurrentMonth(14)],
            color: 'purple',
            id: 'birthday',
        },
    ]}
/>
```

## Components

- `Calendar`
- `DateInfo`
- `OpeningTimes`

## Calendar

`Calendar` is exported by `@chayns-components/date` and should be imported from the public package
entry point.

### Import

```ts
import { Calendar } from '@chayns-components/date';
```

### Examples

#### General

```tsx
<Calendar
    type={CalendarType.Single}
    highlightedDates={[
        {
            dates: [getDayOfCurrentMonth(-3), getDayOfCurrentMonth(1), getDayOfCurrentMonth(22)],
            style: { textColor: 'white', backgroundColor: 'blue' },
        },
        {
            dates: [getDayOfCurrentMonth(21)],
            style: { textColor: 'white', backgroundColor: 'red' },
        },
        {
            dates: [getDayOfCurrentMonth(20), getDayOfCurrentMonth(28)],
            style: { textColor: 'white', backgroundColor: 'green' },
        },
    ]}
    disabledDates={[getDayOfCurrentMonth(10), getDayOfCurrentMonth(15)]}
    categories={[
        {
            dates: [getDayOfCurrentMonth(35), getDayOfCurrentMonth(13)],
            color: 'green',
            id: 'meeting',
        },
        {
            dates: [getDayOfCurrentMonth(3), getDayOfCurrentMonth(14)],
            color: 'black',
            id: 'holiday',
        },
        {
            dates: [getDayOfCurrentMonth(14)],
            color: 'purple',
            id: 'birthday',
        },
    ]}
/>
```

#### With Custom Thumb Colors

```tsx
<Calendar
    type={CalendarType.Single}
    highlightedDates={[
        {
            dates: [getDayOfCurrentMonth(-3), getDayOfCurrentMonth(1), getDayOfCurrentMonth(22)],
            style: { textColor: 'white', backgroundColor: 'blue' },
        },
        {
            dates: [getDayOfCurrentMonth(21)],
            style: { textColor: 'white', backgroundColor: 'red' },
        },
        {
            dates: [getDayOfCurrentMonth(20), getDayOfCurrentMonth(28)],
            style: { textColor: 'white', backgroundColor: 'green' },
        },
    ]}
    disabledDates={[getDayOfCurrentMonth(10), getDayOfCurrentMonth(15)]}
    categories={[
        {
            dates: [getDayOfCurrentMonth(35), getDayOfCurrentMonth(13)],
            color: 'green',
            id: 'meeting',
        },
        {
            dates: [getDayOfCurrentMonth(3), getDayOfCurrentMonth(14)],
            color: 'black',
            id: 'holiday',
        },
        {
            dates: [getDayOfCurrentMonth(14)],
            color: 'purple',
            id: 'birthday',
        },
    ]}
    customThumbColors={{
        mainBackgroundColor: 'purple',
        mainTextColor: 'white',
        secondaryBackgroundColor: 'pink',
    }}
/>
```

### Props

| name                                 | type                                                            | required | description                                                                                                                                                                                                             |
| ------------------------------------ | --------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `categories`                         | `Categories[] \| undefined`                                     | no       | An array to group dates into a category.                                                                                                                                                                                |
| `currentDateBackgroundColor`         | `BackgroundColor \| undefined`                                  | no       | When set, the current date will be highlighted in the corresponding style.                                                                                                                                              |
| `customThumbColors`                  | `CustomThumbColors \| undefined`                                | no       | Custom colors for the thumb.                                                                                                                                                                                            |
| `disabledDates`                      | `Date[] \| undefined`                                           | no       | An array of dates that should be disabled.                                                                                                                                                                              |
| `highlightedDates`                   | `HighlightedDates[] \| undefined`                               | no       | An array with dates and corresponding styles to highlight.                                                                                                                                                              |
| `isDisabled`                         | `boolean \| undefined`                                          | no       | To disable the Calendar                                                                                                                                                                                                 |
| `locale`                             | `Language \| undefined`                                         | no       | The locale language to format the dates.                                                                                                                                                                                |
| `maxDate`                            | `Date \| undefined`                                             | no       | The maximum date that can be selected.                                                                                                                                                                                  |
| `minDate`                            | `Date \| undefined`                                             | no       | The minimum date that can be selected.                                                                                                                                                                                  |
| `onChange`                           | `((date: Date \| Date[] \| DateInterval) => void) \| undefined` | no       | Function to be executed when the selected date, dates or date interval change.                                                                                                                                          |
| `onShownDatesChange`                 | `((dates: { start: Date; end: Date; }) => void) \| undefined`   | no       | Function to be executed when the shown dates change. Returns the start of the displayed month and the end of the last displayed month (since depending on the available widths, there are one or two months displayed). |
| `selectedDate`                       | `Date \| undefined`                                             | no       | A date that should be preselected.                                                                                                                                                                                      |
| `selectedDateInterval`               | `DateInterval \| undefined`                                     | no       | No description available.                                                                                                                                                                                               |
| `selectedDates`                      | `Date[] \| undefined`                                           | no       | No description available.                                                                                                                                                                                               |
| `shouldShowHighlightsInMonthOverlay` | `boolean \| undefined`                                          | no       | Whether the highlighted dates should be displayed for the greyed month overlay days.                                                                                                                                    |
| `showMonthYearPickers`               | `boolean \| undefined`                                          | no       | Shows the month and year pickers, if there are multiple months/years to select from.                                                                                                                                    |
| `type`                               | `CalendarType \| undefined`                                     | no       | The type of the calendar selection.                                                                                                                                                                                     |

### Types

- `CalendarType` ->
  `enum CalendarType {     Single = 'single',     Multiple = 'multiple',     Interval = 'interval', }`
- `Categories` ->
  `interface Categories {     id: string;     dates: Date[];     color: CSSProperties['color']; }`
- `CustomThumbColors` ->
  `interface CustomThumbColors {     /**      * The background color of the main thumbs (single, multi, interval)      */     mainBackgroundColor?: CSSProperties['color'];     /**      * The text color of the main thumbs (single, multi, interval)      */     mainTextColor?: CSSProperties['color'];     /**      * The background color of the middle part of the interval thumb      */     secondaryBackgroundColor?: CSSProperties['color']; }`
- `DateInterval` -> `type DateInterval = {     start: Date;     end?: Date; };`
- `HighlightedDates` ->
  `interface HighlightedDates {     dates: Date[];     style: HighlightedDateStyles; }`

### Usage Notes

- Import `Calendar` directly from `@chayns-components/date` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/date/src/...`; always use the public
  package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.

## DateInfo

`DateInfo` is exported by `@chayns-components/date` and should be imported from the public package
entry point.

### Import

```ts
import { DateInfo } from '@chayns-components/date';
```

### Examples

#### General

```tsx
<DateInfo date={new Date()} />
```

### Props

| name                            | type                    | required | description                                                                                             |
| ------------------------------- | ----------------------- | -------- | ------------------------------------------------------------------------------------------------------- |
| `date`                          | `Date`                  | yes      | The date that should be displayed                                                                       |
| `language`                      | `Language \| undefined` | no       | The language that should be used for the date. Defaults to the active language given by chayns api.     |
| `preText`                       | `string \| undefined`   | no       | Additional text for the "shouldShowDateToNowDifference" prop. Writes a text before the calculated time. |
| `shouldShowDateToNowDifference` | `boolean \| undefined`  | no       | Shows the difference from the date to now. The component handles updates itself.                        |
| `shouldShowDayOfWeek`           | `boolean \| undefined`  | no       | Adds the day of the week to the display                                                                 |
| `shouldShowOnlyTime`            | `boolean \| undefined`  | no       | Whether only the time should be displayed.                                                              |
| `shouldShowRelativeDayOfWeek`   | `boolean \| undefined`  | no       | Whether the relative day of the week to today should be shown (today, yesterday or tomorrow).           |
| `shouldShowTime`                | `boolean \| undefined`  | no       | Adds the time to the display.                                                                           |
| `shouldShowYear`                | `boolean \| undefined`  | no       | Adds the current year to the display                                                                    |
| `shouldUseShortText`            | `boolean \| undefined`  | no       | Shortens the day and month text to the maximum three digits                                             |

### Types

No additional exported types documented.

### Usage Notes

- Import `DateInfo` directly from `@chayns-components/date` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.
- Pay special attention to required props: `date`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/date/src/...`; always use the public
  package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.

## OpeningTimes

`OpeningTimes` is exported by `@chayns-components/date` and should be imported from the public
package entry point.

### Import

```ts
import { OpeningTimes } from '@chayns-components/date';
```

### Examples

#### General

```tsx
<OpeningTimes
    closedText={'geschlossen'}
    weekdays={[
        { id: 0, name: 'Montag' },
        { id: 1, name: 'Dienstag' },
        { id: 2, name: 'Mittwoch' },
        { id: 3, name: 'Donnerstag' },
        { id: 4, name: 'Freitag' },
        { id: 5, name: 'Samstag' },
        { id: 6, name: 'Sonntag' },
    ]}
    openingTimes={[
        {
            id: 'montag',
            weekdayId: 0,
            times: [{ start: '08:00', end: '18:00', id: '1' }],
            isDisabled: true,
        },
        {
            id: 'dienstag',
            weekdayId: 1,
            times: [
                { start: '08:00', end: '12:00', id: '2' },
                { start: '11:00', end: '18:00', id: '3' },
            ],
        },
        { id: 'mittwoch', weekdayId: 2, times: [{ start: '08:00', end: '18:00', id: '4' }] },
        { id: 'donnerstag', weekdayId: 3, times: [{ start: '08:00', end: '18:00', id: '5' }] },
        { id: 'freitag', weekdayId: 4, times: [{ start: '08:00', end: '18:00', id: '6' }] },
        { id: 'samstag', weekdayId: 5, times: [{ start: '08:00', end: '18:00', id: '7' }] },
        { id: 'sonntag', weekdayId: 6, times: [{ start: '18:00', end: '08:00', id: '8' }] },
    ]}
    hintText={
        'Einige der Öffnungszeiten überschneiden sich oder sind nicht in der richtigen Reihenfolge.'
    }
/>
```

#### Edit Mode

```tsx
<OpeningTimes
    closedText={'geschlossen'}
    weekdays={[
        { id: 0, name: 'Montag' },
        { id: 1, name: 'Dienstag' },
        { id: 2, name: 'Mittwoch' },
        { id: 3, name: 'Donnerstag' },
        { id: 4, name: 'Freitag' },
        { id: 5, name: 'Samstag' },
        { id: 6, name: 'Sonntag' },
    ]}
    openingTimes={[
        {
            id: 'montag',
            weekdayId: 0,
            times: [{ start: '08:00', end: '18:00', id: '1' }],
            isDisabled: true,
        },
        {
            id: 'dienstag',
            weekdayId: 1,
            times: [
                { start: '08:00', end: '12:00', id: '2' },
                { start: '11:00', end: '18:00', id: '3' },
            ],
        },
        { id: 'mittwoch', weekdayId: 2, times: [{ start: '08:00', end: '18:00', id: '4' }] },
        { id: 'donnerstag', weekdayId: 3, times: [{ start: '08:00', end: '18:00', id: '5' }] },
        { id: 'freitag', weekdayId: 4, times: [{ start: '08:00', end: '18:00', id: '6' }] },
        { id: 'samstag', weekdayId: 5, times: [{ start: '08:00', end: '18:00', id: '7' }] },
        { id: 'sonntag', weekdayId: 6, times: [{ start: '18:00', end: '08:00', id: '8' }] },
    ]}
    hintText={
        'Einige der Öffnungszeiten überschneiden sich oder sind nicht in der richtigen Reihenfolge.'
    }
    editMode
/>
```

#### Only Current Day

```tsx
<OpeningTimes
    closedText={'geschlossen'}
    weekdays={[
        { id: 0, name: 'Montag' },
        { id: 1, name: 'Dienstag' },
        { id: 2, name: 'Mittwoch' },
        { id: 3, name: 'Donnerstag' },
        { id: 4, name: 'Freitag' },
        { id: 5, name: 'Samstag' },
        { id: 6, name: 'Sonntag' },
    ]}
    openingTimes={[
        {
            id: 'montag',
            weekdayId: 0,
            times: [{ start: '08:00', end: '18:00', id: '1' }],
            isDisabled: true,
        },
        {
            id: 'dienstag',
            weekdayId: 1,
            times: [
                { start: '08:00', end: '12:00', id: '2' },
                { start: '11:00', end: '18:00', id: '3' },
            ],
        },
        { id: 'mittwoch', weekdayId: 2, times: [{ start: '08:00', end: '18:00', id: '4' }] },
        { id: 'donnerstag', weekdayId: 3, times: [{ start: '08:00', end: '18:00', id: '5' }] },
        { id: 'freitag', weekdayId: 4, times: [{ start: '08:00', end: '18:00', id: '6' }] },
        { id: 'samstag', weekdayId: 5, times: [{ start: '08:00', end: '18:00', id: '7' }] },
        { id: 'sonntag', weekdayId: 6, times: [{ start: '18:00', end: '08:00', id: '8' }] },
    ]}
    hintText={
        'Einige der Öffnungszeiten überschneiden sich oder sind nicht in der richtigen Reihenfolge.'
    }
    currentDayId={getCurrentDay()}
/>
```

### Props

| name               | type                                                                       | required | description                                                                  |
| ------------------ | -------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------- |
| `closedText`       | `string \| undefined`                                                      | no       | The text that should be displayed when a day is closed.                      |
| `currentDayId`     | `string \| undefined`                                                      | no       | If set just the current day is displayed and the whole week in a tooltip.    |
| `editMode`         | `boolean \| undefined`                                                     | no       | Whether the opening times can be edited.                                     |
| `hintText`         | `string \| undefined`                                                      | no       | The text that should be displayed if times are colliding.                    |
| `hintTextPosition` | `HintTextPosition \| undefined`                                            | no       | The position of the hint text.                                               |
| `onChange`         | `(({ time, enabledDays, dayId, isValid }: OnChange) => void) \| undefined` | no       | Function to be executed when a time is changed or a day is enabled/disabled. |
| `onTimeAdd`        | `(({ time, dayId, isValid }: OnTimeAdd) => void) \| undefined`             | no       | Function to be executed when a time is added.                                |
| `onTimeRemove`     | `((id: string) => void) \| undefined`                                      | no       | Function to be executed when a time is removed.                              |
| `openingTimes`     | `OpeningTime[]`                                                            | yes      | The opening times corresponding to its weekday.                              |
| `weekdays`         | `Weekday[]`                                                                | yes      | The weekdays that should be displayed.                                       |

### Types

- `HintTextPosition` -> `enum HintTextPosition {     Top,     Bottom, }`
- `OpeningTime` ->
  `interface OpeningTime {     weekdayId: Weekday['id'];     id: string;     isDisabled?: boolean;     times: Time[]; }`
- `Weekday` -> `interface Weekday {     name: string;     id: number; }`

### Usage Notes

- Import `OpeningTimes` directly from `@chayns-components/date` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.
- Pay special attention to required props: `openingTimes`, `weekdays`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/date/src/...`; always use the public
  package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
