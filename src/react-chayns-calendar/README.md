# Calendar #

The **Calendar** - Component is part of the **chayns-component** package. You can install the whole package with the following statement:

    npm install -S chayns-components@latest


## Usage ##

First of all import the component to a component of your own project.

```jsx harmony
import { Calendar } from 'chayns-components';
import 'chayns-components/lib/react-chayns-calendar/index.css';
```

You can init the **Calendar** like this:
```jsx harmony
<Calendar/>
```

## Props ##

The component got the following properties:

| Property   | Description                                                                                        | Type   | Default | Required
|------------|-----------------------------------------------------------------------------------------------------|--------|-------|------|
| startDate | The *startDate* defines the first month which can be displayed.    | date |      | |
| endDate | The *end* defines the last month which can be displayed.             | date |      | |
| selected | The current selected date   | date | today | |
| activated | If activateAll is false this array defines the activated dates | array of date | |
| highlighted | This is an array of special, highlighted dates | array of object | |
| highlighted.dates | The date of an highlight | date | |
| highlighted.style | The style which this date should have in the calendar (in hex) | string | |
| activateAll | This property defines wether the start and end date declare if the user can navigate left/right or not | bool | true |
| onDateSelect | This Event gets triggered when the user clicks on a date in the calendar | func | |


#### Example ####

You can take a look at the **examples** folder in the **react-chayns-calendar** repository. There you can find 2 appropriate ways of implementing the **Calendar** to your chayns-Tapp
