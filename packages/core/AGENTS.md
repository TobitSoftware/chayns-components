# @chayns-components/core

React component package providing 44 documented components for chayns applications.

Documented components: `Accordion`, `AmountControl`, `AnimatedNumber`, `Badge`, `Button`, `Checkbox`, `ComboBox`, `ContentCard`, `ContextMenu`, `ExpandableContent`, `FileInput`, `FileList`, `FileSelect`, `Filter`, `FilterButtons`, `GridImage`, `GroupedImage`, `HighlightSlider`, `Icon`, `Input`, `List`, `MentionFinder`, `MultiActionButton`, `NumberInput`, `Popup`, `ProgressBar`, `RadioButton`, `ScrollView`, `SearchBox`, `SearchInput`, `SelectButton`, `SetupWizard`, `SetupWizardItem`, `SharingBar`, `SharingButton`, `Signature`, `Slider`, `SliderButton`, `SmallWaitCursor`, `TagInput`, `TextArea`, `Tooltip`, `Truncation`, `VerificationBadge`.

## Import

```ts
import { Accordion, AmountControl, AnimatedNumber } from '@chayns-components/core';
```

## Typical Usage

```tsx
<Accordion />
```

## Components

- `Accordion`
- `AmountControl`
- `AnimatedNumber`
- `Badge`
- `Button`
- `Checkbox`
- `ComboBox`
- `ContentCard`
- `ContextMenu`
- `ExpandableContent`
- `FileInput`
- `FileList`
- `FileSelect`
- `Filter`
- `FilterButtons`
- `GridImage`
- `GroupedImage`
- `HighlightSlider`
- `Icon`
- `Input`
- `List`
- `MentionFinder`
- `MultiActionButton`
- `NumberInput`
- `Popup`
- `ProgressBar`
- `RadioButton`
- `ScrollView`
- `SearchBox`
- `SearchInput`
- `SelectButton`
- `SetupWizard`
- `SetupWizardItem`
- `SharingBar`
- `SharingButton`
- `Signature`
- `Slider`
- `SliderButton`
- `SmallWaitCursor`
- `TagInput`
- `TextArea`
- `Tooltip`
- `Truncation`
- `VerificationBadge`

## Accordion

`Accordion` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { Accordion } from '@chayns-components/core';
```

### Examples

#### Dynamic Loading Template

```tsx
<Accordion />
```

#### General

```tsx
<Accordion
    title={'Lorem ipsum dolor sit amet, consetetur sadipscing elitr'}
>
    {
        <AccordionContent>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                    accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                    sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                    sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                    rebum.
                </AccordionContent>
    }
</Accordion>
```

#### Controlled Accordion

```tsx
<Accordion
    title={'Lorem ipsum dolor sit amet, consetetur sadipscing elitr'}
>
    {
        <AccordionContent>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                    accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                    sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                    sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                    rebum.
                </AccordionContent>
    }
</Accordion>
```

#### Multiple Accordions

```tsx
<Accordion />
```

#### Dynamic Loading

```tsx
<Accordion />
```

#### Wrapped Accordions

```tsx
<Accordion
    title={'Lorem ipsum dolor sit amet'}
>
    {
        [
                <AccordionContent>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                    accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                    sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                    sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                    rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor si amet.
                </AccordionContent>,
                <AccordionGroup>
                    <Accordion
                        key="first"
                        title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua"
                    >
                        <AccordionContent>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                            tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                        </AccordionContent>
                    </Accordion>
                    <Accordion key="second" title="Justo duo dolores et ea rebum">
                        <AccordionContent>
                            At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                            gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
                            dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                        </AccordionContent>
                        <AccordionGroup>
                            <Accordion key="first_wrapped" title="At vero eos et accusam">
                                <AccordionContent>
                                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                                    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                                    voluptua.
                                </AccordionContent>
                            </Accordion>
                            <Accordion key="second_wrapped" title="Justo duo dolores et ea rebum">
                                <AccordionContent>
                                    At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
                                    gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
                                    ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                                    eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                                    voluptua.
                                </AccordionContent>
                                <AccordionGroup>
                                    <Accordion key="first_deep_wrapped" title="At vero eos et accusam">
                                        <AccordionContent>
                                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                                            diam nonumy eirmod tempor invidunt ut labore et dolore magna
                                            aliquyam erat, sed diam voluptua.
                                        </AccordionContent>
                                    </Accordion>
                                    <Accordion
                                        key="first_deep_wrapped"
                                        title="Justo duo dolores et ea rebum"
                                    >
                                        <AccordionContent>
                                            At vero eos et accusam et justo duo dolores et ea rebum. Stet
                                            clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
                                            dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                                            sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                                            labore et dolore magna aliquyam erat, sed diam voluptua.
                                        </AccordionContent>
                                    </Accordion>
                                </AccordionGroup>
                            </Accordion>
                        </AccordionGroup>
                    </Accordion>
                </AccordionGroup>,
            ]
    }
</Accordion>
```

#### Accordion With Badge

```tsx
<Accordion
    rightElement={<Badge>10.000 Euro</Badge>}
    title={'Lorem ipsum dolor sit amet'}
>
    {
        <AccordionContent>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                    accusam et justo duo dolores et ea rebum.
                </AccordionContent>
    }
</Accordion>
```

#### Accordion With Title Element

```tsx
<Accordion
    title={'Lorem ipsum dolor sit amet'}
    titleElement={<Icon icons={['fa fa-download']} />}
>
    {
        <AccordionContent>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                    accusam et justo duo dolores et ea rebum.
                </AccordionContent>
    }
</Accordion>
```

#### Accordion With Search

```tsx
<Accordion
    onSearchChange={() => {}}
    searchPlaceholder={'Suchen'}
    title={'Lorem ipsum dolor sit amet'}
>
    {
        <AccordionContent>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                    accusam et justo duo dolores et ea rebum.
                </AccordionContent>
    }
</Accordion>
```

#### Accordion With Badge And Search

```tsx
<Accordion
    onSearchChange={() => {}}
    rightElement={<Badge>124</Badge>}
    searchPlaceholder={'Suchen'}
    title={'Lorem ipsum dolor sit amet'}
>
    {
        <AccordionContent>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                    accusam et justo duo dolores et ea rebum.
                </AccordionContent>
    }
</Accordion>
```

#### Disabled Accordion

```tsx
<Accordion
    isDisabled
    title={'Lorem ipsum dolor sit amet'}
>
    {
        <AccordionContent>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                    accusam et justo duo dolores et ea rebum.
                </AccordionContent>
    }
</Accordion>
```

#### Scrollable Accordion

```tsx
<Accordion
    bodyMaxHeight={200}
    onBodyScroll={console.debug}
    title={'Lorem ipsum dolor sit amet'}
>
    {
        <AccordionContent>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                    accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                    sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                    sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                    rebum. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                    tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
                    et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                    sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                    sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                    rebum.
                </AccordionContent>
    }
</Accordion>
```

#### With Accordion Items

```tsx
<Accordion
    title={'Lorem ipsum dolor sit amet'}
>
    {
        <>
                    <AccordionItem>Lorem ipsum dolor sit amet</AccordionItem>
                    <AccordionItem>Consetetur sadipscing elitr</AccordionItem>
                    <AccordionItem>Sed diam nonumy eirmod tempor invidunt ut labore</AccordionItem>
                    <AccordionItem>Et dolore magna aliquyam erat</AccordionItem>
                    <AccordionGroup isWrapped>
                        <Accordion key="first" title="At vero eos et accusam">
                            <AccordionItem>Consetetur sadipscing elitr</AccordionItem>
                            <AccordionItem>Sed diam nonumy eirmod tempor invidunt ut labore</AccordionItem>
                        </Accordion>
                    </AccordionGroup>
                </>
    }
