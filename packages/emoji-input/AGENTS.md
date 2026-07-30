# @chayns-components/emoji-input

React component package providing 3 documented components for chayns applications.

Documented components: `EmojiInput`, `EmojiPicker`, `EmojiPickerPopup`.

## Import

```ts
import { EmojiInput, EmojiPicker, EmojiPickerPopup } from '@chayns-components/emoji-input';
```

## Typical Usage

```tsx
<EmojiInput placeholder={'Nachricht schreiben'} />
```

## Components

- `EmojiInput`
- `EmojiPicker`
- `EmojiPickerPopup`

## EmojiInput

`EmojiInput` is exported by `@chayns-components/emoji-input` and should be imported from the public
package entry point.

### Import

```ts
import { EmojiInput } from '@chayns-components/emoji-input';
```

### Examples

#### General

```tsx
<EmojiInput placeholder={'Nachricht schreiben'} />
```

#### Emoji Input With Progress

```tsx
<EmojiInput placeholder={'Nachricht schreiben'} />
```

#### Emoji Input With Prefix Element

```tsx
<EmojiInput
    placeholder={'Nachricht schreiben'}
    prefixElement={'[lc_mention id="CHA-YNSAI"]Sidekick[/lc_mention],&nbsp;'}
/>
```

### Props

| name                                           | type                                                                                | required | description                                                                                                                                                                                                                                    |
| ---------------------------------------------- | ----------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accessToken`                                  | `string \| undefined`                                                               | no       | Access token of the logged-in user. Is needed to load and save the history of the emojis.                                                                                                                                                      |
| `container`                                    | `Element \| undefined`                                                              | no       | The DOM element that should receive the emoji picker popup portal.                                                                                                                                                                             |
| `height`                                       | `Height<string \| number> \| undefined`                                             | no       | Sets the height of the input field to a fixed value. If this value is not set, the component will use the needed height until the maximum height is reached.                                                                                   |
| `inputId`                                      | `string \| undefined`                                                               | no       | HTML id of the input element                                                                                                                                                                                                                   |
| `isDisabled`                                   | `boolean \| undefined`                                                              | no       | Disables the input so that it cannot be changed anymore                                                                                                                                                                                        |
| `maxHeight`                                    | `MaxHeight<string \| number> \| undefined`                                          | no       | Sets the maximum height of the input field.                                                                                                                                                                                                    |
| `onBlur`                                       | `FocusEventHandler<HTMLDivElement> \| undefined`                                    | no       | Function that is executed when the input field loses focus.                                                                                                                                                                                    |
| `onCursorPositionChange`                       | `((position: number) => void) \| undefined`                                         | no       | Function to be executed when the cursor position is changed.                                                                                                                                                                                   |
| `onFocus`                                      | `FocusEventHandler<HTMLDivElement> \| undefined`                                    | no       | Function that is executed when the input field gets the focus.                                                                                                                                                                                 |
| `onInput`                                      | `((event: ChangeEvent<HTMLDivElement>, originalText: string) => void) \| undefined` | no       | Function that is executed when the text of the input changes. In addition to the original<br />event, the original text is returned as second parameter, in which the internally used HTML<br />elements have been converted back to BB codes. |
| `onKeyDown`                                    | `KeyboardEventHandler<HTMLDivElement> \| undefined`                                 | no       | Function that is executed when a key is pressed down.                                                                                                                                                                                          |
| `onPopupVisibilityChange`                      | `((isVisible: boolean) => void) \| undefined`                                       | no       | Function that is executed when the visibility of the popup changes.                                                                                                                                                                            |
| `onPrefixElementRemove`                        | `(() => void) \| undefined`                                                         | no       | Function to be executed if the prefixElement is removed.                                                                                                                                                                                       |
| `personId`                                     | `string \| undefined`                                                               | no       | Person id of the logged-in user. Is needed to load and save the history of the emojis.                                                                                                                                                         |
| `placeholder`                                  | `string \| ReactElement<any, string \| JSXElementConstructor<any>> \| undefined`    | no       | Placeholder for the input field                                                                                                                                                                                                                |
| `popupAlignment`                               | `PopupAlignment \| undefined`                                                       | no       | Sets the alignment of the popup to a fixed value. If this value is not set, the component<br />calculates the best position on its own. Use the imported 'PopupAlignment' enum to set this<br />value.                                         |
| `prefixElement`                                | `string \| undefined`                                                               | no       | Element that is rendered before the input field but the placeholder is still visible.                                                                                                                                                          |
| `rightElement`                                 | `ReactNode`                                                                         | no       | Element that is rendered inside the EmojiInput on the right side.                                                                                                                                                                              |
| `shouldHidePlaceholderOnFocus`                 | `boolean \| undefined`                                                              | no       | Whether the placeholder should be shown after the input has focus.                                                                                                                                                                             |
| `shouldPreventEmojiPicker`                     | `boolean \| undefined`                                                              | no       | Prevents the EmojiPickerPopup icon from being displayed                                                                                                                                                                                        |
| `shouldRevertAsciiSmileyConversionOnBackspace` | `boolean \| undefined`                                                              | no       | Allows the most recently auto-converted ASCII smiley to be reverted with Backspace.                                                                                                                                                            |
| `value`                                        | `string`                                                                            | yes      | The plain text value of the input field. Instead of HTML elements BB codes must be used at<br />this point. These are then converted by the input field into corresponding HTML elements.                                                      |

### Types

- `PopupAlignment` ->
  `enum PopupAlignment {     TopLeft,     BottomLeft,     TopRight,     BottomRight, }`

### Usage Notes

- Import `EmojiInput` directly from `@chayns-components/emoji-input` instead of internal source
  paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.
- Pay special attention to required props: `value`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/emoji-input/src/...`; always use the
  public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.

