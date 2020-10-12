## Custom Finder

If you want to build your own autocomplete finder, e.g. for searching emails,
you can use the `SimpleWrapperContext` and with object mapping and custom props.
The object mapping looks like the following:

```js
{
    showName: 'emailTitle',
    identifier: 'emailId',
    search: ['emailTitle', 'emailText', 'emailSenderName'],
    imageUrl: 'emailSenderImageUrl',
}
```

In `contextProps` you can then set the following props:

-   `data`
-   `hasMore`
-   `onLoadMore`
-   `onInput`

## Clearing the `PersonFinder`

To clear the `PersonFinder` you can use the `clear()`-method on a reference to
the `PersonFinder`-component:

```jsx
const Finder = () => {
    const personFinderRef = useRef();

    function clear() {
        if (personFinderRef.current) {
            personFinderRef.current.clear();
        }
    }

    return (
        <PersonFinder
            {/* ... */}
            ref={personFinderRef}
        />
    );
};
```

## Positioning of the Autocomplete Window

If the autocomplete window is not correctly positioned, check if you have a
`<div class="tapp">`-element as a wrapper around your app.

If not, add it or specify the `parent`-prop on the `PersonFinder`.
