# Input #

The Input is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage ##

The input has to be imported:

```jsx harmony
import { Input } from 'chayns-components';
```

You can use the Input like in the [example](https://github.com/TobitSoftware/chayns-components/blob/master/examples/react-chayns-input/Example.jsx).

## Props ##

The following properties can be set on the Input-Component

| Property     | Description                                                                       | Type           | Default Value |
|--------------|-----------------------------------------------------------------------------------|----------------|---------------|
| type         | The type that should be set on the input (e.g. text, password, number)            | string         | "text"        |
| style        | Additional styles that should be set to the input                                 | object         |               |
| className    | Additional CSS-Classes that should be set to the button                           | string         |               |
| placeholder  | Animated placeholder that will be shown inside the input                          | string         |               |
| defaultValue | the value does not update if this prop updates                                    | string/number  |               |
| value        | the value updates if this prop updates                                            | string/number  |               |
| onChange     | returns the value as an result of the onInput-event (if a RegExp is given a second value is returned indicating if the input is valid or not) | function  |  |
| onEnter      | returns the value if user clicks enter | function  |  |
| onKeyUp      | returns the onKeyUp event | function  |  |
| onBlur       | returns the value if the input lost its focus (if a RegExp is given but it does not match the input the return value is null) | function  |  |
| regExp       | The input will check if the entered text is valid (see Regular Expressions)       | string, RegExp |               |
| inputRef     | Exposes the input DOM Ref to the parent component                                 | func           |               |
| invalid      | Marks the input as invalid                                                        | bool           | false         |
| icon         | Icon shown on the right side (only dynamic input)                                 | string/object  |               |
| onIconClick  | Icon onClick Event (only dynamic input)                                           | func           | clear value   |
| dynamic      | Use dynamic input                                                                 | bool           | false         |
| customProps  | CustomProps for the html input element                                            | object         |               |
| stopPropagation | Stops the click propagation to parent elements                                 | bool           | false         |
| required     | Input is invalid if there is no value                                             | bool           | false         |
| disabled     | Disables the input                                                                | bool           | false         |
