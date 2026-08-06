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

| name | type | required | description |
| --- | --- | --- | --- |
| `children` | `ReactNode` | yes | The content of the Swipeable item. |
| `isDisabled` | `boolean \| undefined` | no | Whether the swipeable functionality is disabled |
| `leftActions` | `SwipeableActionItem[] \| undefined` | no | The left-side actions, ordered from the left to the right. |
| `onSwipeEnd` | `VoidFunction \| undefined` | no | Callback to be executed when the swiping is ended. |
| `onSwipeStart` | `VoidFunction \| undefined` | no | Callback to be executed when the swiping is started. |
| `rightActions` | `SwipeableActionItem[] \| undefined` | no | The right-side actions, ordered from left to the right. |
| `shouldUseOpacityAnimation` | `boolean \| undefined` | no | Whether the opacity should be animated when swiping in the actions. |

### Types

- `SwipeableActionItem` -> `type SwipeableActionItem = {
    action: VoidFunction;
    backgroundColor: CSSProperties['backgroundColor'];
    color: CSSProperties['color'];
    text?: ReactNode;
    icon: ReactNode;
    key: string;
};`

### Usage Notes

- Import `SwipeableWrapper` directly from `@chayns-components/swipeable-wrapper` instead of internal source paths.
- Start with one of the documented Storybook examples and adapt the props incrementally for your use case.
- Pay special attention to required props: `children`.

### Anti Patterns

- Avoid imports from internal paths such as `@chayns-components/swipeable-wrapper/src/...`; always use the public package export.
- Avoid incomplete prop objects; follow the documented prop types and required fields.
