# @chayns-components/communication

React component package providing 10 documented components for chayns applications.

Documented components: `AudioInput`, `CommunicationButton`, `CommunicationContent`,
`CommunicationFileList`, `CommunicationHeader`, `CommunicationInput`, `CommunicationList`,
`CommunicationMessage`, `CommunicationTeamTalkHeader`, `SocialPlugin`.

## Import

```ts
import {
    AudioInput,
    CommunicationButton,
    CommunicationContent,
} from '@chayns-components/communication';
```

## Typical Usage

```tsx
<AudioInput />
```

## Components

- `AudioInput`
- `CommunicationButton`
- `CommunicationContent`
- `CommunicationFileList`
- `CommunicationHeader`
- `CommunicationInput`
- `CommunicationList`
- `CommunicationMessage`
- `CommunicationTeamTalkHeader`
- `SocialPlugin`

## AudioInput

`AudioInput` is exported by `@chayns-components/communication` and should be imported from the
public package entry point.

### Import

```ts
import { AudioInput } from '@chayns-components/communication';
```

### Examples

#### General

```tsx
<AudioInput />
```

### Props

| name           | type                                           | required | description                                             |
| -------------- | ---------------------------------------------- | -------- | ------------------------------------------------------- |
| `isMuted`      | `boolean \| undefined`                         | no       | Controls whether the microphone is currently muted.     |
| `onError`      | `((error: unknown) => void) \| undefined`      | no       | Called when microphone access or recording setup fails. |
| `onMuteChange` | `((isMuted: boolean) => void) \| undefined`    | no       | Called when the mute state should change.               |
| `onStart`      | `((stream: MediaStream) => void) \| undefined` | no       | Called after recording starts successfully.             |
| `onStop`       | `(() => void) \| undefined`                    | no       | Called after the active recording has been stopped.     |
| `position`     | `AudioInputPosition \| undefined`              | no       | Horizontal alignment of the expandable audio input.     |
| `size`         | `CommunicationInputSize \| undefined`          | no       | Size variant shared with the communication input.       |
| `styleConfig`  | `AudioInputStyleConfig \| undefined`           | no       | Visual configuration of the audio input button.         |

### Types

- `AudioInputPosition` ->
  `enum AudioInputPosition {     LEFT = 'left',     CENTER = 'center',     RIGHT = 'right', }`
- `AudioInputStyleConfig` ->
  `interface AudioInputStyleConfig {     /**      * Background color of the audio input button.      * @description      * Overrides the default primary background while the control is idle and expanded.      * @optional      */     backgroundColor?: string;     /**      * Icon and waveform color of the audio input.      * @description      * Applies to the microphone icon, stop icon, and the waveform visualization.      * @optional      */     color?: string; }`
- `CommunicationInputSize` ->
  `enum CommunicationInputSize {     SMALL = 'SMALL',     MEDIUM = 'MEDIUM', }`

### Usage Notes

- Import `AudioInput` directly from `@chayns-components/communication` instead of internal source
  paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/communication/src/...`; always use
  the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.

## CommunicationButton

`CommunicationButton` is exported by `@chayns-components/communication` and should be imported from
the public package entry point.

### Import

```ts
import { CommunicationButton } from '@chayns-components/communication';
```

### Examples

#### General

```tsx
<CommunicationButton icons={['fa fa-thumbs-up']} iconColor={'white'} />
```

#### With Agent

```tsx
<CommunicationButton icons={['fa fa-thumbs-up']} iconColor={'white'} personId={'TKT-EEV5Q'} />
```

### Props

| name                   | type                                  | required | description                                                        |
| ---------------------- | ------------------------------------- | -------- | ------------------------------------------------------------------ |
| `className`            | `string \| undefined`                 | no       | Additional class name applied to the button root element.          |
| `iconColor`            | `string \| undefined`                 | no       | Color of the rendered icon.                                        |
| `icons`                | `string[]`                            | yes      | Icon class names rendered inside the button.                       |
| `isDisabled`           | `boolean \| undefined`                | no       | Disables the button and prevents clicks.                           |
| `onClick`              | `(() => void) \| undefined`           | no       | Called when the button is pressed.                                 |
| `personId`             | `string \| undefined`                 | no       | Optional person ID used to show a profile image inside the button. |
| `shouldFillBackground` | `boolean \| undefined`                | no       | Controls whether the button uses a filled background style.        |
| `size`                 | `CommunicationInputSize \| undefined` | no       | Size variant shared with the communication input.                  |

### Types

- `CommunicationInputSize` ->
  `enum CommunicationInputSize {     SMALL = 'SMALL',     MEDIUM = 'MEDIUM', }`

### Usage Notes

- Import `CommunicationButton` directly from `@chayns-components/communication` instead of internal
  source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.
- Pay special attention to required props: `icons`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/communication/src/...`; always use
  the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.

