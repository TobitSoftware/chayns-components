# ContextMenu - Component #

The **ContextMenu** - Component is part of the **chayns-component** package. You can install the whole package with the following statement:

    npm install -S chayns-components@latest

## Use ##

First of all import the component to a component of your own project.

```jsx
import { ContextMenu } from 'chayns-components';
import 'chayns-components/lib/react-chayns-contextmenu/index.css';
```
I would recommend to import this component to a high level component of your project, because with that you can use one **ContextMenu** component for your whole project and you can store the properties for the **ContextMenu** at one place.

You can init your **ContextMenu** like this:
```jsx
<ContextMenu
    coordinates={{x: 100, y: 100}}
    hide={false}
    items={[{
        icon: 'ts-tobit',
        onClick: this.addOnClick,
        text: 'Hinzufügen'
    }]}
    onLayerClick={()=>console.log('hide')}
    position=0
/>
```

### Props ###
The component got the following properties:

| Property   | Description                                                                                        | Type   | Default | Required
|------------|-----------------------------------------------------------------------------------------------------|--------|-------|------|
| coordinates           | Coordinates of the place to which the ContextMenu is rendered. Example: {x: 100, y: 100}                                  | object    |       |  |
| hide | Defines wether the Component is hidden or not   | bool | true| |
| onLayerClick | An Event which get triggered when the **ContextMenu** is shown and the User clicks on the Layer over the page | func | ||
| position | The position the ContextMenu (top right, bottom right, bottom left, top left) | number | 0 ||
| items | The Items which are displayed in the **ContextMenu** | array | |
| item.className | The className of an item of the **ContextMenu** | string | |
| item.onClick | The function, which gets triggered when the user clicks on a certain item in the **ContextMenu** | func | ||
| item.text | The text displayed in an item of the **ContextMenu** | string | |
| item.text | The icon displayed in an item of the **ContextMenu** | object | |
| parent | DOM Node into which the **ContextMenu** will be rendered | node | tapp |
| children | React Node, that the tooltip should refer to. It will always be rendered to your page. | node | 


#### Example ####

You can take a look at the **examples** folder in the **react-chayns-contextmenu** repository. There you can find an appropriate way of implementing the **ContextMenu** to your chayns-Tapp

For starting the example you have to first install all dependencies...
```
npm i
```
... and the start the webpack-dev-server with the following command:
```
npm start
```

[1]:  https://github.com/TobitSoftware/chayns-template-es6-react
