# SelectButton-Component #

The SelectButton-Component is part of the *tobit-chayns_components*-Package. You can install it with the following command:

    npm install --save-dev tobit-chayns_components


## Usage ##
You have to import the component first:

```jsx
import {SelectButton} from 'tobit-chayns_components/react-chayns-selectbutton';
```


You can now use the component as followed:
```jsx
<SelectButton
    label="Select-Button"
    list={list}
    onSelect={(value) => { console.log(value) }}
    listKey="id"
    listValue="name"
/>
```

### Props (SelectButton) ###
You can set the following props on a SelectButton element:

| Property   | Description                                                                                        | Type    | Default |
|------------|-----------------------------------------------------------------------------------------------------|--------|--------------|
| onSelect | Callback that will be triggered when items were selected                                       | function | |
| title | A title shown on top of the dialog window                                                         | string   | 'Select Dialog' |
| description | A description for the dialog placed right below the title                                   | string   | 'Please select an item' |
| label | The text shown inside the button                                                                  | string   | 'Select' |
| list | An array containing elements to select from                                                        | object[] | |
| listKey | The identifier of the list items. It is required for the dialog to work                         | string   | |
| listValue | The value of the list items. It is shown in the dialog for each item                          | string   | |
| multiSelect | If true, more than one item can be selected                                                 | boolean  | false |
| quickFind | If true, a search input is shown above the list                                               | boolean  | false |
| className | Add additional classes to the button                                                          | string   | |
| style     | Add additional styles  to the button                                                          | object   | |

### Examples ###

#### selectFirst ####
The following example will implement a chayns® chooseButton which onClick opens a selectDialog using the defined array :
```jsx

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
    <SelectButton
        label="Select Pizza"
        list={pizza}
        onSelect={(value) => { console.log(value) }}
        listKey="id"
        listValue="name"
    />
);
```