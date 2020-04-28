# FilterButton

The FilterButton-Component is part of the `chayns-components`-Package. You can install it with the following command:

    npm install -S chayns-components@latest

## Usage

You have to import the component first:

```jsx harmony
import { FilterButton } from 'chayns-components';
```

You can use the FilterButton like in the [example](https://github.com/TobitSoftware/chayns-components/blob/master/examples/react-chayns-filterbutton/Example.jsx).

## Props

You can set the following props on a FilterButton element:

| Property        | Description                                                        | Type            |
| --------------- | ------------------------------------------------------------------ | --------------- |
| icon            | Icon to be shown in the button                                     | string / object |
| label           | Text to be shown in the button                                     | string          |
| count           | Count to be shown in the button in bold                            | number          |
| checked         | Whether the button is activated                                    | bool            |
| onChange        | Function to be called on state change                              | function        |
| name            | Only one of FilterButtons with the same name can be active         | string          |
| value           | Value given to onChange if `name` is set                           | any             |
| className       | Additional class names set on label element                        | string          |
| style           | Style set on label element                                         | object          |
| id              | Optional HTML-id for the input element. Generated if not specified | string          |
| disabled        | Makes FilterButton disabled and changes style                      | bool            |
| stopPropagation | Stops the click propagation to parent elements                     | bool            |
| small           | Shrinks the FilterButton                                           | bool            |

To adjust the color of the FilterButton, just pass a `color` via the `style` prop or give it a `className` that changes the `color` (not `background-color`);
