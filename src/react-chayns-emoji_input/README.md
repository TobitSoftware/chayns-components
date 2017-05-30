# EmojiInput

The EmojiInput is part of the *tobit-chayns_components* package. It can be installed via npm:

    npm install -S tobit-chayns_components@latest


## Usage of the EmojiInput
The input has to be imported:

```jsx
import {EmojiInput} from 'tobit-chayns_components/react-chayns-emojiInput';
import 'tobit-chayns_components/react-chayns-emojiInput/style.css';
```


You can use the input like this:
```jsx
<EmojiInput 
    placeholder="Test me!"
    onInput={ (event) => {console.log(event)} }
    value="This text is shown in input"
    id="emojiInput_1"    
/>
```

## Props
The following properties can be set on the EmojiInput-Component

| Property     | Description                                  | Type     | Default Value |
|--------------|----------------------------------------------|----------|---------------|
| placeholder  | Text that will be shown as placeholder       | String   |               |
| onInput      | Function that will be called on input event  | function |               |
| value        | Text that will be shown in input             | String   |               |
| id           | Id that is given to the component            | String   |               |
| hideBorder   | Hides the border below the input             | bool     |               |
| onKeyDown    | Function that will be called on input event  | function |               |
