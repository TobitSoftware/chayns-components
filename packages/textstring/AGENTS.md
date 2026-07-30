# @chayns-components/textstring

React component package providing `Textstring` for chayns applications.

Documented components: `Textstring`.

## Import

```ts
import { Textstring } from '@chayns-components/textstring';
```

## Typical Usage

```tsx
<Textstring
    childrenTagName={'h1'}
    textstring={{
        fallback: 'Das ist ein Textstring! Pizza ist lecker.',
        name: 'txt_chayns_chaynsComponents_textString_example',
    }}
/>
```

## Textstring

`Textstring` is exported by `@chayns-components/textstring` and should be imported from the public
package entry point.

### Import

```ts
import { Textstring } from '@chayns-components/textstring';
```

### Examples

#### General

```tsx
<Textstring
    childrenTagName={'h1'}
    textstring={{
        fallback: 'Das ist ein Textstring! Pizza ist lecker.',
        name: 'txt_chayns_chaynsComponents_textString_example',
    }}
/>
```

#### With HTML

```tsx
<Textstring
    textstring={{
        fallback: '<button>Drücke mich!</button>',
        name: 'txt_chayns_chaynsComponents_textString_example_with_html',
    }}
    isTextstringHTML
/>
```

#### Textstring With Replacement

```tsx
<Textstring />
```

#### Textstring With Styles

```tsx
<Textstring
    childrenTagName={'h1'}
    childrenStyles={{ color: 'rebeccapurple' }}
    textstring={{
        fallback: 'Das ist ein Textstring! Pizza ist lecker.',
        name: 'txt_chayns_chaynsComponents_textString_example',
    }}
/>
```

### Props

| name                | type                                                                   | required | description                                                                                                  |
| ------------------- | ---------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `children`          | `ReactElement<any, string \| JSXElementConstructor<any>> \| undefined` | no       | The element that the text should be displayed in.                                                            |
| `childrenClassName` | `string \| undefined`                                                  | no       | The class name of the HTML element that the text should be displayed in. Only used if `children` is not set. |
| `childrenStyles`    | `CSSProperties \| undefined`                                           | no       | The styles of the HTML element that the text should be displayed in. Only used if `children` is not set.     |
| `childrenTagName`   | `keyof IntrinsicElements \| undefined`                                 | no       | The tag of the HTML element that the text should be displayed in. Only used if `children` is not set.        |
| `isTextstringHTML`  | `boolean \| undefined`                                                 | no       | Whether the textstring contains HTML elements and should be displayed as HTML.                               |
| `replacements`      | `TextstringReplacement \| undefined`                                   | no       | Replacement values for the textstring.                                                                       |
| `textstring`        | `ITextstring`                                                          | yes      | The text that should be displayed.                                                                           |

### Types

- `ITextstring` -> `interface ITextstring {     fallback: string;     name: string; }`
- `TextstringReplacement` -> `interface TextstringReplacement {     [key: string]: string; }`

### Usage Notes

- Import `Textstring` directly from `@chayns-components/textstring` instead of internal source
  paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.
- Pay special attention to required props: `textstring`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/textstring/src/...`; always use the
  public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
