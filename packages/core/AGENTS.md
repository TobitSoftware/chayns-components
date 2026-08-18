# @chayns-components/core

React component package providing 47 documented components for chayns applications.

Documented components: `Accordion`, `AmountControl`, `AnimatedNumber`, `Badge`, `Button`, `Checkbox`, `ComboBox`, `ContentCard`, `ContextMenu`, `CopyableContent`, `ExpandableContent`, `FileInput`, `FileList`, `FileSelect`, `Filter`, `FilterButtons`, `GridImage`, `GroupedImage`, `HighlightSlider`, `Icon`, `Input`, `List`, `Masonry`, `MentionFinder`, `MultiActionButton`, `NumberInput`, `Popup`, `ProgressBar`, `RadioButton`, `ScrollView`, `SearchBox`, `SearchInput`, `SelectButton`, `SetupWizard`, `SetupWizardItem`, `SharingBar`, `SharingButton`, `Signature`, `Skeleton`, `Slider`, `SliderButton`, `SmallWaitCursor`, `TagInput`, `TextArea`, `Tooltip`, `Truncation`, `VerificationBadge`.

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
- `CopyableContent`
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
- `Masonry`
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
- `Skeleton`
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

#### Controlled Accordion Group

```tsx
<Accordion />
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

| name | type | required | description |
| --- | --- | --- | --- |
| `bodyMaxHeight` | `number \| undefined` | no | Maximum height of the accordion body element. This automatically makes the content of the<br />body element scrollable. |
| `children` | `ReactNode` | yes | The content of the accordion body |
| `colors` | `AccordionColors \| undefined` | no | Provide custom colors to the Accordion Component |
| `icon` | `string \| undefined` | no | The icon that is displayed in front of the title |
| `isDefaultOpen` | `boolean \| undefined` | no | This can be used to automatically expand the Accordion during the first render. |
| `isDisabled` | `boolean \| undefined` | no | This will disable the Accordion so that it cannot be opened and will gray out the title. Does not work with isOpened. |
| `isFixed` | `boolean \| undefined` | no | This can be used so that the Accordion cannot be opened or closed.<br />In addition, in this case the icon is exchanged to mark the Accordions. |
| `isOpened` | `boolean \| undefined` | no | This can be used to open the Accordion from the outside |
| `isTitleGreyed` | `boolean \| undefined` | no | This will gray out the title of the Accordion to indicate hidden content, for example. |
| `onBodyAnimationComplete` | `VoidFunction \| undefined` | no | Function that is executed when the accordion body is animated |
| `onBodyScroll` | `((event: UIEvent<HTMLDivElement, UIEvent>) => void) \| undefined` | no | Function that is executed when the accordion body will be scrolled |
| `onClose` | `VoidFunction \| undefined` | no | Function that is executed when the accordion will be closed. |
| `onHoverEnd` | `MouseEventHandler<HTMLDivElement> \| undefined` | no | Function to be executed when the accordion is no longer hovered. |
| `onHoverStart` | `MouseEventHandler<HTMLDivElement> \| undefined` | no | Function to be executed when the accordion is hovered. |
| `onOpen` | `VoidFunction \| undefined` | no | Function that is executed when the accordion will be opened. |
| `onSearchChange` | `ChangeEventHandler<HTMLInputElement> \| undefined` | no | Function that is executed when the text of the search in the accordion<br />head changes. When this function is given, the search field is displayed<br />in the Accordion Head. |
| `onTitleInputChange` | `ChangeEventHandler<HTMLInputElement> \| undefined` | no | Function that is executed when the text of the search in the accordion<br />title changes. When this function is given, the search field is displayed<br />as the Accordion title. |
| `rightElement` | `ReactNode` | no | Content to be displayed on the right side in the head of the Accordion |
| `searchPlaceholder` | `string \| undefined` | no | The placeholder to be used for the search |
| `searchValue` | `string \| undefined` | no | The value that is displayed inside the search |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting. The highlighting is only visible while the<br />user navigates with the keyboard and is reset on mouse movement or click. |
| `shouldForceBackground` | `boolean \| undefined` | no | This will force the background color of the accordion to be used even if it is closed and not hovered. |
| `shouldForceBottomLine` | `boolean \| undefined` | no | Whether the bottom line should always be shown, regardless of other line-related props. |
| `shouldHideBackground` | `boolean \| undefined` | no | This will hide the background color of the accordion |
| `shouldHideBottomLine` | `boolean \| undefined` | no | Whether the bottom line should be hidden. |
| `shouldIndex` | `boolean \| undefined` | no | Whether the accordion should be indexed. |
| `shouldRenderClosed` | `boolean \| undefined` | no | This will render the Accordion closed on the first render. |
| `shouldRotateIcon` | `boolean \| undefined` | no | Whether the icon should be rotating. |
| `shouldSkipAnimation` | `boolean \| undefined` | no | Whether the animation should be skipped.<br />If 'isDefaultOpen' is true the initial animation will be skipped even this prop is false |
| `title` | `string \| undefined` | no | Title of the Accordion displayed in the head |
| `titleElement` | `ReactNode` | no | Additional elements to be displayed in the header next to the title. |
| `titleInputProps` | `InputProps \| undefined` | no | The props of the title Input. |

### Types

No additional exported types documented.

### Usage Notes

- Import `Accordion` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `children`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `amount` | `number \| undefined` | no | The amount that should be displayed. |
| `icon` | `string \| undefined` | no | The icon that should be displayed if no amount is selected. |
| `iconColor` | `string \| undefined` | no | The color of the icon. |
| `isDisabled` | `boolean \| undefined` | no | Whether the control should be disabled |
| `label` | `string \| undefined` | no | A Text that should be displayed if no amount is selected; |
| `maxAmount` | `number \| undefined` | no | The maximum allowed amount. If the maxAmount is reached, a check icon is displayed on the left side. |
| `minAmount` | `number \| undefined` | no | The minimum allowed amount. |
| `onChange` | `((amount: number) => void) \| undefined` | no | A Function that is executed when the amount is changed |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting. The highlighting is only visible while the<br />user navigates with the keyboard and is reset on mouse movement or click. |
| `shouldForceLabel` | `boolean \| undefined` | no | Whether the label should be displayed even if an amount is selected. |
| `shouldShowAddIconOnMinAmount` | `boolean \| undefined` | no | Whether the "add"-icon should be displayed if the minAmount is reached. |
| `shouldShowIcon` | `boolean \| undefined` | no | Whether the icon should be displayed if no amount is selected |
| `shouldShowWideInput` | `boolean \| undefined` | no | Whether the input should be wider |
| `step` | `number \| undefined` | no | Defines the amount that will change when adjusted |

### Types

No additional exported types documented.

### Usage Notes

- Import `AmountControl` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `delay` | `number \| undefined` | no | Start delay of the animation in seconds. |
| `duration` | `number \| undefined` | no | Total duration of the animation in seconds. |
| `ease` | `Ease \| undefined` | no | Easing curve of the animation (e.g., cubic-bezier like [0.16, 1, 0.3, 1] or predefined easings).<br />Controls how the animation accelerates/decelerates. |
| `format` | `((n: number) => string) \| undefined` | no | Custom formatter for the displayed value.<br />If provided, it overrides locale/toLocaleString and round.<br />Example: (n) => `${Math.round(n)} points` |
| `locale` | `string \| undefined` | no | Locale used by toLocaleString when no custom formatter is provided. |
| `onComplete` | `(() => void) \| undefined` | no | Callback invoked when the animation completes. |
| `round` | `((n: number) => number) \| undefined` | no | Custom rounding function when no custom formatter is provided.<br />Default: Math.round |
| `startFrom` | `number \| undefined` | no | Starting value for the animation.<br />Default: 0 |
| `value` | `number` | yes | Target value to animate to. |

### Types

No additional exported types documented.

### Usage Notes

- Import `AnimatedNumber` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `value`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `backgroundColor` | `BackgroundColor \| undefined` | no | The background color of the badge. |
| `children` | `ReactNode` | no | The content of the badge. |
| `className` | `string \| undefined` | no | Additional class names for the badge element. |
| `design` | `BadgeDesign \| undefined` | no | The design of the Badge. |
| `fontColor` | `Color \| undefined` | no | The font color of the badge. |
| `onClick` | `MouseEventHandler \| undefined` | no | Function to be executed when the badge is clicked. |
| `size` | `BadgeSize \| undefined` | no | The size of the badge. |

### Types

- `BadgeDesign` -> `enum BadgeDesign {
    /** Default design with background color and no border */
    DEFAULT = 'default',
    /** Design with border only, no background color */
    BORDER = 'border',
}`
- `BadgeSize` -> `enum BadgeSize {
    /** Small size */
    SMALL = 'small',
    /** Default size */
    DEFAULT = 'default',
}`

### Usage Notes

- Import `Badge` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `buttonDesign` | `number \| undefined` | no | Optional button design override. |
| `children` | `ReactNode` | no | The label of the button. |
| `className` | `string \| undefined` | no | Additional class names for the button element. |
| `icon` | `string \| undefined` | no | An icon that is displayed on the left-hand side of the button text. |
| `isDisabled` | `boolean \| undefined` | no | Whether the button is disabled and cannot be clicked anymore. |
| `isSecondary` | `boolean \| undefined` | no | Displays the button in the secondary style. |
| `onClick` | `MouseEventHandler<HTMLButtonElement>` | yes | Function to be executed when the button is clicked. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting. |
| `shouldShowAsSelectButton` | `boolean \| undefined` | no | Whether the button should be displayed as a selectButton. |
| `shouldShowTextAsRobotoMedium` | `boolean \| undefined` | no | Whether the text should be 'Roboto Medium'. |
| `shouldShowWaitCursor` | `boolean \| undefined` | no | Shows a wait cursor instead of button text. |
| `shouldStopPropagation` | `boolean \| undefined` | no | Stops event propagation on click. |
| `tapDuration` | `number \| undefined` | no | Duration in seconds for the tap animation. |

### Types

No additional exported types documented.

### Usage Notes

- Import `Button` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `onClick`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `borderRadius` | `BorderRadius<string \| number> \| undefined` | no | Border radius for the checkbox or switch indicator. |
| `children` | `string \| ReactElement<any, string \| JSXElementConstructor<any>> \| undefined` | no | Text for checkbox or switch |
| `colors` | `CheckboxColors \| undefined` | no | No description available. |
| `isChecked` | `boolean \| undefined` | no | Indicates whether the checkbox or switch is selected |
| `isDisabled` | `boolean \| undefined` | no | Disables the checkbox or switch so it cannot be toggled |
| `labelClassName` | `string \| undefined` | no | Classname for the label |
| `onChange` | `ChangeEventHandler<HTMLInputElement> \| undefined` | no | Function to be executed if the checked value changes |
| `shouldChangeOnLabelClick` | `boolean \| undefined` | no | Whether the label should change the state of the checkbox |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting. |
| `shouldShowAsSwitch` | `boolean \| undefined` | no | Changes the design to use switch instead of checkbox |
| `shouldShowCentered` | `boolean \| undefined` | no | Whether the Checkbox should be displayed centered to the label or at the top |

### Types

No additional exported types documented.

### Usage Notes

- Import `Checkbox` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `bodyWidth` | `number \| undefined` | no | The width of the body. |
| `container` | `Element \| undefined` | no | The element where the content of the `ComboBox` should be rendered via React Portal. |
| `direction` | `DropdownDirection \| undefined` | no | The direction in which the combobox should open. |
| `inputValue` | `string \| undefined` | no | The value of the optional input. |
| `isDisabled` | `boolean \| undefined` | no | Whether the combobox should be disabled. |
| `lists` | `IComboBoxItems[]` | yes | The list of the items that should be displayed. |
| `maxHeight` | `number \| undefined` | no | The maximum height of the combobox content. |
| `onHide` | `(() => void) \| undefined` | no | Function to be executed when the content of the `ComboBox` is hidden. |
| `onInputBlur` | `FocusEventHandler<HTMLInputElement> \| undefined` | no | Function to be executed when the optional input lost its focus. |
| `onInputChange` | `ChangeEventHandler<HTMLInputElement> \| undefined` | no | Function to be executed when the value of the optional input is changed. |
| `onInputFocus` | `FocusEventHandler<HTMLInputElement> \| undefined` | no | Function to be executed when the optional input gets its focus. |
| `onSelect` | `((comboboxItem?: IComboBoxItem \| undefined) => boolean \| void \| Promise<boolean>) \| undefined` | no | Function that should be executed when an item is selected. If the function returns false, the item will not be selected. |
| `onShow` | `(() => void) \| undefined` | no | Function to be executed when the content of the `ComboBox` is shown. |
| `placeholder` | `string` | yes | A text that should be displayed when no item is selected. |
| `prefix` | `string \| undefined` | no | A prefix that should be displayed before the placeholder. |
| `prefixMinWidth` | `number \| undefined` | no | Optional min width for the prefix element. |
| `selectedItem` | `IComboBoxItem \| undefined` | no | An item that should be preselected. |
| `shouldCaptureEvents` | `boolean \| undefined` | no | Whether the outside events should be captured. |
| `shouldDropDownUseMaxItemWidth` | `boolean \| undefined` | no | If true, the dropdown will use the maximum width of the items. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables the shared keyboard-only focus ring for the combobox header. |
| `shouldShowBigImage` | `boolean \| undefined` | no | If true, the images of the items are displayed in a bigger shape. This prop will automatically be set to true if the subtext of an item is given. |
| `shouldShowClearIcon` | `boolean \| undefined` | no | If true, a clear icon is displayed at the end of the combo box if an item is selected. |
| `shouldShowRoundImage` | `boolean \| undefined` | no | If true, the images of the items are displayed in a round shape. |
| `shouldShowTransparentBackground` | `boolean \| undefined` | no | Whether the background should be transparent. |
| `shouldUseCurrentItemWidth` | `boolean \| undefined` | no | Whether the width of the ComboBox should be the width of the current item. |
| `shouldUseFullWidth` | `boolean \| undefined` | no | Whether the width of the 'ComboBox' should be the width of the parent or of the widest item. |
| `size` | `ComboBoxSize \| undefined` | no | The size of the ComboBox. |

### Types

- `ComboBoxSize` -> `enum ComboBoxSize {
    /**
     * Standard height and spacing.
     */
    NORMAL = 'normal',
    /**
     * Compact height and spacing.
     */
    SMALL = 'small',
}`
- `DropdownDirection` -> `enum DropdownDirection {
    BOTTOM,
    TOP,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    TOP_LEFT,
    TOP_RIGHT,
    LEFT,
    RIGHT,
}`

### Usage Notes

- Import `ComboBox` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `lists`, `placeholder`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | no | The content of the content card |
| `onClick` | `(() => void) \| undefined` | no | The onClick event handler |
| `type` | `ContentCardType \| undefined` | no | The type of the content card |

### Types

- `ContentCardType` -> `enum ContentCardType {
    Default = 'default',
    Error = 'error',
    Success = 'success',
    Warning = 'warning',
    SiteColor = 'siteColor',
}`

### Usage Notes

- Import `ContentCard` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

#### With YOffset

```tsx
<ContextMenu
    yOffset={12}
