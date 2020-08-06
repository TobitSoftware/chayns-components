# ColorScheme component #

The **ColorScheme** - Component is part of the **chayns-component** package. You can install the whole package with the following statement:

    npm install -S chayns-components@latest
    
The component allows you to change the chayns-styles of its children elements via CSS-variables. Thus it has no Internet Explorer support.

## Usage ##

First of all import the component to a component of your own project.

```jsx harmony
import { ColorScheme } from 'chayns-components';
```

You can use the ColorScheme like in the [example](https://github.com/TobitSoftware/chayns-components/blob/master/examples/react-chayns-color_scheme/Example.jsx).

## Props ##

The component got the following properties:

| Property      | Description                                       | Type          | Default                   | 
|---------------|---------------------------------------------------|---------------|---------------------------|
| color         | Color used for children components                | string        | chayns.env.site.color     |
| colorMode     | Color mode used for children components           | string/number | chayns.env.site.colorMode |
| children      | Children                                          | node          | *required*                |
| style         | Style set to the ColorScheme component            | object        | {}                        |
| other props   | Additional props set to the ColorScheme component | objects       | -                         |
