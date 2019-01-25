# AmountControl #

The AmountControl-Component is part of the *chayns-components*-Package. You can install it with the following command:

    npm install -S chayns-components@latest


## Usage ##

You have to import the components and styles first:

```jsx harmony
import { AmountControl } from 'chayns-components';
```

You can now use the components as followed:
```jsx harmony
<AmountControl
    amount={1}
    onChange={console.log}
    buttonText="Lorem ipsum"
/>
```


## Props ##
You can set the following props on a AmountControl element:

| Property      | Description                                                                             | Type     | Default |
|---------------|-----------------------------------------------------------------------------------------|----------|---------|
| amount        | The current amount (behaves like value, not like defaultValue)                          | number   | 0       |
| className     | The css class of the AmountControl-wrapper                                              | string   |         |
| onChange      | Function that is called when the user changes the amount                                | function |         |
| onInput       | Function that is called directly when the user changes the amount                       | function |         |
| onAdd         | Function that is called when the user click on the add button                           | function |         |
| onRemove      | Function that is called when the user click on the remove button                        | function |         |
| equalize      | Equalizes a set of AmountControls (see examples)                                        | string   |         |
| disabled      | Disables all buttons and inputs                                                         | bool     |         |
| disableAdd    | Disables the add button                                                                 | bool     |         |
| disableInput  | Disables the input field (forces the user to use the control-buttons)                   | bool     |         |
| disableRemove | Disables the remove button                                                              | bool     |         |
| autoInput     | Shows an input at amount >= 10                                                          | bool     | false   |
| showInput     | Shows the input as long the buttons are not disabled                                    | bool     | false   |
| buttonFormatHandler | A function that should return the button-content                                  | func     |         |
| icon          | The icon shown on the left side of the button                                           | string/object |    |
| iconColor     | Color of the icon                                                                       | string   |         |
| addColor      | Color of the add-icon                                                                   | string   |         |
| removeColor   | Color of the remove-icon                                                                | string   |         |
| focusOnClick  | Enables the input autoFocus                                                             | bool     | true    |
| stopPropagation | Stops the click propagation to parent elements                                        | bool     | false   |

The shopStyle property is deprecated and will no longer be supported. You can get the shopStyle by setting the 
icon-, iconColor-, addColor-, removeColor- and focusOnClick-properties. 


### Examples ###


#### basic ####
Because the amount-prop works like value and not like defaultValue you have to use a state:
```jsx harmony
export default class Example extends React.Component {
    constructor() {
        super();

        this.state = {
            amount: 0
        };
    }

    onChange = (value) => {
        this.setState({
            amount: value
        });
    };

    render() {
        const {amount} = this.state;

        return(
            <AmountControl
                amount={amount}
                onChange={this.onChange}
                buttonText="0,15"
            />
        );
    }
}
```

#### equalize ####
When you use multiple AmountControls that are near to each other. It maybe looks better, if they have the same size.
The following example exactly does that:
```jsx harmony
<div data-equalize="group-1">
    <AmountControl
        equalize="group-1"
        buttonText="0,15"
    />

    <br />

    <AmountControl
        equalize="group-1"
        buttonText="mtl. 15,95 €"
    />

    <br />

    <AmountControl
        equalize="group-1"
        buttonText="test-article"
    />
</div>
```

#### buttonFormatHandler ####
When you use a buttonFormatHandler you could specify the content of the button.
You should disable the input, when using it.
```jsx harmony
<AmountControl
    amount={1}
    buttonFormatHandler={({ amount }) => `${amount} h`}
    disableInput
/>
```

#### shopStyle ####
You could add these props to display the component like in the microshop™.
```jsx harmony
<AmountControl
    amount={1}
    addColor="#20C65A"
    removeColor="#E71E28"
    iconColor="#20C65A"
    focusOnClick={false}
    icon="fa-shopping-cart"
/>
```


### More Examples ###

You can take a look at the **examples** folder in the **react-chayns-amountcontrol** repository. There you can find an appropriate way of implementing the **AmountControl** to your chayns-Tapp.