/>
```

### Props

| name | type | required | description |
| --- | --- | --- | --- |
| `alignment` | `ContextMenuAlignment \| undefined` | no | Context menu alignment |
| `children` | `ReactNode` | no | Children element |
| `className` | `string \| undefined` | no | Additional class name applied to the trigger wrapper. |
| `container` | `Element \| undefined` | no | Container element |
| `coordinates` | `ContextMenuCoordinates \| undefined` | no | Custom coordinates |
| `dialogText` | `string \| undefined` | no | Optional text for the select dialog. |
| `headline` | `string \| undefined` | no | Context menu headline |
| `items` | `ContextMenuItem[]` | yes | Menu items |
| `onHide` | `VoidFunction \| undefined` | no | Hide callback function |
| `onShow` | `VoidFunction \| undefined` | no | Show callback function |
| `shouldCloseOnPopupClick` | `boolean \| undefined` | no | Close on popup click flag |
| `shouldDisableClick` | `boolean \| undefined` | no | Disable click flag |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting for the trigger. |
| `shouldHidePopupArrow` | `boolean \| undefined` | no | Hide popup arrow flag |
| `shouldShowHoverEffect` | `boolean \| undefined` | no | Show hover effect flag |
| `shouldUseDefaultTriggerStyles` | `boolean \| undefined` | no | Whether the default trigger padding/background styles should be applied. |
| `style` | `CSSProperties \| undefined` | no | Inline styles applied to the trigger wrapper. |
| `yOffset` | `number \| undefined` | no | Vertical offset between the trigger element and the context menu. |
| `zIndex` | `number \| undefined` | no | Z-index value |

### Types

- `ContextMenuAlignment` -> `enum ContextMenuAlignment {
    TopLeft,
    BottomLeft,
    TopRight,
    BottomRight,
    TopCenter,
    BottomCenter,
}`
- `ContextMenuCoordinates` -> `type ContextMenuCoordinates = {
    /** The x-coordinate. */
    x: number;
    /** The y-coordinate. */
    y: number;
};`
- `ContextMenuItem` -> `type ContextMenuItem = {
    /** Optional icons for the item. Can be strings or React nodes. */
    icons?: string[] | ReactNode;
    /** Whether the item is selected. */
    isSelected?: boolean;
    /** Unique key for the item. */
    key: string;
    /** Function called when the item is clicked. */
    onClick: (event?: MouseEvent<HTMLDivElement>) => Promise<void> | void;
    /** Whether to show a spacer after the item. */
    shouldShowSpacer?: boolean;
    /** The text displayed for the item. */
    text: string;
};`

### Usage Notes

- Import `ContextMenu` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `items`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
## CopyableContent

`CopyableContent` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { CopyableContent } from '@chayns-components/core';
```

