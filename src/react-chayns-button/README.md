# Button / ChooseButton

The Button/ChooseButton is part of the *tobit-chayns_components* package. It can be installed via npm:

    npm install -S tobit-chayns_components@latest


## Usage of the Button
At least one of the components has to be imported:

```jsx
import {Button, ChooseButton} from 'tobit-chayns_components/react-chayns-button';
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
#### ChooseButton
```jsx
<ChooseButton>
	Hello World!
</ChooseButton>
```
Is the same as:
```jsx
<Button chooseButton={true} >
	Hello World!
</Button>
```