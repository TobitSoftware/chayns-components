# @chayns-components/swipeable-wrapper

React component package providing `SwipeableWrapper` for chayns applications.

Documented components: `SwipeableWrapper`.

## Import

```ts
import { SwipeableWrapper } from '@chayns-components/swipeable-wrapper';
```

## Typical Usage

```tsx
<SwipeableWrapper
    leftActions={[
                {
                    action: () => console.log('Comment'),
                    backgroundColor: 'blue',
                    color: 'white',
                    icon: <Icon color="white" icons={['fa fa-comment']} />,
                    key: 'comment',
                    text: 'Comment',
                },
            ]}
    rightActions={[
                {
                    action: () => console.log('Star'),
                    backgroundColor: 'darkkhaki',
                    color: 'black',
                    icon: <Icon color="black" icons={['fa fa-star']} />,
                    key: 'star',
                    text: 'Star',
                },
                {
                    action: () => console.log('Fire'),
                    backgroundColor: 'red',
                    color: 'white',
                    icon: <Icon color="white" icons={['fa fa-fire']} />,
                    key: 'fire',
                    text: 'Fire',
                },
            ]}
>
    {<ListItem title="Swipe me" />}
</SwipeableWrapper>
```

## SwipeableWrapper

`SwipeableWrapper` is exported by `@chayns-components/swipeable-wrapper` and should be imported from the public package entry point.

### Import

```ts
import { Icon, ListItem, SwipeableWrapper } from '@chayns-components/swipeable-wrapper';
```

### Examples

#### General

```tsx
<SwipeableWrapper
    leftActions={[
                {
                    action: () => console.log('Comment'),
                    backgroundColor: 'blue',
                    color: 'white',
                    icon: <Icon color="white" icons={['fa fa-comment']} />,
                    key: 'comment',
                    text: 'Comment',
                },
            ]}
    rightActions={[
                {
                    action: () => console.log('Star'),
                    backgroundColor: 'darkkhaki',
                    color: 'black',
                    icon: <Icon color="black" icons={['fa fa-star']} />,
                    key: 'star',
                    text: 'Star',
                },
                {
                    action: () => console.log('Fire'),
                    backgroundColor: 'red',
                    color: 'white',
                    icon: <Icon color="white" icons={['fa fa-fire']} />,
                    key: 'fire',
                    text: 'Fire',
                },
            ]}
>
    {<ListItem title="Swipe me" />}
</SwipeableWrapper>
```

#### Left Action Without Background

```tsx
<SwipeableWrapper
    leftActions={[
            {
                action: () => console.log('Reply'),
                backgroundColor: undefined,
                color: 'var(--chayns-color--headline)',
                icon: <Icon color="var(--chayns-color--headline)" icons={['fa fa-reply']} />,
                key: 'reply',
                text: 'Reply',
            },
        ]}
    rightActions={undefined}
>
    {<ListItem title="Swipe me" />}
</SwipeableWrapper>
```

#### Single Right Action

```tsx
<SwipeableWrapper
    leftActions={undefined}
    rightActions={[
            {
                action: () => console.log('Delete'),
                backgroundColor: 'red',
                color: 'white',
                icon: <Icon color="white" icons={['fa fa-trash']} />,
                key: 'trash',
                text: 'Delete',
            },
        ]}
>
    {<ListItem title="Swipe me" />}
</SwipeableWrapper>
```

### Props

No prop documentation available.

### Types

No additional exported types documented.

### Usage Notes

- Import `SwipeableWrapper` directly from `@chayns-components/swipeable-wrapper` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/swipeable-wrapper/src/...`; always use the public package export.
