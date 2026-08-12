# @chayns-components/person-finder

React component package providing `PersonFinder` for chayns applications.

Documented components: `PersonFinder`.

## Import

```ts
import { PersonFinder } from '@chayns-components/person-finder';
```

## Typical Usage

```tsx
<PersonFinder />
```

## PersonFinder

`PersonFinder` is exported by `@chayns-components/person-finder` and should be imported from the public package entry point.

### Import

```ts
import { PersonFinder } from '@chayns-components/person-finder';
```

### Examples

#### General

```tsx
<PersonFinder />
```

#### Rendered Inline

```tsx
<PersonFinder
    shouldRenderInline
/>
```

#### UACGroups

```tsx
<PersonFinder
    filterTypes={[PersonFinderFilterTypes.UAC]}
/>
```

#### With UACFilter

```tsx
<PersonFinder
    uacFilter={[{ groupId: -1 }]}
/>
```

#### With Own Entries

```tsx
<PersonFinder
    entries={[
            {
                type: PersonFinderFilterTypes.PERSON,
                id: 'test1',
                firstName: 'Test',
                lastName: '1',
                isVerified: false,
                commonSites: 0,
            },
            {
                type: PersonFinderFilterTypes.PERSON,
                id: 'test2',
                firstName: 'Test',
                lastName: '2',
                isVerified: false,
                commonSites: 0,
            },
            {
                type: PersonFinderFilterTypes.PERSON,
                id: 'test3',
                firstName: 'Test',
                lastName: '3',
                isVerified: false,
                commonSites: 0,
            },
        ]}
/>
```

#### Site Mode

```tsx
<PersonFinder
    filterTypes={[PersonFinderFilterTypes.PERSON]}
    relationMode={RelationMode.SITE}
/>
```

### Props

| name | type | required | description |
| --- | --- | --- | --- |
| `container` | `Element \| undefined` | no | The element where the content of the `PersonFinder` should be rendered via React Portal. |
| `defaultEntries` | `DefaultEntry[] \| undefined` | no | Sites and persons that are selected by default. |
| `dropdownDirection` | `any` | no | The direction in which the dropdown should be displayed. By default, it is displayed below the input. |
| `entries` | `PersonEntry[] \| undefined` | no | A list of entries that should be searched. |
| `excludedEntryIds` | `(string \| number)[] \| undefined` | no | Entry ids to exclude from the results |
| `filterTypes` | `PersonFinderFilterTypes[] \| undefined` | no | The filter options of the component. |
| `friendsPriority` | `Priority \| undefined` | no | Determines the priority level for displaying friends in search results. |
| `leftElement` | `ReactElement<any, string \| JSXElementConstructor<any>> \| undefined` | no | An element that should be displayed on the left side of the input. |
| `maxEntries` | `number \| undefined` | no | The maximum number of entries that can be selected. |
| `onAdd` | `((entry: PersonFinderEntry) => void) \| undefined` | no | Function to be executed if a person or site is added. |
| `onDropdownHide` | `(() => void) \| undefined` | no | Function to be executed if the dropdown is hidden. |
| `onDropdownShow` | `(() => void) \| undefined` | no | Function to be executed if the dropdown is shown. |
| `onRemove` | `((id: string \| number) => void) \| undefined` | no | Function to be executed if a person or site is removed. |
| `placeholder` | `string \| undefined` | no | The placeholder that should be displayed. |
| `relationMode` | `RelationMode \| undefined` | no | Determines whether persons are searched and sorted from the user's perspective or from a site's perspective. |
| `shouldAllowMultiple` | `boolean \| undefined` | no | Whether multiple persons and sites should be selected. |
| `shouldDisableRemove` | `boolean \| undefined` | no | Whether the remove action should be disabled. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting for interactive controls. |
| `shouldHideResultsOnAdd` | `boolean \| undefined` | no | Whether the dropdown should be hidden after adding an entry. By default, it is not hidden. |
| `shouldRenderInline` | `boolean \| undefined` | no | Whether the `PersonFinder` should be rendered inline without a dropdown. |
| `shouldShowOwnUser` | `boolean \| undefined` | no | Whether the own user should be shown in the results. By default, it is not shown. |
| `shouldUseQa` | `boolean \| undefined` | no | Whether the qa relations should be used. |
| `uacFilter` | `UACFilter[] \| undefined` | no | Optional filter to search member of uac group. Only works with groups of the current Site and if the user is manager. |

### Types

- `DefaultEntry` -> `interface DefaultEntry {
    id: string;
    name: string;
}`
- `PersonEntry` -> `interface PersonEntry {
    id: string;
    firstName: string;
    lastName: string;
    commonSites: number;
    isVerified: boolean;
    type: PersonFinderFilterTypes.PERSON;
    lastOnlineTime?: Date;
}`
- `PersonFinderEntry` -> `type PersonFinderEntry = PersonEntry | SiteEntry | UACEntry;`
- `PersonFinderFilterTypes` -> `enum PersonFinderFilterTypes {
    PERSON = 'person',
    SITE = 'site',
    UAC = 'uac',
}`
- `Priority` -> `enum Priority {
    HIGH,
    NORMAL,
}`
- `RelationMode` -> `enum RelationMode {
    PERSON = 'person',
    SITE = 'site',
}`
- `UACFilter` -> `interface UACFilter {
    groupId: number;
}`

### Usage Notes

- Import `PersonFinder` directly from `@chayns-components/person-finder` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/person-finder/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
