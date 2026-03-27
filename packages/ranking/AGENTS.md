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

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `Ranking` directly from `@chayns-components/ranking` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/ranking/src/...`; always use the
  public package export.

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

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `RankingOverview` directly from `@chayns-components/ranking` instead of internal source
  paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/ranking/src/...`; always use the
  public package export.
