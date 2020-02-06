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
    placeholder="Search person"
    onChange={this.handlePersonChange}
/>
```

| WARNING: Make sure the html document contains a &lt;div class="tapp" &gt;&lt;/div&gt;   |
| --- |

## Props ##

| Property      | Description                                                                                        | Type           | Default Value |
|---------------|----------------------------------------------------------------------------------------------------|----------------|---------------|
| placeholder   | Placeholder of the input field                                                                     | String         |               |
| removeIcon    | Show a remove icon to clear the personfinder (only dynamic and not multiple)                       | bool           | false         |
| onChange      | Callback that will be executed when a person gets selected or input/personfinder gets cleared      | Function       |               |
| className     | CSS classes for the wrapper-div                                                                    | String         |               |
| style         | Styles for the input field                                                                         | Object         |               |
| required      | Makes the input required                                                                           | bool           |               |
| includeOwn    | Allows the user to search for his own account                                                      | bool           | false         |
| parent        | DOM Node into which the **PersonFinder** will be rendered. On default, it's the tapp div.          | node           | .tapp         |
| showPersons   | Enables/Disables the search of persons                                                             | bool           | true          |
| showSites     | Enables/Disables the search of sites                                                               | bool           | false         |
| multiple      | Allows the input of multiple persons/sites using a TagInput                                        | bool           | false         |
| defaultValue  | The default value of the input element                                                             | string, object |               |
| defaultValues | Tags that should be added to the TagInput (multiple-prop) on initial rendering                     | array          |               |
| boxClassName  | ClassName of the box-overlay                                                                       | string         |               |
| uacId         | ID of the UAC-Group to search in                                                                   | number         |               |
| locationId    | LocationId of the UAC-Group to search in                                                           | number         |               |
| reducerFunction | Function to reduce the results (see example)                                                     | Function       |               |
| onInput       | Callback on input                                                                                  | Function       |               |

## Clear the PersonFinder
If you want to clear the PersonFinder, you need to have a reference to the ReactElement:
```jsx harmony
personFinder = React.createRef();

<PersonFinder
    placeholder="Search person"
    onChange={this.handlePersonChange}
    ref={this.personFinder}
/>
```
On this reference you have to execute the clear()-Method to remove the content of the PersonFinder:
```
if (this.personFinder.current) {
    this.personFinder.current.clear();
}
```
