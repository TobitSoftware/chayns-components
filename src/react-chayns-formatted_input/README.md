# FormattedInput

The FormattedInput is part of the *chayns-components* package. It can be installed via npm:
```
npm install -S chayns-components@latest
```


## Usage

The input and a formatter has to be imported:

```jsx harmony
import { FormattedInput, NumericFormatter } from 'chayns-components';
```

You have to instantiate the formatter once
(maybe inside the constructor, as static variable or constant variable inside the module):

```jsx harmony
const formatter = new NumericFormatter();

<FormattedInput initialFormatter={formatter} />
```


## Props

The FormattedInput-component is based on the [Input](../react-chayns-input)-component and you are
allowed to use all of it's props except the value-prop (which will be ignored).
This means, that currently you could not use this component as controlled component.

| Property     | Description                                                                                  | Type           | Default Value |
|--------------|----------------------------------------------------------------------------------------------|----------------|---------------|
| formatter    | Instance of a formatter (could also be a custom formatter, that extends the Formatter-class) | Formatter      | *required*    |

## Formatter
ChaynsComponents comes with some default formatters that could be use and that respects the style
that should be used for inputs:
- IntegerFormatter
- NumericFormatter
- PriceFormatter

### Custom
You could also specify a custom formatter and use it with the FormattedInput-component.

A custom formatter should extend the Formatter-class (exported by ChaynsComponents) and implement the
following methods (T is the type that should be formatted):
- format(value: T) : String
- parse(value: String) : T
- validate(value: String, selection: { start: int, end: int }) : { valid: boolean, selection: { start: int, end: int } }

## Example

You can take a look at the **examples** folder in the **react-chayns-formatted_input** repository. There you can find an appropriate way of implementing the **FormattedInput** to your chayns-Tapp.