</Accordion>
```

#### Input As Title

```tsx
<Accordion
    title={'Lorem ipsum'}
    onTitleInputChange={undefined}
    titleInputProps={{
            rightElement: (
                <div
                    style={{
                        backgroundColor: '#3377b6',
                        height: '42px',
                        width: '42px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Icon icons={['ts-calling-code']} size={25} color={'white'} />
                </div>
            ),
        }}
>
    {
        <AccordionContent>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
                    accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
                    sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
                    sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
                    aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                    rebum.
                </AccordionContent>
    }
</Accordion>
```

#### Wrapped Accordion With List Items

```tsx
<Accordion
    title={'Lorem ipsum dolor sit amet'}
>
    {
        <>
                    <List>
                        <ListItem images={[locationImages[0] ?? '']} title="Tolor tantem">
                            <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                        </ListItem>
                        <ListItem
                            images={[locationImages[0] ?? '']}
                            shouldHideIndicator
                            title="Tolor tantem"
                        >
                            <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                        </ListItem>
                        <ListItem title="Tolor tantem">
                            <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                        </ListItem>
                        <ListItem shouldHideIndicator title="Tolor tantem">
                            <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                        </ListItem>
                    </List>
                    <AccordionGroup isWrapped>
                        <Accordion title="Lorem ipsum">
                            <List>
                                <ListItem images={[locationImages[0] ?? '']} title="Tolor tantem">
                                    <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                                </ListItem>
                                <ListItem
                                    images={[locationImages[0] ?? '']}
                                    shouldHideIndicator
                                    title="Tolor tantem"
                                >
                                    <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                                </ListItem>
                                <ListItem title="Tolor tantem">
                                    <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                                </ListItem>
                                <ListItem shouldHideIndicator title="Tolor tantem">
                                    <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                                </ListItem>
                            </List>
                        </Accordion>
                        <Accordion title="Lorem ipsum sit dolor atem">
                            <AccordionGroup isWrapped>
                                <Accordion title="Dolor sit amet">
                                    <List>
                                        <ListItem images={[locationImages[0] ?? '']} title="Tolor tantem">
                                            <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                                        </ListItem>
                                        <ListItem
                                            images={[locationImages[0] ?? '']}
                                            shouldHideIndicator
                                            title="Tolor tantem"
                                        >
                                            <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                                        </ListItem>
                                        <ListItem title="Tolor tantem">
                                            <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                                        </ListItem>
                                        <ListItem shouldHideIndicator title="Tolor tantem">
                                            <ListItemContent>Consetetur sadipscing elitr</ListItemContent>
                                        </ListItem>
                                    </List>
                                </Accordion>
                            </AccordionGroup>
                        </Accordion>
                    </AccordionGroup>
                </>
    }
</Accordion>
```

#### Hidden Bottom Lines

```tsx
<Accordion />
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `Accordion` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## AmountControl

`AmountControl` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { AmountControl } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<AmountControl />
```

#### With Label

```tsx
<AmountControl
    label={'1,43'}
/>
```

#### With Max Amount

```tsx
<AmountControl
    maxAmount={1}
/>
```

#### Reset Amount

```tsx
<AmountControl />
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `AmountControl` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## AnimatedNumber

`AnimatedNumber` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { AnimatedNumber } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<AnimatedNumber
    value={935936}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `AnimatedNumber` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## Badge

`Badge` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { Badge } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<Badge>
    {'10.000 Euro'}
</Badge>
```

#### Single Number

```tsx
<Badge
    backgroundColor={'#ff0000'}
    fontColor={'#ffffff'}
>
    {'4'}
</Badge>
```

#### Empty

```tsx
<Badge>
    {undefined}
</Badge>
```

#### Border

```tsx
<Badge
    design={BadgeDesign.BORDER}
>
    {'SYSTEM'}
</Badge>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `Badge` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## Button

`Button` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { Button } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<Button
    isDisabled={false}
    isSecondary={false}
    shouldStopPropagation={false}
>
    {'Click me!'}
</Button>
```

#### Icon Button

```tsx
<Button
    isDisabled={false}
    isSecondary={false}
    shouldStopPropagation={false}
    icon={'fa fa-rocket'}
/>
```

#### Button With Icon

```tsx
<Button
    isDisabled={false}
    isSecondary={false}
    shouldStopPropagation={false}
    icon={'fa fa-rocket'}
>
    {'Click me!'}
</Button>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `Button` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## Checkbox

`Checkbox` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { Checkbox } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<Checkbox>
    {'Try me out!'}
</Checkbox>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `Checkbox` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## ComboBox

`ComboBox` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { ComboBox } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<ComboBox
    lists={[
                {
                    list: [
                        {
                            text: 'Margherita',
                            value: 1,
                        },
                    ],
                },
            ]}
    placeholder={'Select Pizza'}
/>
```

#### Custom

```tsx
<ComboBox
    lists={[
            {
                list: [
                    {
                        icons: ['fa fa-users'],
                        imageUrl: 'https://picsum.photos/200',
                        rightElement: <Badge>7</Badge>,
                        text: 'Allgemein',
                        value: 1,
                    },
                    {
                        icons: ['fa fa-user'],
                        imageUrl: 'https://picsum.photos/200',
                        rightElement: <Badge>33</Badge>,
                        text: 'Persönlich',
                        value: 2,
                    },
                    {
                        icons: ['fa fa-hashtag-lock'],
                        imageUrl: 'https://picsum.photos/200',
                        rightElement: <Badge>1</Badge>,
                        text: 'Die Doppelnull-Crew',
                        value: 3,
                    },
                    {
                        icons: ['fa fa-question-circle'],
                        imageUrl: 'https://picsum.photos/200',
                        rightElement: <Badge>12</Badge>,
                        text: 'Bereich mit Hilfe & FAQ',
                        value: 4,
                    },
                    {
                        icons: ['fa fa-sign-out-alt'],
                        imageUrl: 'https://picsum.photos/200',
                        rightElement: <Badge>10</Badge>,
                        text: 'Abmelden',
                        value: 5,
                    },
                ],
            },
        ]}
    placeholder={'Auswählen'}
    direction={DropdownDirection.BOTTOM_LEFT}
    shouldDropDownUseMaxItemWidth
    shouldShowTransparentBackground
    shouldUseCurrentItemWidth
/>
```

#### Own Width

```tsx
<ComboBox
    lists={[
                {
                    list: [
                        {
                            text: 'Margherita',
                            value: 1,
                        },
                    ],
                },
            ]}
    placeholder={'Select Pizza'}
    bodyWidth={300}
    direction={DropdownDirection.LEFT}
    shouldUseFullWidth
/>
```

#### With Prefix

```tsx
<ComboBox
    lists={[
                {
                    list: [
                        {
                            text: 'Margherita',
                            value: 1,
                        },
                    ],
                },
            ]}
    placeholder={'Select Pizza'}
    prefix={'Von'}
/>
```

#### With Images

```tsx
<ComboBox
    lists={[
            {
                list: [
                    {
                        imageUrl: 'https://picsum.photos/200',
                        text: 'Schnellstart',
                        value: 0,
                    },
                    {
                        imageUrl: 'https://picsum.photos/200',
                        text: 'Flexibles Design',
                        value: 1,
                    },
                    {
                        imageUrl: 'https://picsum.photos/200',
                        text: 'Intuitive Bedienung',
                        value: 2,
                    },
                    {
                        imageUrl: 'https://picsum.photos/200',
                        text: 'Integration',
                        value: 3,
                    },
                    {
                        imageUrl: 'https://picsum.photos/200',
                        text: 'Navigation',
                        value: 4,
                    },
                ],
            },
        ]}
    placeholder={'Select Pizza'}
    selectedItem={{
            imageUrl: 'https://picsum.photos/200',
            text: 'Flexibles Design',
            value: 1,
        }}
/>
```

#### With Suffix Elements

```tsx
<ComboBox
    lists={[
            {
                list: [
                    {
                        imageUrl: 'https://picsum.photos/200',
                        suffixElement: <Icon icons={['fal fa-image']} />,
                        text: 'Schnellstart',
                        value: 0,
                    },
                    {
                        imageUrl: 'https://picsum.photos/200',
                        text: 'Flexibles Design',
                        value: 1,
                    },
                    {
                        imageUrl: 'https://picsum.photos/200',
                        text: 'Intuitive Bedienung',
                        suffixElement: <Icon icons={['fa fa-user']} />,
                        value: 2,
                    },
                    {
                        imageUrl: 'https://picsum.photos/200',
                        text: 'Integration',
                        value: 3,
                    },
                    {
                        imageUrl: 'https://picsum.photos/200',
                        text: 'Navigation',
                        value: 4,
                    },
                ],
            },
        ]}
    placeholder={'Select Pizza'}
    selectedItem={{
            imageUrl: 'https://picsum.photos/200',
            text: 'Intuitive Bedienung',
            suffixElement: <Icon icons={['far fa-user']} />,
            value: 2,
        }}
/>
```

#### With Icons

```tsx
<ComboBox
    lists={[
            {
                list: [
                    {
                        icons: ['ts-calling-code'],
                        text: 'Schnellstart',
                        value: 0,
                    },
                    {
                        icons: ['ts-calling-code'],
                        text: 'Flexibles Design',
                        value: 1,
                    },
                    {
                        icons: ['ts-calling-code'],
                        text: 'Intuitive Bedienung',
                        value: 2,
                    },
                    {
                        icons: ['ts-calling-code'],
                        text: 'Integration',
                        value: 3,
                    },
                    {
                        icons: ['ts-calling-code'],
                        text: 'Navigation',
                        value: 4,
                    },
                ],
            },
        ]}
    placeholder={'Select Pizza'}
    selectedItem={{
            icons: ['ts-calling-code'],
            text: 'Flexibles Design',
            value: 1,
        }}
/>
```

#### With Groups

```tsx
<ComboBox
    lists={[
            {
                groupName: 'Autos',
                list: [
                    {
                        text: 'Audi',
                        value: 0,
                    },
                    {
                        text: 'BMW',
                        value: 1,
                    },
                    {
                        text: 'Toyota',
                        value: 2,
                    },
                    {
                        text: 'Volkswagen',
                        value: 3,
                    },
                    {
                        text: 'Nissan',
                        value: 4,
                    },
                ],
            },
            {
                groupName: 'Fußballvereine',
                list: [
                    {
                        text: 'Bayern München',
                        value: 0,
                    },
                    {
                        text: 'Dortmund',
                        value: 1,
                    },
                    {
                        text: 'Real Madrid',
                        value: 2,
                    },
                    {
                        text: 'Man City',
                        value: 3,
                    },
                    {
                        text: 'Barcelona',
                        value: 4,
                    },
                ],
            },
        ]}
    placeholder={'Select Pizza'}
/>
```

#### With Subtext

```tsx
<ComboBox
    lists={[
            {
                list: [
                    {
                        imageUrl: 'https://tsimg.cloud/PM4-7NBYY/profile_w128.png',
                        value: 'PM4-7NBYY',
                        text: 'David Rechenberg, 39 Jahre',
                        subtext: 'Mathelehrer',
                    },
                    {
                        imageUrl: 'https://tsimg.cloud/9JC-14TQZ/profile_w128.png',
                        value: '9JC-14TQZ',
                        text: 'Gerhard Kaiser, 55 Jahre',
                        subtext: 'Geschichtslehrer',
                    },
                    {
                        imageUrl: 'https://tsimg.cloud/AFQ-2VL54/profile_w128.png',
                        value: 'AFQ-2VL54',
                        text: 'Claudia Schreiber, 57 Jahre',
                        subtext: 'Deutschlehrerin',
                    },
                    {
                        imageUrl: 'https://tsimg.cloud/FCB-GEU25/profile_w128.png',
                        value: 'FCB-GEU25',
                        text: 'Lukas Waldmann, 24 Jahre',
                        subtext: 'Biologielehrer',
                    },
                    {
                        imageUrl: 'https://tsimg.cloud/R3U-8B6ZJ/profile_w128.png',
                        value: 'R3U-8B6ZJ',
                        text: 'Emily Taylor, 29 Jahre',
                        subtext: 'Englischlehrerin',
                    },
                    {
                        imageUrl: 'https://tsimg.cloud/TER-1VS4Q/profile_w128.png',
                        value: 'TER-1VS4Q',
                        text: 'Paul Bitner, 28 Jahre',
                        subtext: 'Informatiklehrer',
                    },
                    {
                        imageUrl: 'https://tsimg.cloud/IFZ-HFCC6/profile_w128.png',
                        value: 'IFZ-HFCC6',
                        text: 'Rudi Ratlos, 20 Jahre',
                        subtext: 'Informatik-Referent',
                    },
                ],
            },
        ]}
    placeholder={'Agent wählen'}
    shouldShowBigImage
    shouldShowClearIcon
    shouldShowRoundImage
    shouldUseFullWidth
/>
```

#### With Big Image

```tsx
<ComboBox
    lists={[
            {
                list: [
                    {
                        imageUrl: 'https://tsimg.cloud/6C8-5QJDF/profile_w128.png',
                        value: '6C8-5QJDF',
                        text: 'Albert, 55 Jahre',
                    },
                    {
                        imageUrl: 'https://tsimg.cloud/DFU-I2R6I/profile_w128.png',
                        value: 'DFU-I2R6I',
                        text: 'Anna, 30 Jahre',
                    },
                    {
                        imageUrl: 'https://tsimg.cloud/SY9-LT5TA/profile_w128.png',
                        value: 'SY9-LT5TA',
                        text: 'Elisabeth, 80 Jahre',
                    },
                    {
                        imageUrl: 'https://tsimg.cloud/BGJ-DTZBH/profile_w128.png',
                        value: 'BGJ-DTZBH',
                        text: 'Jonas, 20 Jahre',
                    },
                    {
                        imageUrl: 'https://tsimg.cloud/672-9GQ3J/profile_w128.png',
                        value: '672-9GQ3J',
                        text: 'Lisa, 10 Jahre',
                    },
                    {
                        imageUrl: 'https://tsimg.cloud/CVW-MDH7R/profile_w128.png',
                        value: 'CVW-MDH7R',
                        text: 'Stefan, 35 Jahre',
                        subtext: 'Informatiklehrer',
                    },
                ],
            },
        ]}
    placeholder={'Agent wählen'}
    shouldShowBigImage
    shouldShowClearIcon
    shouldShowRoundImage
    shouldUseFullWidth
/>
```

#### With Input

```tsx
<ComboBox
    lists={[
            {
                list: [
                    {
                        text: '12px',
                        value: 0,
                    },
                    {
                        text: '13px',
                        value: 1,
                    },
                    {
                        text: '14px',
                        value: 2,
                    },
                    {
                        text: '15px',
                        value: 3,
                    },
                    {
                        text: '16px',
                        value: 4,
                    },
                    {
                        text: '20px',
                        value: 5,
                    },
                    {
                        text: '24px',
                        value: 6,
                    },
                ],
            },
        ]}
    placeholder={'Fontsize'}
/>
```

#### With Text Style

```tsx
<ComboBox
    lists={[
            {
                list: [
                    {
                        text: 'Normal',
                        value: 0,
                    },
                    {
                        text: 'Headline 1',
                        value: 1,
                        textStyles: {
                            tagName: 'h1',
                            styles: { margin: 0 },
                        },
                    },
                    {
                        text: 'Headline 2',
                        value: 2,
                        textStyles: {
                            tagName: 'h2',
                            styles: { margin: 0 },
                        },
                    },
                    {
                        text: 'Headline 3',
                        value: 3,
                        textStyles: {
                            tagName: 'h3',
                            styles: { margin: 0 },
                        },
                    },
                    {
                        text: 'headline 4',
                        value: 4,
                        textStyles: {
                            tagName: 'h4',
                            styles: { margin: 0 },
                        },
                    },
                    {
                        text: 'Footer',
                        value: 5,
                        textStyles: {
                            tagName: 'footer',
                            styles: { margin: 0 },
                        },
                    },
                ],
            },
        ]}
    placeholder={'Fontsize'}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `ComboBox` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## ContentCard

`ContentCard` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { ContentCard } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<ContentCard>
    {'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'}
</ContentCard>
```

#### Content Card With Input

```tsx
<ContentCard>
    {
        <>
                    <span>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                    </span>
                    <div style={{ height: '10px' }} />
                    <Input placeholder="Your advertisement could be here..." />
                    <div style={{ height: '10px' }} />
                    <span>
                        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
                        no sea takimata sanctus est.
                    </span>
                </>
    }
</ContentCard>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `ContentCard` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## ContextMenu

`ContextMenu` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { ContextMenu } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<ContextMenu
    items={[
            {
                icons: ['fa fa-pencil'],
                key: 'rename',
                onClick: () => alert('Option "Umbenennen" wurde geklickt...'),
                text: 'Umbenennen',
            },
            {
                icons: ['fa fa-eye'],
                key: 'show',
                onClick: () => alert('Option "Einblenden" wurde geklickt...'),
                text: 'Einblenden',
            },
            {
                icons: ['fa fa-trash'],
                key: 'delete',
                onClick: () => alert('Option "Löschen" wurde geklickt...'),
                text: 'Löschen',
            },
        ]}
/>
```

#### With Spacer

```tsx
<ContextMenu
    items={[
            {
                icons: ['fa fa-pencil'],
                key: 'rename',
                onClick: () => alert('Option "Umbenennen" wurde geklickt...'),
                text: 'Umbenennen',
            },
            {
                icons: ['fa fa-eye'],
                key: 'show',
                onClick: () => alert('Option "Einblenden" wurde geklickt...'),
                text: 'Einblenden',
                shouldShowSpacer: true,
            },
            {
                icons: ['fa fa-trash'],
                key: 'delete',
                onClick: () => alert('Option "Löschen" wurde geklickt...'),
                text: 'Löschen',
            },
        ]}
/>
```

#### Without Icons

```tsx
<ContextMenu
    items={[
            {
                key: 'rename',
                onClick: () => alert('Option "Umbenennen" wurde geklickt...'),
                text: 'Umbenennen',
            },
            {
                key: 'show',
                onClick: () => alert('Option "Einblenden" wurde geklickt...'),
                text: 'Einblenden',
            },
            {
                key: 'delete',
                onClick: () => alert('Option "Löschen" wurde geklickt...'),
                text: 'Löschen',
            },
        ]}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `ContextMenu` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## ExpandableContent

`ExpandableContent` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { ExpandableContent } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<ExpandableContent>
    {
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec nisi vel nulla tincidunt facilisis. Nullam fringilla eu felis at sollicitudin. Aliquam et urna augue. Praesent rhoncus hendrerit molestie. Vestibulum non faucibus mauris. In bibendum ultricies pulvinar. Duis in nisi lacinia, maximus dolor sit amet, pharetra neque. Quisque vulputate semper eleifend. Quisque imperdiet dolor faucibus, lobortis quam et, consectetur dui. Nunc at aliquam odio, vel luctus magna. Cras at ante at nunc volutpat aliquam. Integer ex nunc, pellentesque ac pharetra eu, porttitor eu mi.\n' +
                    '\n' +
                    'Vestibulum mollis sagittis maximus. Nulla facilisi. Curabitur accumsan ipsum laoreet ipsum rutrum, id vehicula lectus cursus. Donec sit amet eros sed quam suscipit sodales. Phasellus faucibus fermentum sagittis. Vestibulum non orci quis nisl aliquet pharetra. Donec massa dui, consectetur sit amet metus ac, mattis semper nulla. Suspendisse ut quam a enim egestas gravida at sed sapien. Duis id mi id nisl pellentesque ornare quis non nibh. Fusce pellentesque, leo interdum rutrum maximus, libero purus auctor velit, at sodales nulla elit ut est. Nam tellus lacus, tristique et nulla sed, mollis vulputate mi. Donec tempor non magna id ornare. Integer facilisis lacus urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc nec leo in nulla faucibus facilisis at nec dolor.'
    }
</ExpandableContent>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `ExpandableContent` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## FileInput

`FileInput` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { FileInput } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<FileInput />
```

#### With Image Selection

```tsx
<FileInput
    imageSelectPlaceholder={'Bild auswählen'}
/>
```

#### With Files

```tsx
<FileInput
    files={[
            {
                id: '2733zgetfvedjh4wetrf23w',
                name: 'Eine Datei',
                size: 34,
                mimeType: 'image/png',
            },
            {
                id: '34zh34rdchg26zth5erfdzjzg',
                name: 'Test Datei',
                size: 23,
                mimeType: 'image/png',
            },
        ]}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `FileInput` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## FileList

`FileList` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { FileList } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<FileList
    files={[
                { id: '1', name: 'file1', size: 20, mimeType: 'text/plain' },
                { id: '2', name: 'file2', size: 20, mimeType: 'text/plain' },
                { id: '3', name: 'file3', size: 20, mimeType: 'text/plain' },
                { id: '4', name: 'file4', size: 20, mimeType: 'text/plain' },
            ]}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `FileList` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## FileSelect

`FileSelect` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { FileSelect } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<FileSelect />
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `FileSelect` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## Filter

`Filter` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { Filter } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<Filter
    headline={''}
    searchConfig={{
            searchValue: '',
            onSearchChange: () => {},
        }}
    checkboxConfig={{
            children: 'Checkbox Label',
        }}
    filterButtonConfig={{
            items: [
                {
                    id: '1',
                    text: 'Essen',
                    color: 'red',
                    icons: ['fa fa-burger'],
                    count: 5,
                },
                {
                    id: '2',
                    text: 'Getränke',
                    color: 'green',
                    icons: ['fa fa-bottle-water'],
                    count: 74,
                },
                {
                    id: '3',
                    text: 'Nachtisch',
                    color: 'blue',
                    icons: ['fa fa-pie'],
                    isDisabled: true,
                    count: 32,
                },
                {
                    id: '4',
                    text: 'Snacks',
                    color: 'purple',
                    icons: ['fa fa-cookie'],
                    count: 45,
                },
            ],
            size: FilterButtonSize.Small,
        }}
    sortConfig={{
            items: [
                { text: 'alphanumerisch', id: 'alphanumerisch' },
                { text: 'zuletzt hinzugefügt', id: 'latest' },
            ],
            selectedItem: { text: 'alphanumerisch', id: 'alphanumerisch' },
            onSortChange: () => {},
        }}
    comboboxConfig={{
            label: 'Kategorie wählen',
            placeholder: 'Keine Kategorie gewählt',
            lists: [
                {
                    list: [
                        { text: 'Alle Kategorien', value: 'all', icons: ['fa fa-list'] },
                        {
                            text: 'Lebensmittel',
                            value: 'food',
                            icons: ['fa fa-burger'],
                            subtext: 'Frisch & regional',
                        },
                        { text: 'Getränke', value: 'drinks', icons: ['fa fa-bottle-water'] },
                        { text: 'Haushalt', value: 'household', icons: ['fa fa-soap'] },
                        {
                            text: 'Elektronik',
                            value: 'electronics',
                            icons: ['fa fa-bolt'],
                            subtext: 'Smartphones, TV & mehr',
                        },
                        { text: 'Bekleidung', value: 'clothing', icons: ['fa fa-tshirt'] },
                    ],
                },
            ],
        }}
/>
```

#### Only Search

```tsx
<Filter
    headline={'Suche'}
    searchConfig={{
            searchValue: '',
            onSearchChange: () => {},
        }}
/>
```

#### Only Filter Buttons

```tsx
<Filter
    headline={'Filter'}
    filterButtonConfig={{
            items: [
                {
                    id: '1',
                    text: 'Essen',
                    color: 'red',
                    icons: ['fa fa-burger'],
                    count: 5,
                },
                {
                    id: '2',
                    text: 'Getränke',
                    color: 'green',
                    icons: ['fa fa-bottle-water'],
                    count: 74,
                },
                {
                    id: '3',
                    text: 'Nachtisch',
                    color: 'blue',
                    icons: ['fa fa-pie'],
                    isDisabled: true,
                    count: 32,
                },
                {
                    id: '4',
                    text: 'Snacks',
                    color: 'purple',
                    icons: ['fa fa-cookie'],
                    count: 45,
                },
            ],
            size: FilterButtonSize.Small,
        }}
/>
```

#### Only Sort

```tsx
<Filter
    headline={'Sortierung'}
    sortConfig={{
            items: [
                { text: 'alphanumerisch', id: 'alphanumerisch' },
                { text: 'zuletzt hinzugefügt', id: 'latest' },
            ],
            selectedItem: { text: 'alphanumerisch', id: 'alphanumerisch' },
            onSortChange: () => {},
        }}
/>
```

#### Only Checkbox

```tsx
<Filter
    headline={'Checkbox'}
    checkboxConfig={{
            children: 'Checkbox Label',
        }}
/>
```

#### Only Combobox

```tsx
<Filter
    headline={'Combobox'}
    comboboxConfig={{
            label: 'Kategorie wählen',
            placeholder: 'Keine Kategorie gewählt',
            lists: [
                {
                    list: [
                        { text: 'Alle Kategorien', value: 'all', icons: ['fa fa-list'] },
                        {
                            text: 'Lebensmittel',
                            value: 'food',
                            icons: ['fa fa-burger'],
                            subtext: 'Frisch & regional',
                        },
                        { text: 'Getränke', value: 'drinks', icons: ['fa fa-bottle-water'] },
                        { text: 'Haushalt', value: 'household', icons: ['fa fa-soap'] },
                        {
                            text: 'Elektronik',
                            value: 'electronics',
                            icons: ['fa fa-bolt'],
                            subtext: 'Smartphones, TV & mehr',
                        },
                        { text: 'Bekleidung', value: 'clothing', icons: ['fa fa-tshirt'] },
                    ],
                },
            ],
        }}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `Filter` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## FilterButtons

`FilterButtons` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { FilterButtons } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<FilterButtons
    items={[
                {
                    id: '1',
                    text: 'Essen',
                    color: 'red',
                    icons: ['fa fa-burger'],
                    count: 5,
                },
                {
                    id: '2',
                    text: 'Getränke',
                    color: 'green',
                    icons: ['fa fa-bottle-water'],
                    count: 74,
                },
                {
                    id: '3',
                    text: 'Nachtisch',
                    color: 'blue',
                    icons: ['fa fa-pie'],
                    isDisabled: true,
                    count: 32,
                },
                {
                    id: '4',
                    text: 'Snacks',
                    color: 'purple',
                    icons: ['fa fa-cookie'],
                    count: 45,
                },
            ]}
/>
```

#### Filter Button With Small Buttons

```tsx
<FilterButtons
    items={[
                {
                    id: '1',
                    text: 'Essen',
                    color: 'red',
                    icons: ['fa fa-burger'],
                    count: 5,
                },
                {
                    id: '2',
                    text: 'Getränke',
                    color: 'green',
                    icons: ['fa fa-bottle-water'],
                    count: 74,
                },
                {
                    id: '3',
                    text: 'Nachtisch',
                    color: 'blue',
                    icons: ['fa fa-pie'],
                    isDisabled: true,
                    count: 32,
                },
                {
                    id: '4',
                    text: 'Snacks',
                    color: 'purple',
                    icons: ['fa fa-cookie'],
                    count: 45,
                },
            ]}
    size={FilterButtonSize.Small}
/>
```

#### Filter Button With Selected Ids

```tsx
<FilterButtons
    items={[
                {
                    id: '1',
                    text: 'Essen',
                    color: 'red',
                    icons: ['fa fa-burger'],
                    count: 5,
                },
                {
                    id: '2',
                    text: 'Getränke',
                    color: 'green',
                    icons: ['fa fa-bottle-water'],
                    count: 74,
                },
                {
                    id: '3',
                    text: 'Nachtisch',
                    color: 'blue',
                    icons: ['fa fa-pie'],
                    isDisabled: true,
                    count: 32,
                },
                {
                    id: '4',
                    text: 'Snacks',
                    color: 'purple',
                    icons: ['fa fa-cookie'],
                    count: 45,
                },
            ]}
    selectedItemIds={['1', '3']}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `FilterButtons` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## GridImage

`GridImage` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { GridImage } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<GridImage
    images={[
                'https://tsimg.cloud/77896-21884/8aee1a304297729a4542b97325940a656a3da8f2.png',
                'https://tsimg.cloud/77896-21884/54a117f35e5fb57520e64471461af5491c0eff06.png',
                'https://tsimg.cloud/77896-21884/25399416f38c1d960f521a3530c8a2bc70a88bb9.png',
                'https://tsimg.cloud/77896-21884/fce5e30f68c75c8c524cc9ac0887832f263b79ff.png',
            ]}
    size={250}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `GridImage` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## GroupedImage

`GroupedImage` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { GroupedImage } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<GroupedImage
    images={[
                'https://picsum.photos/id/669/160/160.jpg',
                'https://picsum.photos/id/823/160/160.jpg',
            ]}
    shouldPreventBackground={false}
    shouldShowRoundImage
/>
```

#### Larger Dimensions

```tsx
<GroupedImage
    images={[
            'https://picsum.photos/id/669/320/320.jpg',
            'https://picsum.photos/id/823/320/320.jpg',
        ]}
    shouldPreventBackground={false}
    shouldShowRoundImage
    height={'80px'}
/>
```

#### With Corner Image

```tsx
<GroupedImage
    images={[
                'https://picsum.photos/id/669/160/160.jpg',
                'https://picsum.photos/id/823/160/160.jpg',
            ]}
    shouldPreventBackground={false}
    shouldShowRoundImage
    cornerImage={'https://sub60.tobit.com/l/1214?size=160'}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `GroupedImage` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## HighlightSlider

`HighlightSlider` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { HighlightSlider } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<HighlightSlider
    count={5}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `HighlightSlider` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## Icon

`Icon` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { Icon } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<Icon
    icons={['ts-chayns']}
    isDisabled={false}
    shouldStopPropagation={false}
    size={24}
/>
```

#### Stacked Icon

```tsx
<Icon
    icons={['fa fa-circle fa-stack-2x', 'fa fa-french-fries fa-inverse']}
    isDisabled={false}
    shouldStopPropagation={false}
    size={64}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `Icon` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## Input

`Input` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { Input } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<Input
    placeholder={'Try me out'}
/>
```

#### With Right Element

```tsx
<Input
    placeholder={'Try me out'}
    rightElement={<div
                style={{
                    backgroundColor: '#3377b6',
                    height: '42px',
                    width: '42px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Icon icons={['ts-calling-code']} size={25} color={'white'} />
            </div>}
/>
```

#### With Dynamic Placeholders

```tsx
<Input
    placeholder={<Typewriter
                children={[
                    'Erstelle mir einen Bericht über...',
                    'Erkläre mir die Photosynthese.',
                    'Wie sage ich auf englisch...',
                ]}
                shouldHideCursor
            />}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `Input` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## List

`List` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { List, ListItem } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<List>
    {
        [
                <ListItem
                    shouldShowTooltipOnTitleOverflow
                    subtitle="Stet clita kasd gubergren"
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                />,
                <ListItem
                    shouldShowTooltipOnTitleOverflow
                    subtitle="Lorem ipsum dolor sit amet"
                    title="Stet clita kasd gubergren, no sea takimata sanctus est"
                />,
                <ListItem
                    shouldShowTooltipOnTitleOverflow
                    subtitle="Consetetur sadipscing elitr"
                    title="At vero eos et accusam et justo duo dolores et ea rebum sit amet dolor sea takimata sanctus est"
                />,
                <ListItem
                    shouldShowTooltipOnTitleOverflow
                    subtitle="No sea takimata sanctus est"
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                />,
            ]
    }
</List>
```

#### List Items With Image

```tsx
<List>
    {
        [
                <ListItem
                    images={[images[0]]}
                    subtitle="Sadipscing elitr dolor sit"
                    shouldShowRoundImageOrIcon
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                />,
                <ListItem
                    images={[images[1]]}
                    subtitle="Stet clita kasd gubergren"
                    shouldShowRoundImageOrIcon
                    title="Stet clita kasd gubergren, no sea takimata sanctus est"
                />,
                <ListItem
                    images={[images[2]]}
                    subtitle="At vero eos et accusam"
                    shouldShowRoundImageOrIcon
                    title="At vero eos et accusam et justo duo dolores et ea rebum sit amet dolor"
                />,
                <ListItem
                    images={[images[3]]}
                    subtitle="Dolor sit ipsum amet"
                    shouldShowRoundImageOrIcon
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                />,
            ]
    }
</List>
```

#### List Items With Grid Image

```tsx
<List>
    {
        [
                <ListItem
                    images={images}
                    subtitle="Sadipscing elitr dolor sit"
                    shouldShowRoundImageOrIcon
                    shouldOpenImageOnClick
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                />,
                <ListItem
                    images={otherImages}
                    subtitle="Dolor sit ipsum amet"
                    shouldShowRoundImageOrIcon
                    title="Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet"
                />,
            ]
    }
</List>
```

#### List Items With Right Elements

```tsx
<List>
    {
        [
                <ListItem
                    images={[locationImages[0]]}
                    rightElements={{
                        center: <AmountControl />,
                    }}
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr consetetur"
                    subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr consetetur amet dolor"
                />,
                <ListItem
                    images={[locationImages[1]]}
                    rightElements={<AmountControl />}
                    title="No sea takimata sanctus est Lorem ipsum dolor sit amet"
                />,
                <ListItem
                    images={[locationImages[1]]}
                    rightElements={{
                        center: <AmountControl />,
                    }}
                    subtitle="Dolor sit ipsum amet"
                    title="gubergren, no sea takimata"
                >
                    <ListItemContent>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                        takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet.
                    </ListItemContent>
                </ListItem>,
                <ListItem
                    images={[locationImages[1]]}
                    rightElements={<AmountControl />}
                    subtitle="Dolor sit ipsum amet"
                    title="gubergren, no sea takimata"
                >
                    <ListItemContent>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                        takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet.
                    </ListItemContent>
                </ListItem>,
                <ListItem
                    images={[locationImages[1]]}
                    rightElements={{
                        top: (
                            <Badge backgroundColor="lightgreen" fontColor="white">
                                - 13,54%
                            </Badge>
                        ),
                        bottom: 'Bottom',
                        center: <Icon icons={['fa fa-star']} />,
                    }}
                    title="gubergren, no sea takimata"
                >
                    <ListItemContent>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                        takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet.
                    </ListItemContent>
                </ListItem>,
                <ListItem
                    images={[locationImages[2]]}
                    rightElements={{
                        top: '08:57 Uhr',
                    }}
                    subtitle="Dolor sit ipsum amet"
                    title="sanctus est lorem ipsum dolor sit amet"
                />,
                <ListItem
                    images={[locationImages[2]]}
                    rightElements={{
                        bottom: '08:57 Uhr',
                    }}
                    subtitle="Dolor sit ipsum amet"
                    title="sanctus est lorem ipsum dolor sit amet"
                />,
                <ListItem
                    images={[locationImages[2]]}
                    rightElements={{
                        top: 'Top',
                        bottom: '08:57 Uhr',
                        topAlignment: 'start',
                    }}
                    subtitle="Dolor sit ipsum amet"
                    title="sanctus est lorem ipsum dolor sit amet"
                />,
            ]
    }
</List>
```

#### List Items With Separator

```tsx
<List>
    {
        [
                <ListItem
                    images={[locationImages[0]]}
                    subtitle="Sadipscing elitr dolor sit"
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                />,
                <ListItem
                    images={[locationImages[1]]}
                    subtitle="Sadipscing elitr dolor sit"
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                />,
                <ListItem
                    images={[locationImages[2]]}
                    shouldShowSeparatorBelow
                    subtitle="Sadipscing elitr dolor sit"
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                />,
                <ListItem
                    images={[locationImages[0]]}
                    subtitle="Sadipscing elitr dolor sit"
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                />,
                <ListItem
                    images={[locationImages[1]]}
                    subtitle="Sadipscing elitr dolor sit"
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                />,
                <ListItem
                    images={[locationImages[2]]}
                    subtitle="Sadipscing elitr dolor sit"
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                />,
            ]
    }
</List>
```

#### List Items With Button As Right Elements

```tsx
<List>
    {
        [
                <ListItem images={[otherImages[0]]} subtitle="Max Mustermann" title="Ballermann Hits">
                    <List>
                        <ListItem
                            images={[locationImages[0]]}
                            subtitle="Julian Sommer"
                            title="Oben Ohne"
                            rightElements={{
                                center: (
                                    <Button icon="fa fa-plus" onClick={() => {}}>
                                        Hinzufügen
                                    </Button>
                                ),
                            }}
                        />
                        <ListItem
                            images={[locationImages[1]]}
                            subtitle="Julian Sommer"
                            title="Morgen kickt der Kater"
                            rightElements={{
                                center: (
                                    <Button icon="fa fa-plus" onClick={() => {}}>
                                        Hinzufügen
                                    </Button>
                                ),
                            }}
                        />
                        <ListItem
                            images={[locationImages[2]]}
                            subtitle="Bierkapitän x Eko Fresh"
                            title="Ihr könnt mich alle"
                            rightElements={{ center: <Badge>Hinzugefügt</Badge> }}
                        />
                    </List>
                </ListItem>,
                <ListItem images={[otherImages[1]]} subtitle="Doris Musterfrau" title="Vevo Top Hits" />,
            ]
    }
</List>
```

#### List Items With Hover Item

```tsx
<List>
    {
        [
                <ListItem
                    hoverItem={<Icon icons={['far fa-arrows-v']} />}
                    images={[locationImages[0]]}
                    subtitle="Sadipscing elitr dolor sit"
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                />,
                <ListItem
                    hoverItem={<Icon icons={['far fa-arrows-v']} />}
                    images={[locationImages[1]]}
                    subtitle="Dolor sit ipsum amet"
                    title="Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet"
                />,
            ]
    }
</List>
```

#### List Items With Icon

```tsx
<List>
    {
        [
                <ListItem
                    icons={['ts-chayns']}
                    subtitle="Sed diam voluptua"
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                />,
                <ListItem
                    icons={['ts-chayns']}
                    subtitle="At vero eos et accusam"
                    title="Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet"
                />,
                <ListItem
                    icons={['ts-chayns']}
                    subtitle="Stet clita kasd gubergren"
                    title="At vero eos et accusam et justo duo dolores et ea rebum sit amet dolor"
                />,
                <ListItem
                    icons={['ts-chayns']}
                    subtitle="At vero eos et accusam et justo duo"
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                />,
            ]
    }
</List>
```

#### Expandable List Items

```tsx
<List>
    {
        [
                <ListItem
                    images={[images[0]]}
                    shouldShowRoundImageOrIcon
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                    shouldOpenImageOnClick
                >
                    <ListItemContent>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                        takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet.
                    </ListItemContent>
                </ListItem>,
                <ListItem
                    images={[images[1]]}
                    shouldShowRoundImageOrIcon
                    title="Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet"
                >
                    <ListItemContent>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                        takimata sanctus est Lorem ipsum dolor sit amet.
                    </ListItemContent>
                </ListItem>,
                <ListItem
                    images={[images[2]]}
                    subtitle="Stet clita kasd gubergren, no sea takimata sanctus"
                    shouldShowRoundImageOrIcon
                    title="At vero eos et accusam et justo duo dolores et ea rebum sit amet dolor"
                >
                    <ListItemContent>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                        takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua.
                    </ListItemContent>
                </ListItem>,
                <ListItem
                    images={[images[3]]}
                    subtitle="Labore et dolore magna aliquyam erat"
                    shouldShowRoundImageOrIcon
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                >
                    <ListItemContent>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                        takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum.
                    </ListItemContent>
                </ListItem>,
            ]
    }
</List>
```

#### Mixed List Items

```tsx
<List>
    {
        [
                <ListItem
                    icons={['ts-chayns']}
                    subtitle="Stet clita kasd gubergren, no sea"
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                />,
                <ListItem
                    icons={['fa fa-rocket']}
                    subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                    title="Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet"
                >
                    <ListItemContent>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                        takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum.
                    </ListItemContent>
                </ListItem>,
                <ListItem
                    icons={['ts-chayns']}
                    subtitle="Consetetur sadipscing elitr, sed diam nonumy eirmod"
                    title="At vero eos et accusam et justo duo dolores et ea rebum sit amet dolor"
                />,
                <ListItem
                    icons={['fa fa-rocket']}
                    subtitle="Et justo duo dolores et ea rebum"
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                >
                    <ListItemContent>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                        takimata sanctus est Lorem ipsum dolor sit amet.
                    </ListItemContent>
                </ListItem>,
            ]
    }
</List>
```

#### List Items With Element As Subtitle

```tsx
<List>
    {
        [
                <ListItem subtitle={<FirstSubtitleElement />} title="Chicken Burger">
                    <ListItemContent>
                        <FirstSubtitleElement />
                    </ListItemContent>
                </ListItem>,
                <ListItem subtitle={<SecondSubtitleElement />} title="BamBoo! Prime Steak">
                    <ListItemContent>
                        <SecondSubtitleElement />
                    </ListItemContent>
                </ListItem>,
            ]
    }
</List>
```

#### List Item With Title Element

```tsx
<List>
    {
        [
                <ListItem
                    icons={['ts-chayns']}
                    subtitle="Stet clita kasd gubergren, no sea"
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                    titleElement={<Icon icons={['fa fa-rocket']} />}
                />,
                <ListItem
                    icons={['fa fa-rocket']}
                    subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                    title="Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet"
                    titleElement={<Icon icons={['ts-chayns']} />}
                />,
                <ListItem
                    icons={['ts-chayns']}
                    subtitle="Consetetur sadipscing elitr, sed diam nonumy eirmod"
                    title="At vero eos et accusam et justo duo dolores et ea rebum sit amet dolor"
                    titleElement={<Icon icons={['fa fa-rocket']} />}
                />,
                <ListItem
                    icons={['fa fa-rocket']}
                    subtitle="Et justo duo dolores et ea rebum"
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                    titleElement={<Icon icons={['ts-chayns']} />}
                />,
            ]
    }
</List>
```

#### List Item With Greyed Title

```tsx
<List>
    {
        [
                <ListItem
                    images={[locationImages[0]]}
                    subtitle="Sadipscing elitr dolor sit"
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                    isTitleGreyed
                    shouldRenderClosed
                >
                    <ListItemContent>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                        takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet.
                    </ListItemContent>
                </ListItem>,
                <ListItem
                    images={[locationImages[1]]}
                    subtitle="Sadipscing elitr dolor sit"
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                >
                    <ListItemContent>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                        takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet.
                    </ListItemContent>
                </ListItem>,
                <ListItem
                    images={[locationImages[2]]}
                    subtitle="Sadipscing elitr dolor sit"
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                    isTitleGreyed
                >
                    <ListItemContent>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                        takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet.
                    </ListItemContent>
                </ListItem>,
                <ListItem
                    images={[locationImages[0]]}
                    subtitle="Sadipscing elitr dolor sit"
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                >
                    <ListItemContent>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                        takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet.
                    </ListItemContent>
                </ListItem>,
                <ListItem
                    images={[locationImages[1]]}
                    subtitle="Sadipscing elitr dolor sit"
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                    isTitleGreyed
                >
                    <ListItemContent>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                        takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet.
                    </ListItemContent>
                </ListItem>,
                <ListItem
                    images={[locationImages[2]]}
                    subtitle="Sadipscing elitr dolor sit"
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                >
                    <ListItemContent>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
                        takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
                        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet.
                    </ListItemContent>
                </ListItem>,
            ]
    }
</List>
```

#### List Item With Hidden Bottom Lines

```tsx
<List>
    {
        [
                <ListItem
                    images={[images[0]]}
                    subtitle="Sadipscing elitr dolor sit"
                    shouldHideBottomLine
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                />,
                <ListItem
                    images={[images[1]]}
                    subtitle="Stet clita kasd gubergren"
                    shouldHideBottomLine
                    title="Stet clita kasd gubergren, no sea takimata sanctus est"
                />,
                <ListItem
                    images={[images[2]]}
                    subtitle="At vero eos et accusam"
                    shouldHideBottomLine
                    title="At vero eos et accusam et justo duo dolores et ea rebum sit amet dolor"
                />,
                <ListItem
                    images={[images[3]]}
                    subtitle="Dolor sit ipsum amet"
                    shouldHideBottomLine
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                />,
            ]
    }
</List>
```

#### Intercom List Items

```tsx
<List>
    {
        [
                <ListItem
                    subtitle="Stet clita kasd gubergren"
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                    images={[images[0], images[1]]}
                    shouldShowRoundImageOrIcon
                />,
                <ListItem
                    subtitle="Lorem ipsum dolor sit amet"
                    title="Stet clita kasd gubergren, no sea takimata sanctus est"
                    images={[images[0]]}
                    shouldShowRoundImageOrIcon
                />,
                <ListItem
                    subtitle="Consetetur sadipscing elitr"
                    title="At vero eos et accusam et justo duo dolores et ea rebum sit amet dolor sea takimata sanctus est"
                    images={[images[3], images[2]]}
                    careOfLocationId={185043}
                    shouldShowRoundImageOrIcon
                />,
                <ListItem
                    subtitle="No sea takimata sanctus est"
                    title="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
                    images={[images[3]]}
                    careOfLocationId={1214}
                    shouldShowRoundImageOrIcon
                />,
            ]
    }
</List>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `List` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## MentionFinder

`MentionFinder` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { MentionFinder } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<MentionFinder
    inputValue={'Kannst Du @j'}
    members={[
                {
                    id: 'JAN-NIK96',
                    imageUrl: 'https://sub60.tobit.com/u/JAN-NIK96',
                    name: 'Jannik Weise',
                    shouldShowRoundImage: true,
                },
                {
                    id: '132-22953',
                    imageUrl: 'https://sub60.tobit.com/u/132-22953',
                    name: 'Jakob Wensing',
                    shouldShowRoundImage: true,
                },
                {
                    id: '131-31077',
                    imageUrl: 'https://sub60.tobit.com/u/131-31077',
                    name: 'Jegor Schweizer',
                    shouldShowRoundImage: true,
                },
                {
                    id: '133-46566',
                    imageUrl: 'https://sub60.tobit.com/u/133-46566',
                    name: 'Leon Dankbar',
                    shouldShowRoundImage: true,
                },
                {
                    id: '368-48669',
                    imageUrl: 'https://sub60.tobit.com/u/368-48669',
                    name: 'Patrick Janning',
                    shouldShowRoundImage: true,
                },
                {
                    id: '126-52360',
                    imageUrl: 'https://sub60.tobit.com/u/126-52360',
                    name: 'Jannik Test',
                    shouldShowRoundImage: true,
                },
                {
                    id: '132-50444',
                    imageUrl: 'https://sub60.tobit.com/u/132-50444',
                    name: 'Günther Grütze',
                    shouldShowRoundImage: true,
                },
                {
                    id: 'CHA-YNSAI',
                    imageUrl: 'https://sub60.tobit.com/u/CHA-YNSAI',
                    name: 'chayns Assistant',
                    shouldShowRoundImage: true,
                },
            ]}
    popupAlignment={MentionFinderPopupAlignment.Bottom}
/>
```

#### Top Aligned With Drag

```tsx
<MentionFinder
    inputValue={'Kannst Du @j'}
    members={[
                {
                    id: 'JAN-NIK96',
                    imageUrl: 'https://sub60.tobit.com/u/JAN-NIK96',
                    name: 'Jannik Weise',
                    shouldShowRoundImage: true,
                },
                {
                    id: '132-22953',
                    imageUrl: 'https://sub60.tobit.com/u/132-22953',
                    name: 'Jakob Wensing',
                    shouldShowRoundImage: true,
                },
                {
                    id: '131-31077',
                    imageUrl: 'https://sub60.tobit.com/u/131-31077',
                    name: 'Jegor Schweizer',
                    shouldShowRoundImage: true,
                },
                {
                    id: '133-46566',
                    imageUrl: 'https://sub60.tobit.com/u/133-46566',
                    name: 'Leon Dankbar',
                    shouldShowRoundImage: true,
                },
                {
                    id: '368-48669',
                    imageUrl: 'https://sub60.tobit.com/u/368-48669',
                    name: 'Patrick Janning',
                    shouldShowRoundImage: true,
                },
                {
                    id: '126-52360',
                    imageUrl: 'https://sub60.tobit.com/u/126-52360',
                    name: 'Jannik Test',
                    shouldShowRoundImage: true,
                },
                {
                    id: '132-50444',
                    imageUrl: 'https://sub60.tobit.com/u/132-50444',
                    name: 'Günther Grütze',
                    shouldShowRoundImage: true,
                },
                {
                    id: 'CHA-YNSAI',
                    imageUrl: 'https://sub60.tobit.com/u/CHA-YNSAI',
                    name: 'chayns Assistant',
                    shouldShowRoundImage: true,
                },
            ]}
    popupAlignment={MentionFinderPopupAlignment.Bottom}
    enableDragHandle
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `MentionFinder` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## MultiActionButton

`MultiActionButton` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { MultiActionButton } from '@chayns-components/core';
```

### Examples

#### Default

```tsx
<MultiActionButton
    isDisabled={false}
    extendedTimeoutMs={2000}
    primaryAction={{
                icon: 'fa fa-pen',
                label: 'Chatten',
            }}
    secondaryAction={{
                icon: 'fa fa-microphone',
                label: 'Mitschnitt starten',
            }}
/>
```

#### Width Override

```tsx
<MultiActionButton
    isDisabled={false}
    extendedTimeoutMs={2000}
    primaryAction={{
                icon: 'fa fa-pen',
                label: 'Chatten',
            }}
    secondaryAction={{
                icon: 'fa fa-microphone',
                label: 'Mitschnitt starten',
            }}
    width={260}
/>
```

#### Full Width

```tsx
<MultiActionButton
    isDisabled={false}
    extendedTimeoutMs={2000}
    primaryAction={{
                icon: 'fa fa-pen',
                label: 'Chatten',
            }}
    secondaryAction={{
                icon: 'fa fa-microphone',
                label: 'Mitschnitt starten',
            }}
    shouldUseFullWidth
/>
```

#### Long Labels

```tsx
<MultiActionButton
    isDisabled={false}
    extendedTimeoutMs={2000}
    primaryAction={{
            icon: 'fa fa-pen',
            label: 'Ein langes Label für den Test der Ellipsis',
        }}
    secondaryAction={{
            icon: 'fa fa-microphone',
            label: 'Ein noch viel längeres Label das mit Sicherheit gekürzt werden muss!',
        }}
/>
```

#### Custom Background

```tsx
<MultiActionButton
    isDisabled={false}
    extendedTimeoutMs={2000}
    primaryAction={{
                icon: 'fa fa-pen',
                label: 'Chatten',
            }}
    secondaryAction={{
                icon: 'fa fa-microphone',
                label: 'Mitschnitt starten',
            }}
    backgroundColor={'#0f6d7e'}
/>
```

#### Action Specific Backgrounds

```tsx
<MultiActionButton
    isDisabled={false}
    extendedTimeoutMs={2000}
    primaryAction={{
            icon: 'fa fa-pen',
            label: 'Chatten',
            backgroundColor: '#0f6d7e',
        }}
    secondaryAction={{
            icon: 'fa fa-microphone',
            label: 'Mitschnitt starten',
            backgroundColor: '#8c1c13',
        }}
/>
```

#### Only Primary

```tsx
<MultiActionButton
    isDisabled={false}
    extendedTimeoutMs={2000}
    primaryAction={{
                icon: 'fa fa-pen',
                label: 'Chatten',
            }}
    secondaryAction={undefined}
/>
```

#### Pulsing Secondary

```tsx
<MultiActionButton
    isDisabled={false}
    extendedTimeoutMs={2000}
    primaryAction={{
                icon: 'fa fa-pen',
                label: 'Chatten',
            }}
    secondaryAction={{
            icon: 'fa fa-microphone',
            label: 'Mitschnitt starten',
            status: {
                type: MultiActionButtonStatusType.Pulse,
                pulseColors: ['#A50000', '#630000'],
            },
        }}
/>
```

#### Pulsing Secondary Custom Colors

```tsx
<MultiActionButton
    isDisabled={false}
    extendedTimeoutMs={2000}
    primaryAction={{
                icon: 'fa fa-pen',
                label: 'Chatten',
            }}
    secondaryAction={{
            icon: 'fa fa-microphone',
            label: 'Mitschnitt starten',
            status: {
                type: MultiActionButtonStatusType.Pulse,
                pulseColors: ['#00A500', '#006300'],
            },
        }}
/>
```

#### Large Size

```tsx
<MultiActionButton
    isDisabled={false}
    extendedTimeoutMs={2000}
    primaryAction={{
                icon: 'fa fa-pen',
                label: 'Chatten',
            }}
    secondaryAction={{
                icon: 'fa fa-microphone',
                label: 'Mitschnitt starten',
            }}
    height={MultiActionButtonHeight.Large}
/>
```

#### Disabled Action With Reason

```tsx
<MultiActionButton
    isDisabled={false}
    extendedTimeoutMs={2000}
    primaryAction={{
                icon: 'fa fa-pen',
                label: 'Chatten',
            }}
    secondaryAction={{
            icon: 'fa fa-microphone',
            label: 'Mitschnitt starten',
            isDisabled: true,
            disabledReason:
                'Verwende die Sidekick™ App oder den Sidekick™ Desktop Client, um Mitschnitte zu erstellen.',
        }}
/>
```

#### React Element Icons

```tsx
<MultiActionButton
    isDisabled={false}
    extendedTimeoutMs={2000}
    primaryAction={{
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2 14.7 9.3 22 12l-7.3 2.7L12 22l-2.7-7.3L2 12l7.3-2.7L12 2z" />
                </svg>
            ),
            label: 'Chatten',
        }}
    secondaryAction={{
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3a4 4 0 0 1 4 4v5a4 4 0 1 1-8 0V7a4 4 0 0 1 4-4zm-6 9a1 1 0 1 1 2 0 4 4 0 0 0 8 0 1 1 0 1 1 2 0 6 6 0 0 1-5 5.91V21h2a1 1 0 1 1 0 2H9a1 1 0 1 1 0-2h2v-3.09A6 6 0 0 1 6 12z" />
                </svg>
            ),
            label: 'Mitschnitt starten',
        }}
/>
```

#### Recording Flow

```tsx
<MultiActionButton
    isDisabled={false}
    extendedTimeoutMs={2000}
    primaryAction={{
                icon: 'fa fa-pen',
                label: 'Chatten',
            }}
    secondaryAction={{
                icon: 'fa fa-microphone',
                label: 'Mitschnitt starten',
            }}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `MultiActionButton` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## NumberInput

`NumberInput` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { NumberInput } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<NumberInput />
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `NumberInput` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## Popup

`Popup` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { Popup } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<Popup
    content={<span style={{ display: 'block' }}>
                    <h1 style={{ margin: 0 }}>Popup</h1>
                    <p>Das ist ein Popup!</p>
                </span>}
/>
```

#### Long Content

```tsx
<Popup
    content={<div
                style={{
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    whiteSpace: 'nowrap',
                }}
            >
                <div>A - Apfel</div>
                <div>B - Baum</div>
                <div>C - Computer</div>
                <div>D - Dach</div>
                <div>E - Elefant</div>
                <div>F - Fahrrad</div>
                <div>G - Gitarre</div>
                <div>H - Haus</div>
                <div>I - Insel</div>
                <div>J - Jaguar</div>
                <div>K - Känguru</div>
                <div>L - Lampe</div>
                <div>M - Mond</div>
                <div>N - Nase</div>
                <div>O - Orange</div>
                <div>P - Papier</div>
                <div>Q - Quelle</div>
                <div>R - Rakete</div>
                <div>S - Sonne</div>
                <div>T - Tiger</div>
                <div>U - Uhr</div>
                <div>V - Vogel</div>
                <div>W - Wasser</div>
                <div>X - Xylophon</div>
                <div>Y - Yacht</div>
                <div>Z - Zitrone</div>
            </div>}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `Popup` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## ProgressBar

`ProgressBar` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { ProgressBar } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<ProgressBar
    percentage={34}
    label={'Uploading...'}
/>
```

#### Infinity Progress Bar

```tsx
<ProgressBar
    percentage={undefined}
    label={'Uploading...'}
/>
```

#### AIService Progress

```tsx
<ProgressBar
    percentage={34}
    label={'34% verbraucht'}
    steps={[25, 50, 75, 95]}
    shouldShowLabelInline
/>
```

#### Moving Thumb Label

```tsx
<ProgressBar
    percentage={34}
    label={'Uploading...'}
    thumbLabel={'Beispiel Thumblabel'}
/>
```

#### Shine Animation

```tsx
<ProgressBar
    percentage={100}
    label={'Uploading...'}
    showShine
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `ProgressBar` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## RadioButton

`RadioButton` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { RadioButton } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<RadioButton
    label={'Test'}
/>
```

#### With Right Element

```tsx
<RadioButton
    label={'Bestellung zum Tisch (Beach)'}
    rightElement={<Button onClick={() => {}}>ca. 10 Min</Button>}
>
    {
        <>
                    <p style={{ margin: '12px 0' }}>
                        Sag uns bitte noch wo Du sitzt. Wir bringen Dir Deine Bestellung dann zum Tisch.
                    </p>
                    <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <div style={{ width: '80%' }}>
                            <Input placeholder="Tischnummer" />
                        </div>
                        <Button onClick={() => {}}>Scannen</Button>
                    </div>
                </>
    }
</RadioButton>
```

#### Multiple Radio Buttons

```tsx
<RadioButton
    label={'Test'}
/>
```

#### Disabled Radio Buttons

```tsx
<RadioButton
    label={'Test'}
/>
```

#### With Children

```tsx
<RadioButton
    label={'Test'}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `RadioButton` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## ScrollView

`ScrollView` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { ScrollView } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<ScrollView />
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `ScrollView` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## SearchBox

`SearchBox` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { SearchBox } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<SearchBox
    placeholder={'Essen holen'}
    lists={[
                {
                    groupName: undefined,
                    list: ITEMS,
                },
            ]}
/>
```

#### With Images

```tsx
<SearchBox
    placeholder={'Essen holen'}
    lists={[
            {
                groupName: undefined,
                list: [
                    {
                        imageUrl: 'https://picsum.photos/200',
                        id: '1',
                        text: 'Pizza',
                    },
                    { imageUrl: 'https://picsum.photos/200', id: '2', text: 'Burger' },
                    { imageUrl: 'https://picsum.photos/200', id: '3', text: 'Nudeln' },
                    { imageUrl: 'https://picsum.photos/200', id: '4', text: 'Steak' },
                    { imageUrl: 'https://picsum.photos/200', id: '5', text: 'Pommes' },
                    { imageUrl: 'https://picsum.photos/200', id: '6', text: 'Reis' },
                ],
            },
        ]}
/>
```

#### With Groups

```tsx
<SearchBox
    placeholder={'Essen holen'}
    lists={[
            {
                groupName: 'Essbar',
                list: [
                    { id: '1', text: 'Pizza' },
                    { id: '2', text: 'Burger' },
                    { id: '3', text: 'Nudeln' },
                    { id: '4', text: 'Steak' },
                    { id: '5', text: 'Pommes' },
                    { id: '6', text: 'Reis' },
                ],
            },
            {
                groupName: 'Nicht essbar',
                list: [
                    { id: '7', text: 'Baum' },
                    { id: '8', text: 'Stein' },
                    { id: '9', text: 'Ziegelstein' },
                    { id: '10', text: 'Tastatur' },
                    { id: '11', text: 'Hosen' },
                    { id: '12', text: 'Luft' },
                ],
            },
        ]}
/>
```

#### With Delayed Items

```tsx
<SearchBox
    placeholder={'Essen holen'}
    lists={[
                {
                    groupName: undefined,
                    list: ITEMS,
                },
            ]}
    shouldAddInputToList={false}
    shouldHideFilterButtons
    shouldShowContentOnEmptyInput={false}
/>
```

#### With Tag Input

```tsx
<SearchBox
    placeholder={'Essen holen'}
    lists={[
                {
                    groupName: undefined,
                    list: ITEMS,
                },
            ]}
    tagInputSettings={{
            tags: [
                {
                    id: '1',
                    text: 'Pizza',
                },
            ],
        }}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `SearchBox` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## SearchInput

`SearchInput` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { SearchInput } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<SearchInput
    placeholder={'Finden'}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `SearchInput` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## SelectButton

`SelectButton` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { SelectButton } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<SelectButton
    buttonText={'Pizza auswählen'}
    list={[
                { text: 'Salami', id: 1 },
                { text: 'Thunfisch', id: 2 },
                { text: 'Döner', id: 3 },
            ]}
    selectedItemIds={[1]}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `SelectButton` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## SetupWizard

`SetupWizard` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { SetupWizard } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<SetupWizard />
```

#### Setup Wizard Inside Accordion

```tsx
<SetupWizard />
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `SetupWizard` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## SetupWizardItem

`SetupWizardItem` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { Input, RadioButton, RadioButtonGroup, SetupWizardItem } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<SetupWizardItem
    step={1}
    id={0}
    title={'Dein Essen'}
    shouldEnableButton
>
    {
        <>
                        <h3>Teile uns dein Lieblingsessen mit</h3>
                        <RadioButtonGroup>
                            <RadioButton id="0" label="Nudeln" />
                            <RadioButton id="1" label="Pizza" />
                            <RadioButton id="2" label="Pommes" />
                            <RadioButton id="3" label="Salat" />
                        </RadioButtonGroup>
                        <h5>Dein Essen ist nicht dabei? Kein Problem, schreibe es uns einfach.</h5>
                        <Input placeholder="Essen eingeben" />
                    </>
    }
</SetupWizardItem>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `SetupWizardItem` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## SharingBar

`SharingBar` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { SharingBar } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<SharingBar
    label={'Teilen'}
    link={'https://components.chayns.net/'}
    popupAlignment={ContextMenuAlignment.BottomRight}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `SharingBar` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## SharingButton

`SharingButton` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { SharingButton } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<SharingButton
    link={'https://components.chayns.net/'}
    alignment={ContextMenuAlignment.BottomRight}
>
    {'Teilen'}
</SharingButton>
```

#### Top Alignment

```tsx
<SharingButton
    link={'https://components.chayns.net/'}
    alignment={ContextMenuAlignment.TopCenter}
>
    {'Teilen'}
</SharingButton>
```

#### Bottom Right Alignment

```tsx
<SharingButton
    link={'https://components.chayns.net/'}
    alignment={ContextMenuAlignment.BottomRight}
>
    {'Teilen'}
</SharingButton>
```

#### Custom Link

```tsx
<SharingButton
    link={'https://github.com/TobitSoftware/chayns-components'}
    alignment={ContextMenuAlignment.BottomLeft}
>
    {'Teilen'}
</SharingButton>
```

#### Disabled

```tsx
<SharingButton
    link={'https://components.chayns.net/'}
    alignment={ContextMenuAlignment.BottomRight}
    isDisabled
>
    {'Teilen'}
</SharingButton>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `SharingButton` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## Signature

`Signature` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { Signature } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<Signature
    buttonText={'Unterschreiben'}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `Signature` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## Slider

`Slider` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { Slider } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<Slider
    maxValue={100}
    minValue={0}
/>
```

#### Range Slider

```tsx
<Slider
    maxValue={100}
    minValue={0}
    interval={{
            maxValue: 50,
            minValue: 10,
        }}
/>
```

#### With Highlighted Steps

```tsx
<Slider
    maxValue={4}
    minValue={0}
    shouldHighlightSteps
    step={1}
    value={1}
/>
```

#### With Partial Range

```tsx
<Slider
    maxValue={4}
    minValue={0}
    maxEnabledValue={3}
    minEnabledValue={1}
    shouldHighlightSteps
    step={1}
    value={2}
/>
```

#### With Thumb Label Formatter

```tsx
<Slider
    maxValue={13.37}
    minValue={0}
    shouldShowThumbLabel
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `Slider` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## SliderButton

`SliderButton` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { SliderButton } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<SliderButton
    items={[
                { id: 'montag', text: 'Mo.' },
                { id: 'dienstag', text: 'Di.' },
                { id: 'mittwoch', text: 'Mi.' },
                { id: 'donnerstag', text: 'Do.' },
                { id: 'freitag', text: 'Fr.' },
                { id: 'samstag', text: 'Sa.' },
                { id: 'sonntag', text: 'So.' },
            ]}
/>
```

#### Expanded

```tsx
<SliderButton
    items={[
            { id: 'montag', text: 'Montag' },
            { id: 'dienstag', text: 'Dienstag' },
            { id: 'mittwoch', text: 'Mittwoch' },
            { id: 'donnerstag', text: 'Donnerstag' },
            { id: 'freitag', text: 'Freitag' },
            { id: 'samstag', text: 'Samstag' },
            { id: 'sonntag', text: 'Sonntag' },
        ]}
/>
```

#### Rounded

```tsx
<SliderButton
    items={[
            { id: 'parken', text: 'Parken' },
            { id: 'fahren', text: 'Fahren' },
        ]}
    isRounded
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `SliderButton` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## SmallWaitCursor

`SmallWaitCursor` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { SmallWaitCursor } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<SmallWaitCursor
    shouldHideBackground={false}
    shouldHideWaitCursor={false}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `SmallWaitCursor` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## TagInput

`TagInput` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { TagInput } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<TagInput
    tags={[
                { id: 'pizza', text: 'Pizza' },
                { id: 'nudeln', text: 'Nudeln' },
            ]}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `TagInput` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## TextArea

`TextArea` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { TextArea } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<TextArea
    placeholder={'Nachricht schreiben'}
/>
```

#### Disabled

```tsx
<TextArea
    placeholder={'Nachricht schreiben'}
    isDisabled
/>
```

#### Max Height

```tsx
<TextArea
    placeholder={'Nachricht schreiben'}
    maxHeight={'200px'}
/>
```

#### Right Element

```tsx
<TextArea
    placeholder={'Nachricht schreiben'}
    rightElement={<div
                style={{
                    backgroundColor: '#3377b6',
                    height: '100%',
                    width: '42px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Icon icons={['ts-calling-code']} size={25} color={'white'} />
            </div>}
/>
```

#### With Ref

```tsx
<TextArea
    placeholder={'Nachricht schreiben'}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `TextArea` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## Tooltip

`Tooltip` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { Tooltip } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<Tooltip
    item={{
                headline: 'Info',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula nisi sapien, in vehicula elit malesuada sit amet. Vivamus ac ultricies felis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas felis ligula, pulvinar id ipsum sit amet, placerat blandit orci. Aenean purus magna, aliquam eu pellentesque blandit, maximus maximus quam. Vestibulum non elit vitae turpis efficitur tincidunt. Vestibulum pretium eleifend fermentum. Ut rutrum nec nisl quis mollis. Proin non erat ex. Integer nulla felis, lacinia sed fringilla sed, dignissim in neque. Etiam quis sem tempor, pulvinar neque ac, lobortis massa. Maecenas nec sapien erat. Donec nisl leo, sollicitudin id fermentum pellentesque, condimentum a ligula. Maecenas vel interdum ligula. In sagittis, nulla condimentum porta ornare, ante velit ornare tellus, et vehicula quam lacus luctus turpis.',
                button: { text: 'Hallo', onClick: () => alert('hallo') },
                imageUrl:
                    'https://tsimg.cloud/77896-21884/25399416f38c1d960f521a3530c8a2bc70a88bb9.png',
            }}
    itemWidth={'300px'}
>
    {'Hover me!'}
</Tooltip>
```

#### On Checkbox

```tsx
<Tooltip
    item={{
                headline: 'Info',
                text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vehicula nisi sapien, in vehicula elit malesuada sit amet. Vivamus ac ultricies felis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas felis ligula, pulvinar id ipsum sit amet, placerat blandit orci. Aenean purus magna, aliquam eu pellentesque blandit, maximus maximus quam. Vestibulum non elit vitae turpis efficitur tincidunt. Vestibulum pretium eleifend fermentum. Ut rutrum nec nisl quis mollis. Proin non erat ex. Integer nulla felis, lacinia sed fringilla sed, dignissim in neque. Etiam quis sem tempor, pulvinar neque ac, lobortis massa. Maecenas nec sapien erat. Donec nisl leo, sollicitudin id fermentum pellentesque, condimentum a ligula. Maecenas vel interdum ligula. In sagittis, nulla condimentum porta ornare, ante velit ornare tellus, et vehicula quam lacus luctus turpis.',
                button: { text: 'Hallo', onClick: () => alert('hallo') },
                imageUrl:
                    'https://tsimg.cloud/77896-21884/25399416f38c1d960f521a3530c8a2bc70a88bb9.png',
            }}
    itemWidth={'300px'}
>
    {<Checkbox>Checkbox mit Tooltip</Checkbox>}
</Tooltip>
```

#### On Deactivated Input

```tsx
<Tooltip
    item={{
            headline: undefined,
            text: 'Aktiviere den Agenten, um das Briefing zu testen.',
            imageUrl: undefined,
            button: undefined,
        }}
    itemWidth={undefined}
    shouldUseChildrenWidth
>
    {<Input isDisabled placeholder="Deaktiviert"></Input>}
</Tooltip>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `Tooltip` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## Truncation

`Truncation` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { Button, Truncation } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<Truncation
    collapsedHeight={100}
>
    {
        <div>
                <p id="isPasted">
                    Der legendärste Abend: Homecoming at next! Studenten und Ausreißer, Urlauber und
                    Daheimgebliebene, Partymäuse und Partymuffel – sie alle zieht es am Tag vor Heiligabend
                    in die Heimat an einen zuvor ausgemachten Ort, um all die guten Freunde und alte
                    Bekannte wiederzutreffen.
                </p>
                <p>
                    Was damals vor vielen Jahren auf der StattAlm auf dem Campus in Ahaus begann, führen wir
                    bei uns im next fort!&nbsp;
                </p>
                <p>Alle Infos und Tickets zum Event in Kürze.&nbsp;</p>
                <Button onClick={() => alert('hallo')}>test</Button>
            </div>
    }
</Truncation>
```

#### Animated Children

```tsx
<Truncation
    collapsedHeight={100}
>
    {
        <>
                    <p id="isPasted">
                        Der legendärste Abend: Homecoming at next! Studenten und Ausreißer, Urlauber und
                        Daheimgebliebene, Partymäuse und Partymuffel – sie alle zieht es am Tag vor
                        Heiligabend in die Heimat an einen zuvor ausgemachten Ort, um all die guten Freunde
                        und alte Bekannte wiederzutreffen.
                    </p>
                    <Accordion title="Lorem">
                        <AccordionContent>
                            Der legendärste Abend: Homecoming at next! Studenten und Ausreißer, Urlauber und
                            Daheimgebliebene, Partymäuse und Partymuffel – sie alle zieht es am Tag vor
                            Heiligabend in die Heimat an einen zuvor ausgemachten Ort, um all die guten
                            Freunde und alte Bekannte wiederzutreffen.
                        </AccordionContent>
                    </Accordion>
                    <p>
                        Was damals vor vielen Jahren auf der StattAlm auf dem Campus in Ahaus begann, führen
                        wir bei uns im next fort!&nbsp;
                    </p>
                    <p>Alle Infos und Tickets zum Event in Kürze.&nbsp;</p>
                    <Button onClick={() => alert('hallo')}>test</Button>
                </>
    }
</Truncation>
```

#### Small Text

```tsx
<Truncation
    collapsedHeight={100}
>
    {<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>}
</Truncation>
```

#### Just Text

```tsx
<Truncation
    collapsedHeight={100}
>
    {
        <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia diam ut nisi
                    lacinia vestibulum. Donec sit amet euismod nisl. Morbi orci ipsum, lacinia in eros sit
                    amet, pulvinar vestibulum tellus. Orci varius natoque penatibus et magnis dis parturient
                    montes, nascetur ridiculus mus. Praesent non blandit ipsum. Aliquam libero quam,
                    fermentum sit amet massa id, gravida hendrerit ex. Donec lectus felis, feugiat eget
                    finibus eu, luctus id nunc. Nam at nibh magna. Integer congue aliquam turpis quis
                    iaculis. Quisque vestibulum sodales placerat. Cras semper ex quis feugiat pharetra. Nam
                    lacinia magna non vulputate ullamcorper. Vestibulum at orci nec ligula efficitur
                    volutpat eu eget enim. Ut tempus aliquet arcu, sit amet fringilla mi elementum sodales.
                    Nulla ut ullamcorper tortor, in hendrerit enim. Etiam vel vestibulum massa. Mauris
                    placerat, turpis vitae pharetra dapibus, libero lacus bibendum metus, nec condimentum
                    erat magna a neque. Ut euismod tincidunt tempus. Suspendisse ut velit id justo
                    vestibulum ullamcorper nec sit amet risus. Interdum et malesuada fames ac ante ipsum
                    primis in faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                    vestibulum, nibh eget efficitur venenatis, ipsum nibh rutrum massa, a posuere justo est
                    a metus. Donec a feugiat diam. Aliquam scelerisque in magna euismod accumsan. Maecenas
                    non vulputate nibh. Suspendisse scelerisque tristique augue, quis gravida felis tempor
                    sit amet. Orci varius natoque penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. Phasellus id eros eu ante pellentesque iaculis. Nullam porttitor mattis
                    lorem, a dapibus massa maximus nec. Maecenas consequat pharetra volutpat. Phasellus
                    finibus nisi in felis posuere condimentum. Aenean congue ornare est, ac maximus nulla
                    fermentum a. Etiam erat purus, ullamcorper ac dolor vel, pellentesque pellentesque
                    tortor. Nulla vitae ligula id lectus commodo ornare sed ac dolor. Aenean tincidunt
                    sodales quam a rutrum. Proin ac nisi eu justo ultrices iaculis vel eget nisi. Aliquam at
                    mattis nisl. Nunc pellentesque eleifend vehicula. Cras convallis eget nisl non laoreet.
                    Nulla facilisi. In ultrices massa a ornare interdum. Sed pellentesque odio posuere
                    malesuada imperdiet. Duis ac dapibus orci. Class aptent taciti sociosqu ad litora
                    torquent per conubia nostra, per inceptos himenaeos. Mauris volutpat in arcu ut laoreet.
                    Donec a porta mauris. Nulla viverra congue nisl, ut lobortis mi consequat ut. Phasellus
                    non eros ut erat venenatis dictum. Sed purus dui, consequat et malesuada nec, molestie
                    ac odio.
                </p>
    }
</Truncation>
```

#### Floating Image

```tsx
<Truncation
    collapsedHeight={350}
>
    {
        <div>
                    <img style={{ float: 'right' }} alt="" src="https://picsum.photos/200" />
                    <div>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia diam ut
                            nisi lacinia vestibulum. Donec sit amet euismod nisl. Morbi orci ipsum, lacinia
                            in eros sit amet, pulvinar vestibulum tellus. Orci varius natoque penatibus et
                            magnis dis parturient montes, nascetur ridiculus mus. Praesent non blandit
                            ipsum. Aliquam libero quam, fermentum sit amet massa id, gravida hendrerit ex.
                            Donec lectus felis, feugiat eget finibus eu, luctus id nunc. Nam at nibh magna.
                            Integer congue aliquam turpis quis iaculis. Quisque vestibulum sodales placerat.
                            Cras semper ex quis feugiat pharetra.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia diam ut
                            nisi lacinia vestibulum. Donec sit amet euismod nisl. Morbi orci ipsum, lacinia
                            in eros sit amet, pulvinar vestibulum tellus. Orci varius natoque penatibus et
                            magnis dis parturient montes, nascetur ridiculus mus. Praesent non blandit
                            ipsum. Aliquam libero quam, fermentum sit amet massa id, gravida hendrerit ex.
                            Donec lectus felis, feugiat eget finibus eu, luctus id nunc. Nam at nibh magna.
                            Integer congue aliquam turpis quis iaculis. Quisque vestibulum sodales placerat.
                            Cras semper ex quis feugiat pharetra.
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia diam ut
                            nisi lacinia vestibulum. Donec sit amet euismod nisl. Morbi orci ipsum, lacinia
                            in eros sit amet, pulvinar vestibulum tellus. Orci varius natoque penatibus et
                            magnis dis parturient montes, nascetur ridiculus mus. Praesent non blandit
                            ipsum. Aliquam libero quam, fermentum sit amet massa id, gravida hendrerit ex.
                            Donec lectus felis, feugiat eget finibus eu, luctus id nunc. Nam at nibh magna.
                            Integer congue aliquam turpis quis iaculis. Quisque vestibulum sodales placerat.
                            Cras semper ex quis feugiat pharetra.
                        </p>
                    </div>
                </div>
    }
</Truncation>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `Truncation` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
## VerificationBadge

`VerificationBadge` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { VerificationBadge } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<VerificationBadge />
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `VerificationBadge` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