### Examples

#### Short

```tsx
<CopyableContent
    content={'Vielen Dank für eure Rückmeldungen. Der Termin für das gemeinsame Sommerfest steht nun fest: Samstag, 22. August, ab 15 Uhr.'}
/>
```

#### Long

```tsx
<CopyableContent
    content={Array.from(
            { length: 8 },
            (_, index) =>
                `### Abschnitt ${index + 1}\n\nDas Planungsteam hat die Hinweise aus den Gesprächen aufgenommen und bereitet jetzt die nächsten Schritte vor. Bis Ende der Woche sammeln wir noch Rückmeldungen, damit alle Beteiligten zuverlässig informiert sind.`,
        ).join('\n\n')}
/>
```

#### Collapsed

```tsx
<CopyableContent
    collapsedHeight={180}
    content={Array.from(
            { length: 12 },
            (_, index) =>
                `### Abschnitt ${index + 1}\n\nDas Planungsteam hat die Hinweise aus den Gesprächen aufgenommen und bereitet jetzt die nächsten Schritte vor.`,
        ).join('\n\n')}
/>
```

#### Disabled

```tsx
<CopyableContent
    content={'Dieser Inhalt wird noch aktualisiert. Kopieren und Teilen sind bis zum Abschluss deaktiviert.'}
    isDisabled
/>
```

#### Typewriter Loop

```tsx
<CopyableContent />
```

#### Markdown

```tsx
<CopyableContent
    content={`# Projekt-Update: Sommerfest
    
    Die Vorbereitungen für das Sommerfest gehen in die letzte Runde. Das Organisationsteam hat die Rückmeldungen aus den einzelnen Gruppen zusammengeführt und den Ablauf für den Nachmittag angepasst.
    
    ## Was bereits feststeht
    
    - Der Aufbau beginnt am Freitag um 16:30 Uhr am Bürgerhaus.
    - Für Kinder gibt es eine Kreativstation, eine kleine Rallye und einen ruhigen Rückzugsbereich.
    - Getränke und vegetarische Speisen werden vor Ort angeboten.
    
    > Bitte gebt Rückmeldung, falls ihr beim Aufbau helfen könnt oder besondere Anforderungen an die Verpflegung habt.
    
    Weitere Informationen stehen im [gemeinsamen Ablaufplan](https://example.com/veranstaltungen/sommerfest-2026/ablauf-und-helferinnen).`}
/>
```

#### Long Url

```tsx
<CopyableContent
    content={'Die vollständige Materialliste findet ihr unter https://example.com/veranstaltungen/sommerfest-2026/organisation/materialien/helferinnen-und-helfer/abstimmung-und-zeitplan.'}
/>
```

#### Dark

```tsx
<CopyableContent
    content={`${PROJECT_UPDATE}\n\n---\n\nDiese Story bitte mit dunklem Storybook-Hintergrund prüfen.`}
/>
```

#### Chat Appearance

```tsx
<CopyableContent
    appearance={CopyableContentAppearance.Chat}
    content={`# Projekt-Update: Sommerfest
    
    Die Vorbereitungen für das Sommerfest gehen in die letzte Runde. Das Organisationsteam hat die Rückmeldungen aus den einzelnen Gruppen zusammengeführt und den Ablauf für den Nachmittag angepasst.
    
    ## Was bereits feststeht
    
    - Der Aufbau beginnt am Freitag um 16:30 Uhr am Bürgerhaus.
    - Für Kinder gibt es eine Kreativstation, eine kleine Rallye und einen ruhigen Rückzugsbereich.
    - Getränke und vegetarische Speisen werden vor Ort angeboten.
    
    > Bitte gebt Rückmeldung, falls ihr beim Aufbau helfen könnt oder besondere Anforderungen an die Verpflegung habt.
    
    Weitere Informationen stehen im [gemeinsamen Ablaufplan](https://example.com/veranstaltungen/sommerfest-2026/ablauf-und-helferinnen).`}
/>
```

#### Nested Scroll Container

```tsx
<CopyableContent
    content={Array.from(
            { length: 12 },
            (_, index) =>
                `### Update ${index + 1}\n\nDas Organisationsteam hat die aktuelle Rückmeldung zusammengefasst. Bitte prüft die offenen Punkte und gebt bis Freitag Bescheid, falls sich bei eurer Planung noch etwas geändert hat.`,
        ).join('\n\n')}
/>
```

#### Virtualized Chat Message

```tsx
<CopyableContent />
```

#### Conversation

```tsx
<CopyableContent
    content={`### Nächster Schritt
    
    Bitte prüft die **offenen Aufgaben** und ergänzt eure Rückmeldung bis Freitagmittag. Die vollständige Übersicht steht im [gemeinsamen Ablaufplan](https://example.com/ablaufplan).`}
/>
```

### Props

| name | type | required | description |
| --- | --- | --- | --- |
| `appearance` | `CopyableContentAppearance \| undefined` | no | Controls the visual surface of the content block. |
| `children` | `ReactNode` | no | Replaces only the visible rendered content and never the copied source. |
| `collapsedHeight` | `number \| undefined` | no | The height of the content in its collapsed state. |
| `content` | `string` | yes | Markdown source used for rendering and clipboard data. |
| `copyFailedMessage` | `string \| undefined` | no | Replaces the localized error message shown when copying fails. |
| `isDisabled` | `boolean \| undefined` | no | Disables the copy and share actions. |
| `transformClipboardHtml` | `((html: string) => string) \| undefined` | no | Transforms the generated HTML before it is written to the clipboard. |

### Types

No additional exported types documented.

### Usage Notes

- Import `CopyableContent` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `content`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | yes | The children that should be animated. |
| `isOpen` | `boolean` | yes | Whether the content is expanded. |
| `startDelay` | `number \| undefined` | no | An optional start delay. |

### Types

No additional exported types documented.

### Usage Notes

- Import `ExpandableContent` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `children`, `isOpen`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `files` | `IFileItem[] \| undefined` | no | Already uploaded files to display. |
| `fileSelectionIcons` | `string[] \| undefined` | no | An array of icons that should be displayed inside the FileInput |
| `fileSelectionPlaceholder` | `string \| undefined` | no | The text that should be displayed inside the FileInput. |
| `fileTypes` | `string \| undefined` | no | The filetypes that could be selected. Example for multiple types: 'image/*, video/*'. |
| `imageSelectIcons` | `string[] \| undefined` | no | The icon of the image selection. |
| `imageSelectPlaceholder` | `string \| undefined` | no | If set, pictures can be select via Pixabay. |
| `isDisabled` | `boolean \| undefined` | no | Whether the FileInput is disabled. |
| `maxFiles` | `number \| undefined` | no | The maximum amount of Files that can be uploaded. |
| `maxFileSizeInMB` | `number \| undefined` | no | The maximum size of a file in MB. |
| `onAdd` | `((files: File[] \| UploadedFile[]) => void) \| undefined` | no | A function to be executed when files are added. |
| `onMaxFilesReached` | `(() => void) \| undefined` | no | Function to be executed when the maximum amount of Files are reached. |
| `onRemove` | `((file: IFileItem \| File \| UploadedFile) => void) \| undefined` | no | A function to be executed when a file is removed. |
| `shouldAllowDownload` | `boolean \| undefined` | no | Whether to show a download icon for files that have a `source` set. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting for the file selection trigger. |
| `shouldPreventImageUpload` | `boolean \| undefined` | no | Whether the image upload should be prevented. |

### Types

No additional exported types documented.

### Usage Notes

- Import `FileInput` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `files` | `IFileItem[] \| undefined` | no | Already uploaded files to display. |
| `onRemove` | `((id: string) => void) \| undefined` | no | A function to be executed when a file is removed. |
| `shouldAllowDownload` | `boolean \| undefined` | no | Whether to show a download icon for files that have a `source` set. |

### Types

No additional exported types documented.

### Usage Notes

- Import `FileList` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `fileSelectionIcons` | `string[] \| undefined` | no | An array of icons that should be displayed inside the FileInput |
| `fileSelectionPlaceholder` | `string \| undefined` | no | The text that should be displayed inside the FileInput. |
| `fileTypes` | `string \| undefined` | no | The filetypes that could be selected. Example for multiple types: 'image/*, video/*'. |
| `imageSelectIcons` | `string[] \| undefined` | no | The icon of the image selection. |
| `imageSelectPlaceholder` | `string \| undefined` | no | If set, pictures can be select via Pixabay. |
| `isDisabled` | `boolean \| undefined` | no | Whether the FileInput is disabled. |
| `maxFiles` | `number \| undefined` | no | The maximum amount of Files that can be uploaded. |
| `maxFileSizeInMB` | `number \| undefined` | no | The maximum size of a file in MB. |
| `onAdd` | `((files: File[] \| UploadedFile[]) => void) \| undefined` | no | A function to be executed when files are added. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting for selection triggers. |
| `shouldPreventImageUpload` | `boolean \| undefined` | no | Whether the image upload should be prevented. |

### Types

No additional exported types documented.

### Usage Notes

- Import `FileSelect` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `checkboxConfig` | `CheckboxProps \| undefined` | no | No description available. |
| `comboboxConfig` | `ComboboxConfig \| undefined` | no | No description available. |
| `filterButtonConfig` | `FilterButtonsProps \| undefined` | no | No description available. |
| `headline` | `ReactNode` | yes | No description available. |
| `onActiveChange` | `((isActive: boolean) => void) \| undefined` | no | No description available. |
| `rightIcons` | `FilterRightIcon[] \| undefined` | no | No description available. |
| `searchConfig` | `SearchConfig \| undefined` | no | No description available. |
| `shouldAutoFocus` | `boolean \| undefined` | no | No description available. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | No description available. |
| `shouldShowRoundedHoverEffect` | `boolean \| undefined` | no | No description available. |
| `sortConfig` | `SortConfig \| undefined` | no | No description available. |

### Types

- `FilterRightIcon` -> `interface FilterRightIcon {
    icons: string[];
    onClick: VoidFunction;
}`
- `SearchConfig` -> `interface SearchConfig {
    /**
     * Callback invoked whenever the search input changes.
     */
    onSearchChange: (search: string) => void;
    /**
     * Current search value.
     */
    searchValue: string;
}`
- `SortConfig` -> `interface SortConfig {
    /**
     * Callback invoked when a sort item is selected.
     */
    onSortChange: (item: SortItem) => void;
    /**
     * Currently selected sort item.
     */
    selectedItem: SortItem;
    /**
     * Available sort items.
     */
    items: SortItem[];
}`

### Usage Notes

- Import `Filter` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `headline`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `allCount` | `number \| undefined` | no | The number that should be displayed as count in the "all" button. |
| `items` | `IFilterButtonItem[]` | yes | The items that should be displayed. |
| `onSelect` | `((keys: string[]) => void) \| undefined` | no | A function that should be executed when an item is selected. |
| `selectedItemIds` | `string[] \| undefined` | no | The keys of items that should be selected. |
| `shouldCalcCountForAll` | `boolean \| undefined` | no | If true, the count of all items will be shown in the "all" button. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting for filter buttons. |
| `size` | `FilterButtonSize \| undefined` | no | The size auf the filter buttons. Use the FilterButtonSize enum. |

### Types

- `FilterButtonSize` -> `enum FilterButtonSize {
    Small,
    Normal,
}`

### Usage Notes

- Import `FilterButtons` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `items`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

#### One Image

```tsx
<GridImage
    images={['https://tsimg.cloud/77896-21884/8aee1a304297729a4542b97325940a656a3da8f2.png']}
    size={250}
