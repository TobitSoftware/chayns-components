# PersonFinder-Component # 

The PersonFinder-Component is part of the *tobit-chayns_components* package. It can be installed via the Tobit-NPM-Server:

    npm install --save-dev tobit-chayns_components


## Usage of the PersonFinder ##
At first the component has to be imported:

```jsx
import PersonFinder from 'tobit-chayns_components/react-chayns-personfinder';
```

Then it can be used like in the following example:
```jsx
<PersonFinder placeholder="Person suchen"
			  onChange={this.personChanged} />
```

### Props ###

| Property   | Description                                                                                        | Type    |
|------------|-----------------------------------------------------------------------------------------------------|--------|
| placeholder | Placeholder of the input field                                                 | String |
| onChange    | Callback that will be executed when a person gets selected                                                   | Function |
| className | CSS classes for the input field                             | String   |
| style    | Styles for the input field                                                   | Object |
| required    | Makes the input required                                                   | bool |