## CommunicationContent

`CommunicationContent` is exported by `@chayns-components/communication` and should be imported from
the public package entry point.

### Import

```ts
import { CommunicationContent } from '@chayns-components/communication';
```

### Examples

#### General

```tsx
<CommunicationContent
    content={<div style={{ width: '100%', height: '100%', backgroundColor: 'blue' }} />}
    shouldShowContent
    breakPoint={200}
>
    {<div style={{ width: '100%', height: '400px', backgroundColor: 'red' }} />}
</CommunicationContent>
```

#### Mobile

```tsx
<CommunicationContent
    content={<div style={{ width: '100%', height: '100%', backgroundColor: 'blue' }} />}
    shouldShowContent
    breakPoint={1000}
>
    {<div style={{ width: '100%', height: '400px', backgroundColor: 'red' }} />}
</CommunicationContent>
```

### Props

| name                   | type                                     | required | description                                                                |
| ---------------------- | ---------------------------------------- | -------- | -------------------------------------------------------------------------- |
| `breakPoint`           | `number \| undefined`                    | no       | Width in pixels below which the detail content is displayed as an overlay. |
| `children`             | `ReactNode`                              | yes      | Primary area, for example a communication list or main view.               |
| `content`              | `ReactNode`                              | yes      | Detail content that is shown either as a side panel or as an overlay.      |
| `onDragEnd`            | `((width: number) => void) \| undefined` | no       | Callback fired after finishing a resize drag on the side panel.            |
| `overlayContentConfig` | `OverlayContentConfig \| undefined`      | no       | Configuration for the mobile overlay.                                      |
| `shouldShowContent`    | `boolean \| undefined`                   | no       | Determines whether the detail content should be visible.                   |
| `sideContentConfig`    | `SideContentConfig \| undefined`         | no       | Configuration for the desktop side panel.                                  |

### Types

No additional exported types documented.

### Usage Notes

- Import `CommunicationContent` directly from `@chayns-components/communication` instead of internal
  source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.
- Pay special attention to required props: `children`, `content`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/communication/src/...`; always use
  the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.

## CommunicationFileList

`CommunicationFileList` is exported by `@chayns-components/communication` and should be imported
from the public package entry point.

### Import

```ts
import { CommunicationFileList } from '@chayns-components/communication';
```

### Examples

#### General

```tsx
<CommunicationFileList />
```

### Props

| name       | type                                                                | required | description               |
| ---------- | ------------------------------------------------------------------- | -------- | ------------------------- |
| `files`    | `(CommunicationFile \| CommunicationVideo \| CommunicationImage)[]` | yes      | No description available. |
| `onRemove` | `((fileId: string) => void) \| undefined`                           | no       | No description available. |
| `size`     | `CommunicationInputSize \| undefined`                               | no       | No description available. |

### Types

- `CommunicationFile` ->
  `interface CommunicationFile extends BaseCommunicationFile {     type: 'file';     mimeType: string;     name?: string;     size: number; }`
- `CommunicationImage` ->
  `interface CommunicationImage extends BaseCommunicationFile {     type: 'image';     thumbnail: string; }`
- `CommunicationInputSize` ->
  `enum CommunicationInputSize {     SMALL = 'SMALL',     MEDIUM = 'MEDIUM', }`
- `CommunicationVideo` ->
  `interface CommunicationVideo extends BaseCommunicationFile {     type: 'video';     thumbnail: string; }`

### Usage Notes

- Import `CommunicationFileList` directly from `@chayns-components/communication` instead of
  internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.
- Pay special attention to required props: `files`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/communication/src/...`; always use
  the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.

