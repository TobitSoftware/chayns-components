# GridCalendar - Component #

The **GridCalendar** - Component is part of the **tobit-chayns_component** package. You can install the whole package with the following statement:

    npm install --save-dev tobit-chayns_components

## Use ##

First of all import the component to a component of your own project.

```jsx
import GridCalendar from 'tobit-chayns_components/react-chayns-gridcalendar';
import 'tobit-chayns_components/react-chayns-gridcalendar/style.css';
```


You can init the **GridCalendar** like this:
```jsx
	<GridCalendar/>
```


 **Important:** You will need a bundler for the component styles. If you are not familiar with things like webpack or gulp take a look at our [chayns-React-ES6 Template ][1]. The bundler **must** include the node modules, otherwise you will get an compatibility error.


### Props ###
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

#### Example ####

You can take a look at the **examples** folder in the **react-chayns-gridcalendar** repository. There you can find 2 appropriate ways of implementing the **GridCalendar** to your chayns-Tapp

For starting the example you have to first install all dependencies...
```
npm i
```
... and the start the webpack-dev-server with the following command:
```
npm start
```

[1]:  https://github.com/TobitSoftware/chayns-template-es6-react
