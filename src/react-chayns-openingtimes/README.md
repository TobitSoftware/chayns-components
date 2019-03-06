# OpeningTimes #

The OpeningTimes component is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage ##

The OpeningTimes component has to be imported:

```jsx harmony
import { OpeningTimes } from 'chayns-components';
```

You can use the OpeningTimes like this: <br>
The Component only Shows the Information Supplied to it in the days prop. It does not manage its own data.
```jsx harmony
<OpeningTimes
    days={[
        {
            weekDay: 0,
            disabled: false,
            times: [
                {
                    start: '12:30',
                    end: '12:50',
                },
            ],
        },
    ]}
    onChange={(val, obj) => {
        console.log(val, obj, 'onChange');
    }}
    onAdd={(val, obj) => {
        console.log(val, obj, 'onAdd');
    }}
    onDayAdd={(val, obj) => {
        console.log(val, obj, 'onDayAdd');
    }}
    onDayRemove={(val, obj) => {
        console.log(val, obj, 'onDayRemove');
    }}
    onRemove={(val, obj) => {
        console.log(val, obj, 'onRemove');
    }}
/>
```


## Props ##

The following properties can be set on the OpeningTimes-Component

| **Property**         | **Description**                                                                              | **Type**                          | **Default Value** | **Required** |
| ---------------------|--------------------------------------------------------------------------------------------- | --------------------------------- | ----------------- | ------------ |
| days                 | Contains the Information that will me shown                                                  | array                             |                   | true         |
| day                  | Specifies the day of the week                                                                | Object                            |                   | true         |
| day.weekDay          | Day of the Week (Monday = 0)                                                                 | int                               |                   | true         |
| day.day              | Weekday as String (not relevant for the component)                                           | string                            |                   |              |
| day.times            | Timespans for indicating values of the component                                             | Object                            |                   | true         |
| day.times.start      | Starttime of the Timespan                                                                    | string (HH:MM)                    |                   | true         |
| day.times.end        | Endtime of the Timespan                                                                      | string (HH:MM)                    |                   | true         |
| day.disabled         | If true, the day will still be shown, but disabled                                           | bool                              | false             | true         |
| onChange             | Returns the complete new Array and the modified item when an item is modified                | func                              |                   | true         |
| onAdd                | Returns the complete new Array and the day which was modified when a timespan is added       | func                              |                   | true         |
| onDayAdd             | Returns the complete new Array and the day which was added when the Checkbox is activated    | func                              |                   | true         |
| onDayRemove          | Returns the complete new Array and the day which was added when the Checkbox is deactivated  | func                              |                   | true         |
| onRemove             | Returns the complete new Array and the day which was modified when a timespan is removed     | func                              |                   | true         |
