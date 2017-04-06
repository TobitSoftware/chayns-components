# Form

The Form is part of the *tobit-chayns_components* package. It can be installed via npm:

    npm install -S tobit-chayns_components@latest


## Usage of the Form
The form has to be imported:

```jsx
import {Form} from 'tobit-chayns_components/react-chayns-form';
```


You can use the form like this:
```jsx
<Form
    intro="This is the intro"
    submit={res => {console.log(res)}
    form=['prop1', 'prop2', 'prop3']
>
    <Input ... ... />
</Form>
```

## Props
The following properties can be set on the Form-Component

| Property   | Description                                                                                        | Type    | Default Value |
|------------|-----------------------------------------------------------------------------------------------------|--------|--------------|
| intro | A text that will be shown on top of the form                                                          | string | |
| className | Additional CSS-Classes that should be add to the form                                                        | String | |
| submit | Function that returns the form object if valid                                                       | function | |
| submitButton | Displays a submit button that triggers the submit function                                       | bool | false |
| form | An array containing strings that represent properties of the object this form should return on submit | string[] | []  |


