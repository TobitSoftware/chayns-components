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

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `AudioInput` directly from `@chayns-components/communication` instead of internal source
  paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/communication/src/...`; always use
  the public package export.

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

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `CommunicationButton` directly from `@chayns-components/communication` instead of internal
  source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/communication/src/...`; always use
  the public package export.

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

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `CommunicationContent` directly from `@chayns-components/communication` instead of internal
  source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/communication/src/...`; always use
  the public package export.

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

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `CommunicationFileList` directly from `@chayns-components/communication` instead of
  internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/communication/src/...`; always use
  the public package export.

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

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `CommunicationHeader` directly from `@chayns-components/communication` instead of internal
  source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/communication/src/...`; always use
  the public package export.

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

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `CommunicationInput` directly from `@chayns-components/communication` instead of internal
  source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/communication/src/...`; always use
  the public package export.

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

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `CommunicationList` directly from `@chayns-components/communication` instead of internal
  source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/communication/src/...`; always use
  the public package export.

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

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `CommunicationTeamTalkHeader` directly from `@chayns-components/communication` instead of
  internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/communication/src/...`; always use
  the public package export.

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

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `SocialPlugin` directly from `@chayns-components/communication` instead of internal source
  paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use
  case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/communication/src/...`; always use
  the public package export.
