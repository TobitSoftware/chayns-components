# Map #

The **Map** - Component is part of the **chayns-component** package. You can install the whole package with the following statement:

    npm install -S chayns-components@latest


## Usage ##

First of all import the component to a component of your own project.

```jsx harmony
import { Map } from 'chayns-components';
```

You can use your **Map** like this:
```jsx harmony
<Map 
    mapId="adminmap"
    defaultPosition={{
        lat: 0,
        lng: 0,
    }}
/>
```
You will need to integrate this script tag into your index.html file:
```jsx harmony
    <script id="googleMapsScript" src="https://maps.googleapis.com/maps/api/js?key=##INSERAPIKEYHERE##&libraries=places"></script>
```

## Props ##

The component has the following properties:

| Property                          | Description                                                                                                           | Type         | Default | Required|
|-----------------------------------|-----------------------------------------------------------------------------------------------------------------------|--------------|-------|-------|
| defaultPosition                   | Object with positionprops as starting point for the map.                                                              | object       |       |true   |
| mapId                             | Id for the map in case there are multiple maps on one tapp                                                            | string/number|       |true   |
| mapOptions                        | object with options for different preferences of the map                                                              | object       | true  |false  |
| mapOptions.defaultZoom            | Integer for default zoom value of the map                                                                             | number       | 13    |false  |
| mapOptions.onPositionChange       | Callback function which returns an object of coordinates                                                              | func         | null  |false  |
| mapOptions.disableDefaultUI       | disabled default ui of the map                                                                                        | bool         | false |false  |
| mapOptions.reference              | returns the reference of the map to add styles and listeners                                                          | func         | null  |false  |
| mapOptions.disableDefaultStyles   | disables the default styles (maplables etc.)                                                                          | bool         | false |false  |
| mapOptions.mapStyles              | array of styles for the map see google.maps documentation for reference                                               | object       | true  |false  |
| inputOptions                      | object of options for the preferences of the map                                                                      | object       | true  |false  |
| inputOptions.opInputChange        | Callback function which returns the value of the Input                                                                | func         | null  |false  |
| inputOptions.inputref             | returns the reference of the input element                                                                            | func         | null  |false  |
| inputOptions.placeholder          | Placeholder text for the input                                                                                        | string       | ''    |false  |
| markerOptions.icon                | Fontawesome Icon which is displayed in the mapMarker                                                                  | object       | null  |false  |
| markerOptions.bgImg               | URL string for the Backgroundimage of the Marker                                                                      | string       | ''    |false  |
| markerOptions.onIconClick         | Function which is called when the user clicks on the mapmarker next to the input field                                | func         | null  |false  |

