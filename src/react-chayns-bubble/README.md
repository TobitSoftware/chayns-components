# Bubble #

The Bubble-Component is the base of the ContextMenu and Tooltip components. It's part of the *chayns-components*-Package. You can install it with the following command:

    npm install -S chayns-components@latest


## Usage ##

You have to import the component first:

```jsx harmony
import { Bubble } from 'chayns-components';
```

You can now use the component as followed:

```jsx harmony
<Bubble
    coordinates={{x: 100, y: 150}}
/>
```


## Props ##
You can set the following props on a Bubble element:

| Property      | Description                                                                             | Type       |
|---------------|-----------------------------------------------------------------------------------------|------------|
| children      | Children inside of the bubble                                                           | node       |
| className     | ClassNames that will be set on the children wrapper                                     | string     |
| style         | Styles assigned to the children wrapper                                                 | object     |
| topDivStyle   | Styles assigned to the top div                                                          | object     |
| position      | Position of the bubble. Valid positions are listed in Bubble.position                   | number     |
| parent        | Node the bubble will be rendered into                                                   | DomElement |
| coordinates   | Coordinates of the bubble arrowhead. The coordinates are in an {x,y} object.            | object     |
| onMouseEnter  | Function will be called on mouse enter                                                  | function   |
| onMouseLeave  | Function will be called on mouse leave                                                  | function   |

You can call show() and hide() on the Bubble ref to show or hide it.
