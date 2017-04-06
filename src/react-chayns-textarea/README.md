# Textarea-Component #
The Textarea-Component is part of the *tobit-chayns_componetns* package. It can be installed via npm:

    npm install --save-dev tobit-chayns_components


## Usage of the Textarea ##
At first the component has to be imported:

```jsx
import Textarea from 'tobit-chayns_components/react-chayns-textarea';
```

Then it can be used like in the following example:
```jsx
<Textarea placeholder="Eingabefeld"
		  onChange={this.change} />
```

### Props ###

| Property   | Description                                                                                        | Type    |
|------------|-----------------------------------------------------------------------------------------------------|--------|
| placeholder | Placeholder of the textarea                                                | String |
| defaultValue | defaultValue of the textarea                                                 | String |
| className | CSS classes for the textarea                                                          | String   |
| style    | Styles for the textarea                                                    | Object |
| required    | Makes the textarea required                                                  | bool |
| autogrow    | Activates the auto resizing of the textarea                                                   | bool |
| reference    | References the textarea element                                                   | function |
| onKeyUp    | onKeyUp-Event                                                   | function |
| onKeyDown    | onKeyDown-Event                                                   | function |


## Examples ##

### Autogrow ###
```jsx
<Textarea placeholder="Hello World!"
		  autogrow={true} />
```

### Reference ###
```jsx
<Textarea reference={(node) => this._node = node} />
```