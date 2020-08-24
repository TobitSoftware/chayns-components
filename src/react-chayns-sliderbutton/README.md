# SliderButton #

The SliderButton-Component is part of the *chayns-components*-Package. You can install it with the following command:

    npm install -S chayns-components@latest


## Usage ##

You have to import the components first:

```jsx harmony
import { SliderButton } from 'chayns-components';
```

You can now use the components as in the [example](https://github.com/TobitSoftware/chayns-components/blob/master/examples/react-chayns-sliderbutton/Example.jsx).


## Props ##

You can set the following props on a slider:

| Property       | Description                                                                                                  | Type     | Default |
|----------------|--------------------------------------------------------------------------------------------------------------|----------|---------|
| className      | CSS-classes that should be set on the root-element                                                           | String   | null    |
| style          | Styles that should be set on the root-element                                                                | Object   | null    |
| items          | An array of selectable items                                                                                 | Array of object |         |
| onChange       | onChange-Listener that should be set on the item                                                             | Function | null    |
| onDragStart    | onDragStart-Listener that should be set on the item                                                          | Function | null    |
| onDragStop     | onDragStop-Listener that should be set on the item                                                           | Function | null    |
| selectedItemId | Id of the item that should be selected                                                                       | Number   | 0       |
| disabled       | Id of the item that should be selected                                                                       | Bool     | false   |

