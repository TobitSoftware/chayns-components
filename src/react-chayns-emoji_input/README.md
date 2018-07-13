# EmojiInput

> :warning: **WARNING:** The EmojiInput does not work correctly in **Internet Explorer**. 
Please use [react-chayns-input](/src/react-chayns-input/) or [react-chayns-textarea](/src/react-chayns-textarea/) there!

The EmojiInput is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage of the EmojiInput
The input has to be imported:

```jsx
import { EmojiInput } from 'chayns-components';
import 'chayns-components/lib/react-chayns-emojiInput/index.css';
```


You can use the input like this:
```jsx
<EmojiInput 
    placeholder="Test me!"
    onInput={ (event) => {console.log(event)} }
    value="This text is shown in input, re-set it onChange to display emojis"
    id="emojiInput_1"
/>
```

## Handling Text from onInput function
The `event` value in the function given to onInput of EmojiInput has an additional value at `target`
property. The value `pureInnerText` at `event.target` has the full text (clean from any elements for emojis), which is in the input.

Just use `event.target.pureInnerText` to save the text in your component and to give it back to the input.

## Props
The following properties can be set on the EmojiInput-Component

| **Property** | **Description**                                     | **Type** | **Default Value** | **Required** |
| ------------ | --------------------------------------------------- | -------- | ----------------- | ------------ |
| placeholder  | Text that will be shown as placeholder              | string   |                   | true         |
| onInput      | Function that will be called on input event         | function |                   | true         |
| value        | Text that will be shown in input                    | string   |                   | true         |
| id           | Id that is given to the component                   | string   |                   | true         |
| hideBorder   | Hides the border below the input                    | boolean  | false             |              |
| onKeyDown    | Function that will be called on input event         | function | *null*            |              |
| disabled     | Disables the input                                  | boolean  | false             |              |
| onFocus      | Function that will be called when input gets focus  | function | *null*            |              |
| onBlur       | Function that will be called when input loses focus | function | *null*            |              |