/>
```

#### Two Images

```tsx
<GridImage
    images={[
            'https://tsimg.cloud/77896-21884/8aee1a304297729a4542b97325940a656a3da8f2.png',
            'https://tsimg.cloud/77896-21884/54a117f35e5fb57520e64471461af5491c0eff06.png',
        ]}
    size={250}
/>
```

### Props

| name | type | required | description |
| --- | --- | --- | --- |
| `background` | `Background<string \| number> \| undefined` | no | The background color of the image. |
| `images` | `string[]` | yes | The images to be displayed in the `GridImage`. Only the first three images are displayed. |
| `onClick` | `MouseEventHandler<HTMLDivElement> \| undefined` | no | Function to be executed when the images are clicked. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting for clickable GridImage instances. |
| `shouldShowRoundImage` | `boolean \| undefined` | no | Images of users should always be displayed in a round shape. Therefore, this property can be set to true. |
| `size` | `number` | yes | The size of the `GridImage` in pixels, which is set as both width and height. |

### Types

No additional exported types documented.

### Usage Notes

- Import `GridImage` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `images`, `size`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `cornerElement` | `ReactNode` | no | Optional Element to display in the right corner of the image |
| `cornerImage` | `string \| undefined` | no | Optional image to display in the bottom right corner of the grouped image. |
| `height` | `number \| undefined` | no | Height of the grouped image container. |
| `imageBackground` | `Background<string \| number> \| undefined` | no | Background for the single images. |
| `images` | `string[]` | yes | Array of image URLs to display in the grouped image. If only one image is provided, it will be displayed as a full image. |
| `onClick` | `MouseEventHandler<HTMLDivElement> \| undefined` | no | Optional click handler for the grouped image. |
| `onImageError` | `((event: SyntheticEvent<HTMLImageElement, Event>, index: number) => void) \| undefined` | no | Optional handler for image load errors. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting for clickable grouped images. |
| `shouldPreventBackground` | `boolean \| undefined` | no | Whether to prevent the background of the images from being set. |
| `shouldShowRoundImage` | `boolean \| undefined` | no | Whether to show the images in a round shape. |

### Types

No additional exported types documented.

### Usage Notes

- Import `GroupedImage` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `images`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `colors` | `HighlightSliderItemColors \| undefined` | no | The Colors of the slider. |
| `count` | `number` | yes | The total number of sections, that should be displayed. |
| `currentIndex` | `number` | yes | The current index. |
| `duration` | `number \| undefined` | no | The duration of the animation of a single item in seconds. |
| `onIndexChange` | `((index: number) => void) \| undefined` | no | Function to be executed if the index has changed. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting for interactive slider items. |

### Types

No additional exported types documented.

### Usage Notes

- Import `HighlightSlider` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `count`, `currentIndex`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `className` | `string \| undefined` | no | Additional class name for the icon wrapper element. |
| `color` | `string \| undefined` | no | The color of the icon. |
| `icons` | `string[]` | yes | The icon(s) to be displayed. |
| `isDisabled` | `boolean \| undefined` | no | Whether the icon should be disabled. |
| `onClick` | `MouseEventHandler<HTMLSpanElement> \| undefined` | no | Function to be executed when the icon is clicked. |
| `onDoubleClick` | `MouseEventHandler<HTMLSpanElement> \| undefined` | no | Function to be executed when the icon is double-clicked. |
| `onMouseDown` | `MouseEventHandler<HTMLSpanElement> \| undefined` | no | Function to be executed when the icon is pressed. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting for clickable icons. |
| `shouldStopPropagation` | `boolean \| undefined` | no | Stops event propagation on click. |
| `size` | `number \| undefined` | no | The size of the icon. |
| `tabIndex` | `number \| undefined` | no | Optional tab index for the icon. |

### Types

No additional exported types documented.

### Usage Notes

- Import `Icon` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `icons`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `autoComplete` | `AutoComplete` | no | Defines the auto Complete of the input |
| `color` | `Color \| undefined` | no | Colors for different parts of the input. You can set the color of the placeholder and the border color. |
| `disabledHint` | `string \| undefined` | no | If set and the input is disabled, the input will display a tooltip with this message. |
| `id` | `string \| undefined` | no | The id of the input |
| `inputMode` | `InputMode` | no | Defines the input mode of the input |
| `isDisabled` | `boolean \| undefined` | no | Disables the input so that it cannot be changed anymore |
| `isInvalid` | `boolean \| undefined` | no | If true, the input field is marked as invalid |
| `leftElement` | `ReactNode` | no | An element to be displayed on the left side of the input field |
| `onBlur` | `FocusEventHandler<HTMLInputElement> \| undefined` | no | Function that is executed when the input field loses focus |
| `onChange` | `ChangeEventHandler<HTMLInputElement> \| undefined` | no | Function that is executed when the text of the input changes |
| `onFocus` | `FocusEventHandler<HTMLInputElement> \| undefined` | no | Function that is executed when the input field is focused |
| `onKeyDown` | `KeyboardEventHandler<HTMLInputElement> \| undefined` | no | Function that is executed when a letter is pressed |
| `onPaste` | `((event: ClipboardEvent<HTMLInputElement>) => void) \| undefined` | no | Function that is executed when content is pasted into the input field |
| `placeholder` | `ReactNode` | no | Placeholder for the input field |
| `rightElement` | `ReactElement<any, string \| JSXElementConstructor<any>> \| undefined` | no | An element that should be displayed on the right side of the Input. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting. |
| `shouldPreventPlaceholderAnimation` | `boolean \| undefined` | no | Whether the placeholder animation should be prevented. |
| `shouldRemainPlaceholder` | `boolean \| undefined` | no | Whether the placeholder should remain at its position if a value is typed. |
| `shouldShowCenteredContent` | `boolean \| undefined` | no | Whether the content should be displayed centered inside the input. |
| `shouldShowClearIcon` | `boolean \| undefined` | no | If true, a clear icon is displayed at the end of the input field |
| `shouldShowOnlyBottomBorder` | `boolean \| undefined` | no | Whether only the bottom border should be displayed |
| `shouldShowTransparentBackground` | `boolean \| undefined` | no | Whether the background should be transparent. |
| `shouldUseAutoFocus` | `boolean \| undefined` | no | If true, the input field is focused when the component is mounted |
| `size` | `InputSize \| undefined` | no | The size of the input field |
| `type` | `HTMLInputTypeAttribute \| undefined` | no | Input type set for an input element (e.g. 'text', 'number' or 'password') |
| `value` | `string \| undefined` | no | Value if the input field should be controlled |

### Types

- `InputSize` -> `enum InputSize {
    Small = 'small',
    Medium = 'medium',
}`

### Usage Notes

- Import `Input` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

#### List Item With Title Input

```tsx
<List />
```

### Props

| name | type | required | description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | yes | The items of the list |
| `isWrapped` | `boolean \| undefined` | no | This value must be set for nested AccordionGroup components. This adjusts the style of<br />the head and the padding of the content accordions. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting and arrow-key navigation within the list. |

### Types

No additional exported types documented.

### Usage Notes

- Import `List` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `children`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
## Masonry

`Masonry` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { Masonry } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<Masonry
    gap={16}
    columnWidth={160}
    rowHeight={80}
/>
```

