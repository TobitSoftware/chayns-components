# Button / ChooseButton

The Button/ChooseButton is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage of the Button
At least one of the components has to be imported:

```jsx
import { Button, ChooseButton } from 'chayns-components';
```


You can use the button like this:
```jsx
<Button>Test</Button>
```

## Props
The following properties can be set on the Button and the ChooseButton-Component

| Property   | Description                                                                                        | Type    | Default Value |
|------------|-----------------------------------------------------------------------------------------------------|--------|--------------|
| children | Value of the button                                                           | String | *required* |
| chooseButton | Render Button as ChooseButton (not necessary when using the ChooseButton-component)                                                          | bool | false (Button) / true (ChooseButton)             |
| disabled | Disabled the button and set the correct style                                                        | bool | false |
| onClick | onClick-event                                                       | function |  |
| className | Additional CSS-Classes that should be set to the button                                                        | String | |
| style | Additional styles that should be set to the button                                                           | Object | |
| buttonRef | Exposes the button DOM Ref to the parent component | func |  |
| icon | Renders Button as IconButton (fa- or ts-icon) | string |  |


### Examples
#### Disabled Button
```jsx
<Button
    disabled={true}
    onClick={function(event) {
        console.log(event);
    }}
>
	Hello World!
</Button>
```
#### Icon Button
```jsx
<Button
    icon="fa-rocket"
>
    IconButton
</Button>
```
#### ChooseButton
```jsx
<ChooseButton>
    Hello World!
</ChooseButton>
```
Is the same as:
```jsx
<Button chooseButton >
    Hello World!
</Button>
```