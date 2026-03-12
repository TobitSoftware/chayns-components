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

`PersonFinder` is exported by `@chayns-components/person-finder` and should be imported from the
public package entry point.

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
<PersonFinder shouldRenderInline />
```

#### UACGroups

```tsx
<PersonFinder filterTypes={[PersonFinderFilterTypes.UAC]} />
```

#### With UACFilter

```tsx
<PersonFinder uacFilter={[{ groupId: -1 }]} />
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

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `PersonFinder` directly from `@chayns-components/person-finder` instead of internal source
  paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/person-finder/src/...`; always use
  the public package export.