## EmojiPicker

`EmojiPicker` is exported by `@chayns-components/emoji-input` and should be imported from the public
package entry point.

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

| name          | type                      | required | description                                                                               |
| ------------- | ------------------------- | -------- | ----------------------------------------------------------------------------------------- |
| `accessToken` | `string \| undefined`     | no       | Access token of the logged-in user. Is needed to load and save the history of the emojis. |
| `onSelect`    | `(emoji: string) => void` | yes      | Function executed when an emoji is selected in the popup                                  |
| `personId`    | `string \| undefined`     | no       | Person id of the logged-in user. Is needed to load and save the history of the emojis.    |

### Types

No additional exported types documented.

### Usage Notes

- Import `EmojiPicker` directly from `@chayns-components/emoji-input` instead of internal source
  paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.
- Pay special attention to required props: `onSelect`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/emoji-input/src/...`; always use the
  public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.

## EmojiPickerPopup

`EmojiPickerPopup` is exported by `@chayns-components/emoji-input` and should be imported from the
public package entry point.

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

| name                      | type                                          | required | description                                                                               |
| ------------------------- | --------------------------------------------- | -------- | ----------------------------------------------------------------------------------------- |
| `accessToken`             | `string \| undefined`                         | no       | Access token of the logged-in user. Is needed to load and save the history of the emojis. |
| `container`               | `Element \| undefined`                        | no       | The DOM element that should receive the popup portal.                                     |
| `onPopupVisibilityChange` | `((isVisible: boolean) => void) \| undefined` | no       | Function that is executed when the visibility of the popup changes.                       |
| `onSelect`                | `(emoji: string) => void`                     | yes      | Function executed when an emoji is selected in the popup                                  |
| `personId`                | `string \| undefined`                         | no       | Person id of the logged-in user. Is needed to load and save the history of the emojis.    |

### Types

No additional exported types documented.

### Usage Notes

- Import `EmojiPickerPopup` directly from `@chayns-components/emoji-input` instead of internal
  source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.
- Pay special attention to required props: `onSelect`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/emoji-input/src/...`; always use the
  public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
