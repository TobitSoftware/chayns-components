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

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `Textstring` directly from `@chayns-components/textstring` instead of internal source
  paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/textstring/src/...`; always use the
  public package export.
