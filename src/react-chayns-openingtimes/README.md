# OpeningTimes #

The OpeningTimes component is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage ##

The OpeningTimes component has to be imported:

```jsx harmony
import { OpeningTimes } from 'chayns-components';
```

You can use the gallery like this:
```jsx harmony
<OpeningTimes
    times={[
        {
            weekDay: 0,
            disabled: true,
            start: '13:00',
            end: '18:30'
        }, {
            weekDay: 3,
            start: '13:00',
            end: '15:00'
        }
    ]}
    onDisable={(weekDay, state) => console.log(weekDay, state)}
/>
```


## Props ##

The following properties can be set on the Gallery-Component

| **Property** | **Description**                                        | **Type**                          | **Default Value** | **Required** |
| ------------ | ----------------------------------------------------   | --------------------------------- | ----------------- | ------------ |
| days         | Contains the days that will be shown                   | array                             |                   | true         |
| day.weekDay  | Specifies the day of the week                          | number (Monday: 0)                |                   | true         |
| day.disabled | If true, the day will still be shown, but disabled     | bool                              | false             |              |
| day.times    | Contains the timespans for a given day                 | array                             |                   | true         |
| day.onChange | Called the times of a day change                       | func                              |                   |              |
| time.start   | The start of the timespan                              | string                            |                   | true         |
| time.end     | The end of the timespan                                | string                            |                   | true         |
| onDisable    | Called when a day's checkbox is clicked                | func                              |                   |              |