## CommunicationHeader

`CommunicationHeader` is exported by `@chayns-components/communication` and should be imported from
the public package entry point.

### Import

```ts
import { CommunicationHeader } from '@chayns-components/communication';
```

### Examples

#### General

```tsx
<CommunicationHeader
    title={'Lorem Ipsum'}
    from={{
        id: 'MIC-HAEL1',
        name: 'Michael Gesenhues',
        actions: [{ icons: ['fa fa-pen'], label: 'Email schreiben', onClick: () => {} }],
    }}
    to={[
        {
            id: 'JAN-NIK96',
            name: 'Jannik Weise',
            actions: [
                { icons: ['fa fa-pen'], label: 'Email schreiben', onClick: () => {} },
                { icons: ['fa fa-copy'], label: 'Email kopieren', onClick: () => {} },
            ],
        },
    ]}
    cc={[
        {
            id: '131-99998',
            name: 'Luca Jesußek',
            actions: [{ icons: ['fa fa-pen'], label: 'Email schreiben', onClick: () => {} }],
        },
    ]}
    rightActions={[
        {
            id: 'print',
            label: 'Drucken',
            onClick: () => {},
            icons: ['fa fa-print'],
        },
        {
            id: 'delete',
            label: 'Löschen',
            onClick: () => {},
            icons: ['fa fa-trash'],
        },
        {
            id: 'reply',
            label: 'Antworten',
            onClick: () => {},
            icons: ['fa fa-arrow-left'],
        },
        {
            id: 'attachments',
            label: 'Anhänge',
            contextMenuItems: [
                {
                    icons: ['fa fa-file'],
                    text: 'image.png',
                    key: 'sfetsg',
                    onClick: () => {},
                },
            ],
            onClick: () => {},
            icons: ['fa fa-paperclip'],
        },
    ]}
    date={'2026-04-24T13:23:01.087Z'}
/>
```

### Props

| name                 | type                                                 | required | description                                                                            |
| -------------------- | ---------------------------------------------------- | -------- | -------------------------------------------------------------------------------------- |
| `cc`                 | `Member[] \| undefined`                              | no       | Optional CC recipients that should also be displayed.                                  |
| `date`               | `string`                                             | yes      | ISO date or other parseable timestamp of the message.                                  |
| `from`               | `Member`                                             | yes      | Sender of the communication.                                                           |
| `isFullScreen`       | `boolean \| undefined`                               | no       | Controls whether the detail view is currently shown in fullscreen mode.                |
| `isLoading`          | `boolean \| undefined`                               | no       | Displays loading skeletons instead of the regular header content.                      |
| `isRead`             | `boolean`                                            | yes      | Indicates whether the communication is marked as read.                                 |
| `isTeamTalkActive`   | `boolean \| undefined`                               | no       | Marks the TeamTalk state of the communication.                                         |
| `maxActionCount`     | `number \| undefined`                                | no       | Limits the number of visible actions on the right side before using the overflow menu. |
| `onFullScreenToggle` | `((isFullscreen: boolean) => void) \| undefined`     | no       | Called when the fullscreen state should be toggled.                                    |
| `onReadToggle`       | `(isRead: boolean) => void`                          | yes      | Called when the read state should change.                                              |
| `onTeamTalkToggle`   | `((isTeamTalkActive: boolean) => void) \| undefined` | no       | Called when the TeamTalk state should be toggled.                                      |
| `rightActions`       | `Action[]`                                           | yes      | Actions rendered on the right side of the header.                                      |
| `title`              | `string`                                             | yes      | Subject or title of the currently opened communication.                                |
| `to`                 | `Member[]`                                           | yes      | Primary recipients of the communication.                                               |

### Types

