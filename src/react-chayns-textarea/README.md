# TextArea #
The TextArea-Component is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage ##

At first the component has to be imported:

```jsx harmony
import { TextArea } from 'chayns-components';
```

Then it can be used like in the following example:

```jsx harmony
<TextArea
    placeholder="Eingabefeld"
    onChange={this.change}
/>
```


## Props ##

| Property   | Description                                                                            | Type     |
|------------|----------------------------------------------------------------------------------------|----------|
| placeholder  | Placeholder of the textarea                                                          | String   |
| defaultValue | defaultValue of the textarea                                                         | String   |
| className    | CSS classes for the textarea                                                         | String   |
| style        | Styles for the textarea                                                              | Object   |
| required     | Makes the textarea required                                                          | bool     |
| autogrow     | Activates the auto resizing of the textarea                                          | bool     |
| reference    | References the textarea element                                                      | function |
| onKeyUp      | onKeyUp-Event                                                                        | function |
| onKeyDown    | onKeyDown-Event                                                                      | function |
| onChange     | Callback that is fired on onChange (from react) with textarea-value                  | function |
| onBlur       | Callback that is fired on onBlur (from react) with textarea-value                    | function |
| stopPropagation     | Stops the click propagation to parent elements                                                      | bool          | false         |


## Examples ##

### Autogrow ###
```jsx harmony
<TextArea
    placeholder="Hello World!"
    autogrow={true}
/>
```

### Reference ###
```jsx harmony
<TextArea reference={(node) => this._node = node} />
```
