# Accordion-Component #

The Accordion-Component is part of the *chayns-components* package. It can be installed via npm:

    npm install -S chayns-components@latest

The Accordion-Component hides(actually removes) all child elements when it gets closed and makes the webpage faster. This gets very useful if many elements are stored in the accordion or if there are even wrapped accordions.

## Usage of the Accordions ##
At first the component has to be imported:

```jsx
import { Accordion } from 'chayns-components';
```


Then it can be used like in the following:
```jsx
<Accordion head="Hallo">
    <div className="accordion__content">
        Hello World!
    </div>
</Accordion>
```

### Props ###
The following properties can be set

| Property     | Description                                                            | Type                       | Default Value |
|--------------|------------------------------------------------------------------------|----------------------------|---------------|
| head         | Headline of the accordion                                              | String, React-Elements     | *required*    |
| children     | React components that should be stored in the accordion body           | React-Elements             | *required*    |
| badge        | Content of the Badge                                                   | React-Element              |               |
| badgeStyle   | Style of the Badge                                                     | Object                     |               |
| right        | Node that get rendered in the right side of the accordion head         | React-Element              |               |
| renderClosed | Renders the accordion even if it is closed                             | bool                       | false         |
| isWrapped    | Makes this accordion a wrapped accordion                               | bool                       | false         |
| dataGroup    | Accordion group. Accordions of one group close each other on opening   | String                     |               |
| classNames   | CSS classes for the accordion                                          | String                     |               |
| id           | The accordions Id                                                      | String                     |               |
| icon         | The accordion icon                                                     | String/object              | 'ts-angle-right' |
| style        | Accordion styles                                                       | Object                     |               |
| styleBody    | Accordion body styles                                                  | Function                   |               |
| onOpen       | onOpened-Event                                                         | Function                   |               |
| onClose      | onClose-Event                                                          | Function                   |               |
| ellipsis     | Cuts the accordion headline if it is too long                          | bool                       |               |
| open         | The accordion is open                                                  | bool                       |               |
| defaultOpened| The accordion is default opened                                        | bool                       |               |
| autogrow     | The accordion will adjust its height when opened                       | bool                       | false         |
| reference    | A reference for the accordion                                          | Function                   |               |
| noRotate     | Disable rotating of the icon                                           | Function                   |               |
| fixed        | Disable open/close logic                                               | bool                       |               |
| noTitleTrigger | Disable trigger for title                                            | bool                       | false         |
| noIcon       | Remove Icon from the left                                              | bool                       | false         |
| onSearch     | Accordion search onChange callback                                     | func                       |               |
| searchPlaceholder | Placeholder for the accordion search                              | string                     |               |


### Examples
#### Accordion-Badge
The Accordion-Component allows you to create badges using a prop. The badge wont be created it the props are falsely.
```jsx
<Accordion head="No JSX" badge="15.02.">
    <div className="accordion__content">
        <Calendar />
    </div>
</Accordion>
```

#### Multiple wrapped accordions
The Accordion-Component allows you to wrap accordions (like the normal chayns API).
You can do so by specify multiple children. Do not wrap the Accordions in an other element (e.g. accordion__content).
```jsx
<Accordion head="JavaScript" badge="1997">
    <Accordion head="ES5" isWrapped>
        <div className="accordion__content">
            Hello functions
        </div>
    </Accordion>
    <Accordion head="ES6" badge="2015" isWrapped>
        <div className="accordion__content">
            Hello classes (functions)
        </div>
    </Accordion>
</Accordion>
```

#### Always render content
The content of an accordion can be rendered anytime instead of just when opening it. This function is set to false by default, since it is rarely used.
I.e. it is useful if it is necessary to execute JavaScript-Code that is stored inside this accordion.
```jsx
<Accordion head="No JSX" renderClosed={true}>
    <div className="accordion__content">
        <MyAwesomeES5Script />
    </div>
</Accordion>
```
