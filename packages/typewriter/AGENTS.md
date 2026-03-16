# @chayns-components/typewriter

React component package providing `Typewriter` for chayns applications.

Documented components: `Typewriter`.

## Import

```ts
import { Typewriter } from '@chayns-components/typewriter';
```

## Typical Usage

```tsx
<Typewriter>
    {'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est. Lorem ipsum dolor sit amet.'}
</Typewriter>
```

## Typewriter

`Typewriter` is exported by `@chayns-components/typewriter` and should be imported from the public package entry point.

### Import

```ts
import { Typewriter } from '@chayns-components/typewriter';
```

### Examples

#### General

```tsx
<Typewriter>
    {'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est. Lorem ipsum dolor sit amet.'}
</Typewriter>
```

#### Custom Elements

```tsx
<Typewriter>
    {
        <>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                    <button onClick={() => alert('Der Button funktioniert')}>Button</button>
                    At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est.
                </>
    }
</Typewriter>
```

#### Empty

```tsx
<Typewriter>
    {''}
</Typewriter>
```

#### HTMLText

```tsx
<Typewriter>
    {
        <>
                    Lorem ipsum dolor sit amet,
                    <b>consetetur sadipcing elitr</b>, sed diam nonumy eirmod tempor invidunt ut labore et
                    dolore magna aliquyam erat, sed diam voluptua.
                    <s>
                        <b>At vero eos et accusam et justo duo dolores et ea rebum.</b>
                    </s>
                    Stet clita kasd gubergren, no sea takimata sanctus est.
                    <u>Lorem ipsum</u>
                    dolor sit amet.
                </>
    }
</Typewriter>
```

#### Multiple Texts

```tsx
<Typewriter
    cursorType={CursorType.Thin}
    speed={TypewriterSpeed.Slow}
    resetSpeed={TypewriterSpeed.Fast}
    shouldUseResetAnimation
>
    {
        [
                'Habt ihr am Dienstag geöffnet?',
                'Ich würde gerne einen Tisch reservieren.',
                'Kann ich auch ohne Termin vorbeikommen?',
            ]
    }
</Typewriter>
```

#### With Own Styles

```tsx
<Typewriter
    speed={150}
    textStyle={{
            color: 'red',
        }}
>
    {'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.'}
</Typewriter>
```

#### With Code Highlighter

```tsx
<Typewriter>
    {
        <>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                    <CodeHighlighter
                        shouldShowLineNumbers
                        code={code}
                        language={'tsx'}
                        copyButtonText="Code kopieren"
                    />
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                    invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                    <button onClick={() => alert('Button clicked')}>Button</button>
                    At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
                    sea takimata sanctus est.
                </>
    }
</Typewriter>
```

#### Inside Text Area

```tsx
<Typewriter>
    {'Nachricht eingeben'}
</Typewriter>
```

#### Inside Input

```tsx
<Typewriter
    cursorType={CursorType.Thin}
    speed={TypewriterSpeed.Slow}
    resetSpeed={TypewriterSpeed.Fast}
    shouldUseResetAnimation
>
    {
        [
                'Habt ihr am Dienstag geöffnet?',
                'Ich würde gerne einen Tisch reservieren.',
                'Kann ich auch ohne Termin vorbeikommen?',
            ]
    }
</Typewriter>
```

#### With Ignore Tags

```tsx
<Typewriter>
    {
        <>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ullamcorper eget ligula
                    fermentum congue. Fusce ut lectus vitae orci ultricies tincidunt. Nulla tristique tortor
                    sit amet est egestas ultricies. Pellentesque augue dui, cursus quis ex sit amet,
                    ultricies tristique metus. Ut efficitur quis mauris eget eleifend. Donec vulputate
                    efficitur nisi, at semper purus molestie et. Proin non odio nec ligula commodo euismod
                    at quis dolor. Morbi ornare sed lorem vitae aliquam. Interdum et malesuada fames ac ante
                    ipsum primis in faucibus. Donec tempor justo at tristique interdum. Aenean eget massa
                    quis nunc pellentesque tempus. Proin mollis hendrerit nulla et dictum. Vivamus vulputate
                    posuere dignissim. Pellentesque lobortis ex vitae ligula eleifend, vitae egestas felis
                    finibus. Cras molestie nisi vitae dui congue mollis. Aliquam tortor augue, tincidunt nec
                    rhoncus non, cursus vitae purus. Praesent eget metus sed neque hendrerit tempus commodo
                    in odio. In tortor sapien, bibendum id ligula vel, pretium fringilla lorem. Quisque
                    facilisis erat vel orci semper tempus. Fusce a purus ac risus ullamcorper gravida sed in
                    libero. In eu diam nec eros egestas iaculis.
                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                    {/* @ts-ignore */}
                    <tw-ignore>
                        Donec dignissim urna eget luctus sagittis. Class aptent taciti sociosqu ad litora
                        torquent per conubia nostra, per inceptos himenaeos. Donec ut ex a mi accumsan
                        pretium at sit amet nulla. Integer non mi sollicitudin, luctus elit eget, commodo
                        tortor. Duis vehicula lorem ante, eu fringilla purus vehicula et. Nunc sit amet
                        blandit turpis. Morbi eget ipsum sit amet erat bibendum porttitor.
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                    </tw-ignore>
                    Pellentesque sit amet odio orci. Donec nibh elit, pellentesque ut ultrices quis, dictum
                    in erat. Pellentesque a nibh placerat, eleifend augue at, iaculis urna. In et mi
                    viverra, faucibus erat mattis, dapibus mi. Nam euismod ornare facilisis. Cras
                    consectetur rhoncus neque. Quisque sed nunc augue. Ut at metus iaculis, lacinia libero
                    sit amet, commodo diam. Duis vel congue neque.
                </>
    }
</Typewriter>
```

#### Auto Speed

```tsx
<Typewriter
    shouldCalcAutoSpeed
    shouldUseAnimationHeight
>
    {'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est. Lorem ipsum dolor sit amet.'}
</Typewriter>
```

#### test

```tsx
<Typewriter
    textStyle={{
            color: 'red',
        }}
>
    {'Hallooo.'}
</Typewriter>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `Typewriter` directly from `@chayns-components/typewriter` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/typewriter/src/...`; always use the public package export.
