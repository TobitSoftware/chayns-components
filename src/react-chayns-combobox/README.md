# ComboBox #

The ComboBox-Component is part of the *chayns-components*-Package. You can install it with the following command:

    npm install -S chayns-components@latest


## Usage ##

You have to import the component first:

```jsx harmony
import { ComboBox } from 'chayns-components';
```

You can now use the component as follows:

```jsx harmony
<ComboBox
    label="ComboBox"
    list={list}
    onSelect={(value) => { console.log(value) }}
    listKey="id"
    listValue="name"
/>
```


## Props ##

You can set the following props on a ComboBox element:

| Property        | Description                                                                                   | Type     | Default |
|-----------------|-----------------------------------------------------------------------------------------------|----------|---------|
| onSelect        | Callback that will be triggered when items were selected.                                     | function |         |
| disabled        | If true, the ComboBox will be disabled.                                                       | bool     | false   |
| label           | A non-chooseable text shown inside the ComboBox.                                              | string   |         |
| list            | An array containing elements to select from.                                                  | array    |         |
| listKey         | The identifier of the list items. It is required for the dialog to work.                      | string   |         |
| listValue       | The value of the list items. It is shown in the dialog for each item.                         | string   |         |
| className       | Add additional classes to the button.                                                         | string   |         |
| stopPropagation | Stops the click propagation to parent elements                                                | bool     | false   |
| defaultValue    | The defaultValue of the ComboBox (does not work in combination with label-prop)               | string   |         |


## Example ##

The following example will implement a chayns® ComboBox using the defined array:
```jsx harmony
let pizza = [
    {
        id: '0', //this is the listKey
        name: 'Margherita', //this ist the listValue (shown value inside the dialog)
        price: '4.00' //additional data that will be returned after selection
    }, {
        id: '1',
        name: 'Salami',
        price: '4.50'
    }, {
        id: '2',
        name: 'Prosciutto',
        price: '4.50'
    }, {
        id: '3',
        name: 'Funghi',
        price: '5.00'
    }
];

return (
    <ComboBox
        label="Select Pizza"
        list={pizza}
        onSelect={(value) => { console.log(value) }}
        listKey="id"
        listValue="name"
    />
);
```
