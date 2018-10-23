# GridCalendar #

The **GridCalendar** - Component is part of the **chayns-component** package. You can install the whole package with the following statement:

    npm install -S chayns-components@latest


## Usage ##

First of all import the component to a component of your own project.

```jsx harmony
import { GridCalendar } from 'chayns-components';
```

You can init the **GridCalendar** like this:
```jsx harmony
<GridCalendar/>
```

## Props ##
The component got the following properties:

| Property   | Description                                                                                        | Type   | Default
|------------|-----------------------------------------------------------------------------------------------------|--------|-------|
| startTime | The *startDate* defines the first week which can be displayed.    | date |      | |
| endTime | The *end* defines the last week which can be displayed.             | date |      | |
| focus | The current focused date   | date | today | |
| columns | The data columns | object |
| columns.names | The name of each column | array with the length of 7 |
| columns.highlightedColor | The color of the focused date | string |
| groups | This is an array of special, highlighted dates | array of object | |
| groups.id | Id of a group | int | |
| groups.name | The name of a group | string | |
| groups.color | The color which highlights entries of this group | string | |
| data |  | object | |
| data.id | The id of a row | int | |
| data.name | The name of a row | string | |
| data.entries | The entries of a row (an entry is limited for the time of one day) | array of object | |
| data.entries.id | Id of an entry | int | |

## Example ##

You can take a look at the **examples** folder in the **react-chayns-gridcalendar** repository. There you can find 2 appropriate ways of implementing the **GridCalendar** to your chayns-Tapp
