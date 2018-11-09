# Tooltip #

The **Tooltip** - Component is part of the **chayns-component** package. You can install the whole package with the following statement:

    npm install -S chayns-components@latest


## Usage ##

First of all import the component to a component of your own project.

```jsx harmony
import { Tooltip } from 'chayns-components';
```

You can use your **Tooltip** like this:
```jsx harmony
<Tooltip
    bindListeners
    position={3}
    content={{ text: 'This is a tooltip. Optional, you can add a headline and an image.' }}
>
    <a>Tooltip</a>
</Tooltip>
```


## Props ##

The component got the following properties:

| Property              | Description                                                                                                           | Type      | Default | Required|
|-----------------------|-----------------------------------------------------------------------------------------------------------------------|-----------|-------|-------|
| children              | React Node, that the tooltip should refer to. It will always be rendered to your page.                                | node      |       |true   |
| bindListeners         | Binds mouseover and mouseleave listeners to children. The tooltip will automatically be opened and closed on hover.   | bool      | false |       |
| position              | Position of the tooltip (0 = top left, 1 = bottom left, 2 = bottom right, 3 = top right).                             | number    | 0     |       |
| minWidth              | minWidth of the tooltip.                                                                                              | number    | 100   |       |
| maxWidth              | maxWidth of the tooltip.                                                                                              | number    | 250   |       |
| removeIcon            | Determines if the remove icon in the upper right corner will be shown.                                                | bool      | false |       |
| content               | Content of the tooltip. You can use the properties listed below.                                                      | object    |       | true  |
| content.text          | Text of the tooltip. It's required if you don't use html content.                                                     | string    |       | true  |
| content.headline      | Headline of the tooltip.                                                                                              | string    |       | false |
| content.imageUrl      | Url of the image shown in the tooltip.                                                                                | string    |       | false |
| content.buttonText    | Text of the button shown in the tooltip.                                                                              | string    |       | false |
| content.buttonOnClick | Function which will be set as onClick for the button shown in the tooltip.                                            | func      |       | false |
| content.html          | React Node which will be rendered in the tooltip. It's required if you don't use the text property                    | node      |       | true  |
| parent                | DOM Node into which the tooltip will be rendered                                                                      | node      | tapp  | false |
| coordinates           | Coordinates of the place to which the tooltip is rendered. Example: {x: 100, y: 100}                                  | object    |       | false |
| childrenStyle         | Style for the children node.                                                                                          | object    |       | false |

Also, you can call the methods show() and hide() on the reference of the tooltip.

**Tip:** Use a p- or span-tag for your children text. You will get the dotted tooltip-indicator-underline.


## Example ##

You can take a look at the **examples** folder in the **react-chayns-tooltip** repository. There you can find an appropriate way of implementing the **Tooltip** to your chayns-Tapp.
