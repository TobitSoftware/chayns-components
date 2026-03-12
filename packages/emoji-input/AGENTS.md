# @chayns-components/emoji-input

React component package providing 3 documented components for chayns applications.

Documented components: `EmojiInput`, `EmojiPicker`, `EmojiPickerPopup`.

## Import

```ts
import { EmojiInput, EmojiPicker, EmojiPickerPopup } from '@chayns-components/emoji-input';
```

## Typical Usage

```tsx
<EmojiInput
    placeholder={'Nachricht schreiben'}
/>
```

## Components

- `EmojiInput`
- `EmojiPicker`
- `EmojiPickerPopup`

## EmojiInput

`EmojiInput` is exported by `@chayns-components/emoji-input` and should be imported from the public package entry point.

### Import

```ts
import { EmojiInput } from '@chayns-components/emoji-input';
```

### Examples

#### General

```tsx
<EmojiInput
    placeholder={'Nachricht schreiben'}
/>
```

#### Emoji Input With Progress

```tsx
<EmojiInput
    placeholder={'Nachricht schreiben'}
/>
```

#### Emoji Input With Prefix Element

```tsx
<EmojiInput
    placeholder={'Nachricht schreiben'}
    prefixElement={'[lc_mention id="CHA-YNSAI"]Sidekick[/lc_mention],&nbsp;'}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `EmojiInput` directly from `@chayns-components/emoji-input` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/emoji-input/src/...`; always use the public package export.
## EmojiPicker

`EmojiPicker` is exported by `@chayns-components/emoji-input` and should be imported from the public package entry point.

### Import

```ts
import { EmojiPicker } from '@chayns-components/emoji-input';
```

### Examples

#### General

```tsx
<EmojiPicker />
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `EmojiPicker` directly from `@chayns-components/emoji-input` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/emoji-input/src/...`; always use the public package export.
## EmojiPickerPopup

`EmojiPickerPopup` is exported by `@chayns-components/emoji-input` and should be imported from the public package entry point.

### Import

```ts
import { EmojiPickerPopup } from '@chayns-components/emoji-input';
```

### Examples

#### General

```tsx
<EmojiPickerPopup />
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `EmojiPickerPopup` directly from `@chayns-components/emoji-input` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/emoji-input/src/...`; always use the public package export.