- `Action` ->
  `interface Action {     /**      * Unique identifier of the action.      * @description      * Used to distinguish actions and to create stable React keys.      * The value should be unique within the rendered action set.      */     id: string;     /**      * Human-readable label of the action.      * @description      * Provides the text shown in tooltips, menus, or accessibility-related UI.      * Choose a concise label that clearly communicates the action.      */     label: string;     /**      * List of icon class names to render for the action.      * @description      * Defines one or more icons that visually represent the action.      * The icons are rendered in the order provided.      */     icons: string[];     /**      * Click handler of the action.      * @description      * Invoked when the user executes the action directly.      * Use this to trigger the associated business logic.      */     onClick: VoidFunction;     /**      * Optional context menu items for sub-actions or attachments.      * @description      * Adds a context menu to the action for grouped actions or secondary choices.      * This is useful for attachments, variants, or overflow behavior.      * @optional      */     contextMenuItems?: ContextMenuItem[];     /**      * Disables the action and prevents user interaction.      * @description      * Marks the action as unavailable while keeping it visible in the UI.      * Disabled actions should not execute their click handler.      * @optional      */     isDisabled?: boolean; }`
- `Member` ->
  `interface Member {     /**      * Unique identifier of the person.      * @description      * Used to distinguish members within the communication metadata.      * The identifier should stay stable across renders.      */     id: string;     /**      * Display name of the person.      * @description      * Defines the visible name shown in the sender or recipient list.      * This should be a user-friendly label.      */     name: string;     /**      * Available quick actions for this person.      * @description      * Provides interaction options related to the member, such as composing an email.      * These actions are typically shown in a contextual menu or popover.      */     actions: MemberAction[]; }`

### Usage Notes

- Import `CommunicationHeader` directly from `@chayns-components/communication` instead of internal
  source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.
- Pay special attention to required props: `date`, `from`, `isRead`, `onReadToggle`, `rightActions`,
  `title`, `to`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/communication/src/...`; always use
  the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.

## CommunicationInput

`CommunicationInput` is exported by `@chayns-components/communication` and should be imported from
the public package entry point.

### Import

```ts
import { CommunicationInput, Icon } from '@chayns-components/communication';
```

### Examples

#### Small

```tsx
<CommunicationInput
    placeholder={'Nachricht schreiben'}
    contextMenuItems={[{ key: 'copy', text: 'Copy', onClick: () => {}, icons: ['fa fa-copy'] }]}
    size={CommunicationInputSize.SMALL}
    rightElement={<Icon icons={['fa fa-paper-plane']} />}
/>
```

#### General

```tsx
<CommunicationInput
    placeholder={'Nachricht schreiben'}
    contextMenuItems={[{ key: 'copy', text: 'Copy', onClick: () => {}, icons: ['fa fa-copy'] }]}
    rightElement={null}
/>
```

#### With Chips

```tsx
<CommunicationInput
    placeholder={'Nachricht schreiben'}
    contextMenuItems={[{ key: 'copy', text: 'Copy', onClick: () => {}, icons: ['fa fa-copy'] }]}
    chips={[
        {
            label: 'Details',
            onClick: () => {},
        },
        {
            label: 'Offene Punkte',
            onClick: () => {},
        },
        {
            label: 'Statements',
            onClick: () => {},
        },
        {
            label: 'Stimmungsanalyse',
            onClick: () => {},
        },
        {
            label: 'Stimme zu!',
            onClick: () => {},
        },
    ]}
    rightElement={<Icon icons={['fa fa-paper-plane']} />}
/>
```

#### With Content

```tsx
<CommunicationInput
    placeholder={'Nachricht schreiben'}
    contextMenuItems={[{ key: 'copy', text: 'Copy', onClick: () => {}, icons: ['fa fa-copy'] }]}
    chips={[
        {
            icons: ['fa fa-file'],
            label: 'Anhänge',
            onRemove: () => {},
        },
    ]}
    topContent={
        <div style={{ padding: '6px', height: 50, backgroundColor: 'lightblue' }}>
            Hier wird super Content angezeigt
        </div>
    }
    rightElement={<Icon icons={['fa fa-paper-plane']} />}
/>
```

#### With Animation

```tsx
<CommunicationInput
    placeholder={'Nachricht schreiben'}
    contextMenuItems={[{ key: 'copy', text: 'Copy', onClick: () => {}, icons: ['fa fa-copy'] }]}
    shouldUseInitialAnimation
/>
```

#### With Audio Input

```tsx
<CommunicationInput
    placeholder={'Nachricht schreiben'}
    contextMenuItems={[{ key: 'copy', text: 'Copy', onClick: () => {}, icons: ['fa fa-copy'] }]}
    shouldUseAudioInput
    rightElement={<Icon icons={['fa fa-paper-plane']} />}
