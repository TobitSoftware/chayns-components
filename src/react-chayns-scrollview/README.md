# ScrollView

The ScrollView-Component is part of the _chayns-components_ package. It can be
installed via npm:

    npm install -S chayns-components@latest

The ScrollView-Component adds a ScrollBar on the side of an element, when the
content is bigger than max-height or height

## Usage

At first the component has to be imported:

```jsx harmony
import { ScrollView } from 'chayns-components';
```

Then it can be used like in the following:

```jsx harmony
<ScrollView style={{ maxHeight: '50px' }}>
    Hello World
    <br />
    Hello World
    <br />
    Hello World
    <br />
    Hello World
    <br />
    Hello World
    <br />
    Hello World
    <br />
    Hello World
    <br />
</ScrollView>
```

## Props

The following properties can be set

| Property         | Description                         | Type    | Default Value |
| ---------------- | ----------------------------------- | ------- | ------------- |
| style            | Sets the style of the element       | object  | _required_    |
| children         | Sets the children of the ScrollView | node(s) |               |
| className        | Sets the classname of the wrapper   | string  |               |
| scrollElementId  | Sets the id of the scroll element   | string  |               |
| scrollElementRef | Ref to the html scroll element      | func    |               |
| onScroll         | Sets the onScroll listener          | func    |               |
