# Calendar - Component #

The **Calendar** - Component is part of the **tobit-chayns_component** package. You can install the whole package with the following statement:

    npm install --save-dev tobit-chayns_components

## Use ##

First of all import the component to a component of your own project.

```jsx
import {Calendar} from 'tobit-chayns_components/react-chayns-calendar';
import 'tobit-chayns_components/react-chayns-calendar/index.css';
```


You can init the **Calendar** like this:
```jsx
	<Calendar/>
```


 **Important:** You will need a bundler for the component styles. If you are not familiar with things like webpack or gulp take a look at our [chayns-React-ES6 Template ][1]. The bundler **must** include the node modules, otherwise you will get an compatibility error.


### Props ###
The component got the following properties:

| Property   | Description                                                                                        | Type   | Default | Required
|------------|-----------------------------------------------------------------------------------------------------|--------|-------|------|
| startDate | The *startDate* defines the first month which can be displayed.    | date |      | |
| endDate | The *end* defines the last month which can be displayed.             | bool |      | |
| selected | The current selected date   | date | today | |
| activated | If activateAll is false this array defines the activated dates | array of date | |
| highlighted | This is an array of special, highlighted dates | array of object | |
| highlighted.dates | The date of an highlight | date | |
| highlighted.color | The color which this date should have in the calendar (in hex) | string | |
| activateAll | This property defines wether the start and end date declare if the user can navigate left/right or not | bool | true |
| onDateSelect | This Event gets triggered when the user clicks on a date in the calendar | func | |


#### Example ####

You can take a look at the **examples** folder in the **react-chayns-calendar** repository. There you can find 2 appropriate ways of implementing the **Calendar** to your chayns-Tapp

For starting the example you have to first install all dependencies...
```
npm i
```
... and the start the webpack-dev-server with the following command:
```
npm start
```

[1]:  https://github.com/TobitSoftware/chayns-template-es6-react