/>
```

#### Down Direction

```tsx
<CommunicationInput
    placeholder={'Nachricht schreiben'}
    contextMenuItems={[{ key: 'copy', text: 'Copy', onClick: () => {}, icons: ['fa fa-copy'] }]}
/>
```

#### With Rounded Corners

```tsx
<CommunicationInput
    placeholder={'Nachricht schreiben'}
    contextMenuItems={[{ key: 'copy', text: 'Copy', onClick: () => {}, icons: ['fa fa-copy'] }]}
    cornerType={CommunicationInputCornerType.ROUNDED}
    rightElement={<Icon icons={['fa fa-paper-plane']} />}
/>
```

#### Dynamic Scroll

```tsx
<CommunicationInput
    placeholder={'Nachricht schreiben'}
    contextMenuItems={[{ key: 'copy', text: 'Copy', onClick: () => {}, icons: ['fa fa-copy'] }]}
/>
```

### Props

| name                        | type                                        | required | description                                                                     |
| --------------------------- | ------------------------------------------- | -------- | ------------------------------------------------------------------------------- |
| `audioInputConfig`          | `AudioInputProps \| undefined`              | no       | Configuration passed to the optional audio input control.                       |
| `chips`                     | `Chip[] \| undefined`                       | no       | Optional chips rendered together with the input.                                |
| `contextMenuItems`          | `ContextMenuItem[] \| undefined`            | no       | Context menu items opened from the leading plus button.                         |
| `cornerType`                | `CommunicationInputCornerType \| undefined` | no       | Border radius behavior of the input container.                                  |
| `direction`                 | `CommunicationInputDirection \| undefined`  | no       | Controls where the input expands when its size increases.                       |
| `inputConfig`               | `EmojiInputProps`                           | yes      | Configuration passed directly to the underlying `EmojiInput`.                   |
| `rightElement`              | `ReactNode`                                 | no       | Element rendered on the right side of the input.                                |
| `scrollContainerRef`        | `RefObject<HTMLElement> \| undefined`       | no       | Reference to the scrollable container that this component should interact with. |
| `shouldDisableFullHeight`   | `boolean \| undefined`                      | no       | Disables the full height toggle of the input.                                   |
| `shouldUseAudioInput`       | `boolean \| undefined`                      | no       | Enables the audio input button next to the editor.                              |
| `shouldUseInitialAnimation` | `boolean \| undefined`                      | no       | Enables the initial reveal animation of the input.                              |
| `size`                      | `CommunicationInputSize \| undefined`       | no       | Size variant of the composed communication input.                               |
| `topContent`                | `ReactNode`                                 | no       | Content rendered above the input layout.                                        |

### Types

- `Chip` ->
  `interface Chip {     /**      * Visible label of the chip.      * @description      * Describes the chip content or action in a short, user-friendly form.      */     label: string;     /**      * Optional icon class names rendered inside the chip.      * @description      * Use icons to visually distinguish chip types such as files or suggestions.      * @optional      */     icons?: string[];     /**      * Called when the chip should be removed.      * @description      * Provide this to render a removable chip with a dedicated remove action.      * @optional      */     onRemove?: () => void;     /**      * Called when the chip itself is clicked.      * @description      * Use this for suggestion chips or contextual actions that should stay visible after interaction.      * @optional      */     onClick?: () => void; }`
- `CommunicationInputCornerType` ->
  `enum CommunicationInputCornerType {     DYNAMIC = 'DYNAMIC',     ROUNDED = 'ROUNDED',     ROUND = 'ROUND', }`
- `CommunicationInputDirection` ->
  `enum CommunicationInputDirection {     TOP = 'TOP',     BOTTOM = 'BOTTOM', }`
- `CommunicationInputSize` ->
  `enum CommunicationInputSize {     SMALL = 'SMALL',     MEDIUM = 'MEDIUM', }`

### Usage Notes

- Import `CommunicationInput` directly from `@chayns-components/communication` instead of internal
  source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.
- Pay special attention to required props: `inputConfig`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/communication/src/...`; always use
  the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.

## CommunicationList

`CommunicationList` is exported by `@chayns-components/communication` and should be imported from
the public package entry point.

