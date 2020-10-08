# DateInfo-Component

The **DateInfo** - Component shows an date as a fancy text with the absolute
date in the title on hover. It is part of the **chayns-component** package. You
can install the whole package with the following statement:

    npm install -S chayns-components@latest

If you need the text as a string for a dialog, you can use the static functions
`DateInfo.getRelativeDateString` and `DateInfo.getAbsoluteDateString`.

## Usage

First of all import the component to a component of your own project.

```jsx harmony
import { DateInfo } from 'chayns-components';
```

You can use the DateInfo-component like in the
[example](https://github.com/TobitSoftware/chayns-components/blob/master/examples/react-chayns-date/Example.jsx).

## Props

The component got the following properties:

| Property             | Description                                                      | Type                   | Required | Default |
| -------------------- | ---------------------------------------------------------------- | ---------------------- | -------- | ------- |
| children             | children the text should be written into                         | node                   |          | <div/>  |
| language             | language of the text                                             | string                 |          | de      |
| date                 | date that should be shown                                        | string, number or Date | true     |         |
| date2                | second date for time interval                                    | string, number or Date |          | null    |
| showTime             | show time in the text                                            | bool                   |          | null    |
| showDate             | show date in the text                                            | bool                   |          | null    |
| writeDay             | write day (e.g. monday)                                          | bool                   |          | false   |
| writeMonth           | write month (e.g. december (true) or 12. (false) instead of dec) | bool                   |          | null    |
| noTitle              | don't add the title attribute                                    | bool                   |          | false   |
| useToday             | use today instead of the date                                    | bool                   |          | null    |
| useTomorrowYesterday | use tomorrow and yesterday instead of the date                   | bool                   |          | null    |
| hideYear             | hide the year (true) or shorten the year (null)                  | bool                   |          | false   |
