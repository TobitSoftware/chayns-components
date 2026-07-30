# @chayns-components/navigation

React component package providing `DynamicToolbar` for chayns applications.

Documented components: `DynamicToolbar`.

## Import

```ts
import { DynamicToolbar } from '@chayns-components/navigation';
```

## Typical Usage

```tsx
<DynamicToolbar
    activeItemId={'chat'}
    items={[
        { id: 'sidekick', icons: ['ts-sidekick'], label: 'Sidekick', hasRightSeparator: true },
        { id: 'chat', icons: ['ts-chat'], label: 'Chat' },
        { id: 'witness', icons: ['fa fa-microphone'], label: 'Gespräche', badgeCount: 7 },
        { id: 'frontline', icons: ['fa fa-user-question'], label: 'Anfragen' },
        { id: 'notifications', icons: ['fa fa-bell'], label: 'Benachrichtigungen', badgeCount: 28 },
        { id: 'tasks', icons: ['fa fa-check-circle'], label: 'Aufgaben' },
        { id: 'settings', icons: ['fa fa-cog'], label: 'Einstellungen' },
    ]}
    layout={DynamicToolbarLayout.Floating}
    onItemSelect={action('onItemSelect')}
/>
```

## DynamicToolbar

Die DynamicToolbar blendet Aktionen je nach Breite automatisch aus, gruppiert sie im Overflow-Menü
und lässt sich zwischen Floating- und Area-Layout umschalten.

### Import

```ts
import { DynamicToolbar } from '@chayns-components/navigation';
```

### Examples

#### Floating Basic Layout

```tsx
<DynamicToolbar
    activeItemId={'chat'}
    items={[
        { id: 'sidekick', icons: ['ts-sidekick'], label: 'Sidekick', hasRightSeparator: true },
        { id: 'chat', icons: ['ts-chat'], label: 'Chat' },
        { id: 'witness', icons: ['fa fa-microphone'], label: 'Gespräche', badgeCount: 7 },
        { id: 'frontline', icons: ['fa fa-user-question'], label: 'Anfragen' },
        { id: 'notifications', icons: ['fa fa-bell'], label: 'Benachrichtigungen', badgeCount: 28 },
        { id: 'tasks', icons: ['fa fa-check-circle'], label: 'Aufgaben' },
        { id: 'settings', icons: ['fa fa-cog'], label: 'Einstellungen' },
    ]}
    layout={DynamicToolbarLayout.Floating}
    onItemSelect={action('onItemSelect')}
/>
```

#### Floating Scanner Layout

```tsx
<DynamicToolbar
    activeItemId={'chat'}
    items={[
        { id: 'chayns', icons: ['ts-chayns'], label: 'chayns' },
        { id: 'chat', icons: ['ts-chat'], label: 'Chat', badgeCount: 19 },
        { id: 'sidekick', icons: ['ts-sidekick-chat'], label: 'Sidekick' },
        { id: 'cards', icons: ['fa fa-rectangle-history'], label: 'Cards' },
        { id: 'id', icons: ['ts-fingerprint'], label: 'ID' },
        { id: 'money', icons: ['fa fa-euro-sign'], label: 'Geld', badgeCount: 5 },
        { id: 'space', icons: ['ts-space'], label: 'Space', isDisabled: true },
        { id: 'pages', icons: ['fa fa-list'], label: 'Pages' },
        { id: 'settings', icons: ['fa fa-cog'], label: 'Einstellungen' },
        { id: 'map', icons: ['fa fa-circle-location-arrow'], label: 'Map' },
    ]}
    layout={DynamicToolbarLayout.Floating}
    onItemSelect={action('onItemSelect')}
/>
```

#### Flush Basic Layout

```tsx
<DynamicToolbar
    activeItemId={'chat'}
    items={[
        { id: 'sidekick', icons: ['ts-sidekick'], label: 'Sidekick', hasRightSeparator: true },
        { id: 'chat', icons: ['ts-chat'], label: 'Chat' },
        { id: 'witness', icons: ['fa fa-microphone'], label: 'Gespräche', badgeCount: 7 },
        { id: 'frontline', icons: ['fa fa-user-question'], label: 'Anfragen' },
        { id: 'notifications', icons: ['fa fa-bell'], label: 'Benachrichtigungen', badgeCount: 28 },
        { id: 'tasks', icons: ['fa fa-check-circle'], label: 'Aufgaben' },
        { id: 'settings', icons: ['fa fa-cog'], label: 'Einstellungen' },
    ]}
    layout={DynamicToolbarLayout.Area}
    onItemSelect={action('onItemSelect')}
/>
```

#### Flush Scanner Layout

```tsx
<DynamicToolbar
    activeItemId={'chat'}
    items={[
        { id: 'chayns', icons: ['ts-chayns'], label: 'chayns' },
        { id: 'chat', icons: ['ts-chat'], label: 'Chat', badgeCount: 19 },
        { id: 'sidekick', icons: ['ts-sidekick-chat'], label: 'Sidekick' },
        { id: 'cards', icons: ['fa fa-rectangle-history'], label: 'Cards' },
        { id: 'id', icons: ['ts-fingerprint'], label: 'ID' },
        { id: 'money', icons: ['fa fa-euro-sign'], label: 'Geld', badgeCount: 5 },
        { id: 'space', icons: ['ts-space'], label: 'Space', isDisabled: true },
        { id: 'pages', icons: ['fa fa-list'], label: 'Pages' },
        { id: 'settings', icons: ['fa fa-cog'], label: 'Einstellungen' },
        { id: 'map', icons: ['fa fa-circle-location-arrow'], label: 'Map' },
    ]}
    layout={DynamicToolbarLayout.Area}
    onItemSelect={action('onItemSelect')}
/>
```

### Props

| name           | type                                                | required | description               |
| -------------- | --------------------------------------------------- | -------- | ------------------------- |
| `activeItemId` | `string \| null \| undefined`                       | no       | No description available. |
| `className`    | `string \| undefined`                               | no       | No description available. |
| `items`        | `DynamicToolbarItem[]`                              | yes      | No description available. |
| `layout`       | `DynamicToolbarLayout \| undefined`                 | no       | No description available. |
| `onItemSelect` | `((item: DynamicToolbarItem) => void) \| undefined` | no       | No description available. |

### Types

- `DynamicToolbarItem` ->
  `type DynamicToolbarItem = {     // Optional badge count that highlights pending conversations.     badgeCount?: number;     // Icon names that are forwarded to the shared Icon component.     icons: IconProps['icons'];     // Unique identifier that drives selection state and callbacks.     id: string;     // Marks the action as temporarily unavailable.     isDisabled?: boolean;     // Human-readable label for accessibility announcements.     label: string;     // Optional visual separator to highlight contextual groups.     hasRightSeparator?: boolean; };`
- `DynamicToolbarLayout` ->
  `enum DynamicToolbarLayout {     Area = 'area',     Hidden = 'hidden',     Floating = 'floating', }`

### Usage Notes

- Import `DynamicToolbar` directly from `@chayns-components/navigation` instead of internal source
  paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.
- Pay special attention to required props: `items`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/navigation/src/...`; always use the
  public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