### Import

```ts
import { CommunicationList, ListItem } from '@chayns-components/communication';
```

### Examples

#### General

```tsx
<CommunicationList
    items={[]}
    emptyMessage={'Keine Ergebnisse gefunden.'}
    itemRenderer={(_index, id) => {
        const item = ALL_ITEMS.find((item) => item.id === id);

        if (!item) {
            return null;
        }

        return (
            <ListItem
                key={id}
                title={item.title}
                subtitle={item.subtitle}
                icons={['fa fa-user']}
                shouldDisableAnimation
                shouldShowRoundImageOrIcon
            />
        );
    }}
/>
```

#### Alphabetic

```tsx
<CommunicationList
    items={[
        {
            id: '1',
            sortKey: 'Anton',
        },
        {
            id: '2',
            sortKey: 'Xaver',
        },
        {
            id: '3',
            sortKey: 'Gustav',
        },
        {
            id: '4',
            sortKey: 'Clara',
        },
        {
            id: '5',
            sortKey: 'Thomas',
        },
        {
            id: '6',
            sortKey: 'Bernd',
        },
    ]}
    emptyMessage={'Keine Ergebnisse gefunden.'}
    itemRenderer={(_index, id) => {
        const item = ALL_ITEMS.find((item) => item.id === id);

        if (!item) {
            return null;
        }

        return (
            <ListItem
                key={id}
                title={item.title}
                subtitle={item.subtitle}
                icons={['fa fa-user']}
                shouldDisableAnimation
                shouldShowRoundImageOrIcon
            />
        );
    }}
    sortType={SortType.ALPHABETIC}
/>
```

#### Date Sort

```tsx
<CommunicationList
    items={[
        {
            id: '7',
            sortKey: getDateWithOffset(0, 9, 15),
        },
        {
            id: '8',
            sortKey: getDateWithOffset(0, 14, 45),
        },
        {
            id: '9',
            sortKey: getDateWithOffset(-1, 11, 30),
        },
        {
            id: '10',
            sortKey: getDateWithOffset(-1, 18, 5),
        },
        {
            id: '11',
            sortKey: getDateWithOffset(-3, 8, 0),
        },
        {
            id: '12',
            sortKey: getDateWithOffset(-6, 16, 20),
        },
        {
            id: '13',
            sortKey: getDateWithOffset(-10, 12, 0),
        },
        {
            id: '14',
            sortKey: getDateWithOffset(-18, 10, 0),
        },
    ]}
    emptyMessage={'Keine Ergebnisse gefunden.'}
    itemRenderer={(_index, id) => {
        const item = ALL_ITEMS.find((item) => item.id === id);

        if (!item) {
            return null;
        }

        return (
            <ListItem
                key={id}
                title={item.title}
                subtitle={item.subtitle}
                icons={['fa fa-user']}
                shouldDisableAnimation
                shouldShowRoundImageOrIcon
            />
        );
    }}
    sortType={SortType.DATE}
/>
```

### Props

| name           | type                                       | required | description                                                                  |
| -------------- | ------------------------------------------ | -------- | ---------------------------------------------------------------------------- |
| `emptyMessage` | `string`                                   | yes      | Message shown when the list is empty.                                        |
| `isLoading`    | `boolean \| undefined`                     | no       | Enables skeleton items and optional loading behavior at the end of the list. |
| `itemRenderer` | `(index: number, id: string) => ReactNode` | yes      | Renders a list item based on its ID.                                         |
| `items`        | `CommunicationListItem[]`                  | yes      | Raw list data that is transformed into concrete UI items by the renderer.    |
| `onLoadMore`   | `VoidFunction \| undefined`                | no       | Called when the end of the virtualized list is reached.                      |
| `sortType`     | `SortType \| undefined`                    | no       | Determines how the items are grouped and sorted.                             |

### Types

- `CommunicationListItem` ->
  `interface CommunicationListItem {     /**      * Unique identifier of the item passed to the renderer.      * @description      * Used to map display entries back to their actual content.      * The value should stay stable across renders.      */     id: string;     /**      * Sorting or grouping key, for example a name or ISO date.      * @description      * The meaning of this value depends on the selected `sortType`.      * For date sorting, provide a parseable timestamp; for alphabetic sorting, provide a label-like value.      */     sortKey: string; }`
