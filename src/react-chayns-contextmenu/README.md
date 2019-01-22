# ContextMenu #

The **ContextMenu** - Component is part of the **chayns-component** package. You can install the whole package with the following statement:

    npm install -S chayns-components@latest


## Usage ##

First of all import the component to a component of your own project.

```jsx harmony
import { ContextMenu } from 'chayns-components';
```

You can init your **ContextMenu** like this:

```jsx harmony
<ContextMenu
    items={[{
        icon: 'ts-tobit',
        onClick: this.addOnClick,
        text: 'Hinzufügen'
    }]}
    position={0}
/>
```


## Props ##

The component got the following properties:

| Property   | Description                                                                                        | Type   | Default | Required
|------------|-----------------------------------------------------------------------------------------------------|--------|-------|------|
| coordinates           | Coordinates of the place to which the ContextMenu is rendered. Example: {x: 100, y: 100}                                  | object    |       |  |
| hide | Defines wether the Component is hidden or not   | bool | true| |
| onLayerClick | An Event which get triggered when the **ContextMenu** is shown and the User clicks on the Layer over the page | func | ||
| position | The position the ContextMenu (0 = top left, 1 = bottom left, 2 = bottom right, 3 = top right) | number | 0 ||
| items | The Items which are displayed in the **ContextMenu** | array | |
| item.className | The className of an item of the **ContextMenu** | string | |
| item.onClick | The function, which gets triggered when the user clicks on a certain item in the **ContextMenu** | func | ||
| item.text | The text displayed in an item of the **ContextMenu** | string | |
| item.icon | The icon displayed in an item of the **ContextMenu** | object/string | |
| parent | DOM Node into which the **ContextMenu** will be rendered | node | tapp |
| children | React Node, that the tooltip should refer to. It will always be rendered to your page. | node | ts-ellipsis_v-icon
| childrenStyle | Style for the children node | object | 

If you don't set coordinates or a children, the **ContextMenu** will render the `ts-ellipsis-v` icon as a trigger.

## Example ##

You can take a look at the **examples** folder in the **react-chayns-contextmenu** repository. There you can find an appropriate way of implementing the **ContextMenu** to your chayns-Tapp
