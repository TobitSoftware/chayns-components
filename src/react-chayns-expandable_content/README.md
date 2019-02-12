# ExpandableContent

The ExpandableContent is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest


## Usage

The ExpandableContent has to be imported:

```jsx harmony
import { ExpandableContent } from 'chayns-components';
```

You can use the input like this:

```jsx harmony
<ExpandableContent open={true|false}>
    Hello World!
</ExpandableContent>
```

## Props

The following properties can be set

| Property     | Description                                           | Type                       | Default Value    |
|--------------|-------------------------------------------------------|----------------------------|------------------|
| open         | Whether the content should be visible                 | bool                       | false            |
| classNames   | The classNames to use for animations                  | ClassNames                 | default-classes  |
| timeouts     | The timeouts to use for animations (opening, closing) | Timeouts                   | default-timeouts |

### ClassNames

To set the classnames that should be used instead of the default ones for a state,
use an object with the following type:
```
{
    opening?: string,
    opened?: string,
    closing?: string,
    closed?: string,
}
```

When a classNames-prop is set (it does not have to be valid), no default classname is used.
This allows you to disable all classnames set by this component:
````jsx harmony
<ExpandableContent classNames />
````
or
````jsx harmony
<ExpandableContent classNames={false} />
````

The default classnames are the following:

| state          | classname                   |
|----------------|-----------------------------|
| all            | expandable_content          |
| OPENED/OPENING | animation__accordion--open  |
| CLOSED/CLOSING | animation__accordion--close |

### Timeouts

To set custom timeouts for opening and closing transitions, use an object with the following type:
```
{
    opening?: integer,
    closing?: integer,
}
```

When the timeouts-prop is invalid or one of the attributes (opening, closing) is not an integer,
the default value (500 ms) is used for this timeout.