- `SortType` -> `enum SortType {     ALPHABETIC = 'ALPHABETIC',     DATE = 'DATE', }`

### Usage Notes

- Import `CommunicationList` directly from `@chayns-components/communication` instead of internal
  source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.
- Pay special attention to required props: `emptyMessage`, `itemRenderer`, `items`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/communication/src/...`; always use
  the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.

## CommunicationMessage

`CommunicationMessage` is exported by `@chayns-components/communication` and should be imported from
the public package entry point.

### Import

```ts
import { CommunicationMessage } from '@chayns-components/communication';
```

### Examples

#### System Message

```tsx
<CommunicationMessage
    metadata={{
        id: 'message',
        status: CommunicationMessageStatus.DELIVERED,
        author: {
            name: 'Michael Gesenhues',
            id: 'MIC-HEAL1',
            imageUrl: 'https://tsimg.cloud/MIC-HAEL1/profile_w200-h200.png',
        },
        creationTime: new Date().toISOString(),
    }}
    alignment={CommunicationMessageAlignment.RIGHT}
    content={'Michael Gesenhues hat Jannik Weise hinzugefügt'}
/>
```

#### Date Message

```tsx
<CommunicationMessage
    metadata={{
        id: 'message',
        status: CommunicationMessageStatus.DELIVERED,
        author: {
            name: 'Michael Gesenhues',
            id: 'MIC-HEAL1',
            imageUrl: 'https://tsimg.cloud/MIC-HAEL1/profile_w200-h200.png',
        },
        creationTime: new Date().toISOString(),
    }}
    alignment={CommunicationMessageAlignment.RIGHT}
    date={new Date().toISOString()}
/>
```

#### Plugin Message

```tsx
<CommunicationMessage
    metadata={{
        id: 'message',
        status: CommunicationMessageStatus.DELIVERED,
        author: {
            name: 'Michael Gesenhues',
            id: 'MIC-HEAL1',
            imageUrl: 'https://tsimg.cloud/MIC-HAEL1/profile_w200-h200.png',
        },
        creationTime: new Date().toISOString(),
    }}
    alignment={CommunicationMessageAlignment.RIGHT}
    content={
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                color: 'white',
                fontFamily: 'sans-serif',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                }}
            >
                <img
                    src="https://tsimg.cloud/JAN-NIK96/profile_w200-h200.png"
                    alt=""
                    style={{
                        width: 40,
                        height: 40,
                        objectFit: 'cover',
                    }}
                />
                <span
                    style={{
                        fontSize: 24,
                    }}
                >
                    →
                </span>
                <img
                    src="https://tsimg.cloud/MIC-HAEL1/profile_w200-h200.png"
                    alt=""
                    style={{
                        width: 40,
                        height: 40,
                        objectFit: 'cover',
                    }}
                />
            </div>
            <div
                style={{
                    fontSize: 24,
                    fontWeight: 600,
                }}
            >
                1,00 €
            </div>
            <div
                style={{
                    fontSize: 14,
                }}
            >
                Test-Buchung
            </div>
        </div>
    }
/>
```

#### Text Message

```tsx
<CommunicationMessage
    metadata={{
        id: 'message',
        status: CommunicationMessageStatus.DELIVERED,
        author: {
            name: 'Michael Gesenhues',
            id: 'MIC-HEAL1',
            imageUrl: 'https://tsimg.cloud/MIC-HAEL1/profile_w200-h200.png',
        },
        creationTime: new Date().toISOString(),
    }}
    alignment={CommunicationMessageAlignment.RIGHT}
    options={[
        {
            key: 'delete',
            icons: ['fa fa-trash'],
            text: 'Löschen',
            onClick: () => {},
        },
    ]}
    content={
        <div>
            <CommunicationMessage.Preview
                metadata={{
                    id: 'message',
                    status: CommunicationMessageStatus.DELIVERED,
                    author: {
                        name: 'Jannik Weise',
                        id: 'JAN-NIK96',
                        imageUrl: 'https://tsimg.cloud/JAN-NIK96/profile_w200-h200.png',
                    },
                    plainText: 'An dieser Stelle würde ich einen Context benutzen.',
                    creationTime: new Date().toISOString(),
                }}
                onClick={() => {}}
            />
            <p>Ja stimmt. Das ist hier die bessere Wahl. 👍</p>
        </div>
    }
