# SelectButton #

The SelectButton-Component is part of the *chayns-components*-Package. You can install it with the following command:

    npm install -S chayns-components@latest


## Usage ##

You have to import the component first:

```jsx harmony
import { SelectButton } from 'chayns-components';
```

You can now use the component as follows:

```jsx harmony
<SelectButton
    label="Select-Button"
    list={list}
    onSelect={(value) => { console.log(value) }}
    listKey="id"
    listValue="name"
/>
```


## Props ##

You can set the following props on a SelectButton element:

| Property   | Description                                                                                        | Type    | Default |
|------------|-----------------------------------------------------------------------------------------------------|--------|--------------|
| onSelect | Callback that will be triggered when items were selected.                                       | function | |
| title | A title shown on top of the dialog window.                                                          | string   | '' |
| description | A description for the dialog placed right below the title.                                    | string   | '' |
| disabled | If true, the button will be disabled. | bool | false |
| label | The text shown inside the button.                                                                  | string   | 'Select' |
| list | An array containing elements to select from.                                                        | array | |
| listKey | The identifier of the list items. It is required for the dialog to work.                         | string   | name |
| listValue | The value of the list items. It is shown in the dialog for each item.                          | string   | value |
| multiSelect | If true, more than one item can be selected.                                               | bool  | false |
| quickFind | If true, a search input is shown above the list.                                               | bool  | false |
| className | Add additional classes to the button.                                                          | string   | |
| showSelection | Shows selection in button. Use a number to set the maximum number of shown items. | bool / number | true |
| selectedFlag | The name of the flag which sets an item selected | string | isSelected |
| stopPropagation     | Stops the click propagation to parent elements                                                      | bool          | false         |

### Examples ###

The following example will implement a chayns® chooseButton which onClick opens a selectDialog using the defined array:
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
    <SelectButton
        label="Select Pizza"
        list={pizza}
        onSelect={console.log}
        listKey="id"
        listValue="name"
    />
);
```
