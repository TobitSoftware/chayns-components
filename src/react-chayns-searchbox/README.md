# SearchBox #

The SearchBox-Component allows you to let the user search in a list of strings and select one.
It is part of the *chayns-components*-Package. You can install it with the following command:

    npm install -S chayns-components@latest

## Usage ##

You have to import the component first:

```jsx harmony
import { SearchBox } from 'chayns-components';
```

You can use the SearchBox like in the [example](https://github.com/TobitSoftware/chayns-components/blob/master/examples/react-chayns-searchbox/Example.jsx).

It is also possible to use the component `ResultSelection` as a standalone component.

## Props ##
You can set the following props on a ColorPicker element:

| Property              | Description                                   | Type          |
|-----------------------|-----------------------------------------------|---------------|
| className             | ClassName set on the wrapper                  | String        |
| onSelect              | Callback which will be called on select       | Function      |
| disabled              | Disables the SearchBox                        | Boolean       |
| stopPropagation       | Calls stopPropagation on events               | Boolean       |
| defaultValue          | Default value of the SearchBox (key)          | String/Number |
| parent                | Parent element of the overlay                 | Node          |
| style                 | Styles set on the wrapper                     | Object        |
| value                 | Controlled value of the SearchBox (key)       | String/Number |
| inputValue            | Controlled value for the input                | String        |
| showListWithoutInput  | Shows the list if there is no user input      | Boolean       |
| inputDefaultValue     | Default value for the input                   | String        |
| onChange              | Input onChange callback                       | Function      |
| autoSelectFirst       | Autoselect the first entry in result list     | bool          |

All other props are passing on the InputBox component.

### ResultSelection Props

| Property      | Description                                   | Type       |
|---------------|-----------------------------------------------|------------|
| text          | The text searched in                          | String     |
| search        | The pattern which is searched in the text     | String     |
