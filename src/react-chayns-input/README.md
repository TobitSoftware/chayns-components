# Input

The Input is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage of the Input
The input has to be imported:

```js
import { Input } from 'chayns-components';
```


You can use the input like this:
```jsx
<Input placeholder="this is a placeholder" />
```

## Props
The following properties can be set on the Input-Component

| Property     | Description                                                                       | Type          | Default Value |
|--------------|-----------------------------------------------------------------------------------|---------------|---------------|
| style        | Additional styles that should be set to the input                                 | object        |               |
| className    | Additional CSS-Classes that should be set to the button                           | string        |               |
| placeholder  | Animated placeholder that will be shown inside the input                          | string        |               |
| defaultValue | the value does not update if this prop updates                                    | string/number |               |
| value        | the value updates if this prop updates                                            | string/number |               |
| onChange     | returns the value as an result of the onInput-event (if a RegExp is given but it does not match the input the return value is null) | function |  |
| onBlur       | returns the value if the input lost its focus (if a RegExp is given but it does not match the input the return value is null) | function |  |
| responsive   | Renders input as responsive input (see [chayns-css wiki](https://github.com/TobitSoftware/chayns-css/wiki/form-elements#responsive-input)) | bool | false  |
| regExp       | The input will check if the entered text is valid (see Regular Expressions)       | string        |               |
| inputRef     | Exposes the input DOM Ref to the parent component                                 | func          |               |


### Examples
#### Regex Input
```jsx
<Input
    placeholder="Looking for 3 lowercase e's"
    regExp="^e{3}$" 
    onInput={ (text) => { console.log('There is some new input. Check the new text: ', text); }}
    onBlur={ (text) => { console.log('The input losted its focus, the final input is: ', text); }}
/>
```