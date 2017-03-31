# Input

The Input is part of the *tobit-chayns_components* package. It can be installed via npm:

    npm install -S tobit-chayns_components@latest


## Usage of the Input
The input has to be imported:

```jsx
import {Input} from 'tobit-chayns_components/react-chayns-input';
```


You can use the input like this:
```jsx
<Input placeholder="this is a placeholder" />
```

## Props
The following properties can be set on the Input-Component

| Property   | Description                                                                                        | Type    | Default Value |
|------------|-----------------------------------------------------------------------------------------------------|--------|--------------|
| style | Additional styles that should be set to the input                                                           | Object | |
| className | Additional CSS-Classes that should be set to the button                                                        | String | |
| placeholder | Animated placeholder that will be shown inside the input                                                        | String | |
| onChange | onChange-event                                                       | function |  |
| responsive | Renders input as responsive input (see [chayns-css wiki](https://github.com/TobitSoftware/chayns-css/wiki/form-elements#responsive-input)) | bool | false  |
| regExp | The input will check if the entered text is valid (see Regular Expressions). onChange only triggers if the entered text is valid                                       | string |  |


### Examples
#### Regex Input
```jsx
<Input
    placeholder="Looking for 3 lowercase a's"
    regExp="^a{3}$" 
    onChange={ (text) => { console.log(text); }}
/>
```