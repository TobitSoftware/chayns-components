# @chayns-components/ranking

React component package providing 2 documented components for chayns applications.

Documented components: `Ranking`, `RankingOverview`.

## Import

```ts
import { Ranking, RankingOverview } from '@chayns-components/ranking';
```

## Typical Usage

```tsx
<Ranking
    entries={[
        {
            rank: 1,
            name: 'Michael Gesenhues',
            personId: 'MIC-HAEL1',
            points: 12,
            content: [
                {
                    id: 'ahdadrh',
                    name: 'Richtiges Ergebnis',
                    value: '3',
                },
                {
                    id: 'haerdjh',
                    name: 'Richtige Tordifferenz',
                    value: '2',
                },
                {
                    id: 'adrhs',
                    name: 'Richtige Tendenz',
                    value: '5',
                },
                {
                    id: 'rhd',
                    headline: 'BONUS',
                },
                {
                    id: 'hdfghm',
                    name: 'Abgegebene Tipps',
                    value: '10',
                },
                {
                    id: 'gjhfd',
                    name: 'Frühe Tippabgabe',
                    value: '458.943 Min.',
                },
            ],
        },
        {
            rank: 2,
            name: 'Jannik Weise',
            personId: 'JAN-NIK96',
            points: 11,
            content: [
                {
                    id: 'ahdadrh',
                    name: 'Richtiges Ergebnis',
                    value: '3',
                },
                {
                    id: 'haerdjh',
                    name: 'Richtige Tordifferenz',
                    value: '2',
                },
                {
                    id: 'adrhs',
                    name: 'Richtige Tendenz',
                    value: '5',
                },
                {
                    id: 'rhd',
                    headline: 'BONUS',
                },
                {
                    id: 'hdfghm',
                    name: 'Abgegebene Tipps',
                    value: '10',
                },
                {
                    id: 'gjhfd',
                    name: 'Frühe Tippabgabe',
                    value: '458.943 Min.',
                },
            ],
        },
    ]}
/>
```

## Components

- `Ranking`
- `RankingOverview`

## Ranking

`Ranking` is exported by `@chayns-components/ranking` and should be imported from the public package
entry point.

### Import

```ts
import { Ranking } from '@chayns-components/ranking';
```

### Examples

#### General

```tsx
<Ranking
    entries={[
        {
            rank: 1,
            name: 'Michael Gesenhues',
            personId: 'MIC-HAEL1',
            points: 12,
            content: [
                {
                    id: 'ahdadrh',
                    name: 'Richtiges Ergebnis',
                    value: '3',
                },
                {
                    id: 'haerdjh',
                    name: 'Richtige Tordifferenz',
                    value: '2',
                },
                {
                    id: 'adrhs',
                    name: 'Richtige Tendenz',
                    value: '5',
                },
                {
                    id: 'rhd',
                    headline: 'BONUS',
                },
                {
                    id: 'hdfghm',
                    name: 'Abgegebene Tipps',
                    value: '10',
                },
                {
                    id: 'gjhfd',
                    name: 'Frühe Tippabgabe',
                    value: '458.943 Min.',
                },
            ],
        },
        {
            rank: 2,
            name: 'Jannik Weise',
            personId: 'JAN-NIK96',
            points: 11,
            content: [
                {
                    id: 'ahdadrh',
                    name: 'Richtiges Ergebnis',
                    value: '3',
                },
                {
                    id: 'haerdjh',
                    name: 'Richtige Tordifferenz',
                    value: '2',
                },
                {
                    id: 'adrhs',
                    name: 'Richtige Tendenz',
                    value: '5',
                },
                {
                    id: 'rhd',
                    headline: 'BONUS',
                },
                {
                    id: 'hdfghm',
                    name: 'Abgegebene Tipps',
                    value: '10',
                },
                {
                    id: 'gjhfd',
                    name: 'Frühe Tippabgabe',
                    value: '458.943 Min.',
                },
            ],
        },
    ]}
/>
```

#### Flaschenjagd

```tsx
<Ranking
    entries={[
        {
            rank: 1,
            name: 'Michael Gesenhues',
            personId: 'MIC-HAEL1',
            points: 40,
            icons: ['fa fa-jug-bottle'],
        },
        {
            rank: 2,
            name: 'Jannik Weise',
            personId: 'JAN-NIK96',
            points: 38,
            icons: ['fa fa-jug-bottle'],
        },
    ]}
/>
```

### Props

| name                    | type                                        | required | description                                                                                                        |
| ----------------------- | ------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `entries`               | `IRankingEntry[]`                           | yes      | Array of ranking entries to be displayed in the ranking list.                                                      |
| `friendPersonIds`       | `string[]`                                  | yes      | Array of personIds that represent the user's friends.                                                              |
| `isLoadingData`         | `boolean \| undefined`                      | no       | Whether new data is loading.                                                                                       |
| `onFriendAdd`           | `((personId: string) => void) \| undefined` | no       | Callback function triggered when a friend is added to the friends list.                                            |
| `onFriendRemove`        | `((personId: string) => void) \| undefined` | no       | Callback function triggered when a friend is removed from the friends list.                                        |
| `onFriendVisibleChange` | `(() => void) \| undefined`                 | no       | Callback function triggered when the visibility of friends is toggled.                                             |
| `onLoadMore`            | `(() => void) \| undefined`                 | no       | Callback function when the load more button is clicked.                                                            |
| `onSearchChange`        | `((value: string) => void) \| undefined`    | no       | Callback function triggered when the search input value changes.                                                   |
| `searchValue`           | `string \| undefined`                       | no       | The current value of the search input field.                                                                       |
| `shouldShowOnlyFriends` | `boolean \| undefined`                      | no       | Whether only the friends of the user should be displayed (filtering and fetching the correct data is done by you). |
| `title`                 | `string \| undefined`                       | no       | The title of the top Accordion.                                                                                    |

### Types

No additional exported types documented.

### Usage Notes

- Import `Ranking` directly from `@chayns-components/ranking` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.
- Pay special attention to required props: `entries`, `friendPersonIds`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/ranking/src/...`; always use the
  public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.

## RankingOverview

`RankingOverview` is exported by `@chayns-components/ranking` and should be imported from the public
package entry point.

### Import

```ts
import { RankingOverview } from '@chayns-components/ranking';
```

### Examples

#### General

```tsx
<RankingOverview userRank={1234} totalPlayers={456789} />
```

### Props

| name           | type                  | required | description                                               |
| -------------- | --------------------- | -------- | --------------------------------------------------------- |
| `suffix`       | `string`              | yes      | A suffix that will be displayed before the total players. |
| `totalPlayers` | `number`              | yes      | The amount of the total players.                          |
| `userRank`     | `number \| undefined` | no       | The Rank of the current user.                             |

### Types

No additional exported types documented.

### Usage Notes

- Import `RankingOverview` directly from `@chayns-components/ranking` instead of internal source
  paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.
- Pay special attention to required props: `suffix`, `totalPlayers`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/ranking/src/...`; always use the
  public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