#### Packed

```tsx
<Masonry
    gap={16}
    columnWidth={160}
    rowHeight={80}
/>
```

#### Dynamic

```tsx
<Masonry
    gap={16}
    columnWidth={160}
    rowHeight={80}
/>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `Masonry` directly from `@chayns-components/core` instead of internal source paths.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `dragCloseThresholdInPx` | `number \| undefined` | no | Threshold in pixels to drag to close the popup |
| `enableDragHandle` | `boolean \| undefined` | no | Enables the optional drag handle inside the popup |
| `inputValue` | `string` | yes | The text from the input field |
| `members` | `MentionMember[]` | yes | Members that can be selected |
| `onSelect` | `({ fullMatch, member }: { fullMatch: string; member: MentionMember; }) => void` | yes | Function to be executed when a member is selected |
| `overlayContainerSelector` | `string \| undefined` | no | Selector for the container to render the overlay into (defaults to closest dialog, thread, page provider or tapp) |
| `popupAlignment` | `MentionFinderPopupAlignment` | yes | Alignment of the popup |

### Types

- `MentionFinderPopupAlignment` -> `enum MentionFinderPopupAlignment {
    Top,
    Bottom,
}`
- `MentionMember` -> `type MentionMember = {
    id: string;
    info?: string;
    imageUrl: string;
    name: string;
    shouldShowRoundImage?: boolean;
};`

### Usage Notes

- Import `MentionFinder` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `inputValue`, `members`, `onSelect`, `popupAlignment`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

#### Context Menu Secondary Action

```tsx
<MultiActionButton
    isDisabled={false}
    extendedTimeoutMs={2000}
    primaryAction={{
                icon: 'fa fa-pen',
                label: 'Chatten',
            }}
    secondaryAction={undefined}
    secondaryContextMenu={[
            {
                icons: ['fa fa-pencil'],
                key: 'rename',
                onClick: () => console.log('Umbenennen'),
                text: 'Umbenennen',
            },
            {
                icons: ['fa fa-eye'],
                key: 'show',
                onClick: () => console.log('Einblenden'),
                text: 'Einblenden',
            },
            {
                icons: ['fa fa-trash'],
                key: 'delete',
                onClick: () => console.log('Löschen'),
                text: 'Löschen',
            },
        ]}
/>
```

#### Auto Collapse Responsive

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
    shouldAutoCollapse
/>
```

#### Auto Collapse Responsive Full Width

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
    shouldAutoCollapse
    shouldUseFullWidth
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

| name | type | required | description |
| --- | --- | --- | --- |
| `backgroundColor` | `string \| undefined` | no | Optional background color for both actions. |
| `className` | `string \| undefined` | no | Additional class name for the wrapper element. |
| `extendedTimeoutMs` | `number \| undefined` | no | Timeout in ms before the secondary action collapses after a click. |
| `gapColor` | `string \| undefined` | no | Optional color for the 1px separator line between actions. |
| `height` | `number \| undefined` | no | Height of the button. |
| `isCollapsed` | `boolean \| undefined` | no | Whether the button is collapsed to a single icon. |
| `isDisabled` | `boolean \| undefined` | no | Whether the whole control is disabled. |
| `primaryAction` | `MultiActionButtonAction` | yes | Primary action configuration. |
| `secondaryAction` | `MultiActionButtonAction \| undefined` | no | Secondary action configuration. |
| `secondaryContextMenu` | `MultiActionButtonSecondaryContextMenu \| undefined` | no | Context menu rendered as the secondary action. |
| `shouldAutoCollapse` | `boolean \| undefined` | no | Whether the button should collapse automatically based on the available width. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting for interactive action buttons. |
| `shouldUseFullWidth` | `boolean \| undefined` | no | Whether the button should take the full width of its parent. |
| `width` | `number \| MotionValue<number> \| undefined` | no | Optional width override for the whole button. |

### Types

- `MultiActionButtonAction` -> `type MultiActionButtonAction = {
    /**
     * Optional background color for this action.
     * @description Overrides the component-level background color for this specific action.
     * If omitted, `MultiActionButton.backgroundColor` is used as fallback.
     * @optional
     */
    backgroundColor?: string;
    /**
     * Optional color for the icon and label.
     * @description Overrides the default text/icon color. If omitted, the current theme text color is used.
     * @optional
     */
    color?: string;
    /**
     * The icon for the action.
     * @description Can be a FontAwesome class string (e.g., 'fa fa-microphone') or a custom React element.
     * The icon is always rendered inside a fixed-size slot to keep alignment stable.
     */
    icon: string | ReactElement;
    /**
     * Whether the action is disabled.
     * @description Disabled actions do not respond to hover or click and are visually dimmed.
     * @optional
     */
    isDisabled?: boolean;
    /**
     * Optional reason shown in a tooltip when the action is disabled.
     * @description Use this to explain why the action is currently unavailable.
     * @optional
     */
    disabledReason?: string;
    /**
     * The optional label for the action.
     * @description The label is shown next to the icon and will be truncated with ellipsis when
     * there is not enough horizontal space.
     * @optional
     */
    label: ReactNode;
    /**
     * Click handler for the action.
     * @description Receives a payload that includes the action type, extension state, and device info.
     * This allows external logic to decide whether the click should trigger an action immediately.
     * @optional
     */
    onClick?: (info: MultiActionButtonActionEvent) => void;
    /**
     * Status effect configuration for the action.
     * @description Controls optional visual emphasis like pulsing, without changing layout or sizing.
     * @optional
     */
    status?: MultiActionButtonActionStatus;
};`
- `MultiActionButtonSecondaryContextMenu` -> `type MultiActionButtonSecondaryContextMenu = ContextMenuItem[];`

### Usage Notes

- Import `MultiActionButton` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `primaryAction`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `isDecimalInput` | `boolean \| undefined` | no | Applies rules for decimal input.<br />Enables the user to input one zero as number before the comma |
| `isDisabled` | `boolean \| undefined` | no | Whether the input is disabled |
| `isInvalid` | `boolean \| undefined` | no | Whether the value is invalid. |
| `isMoneyInput` | `boolean \| undefined` | no | Applies rules for money input.<br />Rules: only two decimal places, one zero before the comma |
| `isTimeInput` | `boolean \| undefined` | no | Whether the value should be formatted as a time. |
| `maxNumber` | `number \| undefined` | no | Limits the number to this value |
| `minNumber` | `number \| undefined` | no | Limits the number to this value |
| `onBlur` | `((newNumber: string \| number \| null, isInvalid: boolean) => void) \| undefined` | no | Callback function that is called when the input gets out of focus |
| `onChange` | `((newValue: string) => void) \| undefined` | no | Callback function that is called when the input changes<br />It will pass the text from the input |
| `placeholder` | `string \| undefined` | no | Placeholder for the input field |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting. |
| `shouldShowOnlyBottomBorder` | `boolean \| undefined` | no | Whether only the bottom border should be displayed |
| `shouldTriggerChangeOnFormat` | `boolean \| undefined` | no | Whether the onChange function should be triggert when the value is formatted on the focus or blur |
| `value` | `string \| undefined` | no | The value, that should be displayed in the input, when it is in focus.<br />You can also pass a stringified number as default value.<br />NOTE: If you pass a stringified number, it will be formatted to the selected format |

