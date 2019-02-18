# PersonFinder # 

The PersonFinder-Component is part of the *chayns-components* package. It can be installed via npm:
```
npm install -S chayns-components@latest
```

## Usage ##

At first the component has to be imported:

```jsx harmony
import { PersonFinder } from 'chayns-components';
```

Then it can be used like in the following example:

```jsx harmony
<PersonFinder
    placeholder="Person suchen"
    onChange={this.personChanged}
/>
```

## Props ##

| Property   | Description                                                                                        | Type     |
|------------|----------------------------------------------------------------------------------------------------|----------|
| placeholder | Placeholder of the input field                                                                    | String   |
| onChange    | Callback that will be executed when a person gets selected or input/personfinder gets cleared     | Function |
| className | CSS classes for the wrapper-div                                                                     | String   |
| style    | Styles for the input field                                                                           | Object   |
| required    | Makes the input required                                                                          | bool     |
| parent | DOM Node into which the **PersonFinder** will be rendered. On default, it's the tapp div.              | node     |
