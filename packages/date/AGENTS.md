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

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `Calendar` directly from `@chayns-components/date` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/date/src/...`; always use the public
  package export.

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

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `DateInfo` directly from `@chayns-components/date` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/date/src/...`; always use the public
  package export.

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

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `OpeningTimes` directly from `@chayns-components/date` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/date/src/...`; always use the public
  package export.