### Types

No additional exported types documented.

### Usage Notes

- Import `NumberInput` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `alignment` | `PopupAlignment \| undefined` | no | The preferred alignment of the popup relative to its trigger element. |
| `children` | `ReactNode` | no | The trigger element that the popup is attached to. |
| `container` | `Element \| undefined` | no | The DOM element that should receive the popup portal. |
| `content` | `ReactNode` | yes | The content rendered inside the popup. |
| `isOpen` | `boolean \| undefined` | no | Fully controls whether the popup is visible. |
| `onHide` | `VoidFunction \| undefined` | no | Callback that is called after the popup becomes hidden. |
| `onShow` | `VoidFunction \| undefined` | no | Callback that is called after the popup becomes visible. |
| `shouldBeOpen` | `boolean \| undefined` | no | Requests that the popup should be opened from outside. |
| `shouldHideOnChildrenLeave` | `boolean \| undefined` | no | Hides the popup when the pointer leaves the trigger element. |
| `shouldScrollWithContent` | `boolean \| undefined` | no | Keeps the popup aligned within the scrolling content container. |
| `shouldShowOnHover` | `boolean \| undefined` | no | Opens the popup when the trigger element is hovered instead of clicked. |
| `shouldUseChildrenWidth` | `boolean \| undefined` | no | Uses the trigger element width as the popup width reference. |
| `shouldUseFullWidth` | `boolean \| undefined` | no | Stretches the trigger element to the full available width. |
| `yOffset` | `number \| undefined` | no | Vertical offset between the trigger element and the popup. |

### Types

- `PopupAlignment` -> `enum PopupAlignment {
    TopLeft,
    TopCenter,
    TopRight,
    BottomLeft,
    BottomCenter,
    BottomRight,
}`

### Usage Notes

- Import `Popup` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `content`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `colors` | `Colors \| undefined` | no | The colors of the ProgressBar. |
| `height` | `number \| undefined` | no | The height of the progress bar in pixels. If not provided, it will be 10px if shouldShowLabelInline is false and 20px if shouldShowLabelInline is true. |
| `label` | `string \| undefined` | no | The label that should be displayed under the progressbar. |
| `percentage` | `0 \| 2 \| 1 \| 4 \| 56 \| 38 \| 20 \| 3 \| 10 \| 6 \| 5 \| 7 \| 8 \| 9 \| 11 \| 12 \| 13 \| 14 \| 15 \| 16 \| 17 \| 18 \| 19 \| 21 \| 22 \| 23 \| 24 \| 25 \| 26 \| 27 \| 28 \| 29 \| 30 \| 31 \| 32 \| 33 \| 34 \| 35 \| 36 \| 37 \| 39 \| 40 \| 41 \| 42 \| 43 \| 44 \| 45 \| 46 \| 47 \| 48 \| 49 \| 50 \| 51 \| 52 \| 53 \| 54 \| 55 \| 57 \| 58 \| 59 \| 60 \| 61 \| 62 \| 63 \| 64 \| 65 \| 66 \| 67 \| 68 \| 69 \| 70 \| 71 \| 72 \| 73 \| 74 \| 75 \| 76 \| 77 \| 78 \| 79 \| 80 \| 81 \| 82 \| 83 \| 84 \| 85 \| 86 \| 87 \| 88 \| 89 \| 90 \| 91 \| 92 \| 93 \| 94 \| 95 \| 96 \| 97 \| 98 \| 99 \| 100 \| undefined` | no | The percentage of the progress. Number between 0 and 100. |
| `shouldHideProgress` | `boolean \| undefined` | no | Whether the progress should be hide and just display the label. |
| `shouldShowLabelInline` | `boolean \| undefined` | no | Whether the label should be displayed inside the ProgressBar. |
| `showShine` | `boolean \| undefined` | no | Whether a shine animation should be shown on the progress bar. The amount of shine is based on the percentage value. |
| `steps` | `(0 \| 2 \| 1 \| 4 \| 56 \| 38 \| 20 \| 3 \| 10 \| 6 \| 5 \| 7 \| 8 \| 9 \| 11 \| 12 \| 13 \| 14 \| 15 \| 16 \| 17 \| 18 \| 19 \| 21 \| 22 \| 23 \| 24 \| 25 \| 26 \| 27 \| 28 \| 29 \| 30 \| 31 \| 32 \| 33 \| 34 \| 35 \| 36 \| 37 \| 39 \| 40 \| 41 \| 42 \| 43 \| 44 \| 45 \| 46 \| 47 \| 48 \| 49 \| 50 \| 51 \| 52 \| 53 \| 54 \| 55 \| 57 \| 58 \| 59 \| 60 \| 61 \| 62 \| 63 \| 64 \| 65 \| 66 \| 67 \| 68 \| 69 \| 70 \| 71 \| 72 \| 73 \| 74 \| 75 \| 76 \| 77 \| 78 \| 79 \| 80 \| 81 \| 82 \| 83 \| 84 \| 85 \| 86 \| 87 \| 88 \| 89 \| 90 \| 91 \| 92 \| 93 \| 94 \| 95 \| 96 \| 97 \| 98 \| 99 \| 100)[] \| undefined` | no | Visual marked steps. |
| `thumbLabel` | `ReactNode` | no | The label that should be displayed on the thumb of the progress bar. |

### Types

No additional exported types documented.

### Usage Notes

- Import `ProgressBar` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | no | The children that should be displayed after the RadioButton is checked. |
| `id` | `string \| number` | yes | The id of the radio button. |
| `isDisabled` | `boolean \| undefined` | no | whether the RadioButton should be shown. |
| `label` | `ReactNode` | no | The label that should be displayed next to the radio button. |
| `rightElement` | `ReactNode` | no | An element that should be displayed on the right side of the label. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting. |
| `shouldShowCentered` | `boolean \| undefined` | no | Whether the RadioButton should be displayed centered to the label or at the top |
| `shouldShowRightElementOnlyOnChecked` | `boolean \| undefined` | no | Whether the rightElement should only be displayed when the RadioButton is checked |

### Types

No additional exported types documented.

### Usage Notes

- Import `RadioButton` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `id`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | yes | The elements that should be shown inside the scrollview |
| `height` | `Height<string \| number> \| undefined` | no | The height of the scroll view. |
| `maxHeight` | `Height<string \| number> \| null \| undefined` | no | The maximum height of the scroll view. |
| `maxWidth` | `Width<string \| number> \| undefined` | no | The maximum width of the scroll view. |
| `overflowX` | `"scroll" \| "auto" \| undefined` | no | The overflow-x style of the scroll view. |
| `overflowY` | `"scroll" \| "auto" \| undefined` | no | The overflow-y style of the scroll view. |
| `width` | `Width<string \| number> \| undefined` | no | The width of the scroll view. |

### Types

No additional exported types documented.

### Usage Notes

- Import `ScrollView` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `children`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `container` | `Element \| undefined` | no | The element where the content of the `ComboBox` should be rendered via React Portal. |
| `customFilter` | `((item: ISearchBoxItem, value: string) => boolean) \| undefined` | no | An optional callback function to filter the elements to be displayed |
| `customSortFunction` | `SearchBoxSortFunction \| undefined` | no | An optional callback function to sort the filtered elements to be displayed |
| `dropdownDirection` | `DropdownDirection \| undefined` | no | The direction in which the dropdown should be displayed. By default, it is displayed below the input. |
| `hintText` | `string \| undefined` | no | A text that should be displayed if no results are found. |
| `inputProps` | `InputProps \| undefined` | no | Props that are passed to the underlying Input component. |
| `isInvalid` | `boolean \| undefined` | no | If true, the input field is marked as invalid |
| `leftIcons` | `string[] \| undefined` | no | An optional icon that is displayed inside the left side of the input. |
| `lists` | `ISearchBoxItems[]` | yes | List of groups with items that can be searched. It is possible to give only one list; if multiple lists are provided, the 'group name' parameter becomes mandatory. |
| `maxHeight` | `number \| undefined` | no | The maximum height of the dropdown body in pixels. |
| `onBlur` | `FocusEventHandler<HTMLInputElement> \| undefined` | no | Function to be executed when the input lost focus. |
| `onChange` | `ChangeEventHandler<HTMLInputElement> \| undefined` | no | Function to be executed when the input is changed. |
| `onKeyDown` | `KeyboardEventHandler<HTMLInputElement> \| undefined` | no | Function that is executed when a letter is pressed |
| `onSelect` | `((item: ISearchBoxItem) => void) \| undefined` | no | Function to be executed when an item is selected. |
| `placeholder` | `string \| undefined` | no | The placeholder that should be displayed. |
| `presetValue` | `string \| undefined` | no | Set an input for the search box - it is not an item of a list, just a string. |
| `selectedId` | `string \| undefined` | no | Control the selected item. If you use this prop, make sure to update it when the user selects an item. |
| `shouldAddInputToList` | `boolean` | yes | If true, the value in the Input is displayed in the list. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting. |
| `shouldHideFilterButtons` | `boolean \| undefined` | no | If true, the filter buttons are hidden. |
| `shouldKeepSelectedItemPosition` | `boolean \| undefined` | no | If true, the selected item keeps its original position in the dropdown list. |
| `shouldShowContentOnEmptyInput` | `boolean \| undefined` | no | Whether the full list of items should be displayed if the input is empty. |
| `shouldShowRoundImage` | `boolean \| undefined` | no | If true, the images of the items are displayed in a round shape. |
| `shouldShowSmallItems` | `boolean \| undefined` | no | If true, the dropdown items are displayed more compactly. |
| `shouldShowToggleIcon` | `boolean \| undefined` | no | Whether the icon to open and close the list should be displayed. |
| `shouldUseCustomFilterOnly` | `boolean \| undefined` | no | If true, the custom filter replaces the built-in text search instead of narrowing its results. |
| `tagInputSettings` | `TagInputSettings \| undefined` | no | Settings for the TagInput. |

