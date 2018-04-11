# Portal

The Portal-component is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest

The Portal component helps to render components on other positions in the VirtualDOM.
When using with React 16, consider using Portal-implementation of React 16 ([https://reactjs.org/docs/portals.html](https://reactjs.org/docs/portals.html)).


The Portal-component

## Usage of the Portal-component
The component has to be imported:

```js
import { Portal } from 'chayns-components';
```


You can use the component like this, to provide a new portal with the name "animate":
```jsx
<Portal name="animate" />
```

Than you could render to that portal using the same element with children:
```jsx
<Portal name="animate">
    Hello Portal!
</Portal>
```

Maybe you want to pass no children to the Portal. You have to set the preventPortal-prop, to prevent unwanted rendering:
Than you could render to that portal using the same element with children:
```jsx
<Portal
    name="animate"
    preventPortal
>
    Hello Portal!
</Portal>
```


## Props
The following properties can be set on the Input-Component

| Property      | Description                                                                       | Type          | Default Value |
|---------------|-----------------------------------------------------------------------------------|---------------|---------------|
| name          | The name of the portal                                                            | string        |               |
| preventPortal | Prevents the rendering of components in the portal                                | bool          | false         |
| children      | The elements that should be rendered                                              | ReactElements |               |