/>
```

#### Deleted Message

```tsx
<CommunicationMessage
    metadata={{
        id: 'message',
        status: CommunicationMessageStatus.DELIVERED,
        author: {
            name: 'Michael Gesenhues',
            id: 'MIC-HEAL1',
            imageUrl: 'https://tsimg.cloud/MIC-HAEL1/profile_w200-h200.png',
        },
        creationTime: new Date().toISOString(),
        deletionTime: new Date().toISOString(),
    }}
    alignment={CommunicationMessageAlignment.RIGHT}
/>
```

#### Agree Message

```tsx
<CommunicationMessage
    metadata={{
        id: 'message',
        status: CommunicationMessageStatus.DELIVERED,
        author: {
            name: 'Michael Gesenhues',
            id: 'MIC-HEAL1',
            imageUrl: 'https://tsimg.cloud/MIC-HAEL1/profile_w200-h200.png',
        },
        creationTime: new Date().toISOString(),
    }}
    alignment={CommunicationMessageAlignment.RIGHT}
/>
```

#### Preview Message

```tsx
<CommunicationMessage
    metadata={{
        id: 'message',
        status: CommunicationMessageStatus.DELIVERED,
        author: {
            name: 'Michael Gesenhues',
            id: 'MIC-HEAL1',
            imageUrl: 'https://tsimg.cloud/MIC-HAEL1/profile_w200-h200.png',
        },
        creationTime: new Date().toISOString(),
    }}
    alignment={CommunicationMessageAlignment.RIGHT}
    onClick={() => {}}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `CommunicationMessage` directly from `@chayns-components/communication` instead of internal
  source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/communication/src/...`; always use
  the public package export.

## CommunicationTeamTalkHeader

`CommunicationTeamTalkHeader` is exported by `@chayns-components/communication` and should be
imported from the public package entry point.

### Import

```ts
import { CommunicationTeamTalkHeader } from '@chayns-components/communication';
```

### Examples

#### General

```tsx
<CommunicationTeamTalkHeader />
```

### Props

| name                     | type                        | required | description               |
| ------------------------ | --------------------------- | -------- | ------------------------- |
| `isAgreeDisabled`        | `boolean \| undefined`      | no       | No description available. |
| `isInputDisabled`        | `boolean \| undefined`      | no       | No description available. |
| `onAdd`                  | `VoidFunction \| undefined` | no       | No description available. |
| `onAgree`                | `VoidFunction`              | yes      | No description available. |
| `onChange`               | `(value: string) => void`   | yes      | No description available. |
| `onLeave`                | `VoidFunction \| undefined` | no       | No description available. |
| `onSend`                 | `VoidFunction`              | yes      | No description available. |
| `shouldShowInternalHint` | `boolean \| undefined`      | no       | No description available. |
| `value`                  | `string`                    | yes      | No description available. |

### Types

No additional exported types documented.

### Usage Notes

- Import `CommunicationTeamTalkHeader` directly from `@chayns-components/communication` instead of
  internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.
- Pay special attention to required props: `onAgree`, `onChange`, `onSend`, `value`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/communication/src/...`; always use
  the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.

## SocialPlugin

`SocialPlugin` is exported by `@chayns-components/communication` and should be imported from the
public package entry point.

### Import

```ts
import { SocialPlugin } from '@chayns-components/communication';
```

### Examples

#### General

```tsx
<SocialPlugin commentType={5} postingId={'787cb5d13e8b43d98347a012b3eab261'} />
```

### Props

| name          | type     | required | description               |
| ------------- | -------- | -------- | ------------------------- |
| `commentType` | `number` | yes      | No description available. |
| `link`        | `string` | yes      | No description available. |
| `postingId`   | `string` | yes      | No description available. |

### Types

No additional exported types documented.

### Usage Notes

- Import `SocialPlugin` directly from `@chayns-components/communication` instead of internal source
  paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.
- Pay special attention to required props: `commentType`, `link`, `postingId`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/communication/src/...`; always use
  the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