### Types

- `DropdownDirection` -> `enum DropdownDirection {
    BOTTOM,
    TOP,
    BOTTOM_LEFT,
    BOTTOM_RIGHT,
    TOP_LEFT,
    TOP_RIGHT,
    LEFT,
    RIGHT,
}`
- `SearchBoxSortFunction` -> `type SearchBoxSortFunction = (a: ISearchBoxItem, b: ISearchBoxItem) => number;`

### Usage Notes

- Import `SearchBox` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `lists`, `shouldAddInputToList`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `iconColor` | `Color \| undefined` | no | Color of the icon |
| `isActive` | `boolean \| undefined` | no | Force the active state of the input and override the internal state |
| `onActiveChange` | `((isActive: boolean) => void) \| undefined` | no | Function that is executed when the active state of the input changes |
| `onChange` | `ChangeEventHandler<HTMLInputElement>` | yes | Function that is executed when the text of the input changes |
| `onKeyDown` | `((event: KeyboardEvent<HTMLInputElement>) => void) \| undefined` | no | Function that is executed when a key is pressed |
| `placeholder` | `string \| undefined` | no | Placeholder for the input field |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting. |
| `shouldUseAbsolutePositioning` | `boolean \| undefined` | no | Whether the SearchInput should be positioned absolute. |
| `size` | `InputSize \| undefined` | no | The size of the input field |
| `value` | `string \| undefined` | no | Value if the input field should be controlled |
| `width` | `number \| undefined` | no | The width of the parent. |

### Types

- `InputSize` -> `enum InputSize {
    Small = 'small',
    Medium = 'medium',
}`

### Usage Notes

- Import `SearchInput` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `onChange`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `additionalText` | `string \| undefined` | no | Text used when there are more selected items than maxDisplayedItems. '##count##' will be displayed with the additional count. |
| `buttonText` | `string` | yes | The text that should be displayed inside the button. |
| `isDisabled` | `boolean \| undefined` | no | Whether the button should be disabled. |
| `list` | `SelectButtonItem[]` | yes | A list of item that could be selected. |
| `maxDisplayedItems` | `number \| undefined` | no | The maximum number of items displayed in the button text. |
| `onSelect` | `((ids: (string \| number)[]) => void) \| undefined` | no | Function to be executed after an item is selected. |
| `selectAllText` | `string \| undefined` | no | If a string is given and `shouldAllowMultiSelect` is true, the dialog displays a checkbox to select all items at once. |
| `selectedItemIds` | `(string \| number)[] \| undefined` | no | The id of an item that should be preselected. |
| `shouldAllowMultiSelect` | `boolean \| undefined` | no | Whether more than one item should be selectable. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting. |
| `shouldShowButtonTextWithSelection` | `boolean \| undefined` | no | Whether the button text should be displayed also if items are selected. |
| `shouldShowSearch` | `boolean \| undefined` | no | Whether the search should be displayed inside the dialog. |
| `title` | `string \| undefined` | no | The title of the dialog. |

### Types

- `SelectButtonItem` -> `interface SelectButtonItem {
    text: string;
    id: number | string;
}`

### Usage Notes

- Import `SelectButton` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `buttonText`, `list`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `children` | `ReactElement<SetupWizardItemProps, string \| JSXElementConstructor<any>> \| ReactElement<SetupWizardItemProps, string \| JSXElementConstructor<any>>[]` | yes | The steps of the setup. Use the SetupWizardItem component. |
| `isWrapped` | `boolean \| undefined` | no | This value must be set if the SetupWizard is inside an Accordion. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting for setup wizard items. |

### Types

No additional exported types documented.

### Usage Notes

- Import `SetupWizard` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `children`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | yes | The content that should be displayed inside the item. |
| `id` | `number` | yes | The id of the item. |
| `step` | `number` | yes | The step of the item. |
| `title` | `string` | yes | The title of the item. |

### Types

No additional exported types documented.

### Usage Notes

- Import `SetupWizardItem` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `children`, `id`, `step`, `title`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `container` | `Element \| undefined` | no | The element where the content of the `SharingBar` should be rendered via React Portal. |
| `label` | `string` | yes | The label that should be displayed. |
| `link` | `string` | yes | The link that should be shared. |
| `popupAlignment` | `ContextMenuAlignment` | yes | The alignment of the sharing options. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting and keyboard interaction. |

### Types

- `ContextMenuAlignment` -> `enum ContextMenuAlignment {
    TopLeft,
    BottomLeft,
    TopRight,
    BottomRight,
    TopCenter,
    BottomCenter,
}`

### Usage Notes

- Import `SharingBar` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `label`, `link`, `popupAlignment`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `alignment` | `ContextMenuAlignment \| undefined` | no | Context menu alignment |
| `children` | `ReactNode` | no | No description available. |
| `container` | `Element \| undefined` | no | Container element |
| `isDisabled` | `boolean \| undefined` | no | Whether the button is disabled and cannot be clicked anymore. |
| `link` | `string` | yes | The link that should be shared. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting. |

### Types

- `ContextMenuAlignment` -> `enum ContextMenuAlignment {
    TopLeft,
    BottomLeft,
    TopRight,
    BottomRight,
    TopCenter,
    BottomCenter,
}`

### Usage Notes

- Import `SharingButton` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `link`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `buttonText` | `string` | yes | The text that should be displayed inside the button. |
| `isDisabled` | `boolean \| undefined` | no | Whether the button is disabled. |
| `onEdit` | `((signatureUrl: string) => void) \| undefined` | no | Function to be executed when the signature is edited. |
| `onRemove` | `(() => void) \| undefined` | no | Function to be executed when the user deletes the signature. |
| `onSubscribe` | `((signatureUrl: string) => void) \| undefined` | no | Function to be executed when the user subscribes. |
| `onUnsubscribe` | `(() => void) \| undefined` | no | Function to be executed when the user unsubscribes. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting for interactive controls. |

### Types

No additional exported types documented.

### Usage Notes

- Import `Signature` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `buttonText`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
## Skeleton

`Skeleton` is exported by `@chayns-components/core` and should be imported from the public package entry point.

### Import

```ts
import { Skeleton } from '@chayns-components/core';
```

### Examples

#### General

```tsx
<Skeleton
    width={100}
    height={100}
/>
```

#### Circle

```tsx
<Skeleton
    size={100}
/>
```

#### H1

```tsx
<Skeleton />
```

#### H2

```tsx
<Skeleton />
```

#### H3

```tsx
<Skeleton />
```

#### H4

```tsx
<Skeleton />
```

#### H5

```tsx
<Skeleton />
```

#### H6

```tsx
<Skeleton />
```

#### Text

```tsx
<Skeleton
    lines={3}
    randomWithBounds={[50, 90]}
/>
```

#### Button

```tsx
<Skeleton />
```

#### Badge

```tsx
<Skeleton />
```

#### Accordion

```tsx
<Skeleton />
```

#### List Item

