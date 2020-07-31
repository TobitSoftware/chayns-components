# ColorPicker #

The ColorPicker-Component is part of the *chayns-components*-Package. You can install it with the following command:

    npm install -S chayns-components@latest

## Usage ##

You have to import the component first:

```jsx harmony
import { ColorPicker } from 'chayns-components';
```

You can use the ColorPicker like in the [example](https://github.com/TobitSoftware/chayns-components/blob/master/examples/react-chayns-color_picker/Example.jsx).

It is also possible to use the components `HueSlider`, `TransparencySlider`, `ColorArea` and `ColorInput`.

## Props ##
You can set the following props on a ColorPicker element:

| Property      | Description                                                                             | Type       |
|---------------|-----------------------------------------------------------------------------------------|------------|
| color         | The preselected color                                                                   | String, hsv(a)- or rgb(a)255-object |
| className     | ClassNames that will be set on the children wrapper                                     | string     |
| bubbleClassName| ClassNames that will be set on the bubble                                              | string     |
| style         | Styles assigned to the children wrapper                                                 | object     |
| bubbleStyle   | Styles assigned to the bubble                                                           | object     |
| bubblePosition | Position of the bubble. Valid positions are listed in Bubble.position                  | number     |
| parent        | Node the bubble will be rendered into                                                   | DOM-Element|
| onChange      | onChange - Callback                                                                     | function   |
| onChangeEnd   | onChange - Callback                                                                     | function   |
| onBlur        | onBlur - Callback                                                                       | function   |
| transparency  | Adds the transparency slider                                                            | bool       |
| input         | Adds an input to type colors                                                            | bool       |
| defaultColorModel | Default used color model                                                            | number (from ColorPicker.colorModels) |
| children      | Children rendered into the tapp                                                         | node       |
| removeParentSpace| Removes space from the parent to the page borders from tooltip position. It's only needed if the parent has space to the page borders and it's position is relative. | bool |
| inline        | displays the color picker without a bubble | bool 

**Note:** The color from the callback is in the hsva color model. You can convert it to the hex(a)- or rgb(a)-model using the [helper functions](https://github.com/TobitSoftware/chayns-components/blob/master/src/utils/color/README.md).
