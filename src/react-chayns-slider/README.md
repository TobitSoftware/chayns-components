# Slider #

The Slider-Component is part of the *chayns-components*-Package. You can install it with the following command:

    npm install -S chayns-components@latest


## Usage ##

You have to import the components first:

```jsx harmony
import { Slider } from 'chayns-components';
```

You can now use the components as in the [example](https://github.com/TobitSoftware/chayns-components/blob/master/examples/react-chayns-slider/Example.jsx).


## Props ##

You can set the following props on a slider:

| Property       | Description                                                                                                  | Type     | Default |
|----------------|--------------------------------------------------------------------------------------------------------------|----------|---------|
| min            | Minimum value on the slider                                                                                  | number   | 0       |
| max            | Maximum value on the slider                                                                                  | number   | 100     |
| step           | Value steps (null = no steps)                                                                                | number   | null    |
| defaultValue   | default value (for sliders with one thumb)                                                                   | number   | 0       |
| value          | value to control the slider                                                                                  | number   | null    |
| className      | CSS-classes that should be set on the root-element                                                           | string   | null    |
| style          | Styles that should be set on the root-element                                                                | object   | null    |
| thumbStyle     | Styles that should be set on the thumb(s)                                                                    | object   | null    |
| trackStyle     | Styles that should be set on the track                                                                       | object   | null    |
| innerTrackStyle| Styles that should be set on the inner track (the colored part)                                              | object   | null    |
| showLabel      | Show label (only for horizontal sliders)                                                                     | bool     | false   |
| labelStyle     | Styles that should be set on the label                                                                       | object   | {minWidth: '50px'} |
| valueFormatter | Function to format the value(s) for the label                                                                | function | returns the rounded value |
| onChangeStart  | Function which is called when the user starts to change the slider value                                     | function | null    |
| onChange       | Function which is called on every change of the slider values                                                | function | null    |
| onChangeEnd    | Function which is called when the user has changed the slider value                                          | function | null    |
| disabled       | Disables the slider                                                                                          | bool     | false   |
| vertical       | Makes the slider vertical                                                                                    | bool     | false   |
| interval       | Adds a second thumb to select an interval                                                                    | bool     | false   |
| minInterval    | Minimum interval duration                                                                                    | number   | null    |
| maxInterval    | Maximum interval duration                                                                                    | number   | null    |
| defaultStartValue| default value for left thumb                                                                               | number   | 0       |
| defaultEndValue| default value for right thumb                                                                                | number   | 0       |
| startValue     | value to control the left thumb                                                                              | number   | null    |
| endValue       | value to control the right thumb                                                                             | number   | null    |
| scaleOnDown    | Scale the slider on click/touch (default: only on mobile devices)                                            | bool     | null    |
| showValueInThumb | Shows the value in the thumb                                                                               | bool     | null    |
