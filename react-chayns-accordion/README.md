# Accordion-Component #

The Accordion-Component is part of the *tobit-chayns_components* package. It can be installed via the Tobit-Npm-Server:

    npm install --save-dev tobit-chayns_components

The Accordion-Component hides(actually removes) all child elements when it gets closed and makes the webpage faster. This gets very useful if many elements are stored in the accordion or if there are even wrapped accordions.

## Usage of the Accordions ##
At first the component has to be imported:

```jsx
import Accordion from 'tobit-chayns_components/react-chayns-accordion';
```


Then it can be used like in the following:
```jsx
	<Accordion>
		<div class="accordion__content" head="Hallo">
			Hello World!
		</div>
	</Accordion>
```

### Props ###
The following properties can be set

| Property   | Description                                                                                        | Type    | Default Value |
|------------|-----------------------------------------------------------------------------------------------------|--------|--------------|
| head | Headline of the accordion                                                | String, React-Elements | --required-- |
| children | React components that should be stored in the accordion body                                                           | React-Elements | --required-- |
| badge | Inhalt des Badges                                                          | String |              |
| renderClosed | Renders the accordion even if it is closed                                                        | bool | false |
| isWrapped | Makes this accordion a wrapped accordion                                                       | bool | false |
| dataGroup | Accordion group. Accordions of one group close each other on opening                                                        | String | |
| classNames | CSS classes for the accordion                                                          | String | |
| id | The accordions Id                                                    | String | |
| style | Accordion styles                                                        | Object | |
| styleBody | Accordion body styles                                                           | Function | |
| onOpen | onOpened-Event                                                           | Function | |
| onClose | onClose-Event                                                           | Function | |
| ellipsis | Cuts the accordion headline if it is too long                                                  | bool | |
| defaultOpened | The accordion is default opened                                                    | bool | |
| reference | A reference for the accordion                                                         | Function | |


### Examples ###
#### Accordion-Badge ####
The Accordion-Component allows you to create badges using a prop. The badge wont be created it the props are falsely.
```jsx
<Accordion head="No JSX" badge="15.02.">
	<div className="accordion__content">
		<Calendar />
	</div>
</Accordion>
```
#### Always render content ####
The content of an accordion can be rendered anytime instead of just when opening it. This function is set to false by default, since it is rarely used.
I.e. it is useful if it is necessary to execute JavaScript-Code that is stored inside this accordion.
```jsx
<Accordion head="No JSX" renderClosed={true}>
	<div className="accordion__content">
		<MyAwesomeES5Script />
	</div>
</Accordion>
```