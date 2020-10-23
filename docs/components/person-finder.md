<div align="center"><h1>PersonFinder</h1></div>

An autocomplete search for persons that can be customized to work with arbitrary
data.

## Usage

You should have the `chayns-components` package installed. If that is not the
case already, run

```bash
yarn add chayns-components
```

or

```bash
npm i chayns-components
```

After the `chayns-components` package is installed, you can import the component
and use it with React:

```jsx
import React from 'react'
import { PersonFinder } from 'chayns-components';

// ...

<PersonFinder {...} />
```

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

## Props

The `PersonFinder`-component takes the following props:

| Name                                | Type                                                                                             | Default          | Required |
| ----------------------------------- | ------------------------------------------------------------------------------------------------ | ---------------- | :------: |
| [placeholder](#placeholder)         | `string`                                                                                         | `''`             |          |
| [multiple](#multiple)               | `boolean`                                                                                        | `false`          |          |
| [showPersons](#showpersons)         | `boolean`                                                                                        | `true`           |          |
| [showSites](#showsites)             | `boolean`                                                                                        | `false`          |          |
| [uacId](#uacid)                     | `number`                                                                                         |                  |          |
| [locationId](#locationid)           | `number`                                                                                         |                  |          |
| [reducerFunction](#reducerfunction) | `function`                                                                                       |                  |          |
| [context](#context)                 | `{ Provider: function, Consumer: object }`                                                       | `PersonsContext` |          |
| [onChange](#onchange)               | `function`                                                                                       |                  |          |
| [disableFriends](#disablefriends)   | `boolean`                                                                                        | `false`          |          |
| [className](#classname)             | `string`                                                                                         |                  |          |
| [defaultValue](#defaultvalue)       | `{ name: string, firstName: string, lastName: string, siteId: string, personId: string }         | string`          |          |  |
| [defaultValues](#defaultvalues)     | `Array<{ name: string, firstName: string, lastName: string, siteId: string, personId: string }>` | `[]`             |          |
| [onAdd](#onadd)                     | `function`                                                                                       |                  |          |
| [onRemove](#onremove)               | `function`                                                                                       |                  |          |
| [onInput](#oninput)                 | `function`                                                                                       |                  |          |
| [contextProps](#contextprops)       | `object`                                                                                         |                  |          |
| [max](#max)                         | `number`                                                                                         |                  |          |
| [values](#values)                   | `array`                                                                                          |                  |          |
| [value](#value)                     | `string`                                                                                         |                  |          |

### `placeholder`

```ts
placeholder?: string
```

The placeholder to show when the input field is empty.

---

### `multiple`

```ts
multiple?: boolean
```

Wether the `PersonFinder` should allow multiple persons or sites to be put in.

---

### `showPersons`

```ts
showPersons?: boolean
```

Wether the `PersonFinder` should show persons in its autocomplete window.

---

### `showSites`

```ts
showSites?: boolean
```

Wether the `PersonFinder` should show sites in its autocomplete window.

---

### `uacId`

```ts
uacId?: number
```

The id of a UAC group to search persons in.

---

### `locationId`

```ts
locationId?: number
```

The locationId of a UAC group to search persons in.

---

### `reducerFunction`

```ts
reducerFunction?: function
```

A function to reduce the results.

---

### `context`

```ts
context?: { Provider: function, Consumer: object }
```

The context of the PersonFinder. Take a look at the
[Custom Finder](#custom-finder) paragraph.

---

### `onChange`

```ts
onChange?: function
```

This callback is invoked when a person is selected, removed or the
`PersonFinder` is cleared.

---

### `disableFriends`

```ts
disableFriends?: boolean
```

Wether the display of friends with an empty input should be disabled.

---

### `className`

```ts
className?: string
```

A classname string that will be applied to the wrapper `<div>`-element.

---

### `defaultValue`

```ts
defaultValue?: { name: string, firstName: string, lastName: string, siteId: string, personId: string } | string
```

The default value of the input field. Can be a string or a person/location
specified with an object.

---

### `defaultValues`

```ts
defaultValues?: Array<{ name: string, firstName: string, lastName: string, siteId: string, personId: string }>
```

The default values of the input field if `multiple` is `true`. Can be strings or
an array of persons/locations specified with an object.

---

### `onAdd`

```ts
onAdd?: function
```

A callback that is invoked when a person is added to the `PersonFinder`. Only
works when `multiple` is `true`

---

### `onRemove`

```ts
onRemove?: function
```

A callback that is invoked when a person is removed from the `PersonFinder`.
Only works when `multiple` is `true`

---

### `onInput`

```ts
onInput?: function
```

The `onInput`-callback for the `<input>` element of the `PersonFinder`.

---

### `contextProps`

```ts
contextProps?: object
```

Props for the context.

---

### `max`

```ts
max?: number
```

The maximum amount of people selected at once. Only has an effect when
`multiple` is `true`.

---

### `values`

```ts
values?: array
```

The currently selected values when `multiple` is `true`.

---

### `value`

```ts
value?: string
```

The value for the
