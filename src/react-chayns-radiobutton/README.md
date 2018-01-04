# RadioButton-Component #

The RadioButton-Component is part of the *chayns-components*-Package. You can install it with the following command:

    npm install -S chayns-components@latest


## Usage ##
You have to import the component first:

```jsx
import { RadioButton } from 'chayns-components';
```


You can now use the components as followed:
```jsx
<RadioButton>
    Hello World
</RadioButton>
```

### Props (RadioButton) ###
You can set the following props on a RadioButton element:

| Property   | Description                                                                                         | Type    | Default |
|------------|-----------------------------------------------------------------------------------------------------|--------|--------------|
| id         | HTML-Id of the RadioButton                                                                          | string | generated ID |
| name       | Name of the RadioButton (to group RadioButtons)                                                     | string |  |
| checked    | Check/Uncheck the RadioButton                                                                       | boolean |  false            |
| onChange   | Function that will be called on change                                                              | function |  |
| disabled   | Disables the RadioButton                                                                            | bool | false |
| children   | Content of the label                                                                                | any |  |
| value      | Value that should be send to onChange-function                                                      | string, number, boolean | "on" |

### Beispiele ###
#### RadioButton-group ####
You can set the same name-prop on multiple elements to group them.
```jsx
<div>
    <RadioButton name="group1">
    	Group 1, Entry 1
    </RadioButton>
    
    <RadioButton name="group2">
        Group 2, Entry 1
    </RadioButton>
    
    <RadioButton name="group1">
        Group1, Entry 2
    </RadioButton>
</div>
```