```tsx
<Skeleton />
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `Skeleton` directly from `@chayns-components/core` instead of internal source paths.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `interval` | `SliderInterval \| undefined` | no | The current interval of the slider. |
| `isDisabled` | `boolean \| undefined` | no | Disables the slider, preventing user interaction. |
| `maxEnabledValue` | `number \| undefined` | no | The maximum enabled value of the slider. |
| `maxValue` | `number` | yes | The maximum value of the slider. |
| `minEnabledValue` | `number \| undefined` | no | The minimum enabled value of the slider. |
| `minValue` | `number` | yes | The minimum value of the slider. |
| `onChange` | `((value?: number \| undefined, interval?: SliderInterval \| undefined) => void) \| undefined` | no | Callback function that is called when the slider value changes. |
| `onSelect` | `((value?: number \| undefined, interval?: SliderInterval \| undefined) => void) \| undefined` | no | Callback function that is called when the slider selection is finalized. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting. |
| `shouldHighlightSteps` | `boolean \| undefined` | no | Indicates whether the slider should highlight steps. |
| `shouldShowThumbLabel` | `boolean \| undefined` | no | Indicates whether the slider should show a label on the thumb. |
| `step` | `number \| undefined` | no | The step size for the slider. |
| `thumbLabelFormatter` | `((value: number, isMeasuring?: boolean \| undefined) => string) \| undefined` | no | A function to format the thumb label. |
| `value` | `number \| undefined` | no | The current value of the slider. |

### Types

No additional exported types documented.

### Usage Notes

- Import `Slider` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `maxValue`, `minValue`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `isDisabled` | `boolean \| undefined` | no | Whether the button is disabled and cannot be clicked anymore. |
| `isRounded` | `boolean \| undefined` | no | No description available. |
| `isSecondary` | `boolean \| undefined` | no | Displays the button in the secondary style. |
| `items` | `SliderButtonItem[]` | yes | The items that should be displayed in the slider button. |
| `onChange` | `((id: string) => void) \| undefined` | no | Function to be executed when a button is selected. The id of the selected button is passed as an argument. |
| `selectedButtonId` | `string \| undefined` | no | The id of the button that should be selected. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting. |

### Types

- `SliderButtonItem` -> `interface SliderButtonItem {
    id: string;
    text: string;
}`

### Usage Notes

- Import `SliderButton` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `items`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `color` | `string \| undefined` | no | No description available. |
| `shouldHideBackground` | `boolean \| undefined` | no | No description available. |
| `shouldHideWaitCursor` | `boolean \| undefined` | no | No description available. |
| `size` | `number \| undefined` | no | No description available. |
| `speed` | `SmallWaitCursorSpeed \| undefined` | no | No description available. |

### Types

- `SmallWaitCursorSpeed` -> `enum SmallWaitCursorSpeed {
    Slow = 1.5,
    Medium = 1,
    Fast = 0.5,
}`

### Usage Notes

- Import `SmallWaitCursor` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

#### With Keyboard Highlighting

```tsx
<TagInput
    tags={[
                { id: 'pizza', text: 'Pizza' },
                { id: 'nudeln', text: 'Nudeln' },
            ]}
    shouldEnableKeyboardHighlighting
/>
```

#### Small

```tsx
<TagInput
    tags={[
                { id: 'pizza', text: 'Pizza' },
                { id: 'nudeln', text: 'Nudeln' },
            ]}
    size={InputSize.Small}
/>
```

### Props

| name | type | required | description |
| --- | --- | --- | --- |
| `leftElement` | `ReactNode` | no | An element that should be displayed on the left side of the input. |
| `onAdd` | `((tag: Tag) => boolean \| void \| Promise<boolean>) \| undefined` | no | Function to be executed when a tag is added. |
| `onBlur` | `FocusEventHandler \| undefined` | no | Function to be executed when the input is blurred. |
| `onChange` | `ChangeEventHandler<HTMLInputElement> \| undefined` | no | Function to be executed when the value of the input is changed. |
| `onFocus` | `FocusEventHandler \| undefined` | no | Function to be executed when the input is focused. |
| `onRemove` | `((id: string) => void) \| undefined` | no | Function to be executed when a tag is removed. |
| `placeholder` | `string \| undefined` | no | The placeholder that should be displayed. |
| `shouldAllowMultiple` | `boolean \| undefined` | no | Whether multiple tags should be allowed. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting. |
| `shouldPreventEnter` | `boolean \| undefined` | no | Whether the enter key should be prevented. |
| `size` | `InputSize \| undefined` | no | The size of the input field. |
| `tags` | `Tag[] \| undefined` | no | The tags that should be displayed. |

### Types

- `InputSize` -> `enum InputSize {
    Small = 'small',
    Medium = 'medium',
}`
- `Tag` -> `interface Tag {
    id: string;
    text: string;
    rightElement?: ReactNode;
}`

### Usage Notes

- Import `TagInput` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `colors` | `TextAreaColors \| undefined` | no | Provide custom colors to the TextArea Component |
| `isDisabled` | `boolean \| undefined` | no | Disables the text area so that it cannot be changed. |
| `isInvalid` | `boolean \| undefined` | no | If true, the text area is marked as invalid |
| `maxHeight` | `MaxHeight<string \| number> \| undefined` | no | The maximum height of the text area. |
| `minHeight` | `MinHeight<string \| number> \| undefined` | no | The minimum height of the text area. |
| `onBlur` | `FocusEventHandler<HTMLTextAreaElement> \| undefined` | no | Function that is executed when the text area loses focus. |
| `onChange` | `ChangeEventHandler<HTMLTextAreaElement> \| undefined` | no | Function that is executed when the text of the text area changes. |
| `onFocus` | `FocusEventHandler<HTMLTextAreaElement> \| undefined` | no | Function that is executed when the input field is focused |
| `onKeyDown` | `KeyboardEventHandler<HTMLTextAreaElement> \| undefined` | no | Function that is executed when a letter is pressed |
| `placeholder` | `string \| ReactElement<any, string \| JSXElementConstructor<any>> \| undefined` | no | Placeholder for the text area field. |
| `rightElement` | `ReactElement<any, string \| JSXElementConstructor<any>> \| undefined` | no | An element that should be displayed on the right side of the Input. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting. |
| `value` | `string \| undefined` | no | Value if the text area should be controlled. |

### Types

No additional exported types documented.

### Usage Notes

- Import `TextArea` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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

| name | type | required | description |
| --- | --- | --- | --- |
| `alignment` | `PopupAlignment \| undefined` | no | The alignment of the tooltip. By default, the tooltip will calculate the best alignment. |
| `children` | `ReactNode` | yes | The elements that the tooltip should surround. |
| `container` | `Element \| undefined` | no | The element where the content of the `Tooltip` should be rendered via React Portal. |
| `isDisabled` | `boolean \| undefined` | no | whether the tooltip should be shown. |
| `item` | `ReactNode \| ITooltipItem` | yes | The content that should be displayed. |
| `itemWidth` | `Width<string \| number> \| undefined` | no | The width of an item. |
| `maxItemWidth` | `number \| undefined` | no | The max width of the Tooltip. |
| `shouldHideOnChildrenLeave` | `boolean \| undefined` | no | Whether the tooltip should be hidden after the children is not hovered. |
| `shouldUseChildrenWidth` | `boolean \| undefined` | no | Whether the width of the children should be used. |
| `shouldUseFullWidth` | `boolean \| undefined` | no | Whether the tooltip children should use the full width. |
| `yOffset` | `number \| undefined` | no | The Y offset of the tooltip to the children. |

### Types

- `PopupAlignment` -> `enum PopupAlignment {
    TopLeft,
    TopCenter,
    TopRight,
    BottomLeft,
    BottomCenter,
    BottomRight,
}`

### Usage Notes

- Import `Tooltip` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `children`, `item`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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
    collapsedHeight={125}
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
    collapsedHeight={125}
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

#### Typewriter Loop

```tsx
<Truncation
    collapsedHeight={125}
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

#### Small Text

```tsx
<Truncation
    collapsedHeight={125}
>
    {<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>}
</Truncation>
```

#### Just Text

```tsx
<Truncation
    collapsedHeight={125}
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

| name | type | required | description |
| --- | --- | --- | --- |
| `children` | `ReactElement<any, string \| JSXElementConstructor<any>>` | yes | The elements that should be expanding or collapsing. |
| `clampPosition` | `ClampPosition \| undefined` | no | The position of the clamp. |
| `collapsedHeight` | `number \| undefined` | no | The height of the children element in its collapsed state. |
| `isOpen` | `boolean \| undefined` | no | If set to true, the content is exposed. |
| `lessLabel` | `string \| undefined` | no | A text that should be displayed if the content is expanded. |
| `moreLabel` | `string \| undefined` | no | A text that should be displayed if the content is collapsed. |
| `onChange` | `((event: MouseEvent<HTMLAnchorElement, MouseEvent>, isOpen: boolean) => void) \| undefined` | no | Function to be executed when the component is expanding or collapsing. |
| `shouldEnableKeyboardHighlighting` | `boolean \| undefined` | no | Enables keyboard-only focus highlighting. |

### Types

- `ClampPosition` -> `enum ClampPosition {
    Right,
    Middle,
    Left,
}`

### Usage Notes

- Import `Truncation` directly from `@chayns-components/core` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `children`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/core/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
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
