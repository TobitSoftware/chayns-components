# Animation-Components

The Animation-Components are part of the *tobit-chayns_components* package. It can be installed via npm:

    npm install --save-dev tobit-chayns_components
    
The Animation-Components are a collection of components to animate other React-Components.

## Usage of the InspectElementAnimation
At first the component needs to be imported:

```jsx
import {InspectElementAnimation} from 'tobit-chayns_components/react-chayns-animations';
```

You can then animate nearly any of your own React-Compnents with some changes with the InspectElementAnimation-tag. You have to specify the React-class itself.
Any prop that is not handled by react itself (e.g. key) will be added to the new component.

```jsx
	<InspectElement component={MyComponent}>
    </InspectElement>
```
Your component gets two additional props (both are functions): *openOverlay* and *closeOverlay* to control the InspectView and the Overlay.
```jsx
export default class MyComponent extends React.Component {
	render() {
		const {openOverlay} = this.props;
		
		return (
			<div
				onClick={openOverlay}
				style={{
                    display: 'inline-block',
                    minHeight: '250px',
                    backgroundColor: '#FFFFFF'
                }}
			>
				Hello World
			</div>
		);
	}
}
``` 
In addition to that you get the current status of the animation with the following props: enter, enterActive, visible, leave, leaveActive. With them you can set custom CSS-classes and animate what you want.

### Props
Both ways of initialization allow the following settings (No checking in the JavaScript variant):

| Property   | Description                                                                                        | Type    | Default Value |
|------------|-----------------------------------------------------------------------------------------------------|--------|--------------|
| componenent | The component that should get animated                                                 | React.Component| --required--             |
| expandedWidth | The width the modal-box/overlay should have                                                 | string, number | same width as the normal element |
| * | Props that should be set to your own component (includes children)                                                | any |            |