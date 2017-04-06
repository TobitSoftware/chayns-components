# ContextMenu - Component #

The **ContextMenu** - Component is part of the **tobit-chayns_component** package. You can install the whole package with the following statement:

    npm install --save-dev tobit-chayns_components

## Use ##

First of all import the component to a component of your own project.

```jsx
import {ContextMenu} from 'tobit-chayns_components/react-chayns-contextmenu';
import 'tobit-chayns_components/react-chayns-contextmenu/style.css';
```
I would recommend to import this component to a high level component of your project, because with that you can use one **ContextMenu** component for your whole project and you can store the properties for the **ContextMenu** at one place.

You can init your **ContextMenu** like this:
```jsx
	<ContextMenu
        x={100}
        y={100}
        hide={false}
        items={[{
            className: 'fa fa-plus',
            onClick: this.addOnClick,
            text: 'Hinzufügen'
        }]}
        onLayerClick={()=>console.log('hide')}
    />
```


 **Important:** You will need a bundler for the component styles. If you are not familiar with things like webpack or gulp take a look at our [chayns-React-ES6 Template ][1]. The bundler **must** include the node modules, otherwise you will get an compatibility error.



### Props ###
The component got the following properties:

| Property   | Description                                                                                        | Type   | Default | Required
|------------|-----------------------------------------------------------------------------------------------------|--------|-------|------|
| x | The x-Position of the **ContextMenu**                                     | number |        | true |
| y | The y-Position of the **ContextMenu**                                     | bool   |        | true |
| hide | Defines wether the Component is hidden or not   | bool | true| |
| onLayerClick | An Event which get triggered when the **ContextMenu** is shown and the User clicks on the Layer over the page | func | |
| items | The Items which are displayed in the **ContextMenu** | array | |
| item.className | The className of an item of the **ContextMenu** | string | |
| item.onClick | The function, which gets triggered when the user clicks on a certain item in the **ContextMenu** | func | |
| item.text | The text displayed in an item of the **ContextMenu** | string | |


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