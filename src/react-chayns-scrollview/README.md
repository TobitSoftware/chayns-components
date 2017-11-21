# ScrollView-Component #

The ScrollView-Component is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest

The ScrollView-Component adds a ScrollBar on the side of an element, when the content is bigger
than max-height or height

## Usage of the ScrollView ##
At first the component has to be imported:

```jsx
import { ScrollView } from 'chayns-components';
import 'chayns-components/lib/react-chayns-scrollview/index.css';
```


Then it can be used like in the following:
```jsx
<ScrollView style={{ maxHeight: '50px' }}>
    Hello World<br />
    Hello World<br />
    Hello World<br />
    Hello World<br />
    Hello World<br />
    Hello World<br />
    Hello World<br />
</Accordion>
```

### Props ###
The following properties can be set

| Property      | Description                                                            | Type                       | Default Value |
|---------------|------------------------------------------------------------------------|----------------------------|---------------|
| style         | Sets the style of the element                                          | object                     | *required*    |
| children      | Sets the children of the ScrollView                                    | node(s)                    |               |
| className     | Sets the classname of the wrapper                                      | string                     |               |
| showScrollbar | Show the scrollbar when necessary (do not hide when not in focus)      | boolean                    | false         |