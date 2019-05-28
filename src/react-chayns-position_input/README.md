# PositionInput #

The **PositionInput** - Component is part of the **chayns-component** package. You can install the whole package with the following statement:

    npm install -S chayns-components@latest


## Usage ##

First of all import the component to a component of your own project.

```jsx harmony
import { PositionInput } from 'chayns-components';
```

You can use your **PositionInput** like this:
```jsx harmony
<PositionInput 
    defaultPosition={{
        lat: 52.067,
        lng: 7.016,
    }}
    onPositionChange={console.log}
/>
```
You will need to integrate this script tag into your index.html file:
```jsx harmony
    <script src="https://maps.googleapis.com/maps/api/js?key=##INSERAPIKEYHERE##&libraries=places"></script>
```

The places library is required for autocompletion and geocoding. It can be left out if you don't use the input overlay.

## Props ##

The component has the following properties:

| Property                          | Description                                                                                                           | Type         | Default | Required|
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------|--------------|---------|---------|
| defaultPosition                   | Object with lat & lng as starting point for the map                                                                   | object       |         | true    |
| onPositionChange                  | Callback for selection of positions                                                                                   | function     |         | false   |
| mapOptions                        | Object with options for different preferences of the map  |      [google.maps.MapOptions](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions)  |  | false |
| children                          | Render props for custom input overlay (pass null to only use the map)                                                        | (value, onChange) => JSX.Element |  ``` (value, onChange) => <Input placeholder="Position" value={value} onChange={onChange}/> ```  | false |

