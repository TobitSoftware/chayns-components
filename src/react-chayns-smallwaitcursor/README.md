# SmallWaitCursor #

The SmallWaitCursor-Component is part of the *chayns-components*-Package. You can install it with the following command:

    npm install -S chayns-components@latest


## Usage ##

You have to import the components and styles first:

```jsx harmony
import { SmallWaitCursor } from 'chayns-components';
```


You can now use the components as followed:

```jsx harmony
<SmallWaitCursor
    show
/>
```


## Props ##

You can set the following props on a AmountControl element:

| Property       | Description                                                                                                  | Type     | Default |
|----------------|--------------------------------------------------------------------------------------------------------------|----------|---------|
| show           | Renders the WaitCursor                                                                                       | bool     | false   |
| style          | style-object of the wrapper                                                                                  | object   |         |
| showBackground | Renders the WaitCursor with a background                                                                     | bool     | true    |
| inline         | Renders the WaitCursor as inline-block (only works with showBackground: false)                               | bool     | false   |
