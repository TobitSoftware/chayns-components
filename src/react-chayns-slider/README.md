# Slider #

The **Slider** - Component is part of the **chayns-component** package. You can install the whole package with the following statement:

    npm install -S chayns-components@latest


## Usage ##

First of all import the component to a component of your own project.

```jsx harmony
import { Slider } from 'chayns-components';
```

You can use your **Slider** like this:
```jsx harmony
<Slider
    onSlide={console.log}
    value="#ff0000"
    colorPicker
/>
```

## Props ##

The component has the following properties:

| Property                          | Description                                                                                                           | Type                      | Default           | Required|
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------|---------------------------|-------------------|---------|
| onSlide                           | Callback function which returns the current value of the Slider                                                       | func                      |                   |false    |
| minValue                          | minimum Value of the Slider (leftmost value)                                                                          | number                    | 1                 |false    |
| maxValue                          | maximum Value of the Slider (rightmost value)                                                                         | number                    | 5                 |false    |
| step                              | Step size for the Slider                                                                                              | number                    | 1                 |false    |
| value                             | initial Value of the Slider (works with colors when colorPicker is enabled)                                           | number/string             | 2                 |false    |
| label                             | label of the Slider displayed on the left of the slider                                                               | number/string             |                   |false    |
| disabled                          | disables the Slider                                                                                                   | bool                      | false             |false    |
| backgroundColor                   | sets the Color of the left side of the Slider                                                                         | string                    | chayns.site.color |false    |
| colorPicker                       | enables color mode which returns hex colors instead of values. This overrides most other Properties.                  | bool                      | false             |false    |
